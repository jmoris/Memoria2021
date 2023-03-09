<?php

namespace Database\Seeders;

use App\Models\Curso;
use App\Models\Institucion;
use App\Models\Proyecto;
use App\Models\Repositorio;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        $rol = new Role();
        $rol->name = "Superadministrador";
        $rol->save();
        $rol = new Role();
        $rol->name = "Administrador";
        $rol->save();
        $rol = new Role();
        $rol->name = "Profesor";
        $rol->save();
        $rol = new Role();
        $rol->name = "Alumno";
        $rol->save();

        $institucion = new Institucion();
        $institucion->nombre = "UTALCA";
        $institucion->razon_social = "Universidad de Talca";
        $institucion->save();
    }
}
