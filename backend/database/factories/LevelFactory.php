<?php

namespace Database\Factories;

use App\Models\Level;
use Illuminate\Database\Eloquent\Factories\Factory;

class LevelFactory extends Factory
{
    protected $model = Level::class;

    public function definition()
    {
        return [
            'nivel' => $this->faker->word, // Gerando um nome aleatório para o nível
        ];
    }
}
