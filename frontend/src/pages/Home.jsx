import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css"

function Home() {

    return (
        <div>
            <nav class="navbar">
            <div class="logo">MySite</div>
            <ul class="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/evolution-tree">Evolution tree</a></li>
                <li><a href="/interactive-games">Interactive games</a></li>
                <li><a href="/users">Connection</a></li>
                <li><a href="/logout">Logout</a></li>
            </ul>
            </nav>
            <div class="page">
                <h1>Welcome to Rela!</h1>
                <p>Keep your relationship organized and easily accessible.</p>
            </div>
        </div>
    );
}

export default Home;