<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Artist;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ArtistControllerTest extends TestCase
{
    use LazilyRefreshDatabase;

    public function test_public_artist_list_renders_the_react_page_with_artist_records(): void
    {
        $artist = Artist::create(['firstname' => 'Élena', 'lastname' => 'Perez']);

        $response = $this->get(route('artist.index'));

        $response->assertOk()
            ->assertViewIs('app')
            ->assertInertia(fn (Assert $page) => $page
                ->component('Artists/Index')
                ->has('artists', 1)
                ->where('artists.0.id', $artist->id)
                ->where('artists.0.firstname', 'Élena')
                ->where('artists.0.lastname', 'Perez')
            );
    }

    public function test_inertia_navigation_returns_page_json_with_an_empty_artist_list(): void
    {
        $initialResponse = $this->get(route('artist.index'));

        $response = $this->get(route('artist.index'), [
            'X-Inertia' => 'true',
            'X-Inertia-Version' => $initialResponse->viewData('page')['version'],
        ]);

        $response->assertOk()
            ->assertHeader('X-Inertia', 'true')
            ->assertJsonPath('component', 'Artists/Index')
            ->assertJsonPath('props.artists', []);
    }

    public function test_old_react_demo_redirects_to_the_artist_list(): void
    {
        $this->get('/react')->assertRedirect('/artist');
    }
}
