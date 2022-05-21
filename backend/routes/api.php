<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InstitucionController;
use App\Http\Controllers\ProyectoController;
use App\Http\Controllers\RepositorioController;
use App\Http\Controllers\UsuarioController;
use App\Models\Repositorio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::get('instituciones', [InstitucionController::class, 'showAll']);

// Se protejen las rutas de acceso sin token
Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('dashboard', [DashboardController::class, 'getDashboardInfo']);
    // RUTAS USUARIOS
    Route::get('usuarios', [UsuarioController::class, 'showAll']);
    Route::get('usuarios/{id}', [UsuarioController::class, 'show']);
    Route::post('usuarios', [UsuarioController::class, 'create']);
    Route::put('usuarios/{id}', [UsuarioController::class, 'update']);
    Route::post('usuarios/{id}/disable', [UsuarioController::class, 'delete']);
    Route::post('usuarios/uploadfile', [UsuarioController::class, 'uploadFile']);

    Route::get('profesores', [UsuarioController::class, 'showProfesores']);
    Route::get('estudiantes', [UsuarioController::class, 'showEstudiantes']);
    Route::get('testgh', [UsuarioController::class, 'testGithub']);
    // RUTAS INSTITUCIONES
    Route::get('instituciones/{id}', [InstitucionController::class, 'show']);
    Route::post('instituciones', [InstitucionController::class, 'create']);
    Route::put('instituciones/{id}', [InstitucionController::class, 'update']);
    Route::delete('instituciones/{id}', [InstitucionController::class, 'delete']);
    Route::post('instituciones/{id}/asignar', [InstitucionController::class, 'assignUser']);
    // RUTAS CURSOS
    Route::get('cursos', [CursoController::class, 'showAll']);
    Route::get('cursos/{id}', [CursoController::class, 'show']);
    Route::post('cursos', [CursoController::class, 'create']);
    Route::put('cursos/{id}', [CursoController::class, 'update']);
    Route::delete('cursos/{id}', [CursoController::class, 'delete']);
    Route::post('cursos/{id}/asignar', [CursoController::class, 'assignUser']);
    Route::get('cursos/listar/{id}', [CursoController::class, 'userList']);
    Route::post('cursos/uploadfile/{id}', [CursoController::class, 'uploadFile']);
    // RUTAS PROYECTOS
    Route::get('proyectos', [ProyectoController::class, 'showAll']);
    Route::get('proyectos/{id}', [ProyectoController::class, 'show']);
    Route::post('proyectos', [ProyectoController::class, 'create']);
    Route::put('proyectos/{id}', [ProyectoController::class, 'update']);
    Route::delete('proyectos/{id}', [ProyectoController::class, 'delete']);
    Route::post('proyectos/terminar', [ProyectoController::class, 'endProject']);
    Route::get('proyectos/listar/{id}', [ProyectoController::class, 'userList']);
    Route::get('proyectos/colaboradores/{id}', [ProyectoController::class, 'colaboradoresList']);
    Route::post('proyectos/{id}/asignar', [ProyectoController::class, 'assignUser']);
    Route::post('proyectos/{id}/enlazar', [ProyectoController::class, 'attachUserToProject']);
    Route::post('proyectos/{id}/desenlazar', [ProyectoController::class, 'dettachUserFromProject']);
    Route::get('proyectos/reportes/repositorio', [ProyectoController::class, 'printReport']);
    Route::get('proyectos/reportes/usuario', [ProyectoController::class, 'printUserReport']);
    Route::get('proyectos/reportes/actividad', [ProyectoController::class, 'getUserActivity']);
    // RUTAS REPOSITORIOS
    Route::get('repositorios', [RepositorioController::class, 'showAll']);
    Route::get('repositorios/{id}', [RepositorioController::class, 'show']);
    Route::post('repositorios', [RepositorioController::class, 'create']);
    Route::put('repositorios/{id}', [RepositorioController::class, 'update']);
    Route::delete('repositorios/{id}', [RepositorioController::class, 'delete']);
    Route::get('repositorios/reportes/kloc', [RepositorioController::class, 'getKlocReport']);
    Route::get('repositorios/reportes/maat', [RepositorioController::class, 'getMaatReport']);
    Route::get('repositorios/reportes/complexity', [RepositorioController::class, 'getComplexityAnalysis']);
    Route::get('repositorios/reportes/rangecomplexity', [RepositorioController::class, 'getFileRangeComplexityAnalysis']);
    Route::get('repositorio/branches', [RepositorioController::class, 'getBranchesInfo']);
    Route::get('repositorio/wiki', [RepositorioController::class, 'getMDFiles']);
    Route::get('repositorio/wiki/fichero', [RepositorioController::class, 'getMDFile']);
    Route::get('repositorio/tableros', [RepositorioController::class, 'getTableros']);
    Route::get('repositorio/tablero', [RepositorioController::class, 'getTablero']);
    Route::get('repositorio/actividad', [RepositorioController::class, 'getUserActivity']);
    Route::get('repositorio/branchcommits', [RepositorioController::class, 'getBranchCommits']);

    Route::get('git/repositorios', [RepositorioController::class, 'getRepositorios']);
    Route::get('git/inforepo', [RepositorioController::class, 'getInfoRepo']);
    Route::get('git/infoproyecto', [RepositorioController::class, 'getInfoProyecto']);
    Route::get('git/analisis', [RepositorioController::class, 'getAnalyticsReports']);
    Route::get('repositorio', [RepositorioController::class, 'getRepositorios']);

});

