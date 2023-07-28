<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Institucion;
use App\Models\Proyecto;
use App\Models\Role;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Reader\Xls\RC4;

class CursoController extends Controller
{
    public function showAll(Request $request){
        $user = auth()->user();
        $institucion = Institucion::findOrFail($request->institucion);
        $rol = $institucion->usuarios()->wherePivot('user_id', $user->id)->first()->pivot->role_id;
        $rol = Role::findOrFail($rol)->name;
        if($rol == 'Administrador'||$rol == 'Superadministrador'){
            return Curso::where('institucion_id', $request->institucion)->where('estado', $request->estado)->get();
        }
        return $user->cursosAsignados()->where('estado', $request->estado)->get();
    }

    public function show($id){
        return Curso::with('usuarios')->with('profesor')->where('id', $id)->get();
    }

    public function userList(Request $request, $id){
        $curso = Curso::find($id);
        if($curso!=null){
            $usuarios = $curso->usuarios;
           //$lista = Institucion::find($request->institucion)->usuarios()->whereIn('id', $usuarios)->get();
            return response()->json($usuarios);
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
                'perfil' => 'required'
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
            $curso->usuarios()->sync([$request->user_id => ['perfil' => $request->perfil]], false);
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
                'students' => 'array'
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
            $curso->estado = 0;
            $curso->save();
        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'message' => 'Error al eliminar curso',
                'error' => $ex,
            ]);
        }
    }

    public function recovery($id){
        try{
            $curso = Curso::findOrFail($id);
            $curso->estado = 1;
            $curso->save();
        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'message' => 'Error al recuperar curso',
                'error' => $ex,
            ]);
        }
    }

    function uploadFile(Request $request, $id){
        $this->validate($request, [
        'file'  => 'required|mimes:xls,xlsx'
        ]);

        $curso = Curso::find($id);
        try{

        $path = $request->file('file')->getRealPath();

        $spreadsheet = IOFactory::load($path);

        $cellNombre = $email = $spreadsheet->getActiveSheet()->getCell('A1')->getValue();
        $cellApellido = $email = $spreadsheet->getActiveSheet()->getCell('B1')->getValue();
        $cellEmail = $email = $spreadsheet->getActiveSheet()->getCell('D1')->getValue();
        if($cellNombre!='Nombre'&&$cellApellido!='Apellido(s)'&&$cellEmail!='Dirección de correo')
            return response()->json([
                'success' => false,
                'msg' => 'El formato del archivo es incorrecto.'
            ]);
        $lectura = true;
        $contador = 2;
        $cargados = 0;
        $errores = [
            'inexistentes' => [],
            'existentes' => []
        ];

        while($lectura){
            $nombre = $spreadsheet->getActiveSheet()->getCell('A'.$contador)->getValue();
            $apellido = $spreadsheet->getActiveSheet()->getCell('B'.$contador)->getValue();
            $email = $spreadsheet->getActiveSheet()->getCell('D'.$contador)->getValue();
            if($email==''||$email==null){
                $lectura = false;
                break;
            }
            $user = User::where('email', $email)->first();
            if($user==null){
                $errores['inexistentes'][] = (string)$email;
                $usuario = new User();
                $usuario->name = $nombre;
                $usuario->lastname = $apellido;
                $usuario->email = (string)$email;
                $usuario->rut = "1-9";
                $usuario->save();
                $usuario->instituciones()->attach($request->institucion, ['role_id' => 4]);

                $curso->usuarios()->sync($usuario, false);

                $fields = [
                    'name' => $nombre,
                    'lastname' => $apellido,
                    'email' => $email,
                    'password' => explode('@', $email)[0],
                    'role' => 2
                ];
                $fields_string = http_build_query($fields);
                $access_token = Cache::get('access_token_'.Auth::user()->id);
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, "http://sso.ghtracker.site/api/usuarios");
                curl_setopt($ch, CURLOPT_POST, 1);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_HTTPHEADER, [
                    'Authorization: Bearer '.$access_token,
                    'Accept: application/json'
                ]);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string );
                $data = curl_exec($ch);
                curl_close($ch);

            }else{
                $exists = $user->cursos->contains($id);
                if($exists){
                    $errores['existentes'][] = (string)$email;
                }else{
                    $curso->usuarios()->sync($user, false);
                    $cargados++;
                }
            }
            $contador++;
        }

        $access_token = Cache::get('access_token_'.Auth::user()->id);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "http://sso.ghtracker.site/api/usuarios/cargamasiva");
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/x-www-form-urlencoded',
            'Authorization: Bearer '.$access_token,
            'Accept: application/json'
        ]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, '@'.$path );
        $data = curl_exec($ch);
        curl_close($ch);

        return response()->json([
            'success' => true,
            'msg' => "Carga masiva de usuarios finalizada.",
            'stats' => [
                'cargados' => $cargados,
                'fallidos' => [
                    'inexistentes' => [
                        'cantidad' => count($errores['inexistentes']),
                        'detalle' => $errores['inexistentes']
                    ],
                    'existentes' => [
                        'cantidad' => count($errores['existentes']),
                        'detalle' => $errores['existentes']
                    ]
                ],
            ]
        ]);
        }catch(Exception $ex){
            return response()->json([
                'success' => false,
                'msg' => "Carga masiva de usuarios fallida.",
                'error' => $ex->getMessage()
            ]);
        }
    }

}
