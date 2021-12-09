<?php

namespace App\Models;

use App\Http\Controllers\UsuarioController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    use HasFactory;

    /**
     * Usuarios de un curso, ya sean profesores, alumnos, ayudantes, etc.
     */
    public function usuarios(){
        return $this->belongsToMany(User::class, 'curso_user', 'curso_id', 'user_id');
    }

    /**
     * Usuarios de un curso, ya sean profesores, alumnos, ayudantes, etc.
     */
    public function proyectos(){
        return $this->hasMany(Proyecto::class)->withCount('usuarios');
    }

    public function profesor(){
        return $this->hasOne(User::class, 'id', 'teacher_id');
    }
}
