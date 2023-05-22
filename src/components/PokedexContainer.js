import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import PokemonDropDown from './PokemonDropDown';
import PokemonCharactersContainer from './PokemonCharactersContainer';
import NavBar from './NavBar';

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
        <NavBar />
        <PokemonCharactersContainer /> {/* this contains PokemonList and PokemonDropDown :) */}
        </>
    )
}

export default PokemonContainer;
