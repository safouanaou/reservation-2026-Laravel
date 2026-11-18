import { Link, useForm } from "@inertiajs/react";


export default function Index({artists}){


    const {data, setData, post, processing, errors, reset } = useForm({
        firstname: "",
        lastname: "",
    });

    const submit = (e)=>{
        e.preventDefault();

        post('/artist', {
            onSuccess: () => reset()
        });
    }


    return (
        <div>

            <h1>List of Artists</h1>

            <ul>
                {artists.map(artist => (
                    <li key={artist.id}>
                        <Link href={`/artist/${artist.id}`}>{artist.firstname} {artist.lastname}</Link>
                    </li>
                    
                ))}
            </ul>

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


        
        </div>
    )
}

