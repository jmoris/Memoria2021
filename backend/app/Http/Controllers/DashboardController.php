<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Institucion;
use App\Models\Proyecto;
use App\Models\Role;
use Exception;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getDashboardInfo(Request $request){
        $institucion = Institucion::findOrFail($request->institucion);
        $user = auth()->user();
        $rol = $institucion->usuarios()->wherePivot('user_id', $user->id)->first()->pivot->role_id;
        $rol = Role::findOrFail($rol)->name;
        if($rol == 'Superadministrador'){
            $instituciones = Institucion::all();
            $cursos = Curso::where('institucion_id', $request->institucion)->get();
            $nproyectos = 0;
            $proyectos = [];
            foreach($cursos as $curso){
                $dproyectos = $curso->proyectos()->get();
                foreach($dproyectos as $proy){
                    $profesor = Curso::find($proy->curso_id)->profesor;
                    $proy->profesor = $profesor->name . ' ' . $profesor->lastname;
                    array_push($proyectos, $proy);
                }
                $nproyectos += $curso->proyectos()->count();
            }
            return response()->json([
                'ninstituciones' => count($instituciones),
                'nusuarios' => count($institucion->usuarios),
                'ncursos' => count($cursos),
                'nproyectos' => $nproyectos,
                'proyectos' => $proyectos
            ]);
        }else if($rol == 'Administrador'){
            $cursos = Curso::where('institucion_id', $request->institucion)->get();
            $nproyectos = 0;
            $proyectos = [];
            foreach($cursos as $curso){
                $dproyectos = $curso->proyectos()->get();
                foreach($dproyectos as $proy){
                    $profesor = Curso::find($proy->curso_id)->profesor;
                    $proy->profesor = $profesor->name . ' ' . $profesor->lastname;
                    array_push($proyectos, $proy);
                }
                $nproyectos += $curso->proyectos()->count();
            }
            return response()->json([
                'nusuarios' => count($institucion->usuarios),
                'ncursos' => count($cursos),
                'nproyectos' => $nproyectos,
                'proyectos' => $proyectos
            ]);
        }else if($rol == 'Profesor'){
            $cursos = Curso::where('institucion_id', $request->institucion)->where('teacher_id', $user->id)->get();
            $cursos_actuales = Curso::where('institucion_id', $request->institucion)->where('teacher_id', $user->id)->where('ano', date('Y'))->where('semestre', ((date('m')<=6)?1:2) )->get();
            $nproyectos = 0;
            $proyectos = [];
            foreach($cursos as $curso){
                $dproyectos = $curso->proyectos()->get();
                foreach($dproyectos as $proy){
                    $profesor = Curso::find($proy->curso_id)->profesor;
                    $proy->profesor = $profesor->name . ' ' . $profesor->lastname;
                    array_push($proyectos, $proy);
                }
                $nproyectos += $curso->proyectos()->count();
            }
            return response()->json([
                'nusuarios' => count($institucion->usuarios),
                'ncursos' => count($cursos),
                'ncursos_actuales' => count($cursos_actuales),
                'nproyectos' => $nproyectos,
                'proyectos' => $proyectos
            ]);
        }else if($rol == 'Alumno'){
            $proyectos = [];
            $dproyectos = $user->proyectos()->with('curso')->get();
            foreach($dproyectos as $proy){
                $profesor = Curso::find($proy->curso_id)->profesor;
                $proy->profesor = $profesor->name . ' ' . $profesor->lastname;
                array_push($proyectos, $proy);
            }
            return response()->json([
                'nproyectos' => count($proyectos),
                'proyectos' => $proyectos
            ]);
        }
    }

}
