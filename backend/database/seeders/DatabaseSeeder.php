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

        $user = new User();
        $user->name = "Jesus";
        $user->lastname = "Moris";
        $user->rut = "19587757-2";
        $user->email = "jesus@soluciontotal.cl";
        $user->password = bcrypt('Moris234');
        $user->gh_user = "jmoris";
        $user->gh_token = "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";
        $user->save();

        $user->instituciones()->attach(1, ['role_id' => 2]);

        $user = new User();
        $user->name = "Eduardo";
        $user->lastname = "Moris";
        $user->rut = "16262265-K";
        $user->email = "eduardomoris@gmail.com";
        $user->password = bcrypt('Moris234');
        $user->save();

        $user->instituciones()->attach(1, ['role_id' => 3]);

        $user = new User();
        $user->name = "Maria Jose";
        $user->lastname = "Hernandez";
        $user->rut = "13350288-2";
        $user->email = "mariajose@eagrofresco.cl";
        $user->password = bcrypt('Moris234');
        $user->save();

        $user->instituciones()->attach(1, ['role_id' => 4]);

        $curso = new Curso();
        $curso->nombre = "Taller de desarollo";
        $curso->semestre = 1;
        $curso->ano = 2021;
        $curso->teacher_id = 2;
        $curso->institucion_id = $institucion->id;
        $curso->save();

        $curso->usuarios()->sync($user);

        $proyecto = new Proyecto();
        $proyecto->nombre = "Sistema de gestion";
        $proyecto->estado = 0;
        $proyecto->semestre = 1;
        $proyecto->ano = 2021;
        $proyecto->curso_id = 1;

        $repo = new Repositorio();
        $repo->nombre = "lgsilvestre/SoftProyectAdmin_G2";
        $repo->url = "https://github.com/lgsilvestre/SoftProyectAdmin_G2";
        $repo->save();

        $proyecto->repositorio_id = $repo->id;
        $proyecto->save();

    }
}
