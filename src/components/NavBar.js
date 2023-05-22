import React from 'react';
// had to import the logo
import pokemonLogo from './pokemon_logo.png';

function NavBar() {
    return (
        <>
            {/* had to pass in pokemonLogo as it's the variable storing the image, class added for styling*/}
            <img className="pokemon-logo" src={pokemonLogo} alt="Pokemon Logo" />
            {/* <h1>This is the Navbar</h1> */}
            {/* navbar items */}
            <nav className="navbar">
                <ul>
                    <li><a href="/home">Home</a> </li>
                    <li><a href="/pokedex">Pokedex</a> </li>
                    <li><a href="/blog">Blog</a> </li>
                </ul>
            </nav>
        </>

    );
};

export default NavBar;