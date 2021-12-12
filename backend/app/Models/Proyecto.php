<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proyecto extends Model
{
    use HasFactory;

    public function curso(){
        return $this->hasOne(Curso::class, 'id', 'curso_id');
    }

    public function repositorio(){
        return $this->hasOne(Repositorio::class, 'id', 'repositorio_id');
    }

    /**
     * Relacion con institucion
     */
    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'proyecto_user', 'proyecto_id', 'user_id');
    }

    public function colaboradores()
    {
        return $this->belongsToMany(User::class, 'proyecto_colaborador', 'proyecto_id', 'user_id');
    }
}
