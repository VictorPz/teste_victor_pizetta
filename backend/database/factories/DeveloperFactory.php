<?php

namespace Database\Factories;

use App\Models\Developer;
use App\Models\Level; // Importar o modelo Level
use Illuminate\Database\Eloquent\Factories\Factory;

class DeveloperFactory extends Factory
{
    protected $model = Developer::class;

    public function definition()
    {
        return [
            'nome' => $this->faker->name,
            'sexo' => $this->faker->randomElement(['M', 'F']),
            'data_nascimento' => $this->faker->date(),
            'hobby' => $this->faker->word,
            'nivel_id' => Level::factory(), // Associando o nível com uma factory
        ];
    }
}
