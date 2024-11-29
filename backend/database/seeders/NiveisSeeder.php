<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NiveisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('niveis')->insert([
            ['nivel' => 'Junior'],
            ['nivel' => 'Pleno'],
            ['nivel' => 'Senior'],
        ]);
    }
}
