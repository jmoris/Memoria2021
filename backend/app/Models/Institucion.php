<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Institucion extends Model
{
    use HasFactory;
    /**
     * Relacion con institucion
     */
    public function usuarios(){
        return $this->belongsToMany(User::class, 'institucion_user', 'institucion_id', 'user_id')->withPivot('role_id');
    }

}
