<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Level extends Model
{
    use HasFactory;

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
