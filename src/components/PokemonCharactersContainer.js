import React, { useState, useEffect } from 'react';

function PokemonCharactersContainer() {
    const [pokemonData, setPokemonData] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/')
            .then((response) => response.json())
            .then((data) => {
                setPokemonData(data.results);
            });
    }, []);

    return null; // will change the return after :)
}

export default PokemonCharactersContainer;