import React, { useState } from 'react';

function PokemonList({ pokemonData }) {
    const [pokemonDetails, setPokemonDetails] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const fetchPokemonDetails = (url) => {
        console.log('grabbing pokemon details hopefully :)', url);

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const abilities = data.abilities.map((ability) => ability.ability.name);
                const types = data.types.map((type) => type.type.name);
                const details = {
                    id: data.id,
                    abilities: abilities,
                    types: types,
                };
                const frontDefaultImageUrl = data.sprites.front_default;
                details.name = data.species.name;
                setImageUrl(frontDefaultImageUrl);
                setPokemonDetails(details);
            })
            .catch((error) => {
                console.error('cannae get pokemon details, errorrrrrr', error);
            });
    };

    return (
        <>
            <h1>Pokemon List</h1>
            <ul>
                {pokemonData.map((pokemon) => (
                    <li key={pokemon.name}>
                        {pokemon.name}
                        <button onClick={() => fetchPokemonDetails(pokemon.url)}>Pokemon Details</button>
                    </li>
                ))}
            </ul>
            {pokemonDetails && (
                <div className="pokemon-details-container">
                    <h2>Pokemon Profile Details</h2>
                    <img src={imageUrl} alt={pokemonDetails.name} />
                    <p>Name: {pokemonDetails.name}</p>
                    <p>ID: {pokemonDetails.id}</p>
                    <p>Types: {pokemonDetails.types.join(', ')}</p>
                    <p>Abilities: {pokemonDetails.abilities.join(', ')}</p>
                </div>
            )}
        </>
    );
}

export default PokemonList;
