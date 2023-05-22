import React from 'react';
import pokemonLogo from './pokemon_logo.png';

function NavBar() {
    return (
        <>
            <img className="pokemon-logo" src={pokemonLogo} alt="Pokemon Logo" />
            {/* <h1>This is the Navbar</h1> */}

            <ul>
                <li>
                    <a href="/home">Home</a>
                    <a href="/pokedex">Pokedex</a>
                    <a href="/blog">Blog</a>
                </li>
            </ul>

        </>

    );
};

export default NavBar;