<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Institucion;
use App\Models\Proyecto;
use App\Models\Repositorio;
use App\Models\Role;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use stdClass;

class ProyectoController extends Controller
{
    public function showAll(Request $request){
        // Dependiendo del ROL debera mostrar distintos proyectos, por ej, si es profesor podra ver todos lso proyectos de alumnos
        // si es alumno podra ver solo los proyectos en los que estr asociado, si es admin, podra verlos todos
        $institucion = Institucion::findOrFail($request->institucion);
        $user = auth()->user();
        $rol = $institucion->usuarios()->wherePivot('user_id', $user->id)->first()->pivot->role_id;
        $rol = Role::findOrFail($rol)->name;
        if($rol == 'Superadministrador'){
            $proyectos_arr = [];
            $proyectos = Proyecto::with('curso')->get();
            foreach($proyectos as $proy){
                $profesor = Curso::find($proy->curso_id)->profesor;
                $proy->profesor = $profesor;
                array_push($proyectos_arr, $proy);
            }
            return $proyectos_arr;
        }else if($rol == 'Administrador'){
            $cursos = Curso::where('institucion_id', $request->institucion)->get();
            $nproyectos = 0;
            $proyectos = [];
            foreach($cursos as $curso){
                $dproyectos = $curso->proyectos()->with('curso')->get();
                foreach($dproyectos as $proy){
                    $profesor = Curso::find($proy->curso_id)->profesor;
                    $proy->profesor = $profesor;
                    array_push($proyectos, $proy);
                }
                $nproyectos += $curso->proyectos()->count();
            }
            return $proyectos;
        }else if($rol == 'Profesor'){
            return [];
        }else if($rol == 'Alumno'){
            $proyectos = [];
            $dproyectos = $user->proyectos()->with('curso')->get();
            foreach($dproyectos as $proy){
                $profesor = Curso::find($proy->curso_id)->profesor;
                $proy->profesor = $profesor;
                array_push($proyectos, $proy);
            }
            return $proyectos;
        }
    }

    public function show($id){
        // Dependiendo del rol podra ver los proyectos, dependiendo si esta asignado o no
        return Proyecto::where('id', $id)->with('repositorio')->with('usuarios')->first();
    }

    public function userList(Request $request, $id){
        $proyecto = Proyecto::find($id);
        if($proyecto!=null){
            $usuarios = $proyecto->usuarios()->pluck('id');
            $lista = Institucion::find($request->institucion)->usuarios()->whereIn('id', $usuarios)->get();
            return response()->json($lista);
        }else{
            return response()->json([
                'msg' => 'El proyecto no existe'
            ], 500);
        }
    }

    public function colaboradoresList(Request $request, $id){
        $proyecto = Proyecto::find($id);
        if($proyecto!=null){
            $usuarios = $proyecto->colaboradores()->withPivot('gh_user')->get();
            return response()->json($usuarios);
        }else{
            return response()->json([
                'msg' => 'El proyecto no existe'
            ], 500);
        }
    }


    private function getMaatReport($project_id){
        try{
            $fila = 1;
            $data = [];
            $project = Proyecto::findOrFail($project_id);
            $repositorio = Repositorio::find($project->repositorio_id);
            if (($gestor = fopen(public_path($project_id.'_'.$project->repositorio_id.'_hib_freqs.csv'), "r")) !== FALSE) {
                while (($datos = fgetcsv($gestor, 1000, ",")) !== FALSE) {
                    $numero = count($datos);
                    //echo "<p> $numero de campos en la línea $fila: <br /></p>\n";
                    $fila++;
                    $obj = new stdClass();
                    if($datos[0] == 'entity' || $datos[1] == 'n-revs'){
                        continue;
                    }
                    for ($c=0; $c < $numero; $c++) {
                        $col[$c] = $datos[$c];
                        if($c == 0)
                            $obj->entity = $datos[$c];
                        else
                            $obj->nrevs = $datos[$c];
                    }
                    array_push($data, $obj);
                }
                fclose($gestor);
            }
        }catch(Exception $ex){
            return [];
        }
        return $data;
    }

    private function getKlocReport($project_id){
        try{
            $fila = 1;
            $data = [];
            $resumen = [];
            $project = Proyecto::findOrFail($project_id);
            $repositorio = Repositorio::find($project->repositorio_id);
            if (($gestor = fopen(public_path($project_id.'_'.$project->repositorio_id.'_hib_lines.csv'), "r")) !== FALSE) {
                while (($datos = fgetcsv($gestor, 1000, ",")) !== FALSE) {
                    $numero = count($datos);
                    //echo "<p> $numero de campos en la línea $fila: <br /></p>\n";
                    $fila++;
                    $obj = new stdClass();
                    if($datos[0] == 'language' || $datos[1] == 'filename'){
                        continue;
                    }
                    if($datos[0] == 'SUM'){
                        $resumen = [
                            'blank' => $datos[2],
                            'comment' => $datos[3],
                            'code' => $datos[4]
                        ];
                    }else{
                        $obj->language = $datos[0];
                        $obj->file = $datos[1];
                        $obj->blank = $datos[2];
                        $obj->comment = $datos[3];
                        $obj->code = $datos[4];
                        array_push($data, $obj);
                    }
                }
                fclose($gestor);
            }
        }catch(Exception $ex){
            return [];
        }
        return ['resumen' => $resumen, 'data' => $data];
    }

    private function getFileRangeComplexityAnalysis($project_id, $entity, $desde){
        try{
            $project = Proyecto::findOrFail($project_id);

            $repositorio = Repositorio::find($project->repositorio_id);
            $nombre = explode('/', $repositorio->nombre);
            $path = public_path();
            $path = str_replace(' ', '\ ', $path);
            $path_project = $path.'/'.$nombre[1];
            /** AQUI BUSCAR COMO OBTENER LOS HASH SEGUN FECHA */

            $file = file_get_contents(public_path($project_id.'_'.$project->repositorio_id.'_testLS2.log'));
            $lines = explode(PHP_EOL, $file);
            $commits = [];
            foreach($lines as $line){
                if(str_starts_with($line, '[')){
                    preg_match("/\d{4}-\d{2}-\d{2}/", $line, $match, PREG_OFFSET_CAPTURE);
                    $index = $match[0][1];
                    $msg = substr($line, $index+11, strlen($line)-1);
                    preg_match('/\[(.*?)\]/', $line, $matches); // Outputs 1
                    array_push($commits, [
                        'sha' => $matches[1],
                        'fecha' => $match[0][0],
                        'mensaje' => $msg
                    ]);
                }
            }
            $rangeEnd = strtotime('today');
            $rangeStart = strtotime($desde);
            $filtered = array_filter($commits, function($e) use ($rangeEnd, $rangeStart){
                $utime = strtotime($e['fecha']);
                return $utime <= $rangeEnd && $utime >= $rangeStart;
            });
            $filtered = array_values($filtered);
            if(empty($filtered)){
                return response()->json([ 'x' => [], 'y' => [] ]);
            }
            $start_sha = $filtered[0]['sha'];
            $end_sha = $filtered[count($filtered)-1]['sha'];
            $str = 'cd '.$path_project.' && python2.7 ../scripts/git_complexity_trend.py --end '.$start_sha.' --start '.$end_sha.' --file '.$entity;
            $res = shell_exec($str);
            $lines = explode(PHP_EOL, $res);
            $data = [
                'x' => [],
                'y' => []
            ];
            for($i = 1; $i < count($lines)-1; $i++){
                $values = explode(',', $lines[$i]);
                array_push($data['x'], $i);
                array_push($data['y'], $values[1]);
            }
            return $data;
        }catch(Exception $ex){
            return $ex;
        }

    }

    public function getUserActivity(Request $request){
        try{
            $user = auth()->user();
            $api = new \SolucionTotal\APIGit\API($user->gh_user,$user->gh_token);

            $project = Proyecto::findOrFail($request->project_id);
            $collabs = $project->colaboradores()->where('user_id', $request->user)->withPivot('gh_user')->get();
            $repositorio = Repositorio::find($project->repositorio_id);
            $nombre = explode('/', $repositorio->nombre);
            $stats = $api->getStats($nombre[0], $nombre[1], 'contributors');
            $desde = strtotime($request->from_date);
            $hasta = strtotime($request->to_date);
            $data = [];
                $data = [
                    'unix_weeks' => [],
                    'weeks' => [],
                    'additions' => [],
                    'deletions' => [],
                    'commits' => []
                ];
                foreach($stats as $stat){
                    if($stat->author->login == $request->gh_user){
                        foreach($stat->weeks as $info){
                            if($info->w >= $desde && $info->w <= $hasta){
                                array_push($data['unix_weeks'], $info->w);
                                array_push($data['weeks'], date('d/m/Y', $info->w));
                                array_push($data['additions'], $info->a);
                                array_push($data['deletions'], $info->d);
                                array_push($data['commits'], $info->c);
                            }else{
                                break;
                            }
                        }
                        break;
                    }
                }
            return $data;
        }catch(Exception $ex){
            return $ex;
        }

    }

    public function printReport(Request $request){
        $user = $request->user();
        $api = new \SolucionTotal\APIGit\API($user->gh_user,$user->gh_token);

        $usuario = $api->getCurrentUser();

        $project = Proyecto::findOrFail($request->project_id);

        $repositorio = Repositorio::find($project->repositorio_id);
        $nombre = explode('/', $repositorio->nombre);
        $path = public_path();
        $path = str_replace(' ', '\ ', $path);

        $stats = $api->getStats($nombre[0], $nombre[1], 'contributors');
        $repo = $api->getRepo($nombre[0], $nombre[1]);
        $collab = $api->getCollaborators($nombre[0], $nombre[1]);
        $issues = $api->getIssuesCount($nombre[0], $nombre[1], 2, 1);
        $branches = $api->getBranches($nombre[0], $nombre[1]);
        $commits = $api->getCommits($nombre[0], $nombre[1]);
        $ncommits = 0;
        $arr = [];

        $ncommits = shell_exec('cd '.$path.'/'.$nombre[1].' && git rev-list HEAD --count');
        $collabs = [];
        foreach($collab as $col){
            array_push($collabs, ["name" => $col->login, "avatar" => $col->avatar_url]);
        }
        $basicas = [
            "nombre" => $nombre[1],
            "autor" => $nombre[0],
            'collabs' => $collabs,
            'issues' => $issues,
            'branches' => count($branches),
            'ncommits' => $ncommits,
            'commits' => $commits,
            'created_date' => $repo->created_at
        ];
        $maat = $this->getMaatReport($request->project_id);
        $kloc = $this->getKlocReport($request->project_id);


        $last_commit = shell_exec('cd '.$path.'/'.$nombre[1].' && git log --pretty=format:"%h;%an;%ad;%s" --date=iso -n 1');
        $last_commit = addslashes($last_commit);
        $fecha = explode(';', $last_commit);
        $data = [];
        foreach($collabs as $collab){
            $data[$collab['name']] = [
                'unix_weeks' => [],
                'weeks' => [],
                'additions' => [],
                'deletions' => [],
                'commits' => []
            ];

            foreach($stats as $stat){
                if($stat->author->login == $collab['name']){
                    foreach($stat->weeks as $info){
                        if($info->w <= strtotime($fecha[2])){
                            array_push($data[$collab['name']]['unix_weeks'], $info->w);
                            array_push($data[$collab['name']]['weeks'], date('d/m/Y', $info->w));
                            array_push($data[$collab['name']]['additions'], $info->a);
                            array_push($data[$collab['name']]['deletions'], $info->d);
                            array_push($data[$collab['name']]['commits'], $info->c);
                        }else{
                            break;
                        }
                    }
                    break;
                }
            }
        }
        $graficos = [];
        foreach($collabs as $collab){
            $grafico1 = shell_exec('cd '.$path.' && python2.7 grafico_usuario.py  \''.json_encode($data[$collab['name']]). '\'');
            $grafico2 = shell_exec('cd '.$path.' && python2.7 grafico_usuario_commits.py  \''.json_encode($data[$collab['name']]). '\'');
            $graficos[$collab['name']] = [
                'activity' => $grafico1,
                'commits' => $grafico2
            ];
        }
        $info = [];
        foreach($branches as $branch){
            if(!str_starts_with($branch->name,'dependabot')){
                $commit = $api->getCommit($nombre[0], $nombre[1], $branch->commit->sha);
                array_push($info, [
                    'name' => $branch->name,
                    'last_update' => $commit->commit->author->date,
                    'author' => $commit->commit->author->name,
                    'message' => $commit->commit->message
                ]);
            }
        }
        // graficos de los 3 entidades
        $entity1 = $this->getFileRangeComplexityAnalysis($request->project_id, $maat[0]->entity, $repo->created_at);
        $entity2 = $this->getFileRangeComplexityAnalysis($request->project_id, $maat[1]->entity, $repo->created_at);
        $entity3 = $this->getFileRangeComplexityAnalysis($request->project_id, $maat[2]->entity, $repo->created_at);
        $str = 'cd '.$path.' && python2.7 grafico.py ';
        $grafico1 = shell_exec($str.implode(',',$entity1['x']).' '.implode(',',$entity1['y']));
        $grafico2 = shell_exec($str.implode(',',$entity2['x']).' '.implode(',',$entity2['y']));
        $grafico3 = shell_exec($str.implode(',',$entity3['x']).' '.implode(',',$entity3['y']));
        $html = '<style>
        @media print {
          .pagebreak { page-break-before: always; } /* page-break-after works, as well */
        }
        .izquierda {
          text-align: left;
        }
        .centro {
          text-align: center;
        }
        .derecha {
          text-align: right;
        }
        .subtitulo {
          font-size: 18px;
        }
        table.tabla {
            border: 1px solid black;
            border-collapse: collapse;
        }
        table.tabla th {
            text-align: left;
            border: 1px solid black;
        }
        table.tabla td {
            border: 1px solid black;
        }
      </style>

      <div>
        <h2 class="centro">Reporte de proyecto</h2>
        <p class="centro subtitulo"><i>'.$basicas['nombre'].'</i></p>
        </br>
        <h3>1.- Métricas básicas</h3>
        <table>
          <tr>
            <td>Cantidad de commits:</td>
            <td>'.$basicas['ncommits'].'</td>
          </tr>
          <tr>
            <td>Cantidad de issues:</td>
            <td>'.$basicas['issues'].'</td>
          </tr>
          <tr>
            <td>Cantidad de colaboradores:</td>
            <td>'.count($basicas['collabs']).'</td>
          </tr>
          <tr>
            <td>Cantidad de branchs:</td>
            <td>'.$basicas['branches'].'</td>
          </tr>
        </table>
        <p><i>La información de métricas básicas podria variar con respecto a los graficos, debido a que la información de las métricas básicas es obtenido directamente del registro de eventos del proyecto, sin embargo, los gráficos son generadores con la información entregada por la API de Github.</i></p>';
        $html .= '<h3>2.- Colaboradores</h3>
                    <table styke="width:100%;">';
        foreach($graficos as $key => $value){
            $html .= '<tr><td>'.$key.'</td></tr>';
            $html .= '<tr><td><img src="data:image/png;base64,'.$value['activity'].'" style="width: 50%" border="0" /></td><td><img src="data:image/png;base64,'.$value['commits'].'" style="width: 50%" border="0" /></tr>';
        }
        $html .= '</table>';
        $html .= '<h3>3.- Branches</h3>
                    <table class="tabla" styke="width:100%;">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Ult. Actualización</th>
                            <th>Autor</th>
                            <th>Mensaje</th>
                        </tr>
                    </thead>
                    <tbody>
                    ';
        foreach($info as $branch){
            $html .= '<tr>';
            $html .= '<td>'.$branch['name'].'</td>';
            $html .= '<td>'.date('d/m/Y', strtotime($branch['last_update'])).'</td>';
            $html .= '<td>'.$branch['author'].'</td>';
            $html .= '<td>'.$branch['message'].'</td>';
            $html .= '<tr>';
        }
        $html .= '</tbody></table>';
        $html .= '<h3>4.- Métricas avanzadas</h3>
        <h4>Algoritmo KLOC</h4>
        <p><i>El Algoritmo KLOC procesa la carpeta del proyecto, indicandonos la cantidad total de ficheros, la cantidad de lineas en blanco que poseen estos ficheros, la cantidad de lineas comentadas y la cantidad de lineas de codigo.</i></p>
        <div class="tabla">
            <table>
            <tr>
                <td>Cantidad de archivos:</td>
                <td>'.count($kloc['data']).'</td>
            </tr>
            <tr>
                <td>Lineas en blanco:</td>
                <td>'.$kloc['resumen']['blank'].'</td>
            </tr>
            <tr>
                <td>Lineas comentadas:</td>
                <td>'.$kloc['resumen']['comment'].'</td>
            </tr>
            <tr>
                <td>Lineas de codigo:</td>
                <td>'.$kloc['resumen']['code'].'</td>
            </tr>
            </table>
        </div>
        <h4>Algoritmo MAAT</h4>
        <p><i>El Algoritmo MAAT procesa la carpeta del proyecto y la contrasta con el registro de eventos del repositorio, de esta manera, puede saber cuantas veces un fichero fue modificado durante el desarrollo del proyecto.</i></p>
        <table>
          <thead>
            <tr>
                <th>Entidad</th>
                <th>Revisiones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>'.$maat[0]->entity.'</td>
              <td>'.$maat[0]->nrevs.'</td>
            <tr/>
            <tr>
            <td>'.$maat[1]->entity.'</td>
            <td>'.$maat[1]->nrevs.'</td>
            <tr/>
            <tr>
            <td>'.$maat[2]->entity.'</td>
            <td>'.$maat[2]->nrevs.'</td>
            <tr/>
          </tbody>
        </table>
        <h4>Analisis de complejidad</h4>
        <p>Para el analisis de las entidades con mas revisiones listadas anteriormente, se utilizara el siguiente criterio:</p>
      <img src="https://i.ibb.co/jk1VtMy/Captura-de-Pantalla-2021-10-19-a-la-s-02-26-27.png" alt="Captura-de-Pantalla-2021-10-19-a-la-s-02-26-27" border="0"></a>
      <div class="pagebreak"> </div>
      <p>'.$maat[0]->entity.'</p>
      <img src="data:image/png;base64,'.$grafico1.'" style="width:50%;" alt="stvgstn5" border="0" />
      <p>'.$maat[1]->entity.'</p>
      <img src="data:image/png;base64,'.$grafico2.'" style="width:50%;" alt="c3zdghyrf" border="0" />
      <p>'.$maat[2]->entity.'</p>
      <img src="data:image/png;base64,'.$grafico3.'" style="width:50%;" alt="c3zdghyrf" border="0" />
      </div>';
      $mpdf = new \Mpdf\Mpdf();
        $mpdf->WriteHTML($html);
        $string = $mpdf->Output('filename.pdf', \Mpdf\Output\Destination::STRING_RETURN);
        return response()->json(['pdf' => base64_encode($string)]);
    }

    public function printUserReport(Request $request){
        $user = User::find($request->user);
        $api = new \SolucionTotal\APIGit\API($user->gh_user,$user->gh_token);

        $usuario = $api->getCurrentUser();

        $project = Proyecto::findOrFail($request->project_id);
        $collabs = $project->colaboradores()->where('user_id', $request->user)->withPivot('gh_user')->get();
        $repositorio = Repositorio::find($project->repositorio_id);
        $nombre = explode('/', $repositorio->nombre);
        $issues = 0;
        $commits = 0;
        $stats = $api->getStats($nombre[0], $nombre[1], 'contributors');
        $path = public_path();
        $path = str_replace(' ', '\ ', $path);
        $last_commit = shell_exec('cd '.$path.'/'.$nombre[1].' && git log --pretty=format:"%h;%an;%ad;%s" --date=iso -n 1');
        $last_commit = addslashes($last_commit);
        $fecha = explode(';', $last_commit);
        $data = [];
        foreach($collabs as $collab){
            $issues += $api->getIssuesCount($nombre[0], $nombre[1], 2, 1, $collab->pivot->gh_user);
            $data[$collab->pivot->gh_user] = [
                'unix_weeks' => [],
                'weeks' => [],
                'additions' => [],
                'deletions' => [],
                'commits' => []
            ];
            foreach($stats as $stat){
                if($stat->author->login == $collab->pivot->gh_user){
                    foreach($stat->weeks as $info){
                        if($info->w <= strtotime($fecha[2])){
                            array_push($data[$collab->pivot->gh_user]['unix_weeks'], $info->w);
                            array_push($data[$collab->pivot->gh_user]['weeks'], date('d/m/Y', $info->w));
                            array_push($data[$collab->pivot->gh_user]['additions'], $info->a);
                            array_push($data[$collab->pivot->gh_user]['deletions'], $info->d);
                            array_push($data[$collab->pivot->gh_user]['commits'], $info->c);
                            $commits += $info->c;
                        }else{
                            break;
                        }
                    }
                    break;
                }
            }
        }
        $graficos = [];
        foreach($collabs as $collab){
            $grafico1 = shell_exec('cd '.$path.' && python2.7 grafico_usuario.py  \''.json_encode($data[$collab->pivot->gh_user]). '\'');
            $grafico2 = shell_exec('cd '.$path.' && python2.7 grafico_usuario_commits.py  \''.json_encode($data[$collab->pivot->gh_user]). '\'');
            $graficos[$collab->pivot->gh_user] = [
                'activity' => $grafico1,
                'commits' => $grafico2
            ];
        }

        $html = '<style>
        @media print {
          .pagebreak { page-break-before: always; } /* page-break-after works, as well */
        }
        .izquierda {
          text-align: left;
        }
        .centro {
          text-align: center;
        }
        .derecha {
          text-align: right;
        }
        .subtitulo {
          font-size: 18px;
        }
      </style>

      <div>
        <h2 class="centro">Reporte de usuario</h2>
        <p class="centro subtitulo"><i>'.$nombre[1].'</i></p>
        <p class="centro subtitulo"><i>'.$user->name.' '.$user->lastname.'</i></p>
        </br>
        <h3>1.- Métricas básicas</h3>
        <table>
          <tr>
            <td>Cantidad de commits:</td>
            <td>'.$commits.'</td>
          </tr>
          <tr>
            <td>Cantidad de issues:</td>
            <td>'.$issues.'</td>
          </tr>
        </table>
        <p><i>La información de métricas básicas podria variar con respecto a los graficos, debido a que la información de las métricas básicas es obtenido directamente del registro de eventos del proyecto, sin embargo, los gráficos son generadores con la información entregada por la API de Github.</i></p>';
        $html .= '<h4>Colaboradores</h4>
        <table styke="width:100%;">';
        foreach($graficos as $key => $value){
        $html .= '<tr><td>'.$key.'</td></tr>';
        $html .= '<tr><td><img src="data:image/png;base64,'.$value['activity'].'" style="width: 50%" border="0" /></td><td><img src="data:image/png;base64,'.$value['commits'].'" style="width: 50%" border="0" /></tr>';
        }
        $html .= '</table>';
        $html .= '</div>';
      $mpdf = new \Mpdf\Mpdf();
        $mpdf->WriteHTML($html);
        $string = $mpdf->Output('filename.pdf', \Mpdf\Output\Destination::STRING_RETURN);

        return response()->json(['pdf' => base64_encode($string)]);
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
            $proyecto = Proyecto::findOrFail($id);
            $proyecto->usuarios()->sync($user, false);
            return response()->json([
                'status' => 200,
                'message' => 'El usuario fue asignado correctamente.'
            ]);
        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'message' => 'Error al asignar un usuario al proyecto',
                'error' => $ex,
            ]);
        }
    }

    public function dettachUserFromProject(Request $request, $id){
        try{
            $validador = Validator::make($request->all(), [
                'user_id' => 'required|exists:users,id',
                'gh_user' => 'required'
            ]);

            if($validador->fails()){
                return response()->json([
                    'status' => 500,
                    'message' => 'No se pudo validar los parametros',
                    'error' => $validador->errors()
                ]);
            }

            $user = User::findOrFail($request->user_id);
            $proyecto = Proyecto::findOrFail($id);
            $proyecto->colaboradores()->wherePivot('gh_user', $request->gh_user)->detach($user->id);
            return response()->json([
                'status' => 200,
                'message' => 'El colaborador fue eliminado correctamente.'
            ]);
        }catch(Exception $ex){
            return $ex;
            return response()->json([
                'status' => 500,
                'message' => 'Error al asignar un colaborador al proyecto',
                'error' => $ex,
            ]);
        }
    }

    public function attachUserToProject(Request $request, $id){
        try{
            $validador = Validator::make($request->all(), [
                'user_id' => 'required|exists:users,id',
                'gh_user' => 'required'
            ]);

            if($validador->fails()){
                return response()->json([
                    'status' => 500,
                    'message' => 'No se pudo validar los parametros',
                    'error' => $validador->errors()
                ]);
            }

            $user = User::findOrFail($request->user_id);
            $proyecto = Proyecto::findOrFail($id);
            $proyecto->colaboradores()->attach($user->id, ['gh_user' => $request->gh_user]);
            return response()->json([
                'status' => 200,
                'message' => 'El colaborador fue asignado correctamente.'
            ]);
        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'message' => 'Error al asignar un colaborador al proyecto',
                'error' => $ex,
            ]);
        }
    }

    public function create(Request $request){
        try{
            $validador = Validator::make($request->all(), [
                'name' => 'required',
                'course' => 'required',
                'year' => 'required',
                'semester' => 'required'
            ]);

            if($validador->fails()){
                return response()->json([
                    'success' => false,
                    'message' => 'No se pudo validar los parametros',
                    'error' => $validador->errors()
                ]);
            }

            $proyecto = new Proyecto();
            $proyecto->nombre = $request->name;
            $proyecto->estado = 0;
            $proyecto->semestre = $request->semester;
            $proyecto->ano = $request->year;
            $proyecto->curso_id = $request->course;

            $repo = new Repositorio();
            $nombre = str_replace('https://github.com/', '', $request->url);
            $repo->nombre = $nombre;
            $repo->url = $request->url;
            $repo->save();

            $proyecto->repositorio_id = $repo->id;
            $proyecto->save();

            foreach($request->students as $student){
                $user = User::findOrFail($student['user_id']);
                $proyecto->usuarios()->sync($user);
            }

            return response()->json([
                'success' => true,
                'message' => 'Proyecto creada correctamente'
            ]);
        }catch(Exception $ex){
            return response()->json([
                'success' => false,
                'message' => 'Error al crear proyecto',
                'error' => $ex,
            ]);
        }
    }

    public function update(Request $request, $id){
        try{
            $validador = Validator::make($request->all(), [
                'name' => 'required',
                'course' => 'required',
                'year' => 'required',
                'semester' => 'required'
            ]);

            if($validador->fails()){
                return response()->json([
                    'success' => false,
                    'message' => 'No se pudo validar los parametros',
                    'error' => $validador->errors()
                ]);
            }

            $proyecto = Proyecto::findOrFail($id);
            $proyecto->nombre = $request->name;
            $proyecto->estado = 0;
            $proyecto->semestre = $request->semester;
            $proyecto->ano = $request->year;
            $proyecto->curso_id = $request->course;

            $repo = Repositorio::findOrFail($proyecto->repositorio_id);
            $nombre = str_replace('https://github.com/', '', $request->url);
            $repo->nombre = $nombre;
            $repo->url = $request->url;
            $repo->save();

            $proyecto->save();

            $proyecto->usuarios()->delete();
            foreach($request->students as $student){
                $user = User::findOrFail($student['user_id']);
                $proyecto->usuarios()->sync($user);
            }

            return response()->json([
                'success' => true,
                'message' => 'Proyecto modificada correctamente'
            ]);
        }catch(Exception $ex){
            return response()->json([
                'success' => false,
                'message' => 'Error al modificar curso',
                'error' => $ex,
            ]);
        }
    }

    public function delete($id){
        try{
            $curso = Proyecto::findOrFail($id);
            $curso->delete();
        }catch(Exception $ex){
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar curso',
                'error' => $ex,
            ]);
        }
    }
}
