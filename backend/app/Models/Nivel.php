<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nivel extends Model
{
    protected $fillable = [
        'nivel',
    ];

    protected $table = 'niveis';

    // one to many - um nível pode ter muitos desenvolvedores
    public function desenvolvedores()
    {
        return $this->hasMany(Desenvolvedor::class, 'nivel_id', 'id');
    }

    // Ocultar o que for definido na resposta em json
    protected $hidden = ['id'];
}
