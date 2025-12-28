import { useState, useEffect } from "react";
import api from "../api";
import "../styles/InteractiveGames.css"

function InteractiveGames() {
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
            <div className="page">
            <h1>Welcome to Rela!</h1>
                <div className="cards-row">
                    <div className="card">
                        <h2>💖 Catch the Hearts</h2>
                        <p>Click all flying hearts to win!</p>
                        <span className="play"><a href="/game-1">▶ Play</a></span>
                    </div>
                    
                    <div className="card">
                        <h2>Quiz💭</h2>
                        <p>Try to give answer to all questions or create your own quiz!</p>
                        <span className="play"><a href="/game-2">▶ Play</a></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InteractiveGames;