import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import PokemonDropDown from './PokemonDropDown';

function PokemonContainer() {
    const [pokemonData, setPokemonData] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/')
            .then((response) => response.json())
            .then((data) => {
                setPokemonData(data.results);
            })
            .catch((error) => {
                console.error('cannae get pokemon details, ooops - errorrrr!', error);
            });
    }, []);

    return (
        <>
            <PokemonList pokemonData={pokemonData} />
            <PokemonDropDown pokemonData={pokemonData}/>
        </>
    )
}

export default PokemonContainer;
