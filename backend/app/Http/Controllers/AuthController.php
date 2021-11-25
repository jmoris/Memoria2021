<?php

namespace App\Http\Controllers;

use App\Models\Institucion;
use App\Models\Role;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request){
        try {
            $request->validate([
                'institucion' => 'required|integer',
                'email' => 'email|required',
                'password' => 'required'
            ]);
            $credentials = request(['email', 'password']);
            if (!Auth::attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ]);
            }

            $user = User::where('email', $request->email)->first();
            if($user->active){
                if ( ! Hash::check($request->password, $user->password, [])) {
                    throw new \Exception('Error in Login');
                }
                $rolePivot = $user->instituciones()->withPivot('role_id')->find($request->institucion);
                $role = Role::find($rolePivot->pivot->role_id);
                $tokenResult = $user->createToken('authToken')->plainTextToken;
                return response()->json([
                    'success' => true,
                    'token' => $tokenResult,
                    'user' => $user,
                    'role' => $role->name,
                    'institucion' => $request->institucion,
                    'token_type' => 'Bearer',
                ]);
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Usuario desactivado',
                ]);
            }
        } catch (Exception $error) {
            return response()->json([
                'success' => false,
                'message' => 'Error in Login',
                'error' => $error,
            ]);
        }
    }

    public function register(Request $request){
        try{
            $validador = Validator::make($request->all(), [
                'name' => 'required',
                'email' => 'required',
                'password' => 'required'
            ]);

            if($validador->fails()){
                return response()->json([
                    'success' => false,
                    'message' => 'No se pudo validar los parametros',
                    'error' => $validador->errors()
                ]);
            }

            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->save();

            return response()->json([
                'status' => 201,
                'message' => 'Usuario guardado correctamente'
            ]);
        }catch(Exception $ex){
            return response()->json([
                'success' => false,
                'message' => 'Error al registrar usuario',
                'error' => $ex,
            ]);
        }

    }
}
