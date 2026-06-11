import React from 'react';
import './Header.css';

function Header() {
    return (
        <header>
            <div className="header-content">
                <div className="logo">Кинопоиск-мини</div>
                <div className="search-container">
                    <input type="text" placeholder="Найти фильм" />
                    <div className="search-icon">
                        <img
                            src="https://www.clipartmax.com/png/full/3-37322_clip-art-search-clipart-search-icon-download-search-icon-png.png"
                            alt="search-icon"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
