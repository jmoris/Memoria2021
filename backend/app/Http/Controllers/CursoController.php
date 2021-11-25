<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Institucion;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CursoController extends Controller
{
    public function showAll(){
        return Curso::with('usuarios')->with('profesor')->get();
    }

    public function show($id){
        return Curso::with('usuarios')->with('profesor')->where('id', $id)->get();
    }

    public function userList(Request $request, $id){
        $curso = Curso::find($id);
        if($curso!=null){
            $usuarios = $curso->usuarios()->pluck('id');
            $lista = Institucion::find($request->institucion)->usuarios()->whereIn('id', $usuarios)->get();
            return response()->json($lista);
        }else{
            return response()->json([
                'msg' => 'El curso no existe'
            ], 500);
        }
    }

    public function assignUser(Request $request, $id){
        try{
            $validador = Validator::make($request->all(), [
                'user_id' => 'required|exists:users,id',
            ]);

            if($validador->fails()){
                return response()->json([
                    'status' => 500,
                    'message' => 'No se pudo validar los parametros',
                    'error' => $validador->errors()
                ]);
            }

            $user = User::findOrFail($request->user_id);
            $curso = Curso::findOrFail($id);
            $curso->usuarios()->sync($user, false);
            return response()->json([
                'status' => 200,
                'message' => 'El usuario fue asignado correctamente.'
            ]);
        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'message' => 'Error al asignar un usuario al curso',
                'error' => $ex,
            ]);
        }
    }

    public function create(Request $request){
        try{
            $validador = Validator::make($request->all(), [
                'name' => 'required',
                'semester' => 'required',
                'year' => 'required',
                'teacher_id' => 'required',
                'institucion' => 'required|exists:institucions,id',
                'students' => 'array|required'
            ]);

            if($validador->fails()){
                return response()->json([
                    'status' => 500,
                    'message' => 'No se pudo validar los parametros',
                    'error' => $validador->errors()
                ]);
            }

            $curso = new Curso();
            $curso->nombre = $request->name;
            $curso->semestre = $request->semester;
            $curso->ano = $request->year;
            $curso->teacher_id = $request->teacher_id;
            $curso->institucion_id = $request->institucion;
            $curso->save();

            foreach($request->students as $student){
                $user = User::findOrFail($student['user_id']);
                $curso->usuarios()->sync($user);
            }

            return response()->json([
                'status' => 201,
                'message' => 'Curso creada correctamente'
            ]);
        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'message' => 'Error al crear curso',
                'error' => $ex,
            ]);
        }
    }

    public function update(Request $request, $id){
        try{
            $validador = Validator::make($request->all(), [
                'nombre' => 'required',
                'semestre' => 'required',
                'ano' => 'required',
                'teacher_id' => 'required',
                'institucion' => 'required|exists:institucions,id'
            ]);

            if($validador->fails()){
                return response()->json([
                    'status' => 500,
                    'message' => 'No se pudo validar los parametros',
                    'error' => $validador->errors()
                ]);
            }

            $curso = Curso::findOrFail($id);
            $curso->nombre = $request->nombre;
            $curso->semestre = $request->semestre;
            $curso->ano = $request->ano;
            $curso->teacher_id = $request->teacher_id;
            $curso->institucion_id = $request->institucion;
            $curso->save();

            return response()->json([
                'status' => 201,
                'message' => 'Curso modificada correctamente'
            ]);
        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'message' => 'Error al modificar curso',
                'error' => $ex,
            ]);
        }
    }

    public function delete($id){
        try{
            $curso = Curso::findOrFail($id);
            $curso->delete();
        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'message' => 'Error al eliminar curso',
                'error' => $ex,
            ]);
        }
    }
}
