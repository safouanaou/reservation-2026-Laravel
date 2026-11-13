import { Link } from "@inertiajs/react";

export default function Index({artists}){
    return (
        <div>

            <h1>List of Artists</h1>

            <ul>
                {artists.map(artist => (
                    <li key={artist.id}>{artist.firstname}</li>
                ))}
            </ul>
        
        </div>
    )
}

