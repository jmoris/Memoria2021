<?php

namespace App\Http\Controllers;

use App\Models\Institucion;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InstitucionController extends Controller
{
    public function showAll(){
        return Institucion::all();
    }

    public function show($id){
        return Institucion::find($id);
    }

    public function assignUser(Request $request, $id){
        try{
            $validador = Validator::make($request->all(), [
                'user_id' => 'required|exists:users,id',
                'role_id' => 'required|exists:roles,id'
            ]);

            if($validador->fails()){
                return response()->json([
                    'status' => 500,
                    'message' => 'No se pudo validar los parametros',
                    'error' => $validador->errors()
                ]);
            }

            $user = User::findOrFail($request->user_id);
            $user->instituciones()->sync([$id => ['role_id' => $request->role_id]], false);
            return response()->json([
                'status' => 200,
                'message' => 'El usuario fue asignado correctamente.'
            ]);
        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'message' => 'Error al asignar un usuario a la institucion.',
                'error' => $ex,
            ]);
        }
    }

    public function create(Request $request){
        try{
            $validador = Validator::make($request->all(), [
                'nombre' => 'required',
                'razon_social' => 'required',
            ]);

            if($validador->fails()){
                return response()->json([
                    'status' => 500,
                    'message' => 'No se pudo validar los parametros',
                    'error' => $validador->errors()
                ]);
            }

            $institucion = new Institucion();
            $institucion->nombre = $request->nombre;
            $institucion->razon_social = $request->razon_social;
            $institucion->save();

            $user = auth()->user();
            $user->instituciones()->sync([$user->id => ['role_id' => $request->role_id]], false);

            return response()->json([
                'status' => 201,
                'message' => 'Institucion creada correctamente'
            ]);
        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'message' => 'Error al crear institucion',
                'error' => $ex,
            ]);
        }
    }

    public function update(Request $request, $id){
        try{
            $validador = Validator::make($request->all(), [
                'nombre' => 'required',
                'razon_social' => 'required',
            ]);

            if($validador->fails()){
                return response()->json([
                    'status' => 500,
                    'message' => 'No se pudo validar los parametros',
                    'error' => $validador->errors()
                ]);
            }

            $institucion = Institucion::findOrFail($id);
            $institucion->nombre = $request->nombre;
            $institucion->razon_social = $request->razon_social;
            $institucion->save();

            return response()->json([
                'status' => 201,
                'message' => 'Institucion modificada correctamente'
            ]);
        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'message' => 'Error al modificar institucion',
                'error' => $ex,
            ]);
        }
    }

    public function delete($id){
        try{
            $institucion = Institucion::findOrFail($id);
            $institucion->delete();
        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'message' => 'Error al eliminar institucion',
                'error' => $ex,
            ]);
        }
    }
}
