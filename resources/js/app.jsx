import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
    return (
        <main className="container py-5">
            <h1 className="display-5 fw-bold">Projet Réservations</h1>
            <p className="lead">Laravel + React fonctionne !</p>
        </main>
    );
}

createRoot(document.getElementById('app')).render(<App />);
