import { Link, useForm } from "@inertiajs/react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import "../../../css/pages/artists/index.css";


// Affiche la liste des artistes et le formulaire permettant d'en ajouter un.
export default function Index({artists}){


    // Gère les champs du formulaire, l'état de l'envoi et les erreurs de validation renvoyées par Laravel.
    const {data, setData, post, processing, errors, reset } = useForm({
        firstname: "",
        lastname: "",
    });

    // Envoie le nouvel artiste par une requête POST et vide les champs uniquement si la création réussit.
    const submit = (e)=>{
        e.preventDefault();

        post('/artist', {
            onSuccess: () => reset()
        });
    }


    return (
        <DashboardLayout>

            <h1 className="artists-title">Artists</h1>
            <p className="artists-description">Manage the artists in your directory.</p>

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
                                <td colSpan="4" className="artists-empty">No artists yet. Add your first artist below.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <h2>Add an Artist</h2>

            <form onSubmit={submit}>
                <div>
                    <label htmlFor="firstname">First Name</label>
                    <input 
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={data.firstname}
                    onChange={(e) => setData('firstname', e.target.value)} 
                    />
                    {errors.firstname && <p>{errors.firstname}</p>}
                </div>

                <div>
                    <label htmlFor="lastname">Last Name</label>
                    <input 
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={data.lastname}
                    onChange={(e) => setData('lastname', e.target.value)} 
                    />
                    {errors.lastname && <p>{errors.lastname}</p>}
                </div>

                <button type="submit" disabled={processing}>{processing ? "Saving..." : "Add Artist"}</button>
            </form>

        
        </DashboardLayout>
    )
}

