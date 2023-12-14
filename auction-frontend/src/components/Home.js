
import React from 'react';
import { Navbar } from './Navbar';

function Home() {
    return (
        <>
        <Navbar />
        <div className="home">
            <h1>Welcome to the Auction App!</h1>
            <p>This is the home page of the auction app.</p>
            {/* Add more content or components as needed */}
        </div>
        </>
    );
}

export default Home;
