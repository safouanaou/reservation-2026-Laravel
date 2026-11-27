import { useForm } from '@inertiajs/react';

export default function ArtistForm({ onSaved, onCancel }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        firstname: '',
        lastname: '',
    });

    const submit = (event) => {
        event.preventDefault();
        post('/artist', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onSaved();
            },
        });
    };

    return (
        <section className="artist-form" id="artist-create" aria-labelledby="artist-create-title">
            <h2 id="artist-create-title">Add an artist</h2>
            <form onSubmit={submit}>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label" htmlFor="firstname">First name</label>
                        <input
                            className={`form-control${errors.firstname ? ' is-invalid' : ''}`}
                            id="firstname" name="firstname" type="text" autoComplete="given-name"
                            value={data.firstname} required maxLength={60}
                            onChange={(event) => setData('firstname', event.target.value)}
                            aria-invalid={Boolean(errors.firstname)}
                            aria-describedby={errors.firstname ? 'firstname-error' : undefined}
                        />
                        {errors.firstname && <div className="invalid-feedback" id="firstname-error" role="alert">{errors.firstname}</div>}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" htmlFor="lastname">Last name</label>
                        <input
                            className={`form-control${errors.lastname ? ' is-invalid' : ''}`}
                            id="lastname" name="lastname" type="text" autoComplete="family-name"
                            value={data.lastname} required maxLength={60}
                            onChange={(event) => setData('lastname', event.target.value)}
                            aria-invalid={Boolean(errors.lastname)}
                            aria-describedby={errors.lastname ? 'lastname-error' : undefined}
                        />
                        {errors.lastname && <div className="invalid-feedback" id="lastname-error" role="alert">{errors.lastname}</div>}
                    </div>
                </div>
                <div className="d-flex gap-2 mt-3">
                    <button className="btn artist-primary" type="submit" disabled={processing}>{processing ? 'Saving…' : 'Save artist'}</button>
                    <button className="btn btn-outline-secondary" type="button" onClick={onCancel} disabled={processing}>Cancel</button>
                </div>
            </form>
        </section>
    );
}
