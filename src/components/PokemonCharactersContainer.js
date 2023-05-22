// PokemonCharactersContainer.js
import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import PokemonDropDown from './PokemonDropDown';

function PokemonCharactersContainer() {
    const [pokemonData, setPokemonData] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/')
            .then((response) => response.json())
            .then((data) => {
                setPokemonData(data.results);
            })
            .catch((error) => {
                console.error('Error fetching Pokemon data:', error);
            });
    }, []);

    return (
        <>
            <PokemonList pokemonData={pokemonData} />
            <PokemonDropDown pokemonData={pokemonData} />
        </>
    );
}

export default PokemonCharactersContainer;
