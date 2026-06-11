import React from 'react';
import './Footer.css';

function Footer({ onMainClick, onListsClick }) {
    return (
        <footer>
            <button onClick={onMainClick}>Фильмы</button> 
            <button onClick={onListsClick}>Списки</button> 
        </footer>
    );
}

export default Footer;
