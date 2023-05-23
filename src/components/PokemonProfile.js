// useEffect and useState imported
import React, {useEffect, useState} from 'react';

// the function takes in pokemonInfo is a prop
// I used destructuring with the curly boys but it is like props.pokemonInfo
// imageUrl is the initial state and it's just empty like an empty string 
// when setImageUrl function runs then the state will change though
function PokemonProfile({ pokemonInfo }) {
    const [imageUrl, setImageUrl] = useState('');

    // useEffect is so the pokemon's data can be grabbed and when it's updated the imageUrl state variable when pokemonInfo changes to setPokemonInfo
    // if there is pokemonInfo then I think it fetches for it like pokemonInfo.url and gets the wee cute images
    useEffect(() => {

        if (pokemonInfo) {
            fetch(pokemonInfo.url)
                .then((response) => response.json())
                .then((data) => {
                    const frontDefaultImageUrl = data.sprites.front_default;
                    setImageUrl(frontDefaultImageUrl);
                })
                .catch((error) => {
                    console.error('oh no, errorrrrr!', error);
                });
        }
    }, [pokemonInfo]);

    // I got a bit confused with truthy and falsy but I think it's just so it knows not to return anything if there's no pokemonInfo
    // ! here means no
    if (!pokemonInfo) {
        return '';
    }

    return (
        <>
            <h2>Pokemon Profile</h2>
            {/* checks if imageUrl isn't an empty string I think */}
            {/* displays other details*/}
            {imageUrl ? (
                <img src={imageUrl} alt={pokemonInfo.name} />
            ) : (
                <p>the image is loading, please wait a moment...</p>
            )}
            <p>Name: {pokemonInfo.name}</p>
            <p>ID: {pokemonInfo.id}</p>
            <p>Types: {pokemonInfo.types.map((type) => type.type.name).join(', ')}</p>
            <p>
                Abilities: {pokemonInfo.abilities.map((ability) => ability.ability.name).join(', ')}
            </p>
        </>
    );
}

export default PokemonProfile;
