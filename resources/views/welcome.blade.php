<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Projet Réservations</title>
        @vite('resources/css/app.css')
    </head>
    <body class="bg-body-tertiary">
        <main class="container py-5">
            <div class="row justify-content-center">
                <section class="col-lg-8" aria-labelledby="welcome-title">
                    <h1 id="welcome-title" class="display-5 fw-bold">Projet Réservations</h1>
                    <p class="lead mb-4">Bienvenue sur le projet de réservation de spectacles.</p>
                    <div class="d-flex flex-wrap gap-3">
                        <a href="{{ url('/react') }}" class="btn btn-primary">Ouvrir le projet</a>
                        <a href="https://laravel.com/docs" class="btn btn-outline-secondary">Documentation Laravel</a>
                    </div>
                </section>
            </div>
        </main>
    </body>
</html>
