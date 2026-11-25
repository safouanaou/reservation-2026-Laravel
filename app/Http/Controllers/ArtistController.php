<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ArtistController extends Controller
{
    /**
     * Charge tous les artistes et les transmet à la page React Artists/Index via Inertia.
     */
    public function index(): Response
    {
        return Inertia::render('Artists/Index', [
            'artists' => Artist::all(),
        ]);
    }

    /**
     * Non utilisée actuellement : le formulaire de création se trouve sur la page de liste.
     */
    public function create()
    {

    }

    /**
     * Valide les noms, crée l'artiste en base de données, puis redirige vers la liste.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'firstname' => ['required', 'string', 'max:60'],
            'lastname' => ['required', 'string', 'max:60']
        ]);

        Artist::create($validated);
        return redirect()->route('artist.index');
    }

    /**
     * Transmet l'artiste demandé à la page React Artists/Show, ou renvoie une erreur 404 s'il n'existe pas.
     */
    public function show(string $id)
    {
        return Inertia::render('Artists/Show', [
            'artist' => Artist::findOrFail($id)
        ]);

        
    }

    /**
     * Non utilisée actuellement : le formulaire de modification s'affiche directement sur la page de l'artiste.
     */
    public function edit(string $id)
    {
       
    }

    /**
     * Recherche l'artiste, valide et enregistre les nouveaux noms, puis redirige vers sa fiche actualisée.
     */
    public function update(Request $request, string $id)
    {
        $artist = Artist::findOrFail($id);
        $validated = $request->validate([
            'firstname' => ['required', 'string', 'max:60'],
            'lastname' => ['required', 'string', 'max:60'],
        ]);
        $artist->update($validated);
        return redirect()->route('artist.show', $artist->id);
    }

    /**
     * Réservée à la suppression d'un artiste ; cette fonctionnalité n'est pas encore implémentée.
     */
    public function destroy(string $id)
    {
        //
    }
}
