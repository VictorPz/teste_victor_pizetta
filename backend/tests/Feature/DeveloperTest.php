<?php

namespace Tests\Feature;

use App\Models\Developer;
use App\Models\Level;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DeveloperTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_developer()
    {
        $level = Level::factory()->create([
            'nivel' => 'Junior',
        ]);

        $developer = Developer::factory()->create([
            'nivel_id' => $level->id,
            'nome' => 'Marcos Teste',
            'sexo' => 'M',
            'data_nascimento' => '1990-05-20',
            'hobby' => 'Programação',
        ]);

        $this->assertDatabaseHas('desenvolvedores', [
            'id' => $developer->id,
            'nivel_id' => $level->id,
            'nome' => 'Marcos Teste',
            'sexo' => 'M',
            'data_nascimento' => '1990-05-20',
            'hobby' => 'Programação',
        ]);
    }

    public function test_list_developers()
    {
        $level = Level::factory()->create([
            'nivel' => 'Junior',
        ]);

        $developer1 = Developer::factory()->create([
            'nivel_id' => $level->id,
            'nome' => 'Marcos Teste 1',
            'sexo' => 'M',
            'data_nascimento' => '1990-05-20',
            'hobby' => 'Programação',
        ]);

        $developer2 = Developer::factory()->create([
            'nivel_id' => $level->id,
            'nome' => 'Marcos Teste 2',
            'sexo' => 'M',
            'data_nascimento' => '1992-07-15',
            'hobby' => 'Leitura',
        ]);

        $response = $this->getJson('/api/desenvolvedores');

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'id' => $developer1->id,
            'nivel' => [
                'id' => $level->id,
                'nivel' => 'Junior'
            ],
            'nome' => 'Marcos Teste 1',
            'sexo' => 'M',
            'data_nascimento' => '1990-05-20',
            'hobby' => 'Programação',
        ]);
        $response->assertJsonFragment([
            'id' => $developer2->id,
            'nivel' => [
                'id' => $level->id,
                'nivel' => 'Junior'
            ],
            'nome' => 'Marcos Teste 2',
            'sexo' => 'M',
            'data_nascimento' => '1992-07-15',
            'hobby' => 'Leitura',
        ]);
    }

    public function test_update_developer() {
        $level = Level::factory()->create([
            'nivel' => 'Junior',
        ]);

        $developer = Developer::factory()->create([
            'nivel_id' => $level->id,
            'nome' => 'Marcos Teste',
            'sexo' => 'M',
            'data_nascimento' => '1990-05-20',
            'hobby' => 'Programação',
        ]);

        $newLevel = Level::factory()->create([
            'nivel' => 'Pleno',
        ]);

        $response = $this->putJson('/api/desenvolvedores/' . $developer->id, [
            'nivel_id' => $newLevel->id,
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('desenvolvedores', [
            'id' => $developer->id,
            'nivel_id' => $newLevel->id,
            'nome' => 'Marcos Teste',  // Verificar se os dados não alterados permanecem iguais
            'sexo' => 'M',
            'data_nascimento' => '1990-05-20',
            'hobby' => 'Programação',
        ]);
    }

    public function test_delete_developer() {
        $level = Level::factory()->create([
            'nivel' => 'Junior',
        ]);

        $developer = Developer::factory()->create([
            'nivel_id' => $level->id,
            'nome' => 'Marcos Teste',
            'sexo' => 'M',
            'data_nascimento' => '1990-05-20',
            'hobby' => 'Programação',
        ]);

        $response = $this->deleteJson('/api/desenvolvedores/' . $developer->id);

        $response->assertStatus(200);
        $this->assertDatabaseMissing('desenvolvedores', [
            'id' => $developer->id,
        ]);
    }
}
