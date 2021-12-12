<?php

namespace App\Models;

use CursoUser;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

     /**
     * Relacion con institucion
     */
    public function instituciones()
    {
        return $this->belongsToMany(Institucion::class, 'institucion_user', 'user_id', 'institucion_id')->withPivot('role_id');
    }

    /**
     * Relacion con institucion
     */
    public function proyectos()
    {
        return $this->belongsToMany(Proyecto::class, 'proyecto_user', 'user_id', 'proyecto_id')->withCount('usuarios');
    }

    /**
     * Relacion con institucion
     */
    public function cursos()
    {
        return $this->belongsToMany(Curso::class, 'curso_user', 'user_id', 'curso_id');
    }

    /**
     * Relacion con cursos de profesor
     */

     public function cursosAsignados(){
         return $this->hasMany(Curso::class, 'teacher_id', 'id');
     }
}
