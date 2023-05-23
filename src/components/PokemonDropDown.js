// imported useState hooooook
import React, {useState} from 'react';

// pokemonData is a prop in the function
// used destructuring but would've been something like props.pokemonData otherwise
function PokemonDropDown({ pokemonData }) {
    // selectedPokemon is set to an empty str, this is the initial state but when the setSelectedPokemon function is ran it changes state
    // same for the other to useState hooks but pokemonDetails is set to null, that's the initial state but again the setPokemonDetails will change the state
    // imageUrl state is an empty string initially, if setImageUrl function is fired then the state updates
    const [selectedPokemon, setSelectedPokemon] = useState('');
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    // this an event handler kinda function
    // when the drop down options are clicked, when anything is clicked the event runs
    // then makes the selected name in the selectedPokemon variable activate that setSelectedPokemon func
    // gives the matching pokemon info from pokemonData (e.g. if Charmander is selected then Charmander's details should be shown obvs)
    // if the pokemon selected and the pokemonData matches exactly then fetch is made to get info from the API
    // fetch() lets you get info from an API
    // when the data is fetched it gets that info about the pokemon character then forms that details object
    // setPokemonDetails function, pokemonDetails gets details object and changes the state I think
    // also uses the setImageUrl function to change the imageUrl (it was just a random picture selection)
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
                    console.error('oh nooo, errorrrr!', error);
                });
        }
    };

    return (
        <div className="pokemon-drop-down-container">
            <div className="pokemon-details-container">
                {/* checks truthy and falsiness, just want it to be truthy, not undefined or something*/}
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
