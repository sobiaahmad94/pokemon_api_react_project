import React, { useState } from 'react';

function PokemonDropDown({ pokemonData }) {
    const [selectedPokemon, setSelectedPokemon] = useState('');
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handlePokemonChange = (event) => {
        const selectedPokemonName = event.target.value;
        setSelectedPokemon(selectedPokemonName);

        const selectedPokemonData = pokemonData.find(
            (pokemon) => pokemon.name === selectedPokemonName
        );

        if (selectedPokemonData) {
            fetch(selectedPokemonData.url)
                .then((response) => response.json())
                .then((data) => {
                    const abilities = data.abilities.map(
                        (ability) => ability.ability.name
                    );
                    const types = data.types.map((type) => type.type.name);

                    const details = {
                        id: data.id,
                        abilities: abilities,
                        types: types,
                        name: data.name,
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
        <div className="pokemon-drop-down-container">
            <div className="pokemon-details-container">
                {pokemonDetails && (
                    <>
                    <div className="pokemon-character-img">
                    <img src={imageUrl} alt={pokemonDetails.name} />
                        <p>Name: {pokemonDetails.name}</p>
                        <p>ID: {pokemonDetails.id}</p>
                        <p>Types: {pokemonDetails.types.join(', ')}</p>
                        <p>Abilities: {pokemonDetails.abilities.join(', ')}</p>
                    </div>
                    </>
                )}
            </div>
            <div className="pokemon-drop-down">
                <h2>Pokemon Character Drop Down</h2>
                <select value={selectedPokemon} onChange={handlePokemonChange}>
                    <option value="">Choose a Pokemon</option>
                    {pokemonData.map((pokemon) => (
                        <option key={pokemon.name} value={pokemon.name}>
                            {pokemon.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default PokemonDropDown;
