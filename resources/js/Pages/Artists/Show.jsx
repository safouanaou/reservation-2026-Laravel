import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";


export default function Show({artist}){


    const {data, setData, put, processing, errors, reset, setDefaults, clearErrors } = useForm({
        firstname: artist.firstname,
        lastname: artist.lastname,
    });


    const [isEditing, setIsEditing] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        put(`/artist/${artist.id}`, {
            onSuccess: () => {
                setDefaults(data);
                setIsEditing(false);
            },
        });

    }

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
        </div>
    )
}
