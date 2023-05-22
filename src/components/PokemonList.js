import React, { useState } from 'react';

function PokemonList({ pokemonData }) {
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const fetchPokemonDetails = (url) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const abilities = data.abilities.map((ability) => ability.ability.name);
                const types = data.types.map((type) => type.type.name);
                const details = {
                    id: data.id,
                    abilities: abilities,
                    types: types,
                    name: data.species.name,
                    image: data.sprites.front_default,
                };
                setSelectedPokemon(details);
            })
            .catch((error) => {
                console.error('Error fetching Pokemon details:', error);
            });
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
                        {selectedPokemon && selectedPokemon.name === pokemon.name && (
                            <div className="pokemon-details">
                                <img src={selectedPokemon.image} alt={selectedPokemon.name} />
                                <p>Name: {selectedPokemon.name}</p>
                                <p>ID: {selectedPokemon.id}</p>
                                <p>Types: {selectedPokemon.types.join(', ')}</p>
                                <p>Abilities: {selectedPokemon.abilities.join(', ')}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default PokemonList;
