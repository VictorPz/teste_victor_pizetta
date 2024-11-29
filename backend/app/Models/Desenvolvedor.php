<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Desenvolvedor extends Model
{

    protected $fillable = [
        'nome',
        'sexo',
        'data_nascimento',
        'hobby',
        'nivel_id',
    ];

    protected $table = 'desenvolvedores';

    protected $hidden = ['id', 'nivel_id'];

    public function nivel()
    {
        return $this->belongsTo(Nivel::class, 'nivel_id', 'id');
    }
}