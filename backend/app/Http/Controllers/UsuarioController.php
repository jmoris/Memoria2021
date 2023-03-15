<?php

namespace App\Http\Controllers;

use App\Models\Institucion;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\IOFactory;

class UsuarioController extends Controller
{
    public function showAll(Request $request){
        $usuarios = Institucion::find($request->institucion)->usuarios;
        return $usuarios;
    }

    public function show(Request $request, $id){
        $usuarios = Institucion::find($request->institucion)->usuarios()->find($id);;
        return $usuarios;
    }

    public function showProfesores(Request $request){
        $usuarios = Institucion::find($request->institucion);
        $usuarios = $usuarios->usuarios()->wherePivot('role_id', 3)->orderBy('lastname', 'desc')->get();
        return $usuarios;
    }

    public function showEstudiantes(Request $request){
        $usuarios = Institucion::find($request->institucion);
        $usuarios = $usuarios->usuarios()->wherePivot('role_id', 4)->orderBy('lastname', 'desc')->get();
        return $usuarios;
    }

    public function testGithub(){
        try {
            $user = auth()->user();
            $api = new \SolucionTotal\APIGit\API($user->gh_user,$user->gh_token);
            $api->getCurrentUser();
            return response()->json([
                'status' => 200,
                'msg' => 'Credenciales validas'
            ]);
        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'msg' => 'Credenciales invalidas'
            ]);
        }
    }

    public function create(Request $request){
        try{
            $validador = Validator::make($request->all(), [
                'name' => 'required',
                'lastname' => 'required',
                'email' => 'required|unique:users',
                'password' => '',
                'role' => 'required',
                'rut' => '',
                'matricula' => '',
                'institucion' => 'required'
            ]);

            if($validador->fails()){
                return response()->json([
                    'status' => 500,
                    'message' => 'No se pudo validar los parametros',
                    'error' => $validador->errors()
                ]);
            }

            $user = new User();
            $user->rut = $request->rut;
            $user->email = $request->email;
            $user->name = $request->name;
            $user->lastname = $request->lastname;
            $user->matricula = $request->matricula;
            $user->save();
            $user->instituciones()->attach($request->institucion, ['role_id' => $request->role]);
            return response()->json([
                'status' => 201,
                'message' => 'User creada correctamente'
            ]);
        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'message' => 'Error al crear User',
                'error' => $ex,
            ]);
        }
    }

    public function update(Request $request, $id){
        try{
            $validador = Validator::make($request->all(), [
                'name' => 'required',
                'lastname' => 'required',
                'email' => 'required',
                'password' => '',
                'role' => 'required',
                'gh_user' => '',
                'gh_token' => '',
                'rut' => '',
                'matricula' => '',
                'institucion' => 'required'
            ]);

            if($validador->fails()){
                return response()->json([
                    'status' => 500,
                    'message' => 'No se pudo validar los parametros',
                    'error' => $validador->errors()
                ]);
            }

            $user = User::findOrFail($id);
            $user->rut = $request->rut;
            $user->email = $request->email;
            $user->name = $request->name;
            $user->lastname = $request->lastname;
            $user->matricula = $request->matricula;
            if($request->gh_user != null && $request->gh_token != null){
                $user->gh_user = $request->gh_user;
                $user->gh_token = $request->gh_token;
            }
            Institucion::findOrFail($request->institucion)->usuarios()->updateExistingPivot($id, ['role_id' => $request->role]);
            if($request->password!='')
                $user->password = \bcrypt($request->password);
            $user->save();

            $role = null;
            if($request->role == 1||$request->role == 2){
                $role = 0;
            }else if($request->role == 3){
                $role = 1;
            }else if($request->role == 4){
                $role = 2;
            }
            $fields = [
                'name' => $request->name,
                'lastname' => $request->lastname,
                'email' => $request->email,
                'password' => $request->password,
                'role' => $role
            ];
            $fields_string = http_build_query($fields);
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, "http://sso.ghtracker.site/api/usuarios");
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string );
            $data = curl_exec($ch);
            curl_close($ch);
            $status = $data['status'];
            return response()->json([
                'status' => 201,
                'message' => 'User modificada correctamente',
                'remote_change' => $status
            ]);
        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'message' => 'Error al modificar User',
                'error' => $ex,
            ]);
        }
    }

    public function delete(Request $request, $id){
        try{
            $user = User::findOrFail($id);
            $user->active = $request->status;
            $user->save();
            return response()->json([
                'status' => 200,
                'message' => 'Usuario desactivado exitosamente.'
            ]);
        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'message' => 'Error al eliminar User',
                'error' => $ex,
            ]);
        }
    }

    function uploadFile(Request $request){
        $this->validate($request, [
        'file'  => 'required|mimes:xls,xlsx'
        ]);

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
                    $password = Str::random(8);
                    $usuario->password = bcrypt($password);
                    $usuario->rut = "1-9";
                    $usuario->save();
                    $usuario->instituciones()->attach($request->institucion, ['role_id' => 4]);
                    \App\Jobs\InvitarUsuario::dispatch((string)$email, ($nombre.' '.$apellido), $password)->onQueue('invitaciones');

                }else{
                    $exists = User::where('email', (string)$email)->count();
                    if($exists>0){
                        $errores['existentes'][] = (string)$email;
                    }else{
                        $cargados++;
                    }
                }
                $contador++;
            }

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
            return $ex;
            return response()->json([
                'success' => false,
                'msg' => "Carga masiva de usuarios fallida.",
                'error' => $ex->getMessage()
            ]);
        }
    }
}
