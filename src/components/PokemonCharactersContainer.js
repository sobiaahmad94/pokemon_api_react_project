import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import PokemonDropDown from './PokemonDropDown';
import NavBar from './NavBar';


// sets the pokemonData state variable with as an empty array, nothing in it
// setPokemonData is the second function, this will change the state but pokemonData is like the default state which has nothing in it, just an empty array[]

// state means I can store the Pokemon info from the API so later I can go downwards and give it to other components 
function PokemonCharactersContainer() {
    const [pokemonData, setPokemonData] = useState([]);


    // useEffect grabs Pokemon info from API when the component first renders, the pokemonData changes to setPokemonData func
    useEffect(() => {
        // fetch is built into the browser to grab info from an API
        fetch('https://pokeapi.co/api/v2/pokemon/')
        // .then response.json gets the info but converts it to JSON
        // after it's turned to JSON it's stored as data in pokemonData but then the function setPokemonData runs and it changes/updates eh
            .then((response) => response.json())
            .then((data) => {
                // data.results is what is updated in pokemonData I think
                setPokemonData(data.results);
            })
            // error whenever data isn't received
            .catch((error) => {
                console.error('cannae get the info, errorrrrr!', error);
            });
            // this empty array [] means the API grabs data just one time, which is the first time the page renders but not again
    }, []);

    return (
        // put the components here 
        <>
            <NavBar />
            <PokemonList pokemonData={pokemonData} />
            <PokemonDropDown pokemonData={pokemonData} />
        </>
    );
}

export default PokemonCharactersContainer;
