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

    public function test_update_saves_both_names_and_redirects_to_the_artist(): void
    {
        $artist = Artist::create(['firstname' => 'Elena', 'lastname' => 'Perez']);
        $other = Artist::create(['firstname' => 'Alex', 'lastname' => 'Jones']);

        $response = $this->put(route('artist.update', $artist->id), ['firstname' => 'Maria', 'lastname' => 'Garcia']);

        $response->assertRedirect(route('artist.show', $artist->id));
        $this->assertDatabaseHas('artists', ['id' => $artist->id, 'firstname' => 'Maria', 'lastname' => 'Garcia']);
        $this->assertDatabaseHas('artists', ['id' => $other->id, 'firstname' => 'Alex', 'lastname' => 'Jones']);
    }

    public function test_update_rejects_missing_names_without_changing_the_artist(): void
    {
        $artist = Artist::create(['firstname' => 'Elena', 'lastname' => 'Perez']);

        $response = $this->from(route('artist.show', $artist->id))->put(route('artist.update', $artist->id), []);

        $response->assertRedirect(route('artist.show', $artist->id))->assertSessionHasErrors(['firstname' => 'The firstname field is required.', 'lastname' => 'The lastname field is required.']);
        $this->assertDatabaseHas('artists', ['id' => $artist->id, 'firstname' => 'Elena', 'lastname' => 'Perez']);
    }

    #[\PHPUnit\Framework\Attributes\TestWith([123, 456, 'must be a string.'])]
    #[\PHPUnit\Framework\Attributes\TestWith(['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', 'must not be greater than 60 characters.'])]
    public function test_update_rejects_invalid_names_without_saving(mixed $firstname, mixed $lastname, string $message): void
    {
        $artist = Artist::create(['firstname' => 'Elena', 'lastname' => 'Perez']);

        $response = $this->put(route('artist.update', $artist->id), ['firstname' => $firstname, 'lastname' => $lastname]);

        $response->assertSessionHasErrors(['firstname' => "The firstname field {$message}", 'lastname' => "The lastname field {$message}"]);
        $this->assertDatabaseHas('artists', ['id' => $artist->id, 'firstname' => 'Elena', 'lastname' => 'Perez']);
    }

    public function test_update_returns_not_found_for_a_missing_artist(): void
    {
        $this->put(route('artist.update', 999), ['firstname' => 'Maria', 'lastname' => 'Garcia'])->assertNotFound();
        $this->assertDatabaseCount('artists', 0);
    }
}
