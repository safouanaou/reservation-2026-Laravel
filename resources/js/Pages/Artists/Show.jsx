import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";


// Affiche un artiste et permet de modifier ses informations directement sur cette page.
export default function Show({artist}){


    // Préremplit le formulaire avec les informations reçues de Laravel et gère l'envoi ainsi que les erreurs.
    const {data, setData, put, delete:remove, processing, errors, reset, setDefaults, clearErrors } = useForm({
        firstname: artist.firstname,
        lastname: artist.lastname,
    });


    // Le formulaire reste masqué tant que l'utilisateur n'a pas cliqué sur Edit.
    const [isEditing, setIsEditing] = useState(false);

    // Empêche le rechargement classique du formulaire et envoie les modifications à Laravel par une requête PUT.
    const submit = (e) => {
        e.preventDefault();

        put(`/artist/${artist.id}`, {
            // Après la sauvegarde, actualise les valeurs utilisées par reset() et ferme le formulaire.
            onSuccess: () => {
                setDefaults(data);
                setIsEditing(false);
            },
        });

    }

    const deleteArtist = () => {   
        const confirmed =  window.confirm('do you really want to delete this artist?');

        if (confirmed) {
            remove(`/artist/${artist.id}`)
        }
        else return;

        
    }

    // Annule les modifications non enregistrées, efface les erreurs et quitte le mode édition.
    const cancel = () => {
        reset();
        clearErrors();
        setIsEditing(false);
    }


    return (
        <div>
            <h1 key={artist.id}>{artist.firstname} {artist.lastname}</h1>
            
            {isEditing ? <form onSubmit={submit}>
                <div>
                    <label htmlFor="firstname">First Name</label>
                    <input type="text"
                    value={data.firstname}
                    id="firstname"
                    name="firstname"
                    onChange={(e) => {setData('firstname', e.target.value)}}/>
                    {errors.firstname && <p role="alert">{errors.firstname}</p>}
                </div>    

                <div>
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" 
                    value={data.lastname}
                    id="lastname"
                    name="lastname"
                    onChange={(e) => setData('lastname', e.target.value)}
                    />
                    {errors.lastname && <p role="alert">{errors.lastname}</p>}
                </div>
                
                <button type="submit" disabled={processing}>Save</button>
                <button type="button" onClick={cancel} disabled={processing}>Cancel</button> 
                 
            </form> : 
            <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
            }


            <button type="button" onClick={deleteArtist}>Delete</button>
        </div>
    )
}
