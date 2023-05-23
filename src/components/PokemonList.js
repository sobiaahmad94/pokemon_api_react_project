// imported the two hooks
import React, { useState } from 'react';

// this function takes pokemonData as a prop
// same as props.pokemonData but used destructuring 
// example one: function myVehicle({type, colour, brand, model}) 

// useState used here, selectedPokemon is set to null, nothing
// setSelectedPokemon function will change the state
function PokemonList({ pokemonData }) {
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    // fetch is built in and gets info from the API
    
    // takes url as an argument so can get Pokemon info for the specific url
    // I was looking at a Charmander specific API which was so cool
    const fetchPokemonDetails = (url) => {

        // this uses the fetch in built function, taking in the url
        fetch(url)
        // .then response.json gets the info but converts it to JSON
        // after it's turned to JSON it's stored as data in pokemonData but then the function setPokemonData runs and it changes/updates eh
            .then((response) => response.json())
            .then((data) => {

                // here different bits of info are taken from the api such as types and stored in a variable so it's easier
                // map() is used as it basically carries out a func on every item in the array and then creates a new array
                // for abilities and types, I can use map() as map is only for arrays I believe
                const abilities = data.abilities.map((ability) => ability.ability.name);
                const types = data.types.map((type) => type.type.name);

                // details variable creates an object but stores all of those bits of info that were stored in the variables above
                const details = {
                    id: data.id,
                    abilities: abilities,
                    types: types,
                    name: data.species.name,
                    image: data.sprites.front_default,
                };
                // when the setSelectedPokemon function is ran, the details above are put in there as an argument
                setSelectedPokemon(details);
            })
            // error whenever data isn't received
            .catch((error) => {
                console.error('oh no, errorrrrr!', error);
            });
    };

    return (
        <>
        {/* pokemonData in curly boyzzz maps maps over the pokemonData array and makes an item (li) for every single Pokemon (I think there are only like 25 via that url btw) */}
        {/* map() iterates through an array and applies a function to every item in the array and then creates a new array*/}
            <h1>Pokemon List</h1>
            <ul>
                {pokemonData.map((pokemon) => (
                    <li key={pokemon.name}>
                        {pokemon.name}
                        {/* onClick event thing used, when the button is clicked, the fetchPokemonDetails func runs with the Pokemon's url */}
                        <button onClick={() => fetchPokemonDetails(pokemon.url)}>
                            Pokemon Details
                        </button>

                        {/* I found this a bit confusing so I Googled stuff, I think it's to do with truthy values though, if the two names are the exact same and then that selectedPokemon.image displays if the names match  */}
                        {selectedPokemon && selectedPokemon.name === pokemon.name && (
                            <div className="pokemon-details">
                            {/* image of the pokemon */}
                                <img src={selectedPokemon.image} alt="pokemon-image" />
                                {/* other pokemon details*/}
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
