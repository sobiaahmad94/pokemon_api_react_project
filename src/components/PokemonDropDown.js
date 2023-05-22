import React, { useState } from 'react';

function PokemonDropDown({ pokemonData }) {
    const [selectedPokemon, setSelectedPokemon] = useState('');
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handlePokemonChange = (event) => {
        const selectedPokemonName = event.target.value;
        setSelectedPokemon(selectedPokemonName);

        // Find the selected Pokemon from the pokemonData array
        const selectedPokemonData = pokemonData.find((pokemon) => pokemon.name === selectedPokemonName);

        if (selectedPokemonData) {
            fetch(selectedPokemonData.url)
                .then((response) => response.json())
                .then((data) => {
                    const abilities = data.abilities.map((ability) => ability.ability.name);
                    const types = data.types.map((type) => type.type.name);
                    const details = {
                        id: data.id,
                        abilities: abilities,
                        types: types,
                        name: data.species.name,
                    };
                    setPokemonDetails(details);
                    setImageUrl(data.sprites.front_default);
                })
                .catch((error) => {
                    console.error('Error fetching Pokemon details:', error);
                });
        }
    };

    return (
        <div>
            <h2>Pokemon Dropdown</h2>
            <select value={selectedPokemon} onChange={handlePokemonChange}>
                <option value="">Select a Pokemon</option>
                {pokemonData.map((pokemon) => (
                    <option key={pokemon.name} value={pokemon.name}>
                        {pokemon.name}
                    </option>
                ))}
            </select>

            {pokemonDetails && (
                <div className="pokemon-details-container">
                    <h3>Pokemon Details</h3>
                    <img src={imageUrl} alt={pokemonDetails.name} />
                    <p>Name: {pokemonDetails.name}</p>
                    <p>ID: {pokemonDetails.id}</p>
                    <p>Types: {pokemonDetails.types.join(', ')}</p>
                    <p>Abilities: {pokemonDetails.abilities.join(', ')}</p>
                </div>
            )}
        </div>
    );
}

export default PokemonDropDown;
