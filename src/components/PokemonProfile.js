import React, { useEffect, useState } from 'react';

function PokemonProfile({ pokemonInfo }) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (pokemonInfo) {
            fetch(pokemonInfo.url)
                .then((response) => response.json())
                .then((data) => {
                    const frontDefaultImageUrl = data.sprites.front_default;
                    setImageUrl(frontDefaultImageUrl);
                })
                .catch((error) => {
                    console.error('Error fetching Pokemon data:', error);
                });
        }
    }, [pokemonInfo]);

    if (!pokemonInfo) {
        return null;
    }

    return (
        <>
            <h2>Pokemon Profile</h2>
            {imageUrl ? (
                <img src={imageUrl} alt={pokemonInfo.name} />
            ) : (
                <p>the image is loading, please wait a momentooooo...</p>
            )}
            <p>Name: {pokemonInfo.name}</p>
            <p>ID: {pokemonInfo.id}</p>
            <p>Types: {pokemonInfo.types.map((type) => type.type.name).join(', ')}</p>
            <p>Abilities: {pokemonInfo.abilities.map((ability) => ability.ability.name).join(', ')}</p>
        </>
    );
}

export default PokemonProfile;
