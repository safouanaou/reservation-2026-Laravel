export default function Show({artist}){

    console.log(artist)

    return (
        <div>
            <h1 key={artist.id}>{artist.firstname}</h1>
        </div>
    )
}