import { Link } from "@inertiajs/react";

export default function Index({artists}){
    return (
        <div>

            <h1>List of Artists</h1>

            <ul>
                {artists.map(artist => (
                    <a href="../Pages/Artist/Index.jsx" key={artist.id}><li key={artist.id}>{artist.firstname}</li></a>
                    
                ))}
            </ul>
        
        </div>
    )
}

