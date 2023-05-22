// PokemonList.js
import React, { useState } from 'react';

function PokemonList({ pokemonData }) {
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const fetchPokemonDetails = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const abilities = data.abilities.map((ability) => ability.ability.name);
            const types = data.types.map((type) => type.type.name);
            const details = {
                id: data.id,
                abilities: abilities,
                types: types,
                name: data.name,
            };
            const frontDefaultImageUrl = data.sprites.front_default;
            setImageUrl(frontDefaultImageUrl);
            setPokemonDetails(details);
        } catch (error) {
            console.error('Error fetching Pokemon details:', error);
        }
    };

    return (
        <>
            <h1>Pokemon List</h1>
            <ul>
                {pokemonData.map((pokemon) => (
                    <li key={pokemon.name}>
                        {pokemon.name}
                        <button onClick={() => fetchPokemonDetails(pokemon.url)}>
                            Pokemon Details
                        </button>
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
