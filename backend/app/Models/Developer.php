<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Developer extends Model
{

    protected $fillable = [
        'nome',
        'sexo',
        'data_nascimento',
        'hobby',
        'nivel_id',
    ];

    protected $table = 'desenvolvedores';

    protected $hidden = ['nivel_id','created_at', 'updated_at'];
    protected $appends = ['idade'];

    public function nivel()
    {
        return $this->belongsTo(Level::class, 'nivel_id', 'id');
    }

    protected function getIdadeAttribute()
    {
        return Carbon::parse($this->data_nascimento)->age; // Calcula a idade com base na data de nascimento
    }
}