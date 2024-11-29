<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    protected $fillable = [
        'nivel',
    ];

    protected $table = 'niveis';
    public $timestamps = false;

    // one to many - um nível pode ter muitos desenvolvedores
    public function desenvolvedores()
    {
        return $this->hasMany(Developer::class, 'nivel_id', 'id');
    }
}
