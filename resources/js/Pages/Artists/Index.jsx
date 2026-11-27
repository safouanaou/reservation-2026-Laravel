import { Link } from "@inertiajs/react";
import { useState } from "react";
import ArtistForm from "../../Components/Artists/ArtistForm";
import DashboardLayout from "../../Layouts/DashboardLayout";
import "../../../css/pages/artists/index.css";


// Affiche la liste des artistes et le formulaire permettant d'en ajouter un.
export default function Index({artists}){


    const [showForm, setShowForm] = useState(false);

    return (
        <DashboardLayout>

            <h1 className="artists-title">Artists</h1>
            <p className="artists-description">Manage the artists in your directory.</p>

            <div className="artists-toolbar">
                <button className="btn artist-primary" type="button" onClick={() => setShowForm(true)} disabled={showForm} aria-expanded={showForm} aria-controls="artist-create">
                    + Add artist
                </button>
            </div>

            {showForm && <ArtistForm onSaved={() => setShowForm(false)} onCancel={() => setShowForm(false)} />}

            <div className="table-responsive mb-4">
                <table className="table table-striped table-hover artists-table">
                    <caption className="visually-hidden">Artist directory</caption>
                    <thead>
                        <tr>
                            <th scope="col" className="artist-id">ID</th>
                            <th scope="col">First name</th>
                            <th scope="col">Last name</th>
                            <th scope="col" className="artist-actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {artists.map(artist => (
                            <tr key={artist.id}>
                                <td className="artist-id">{artist.id}</td>
                                <td>{artist.firstname}</td>
                                <td>{artist.lastname}</td>
                                <td className="artist-actions">
                                    <Link className="btn btn-sm artist-view" href={`/artist/${artist.id}`} aria-label={`View ${artist.firstname} ${artist.lastname}`}>
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {artists.length === 0 && (
                            <tr>
                                <td colSpan="4" className="artists-empty">
                                    No artists yet. Use Add artist to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <p className="artists-total" role="status">
                {artists.length} {artists.length === 1 ? 'artist' : 'artists'} in your directory
            </p>

        </DashboardLayout>
    )
}

