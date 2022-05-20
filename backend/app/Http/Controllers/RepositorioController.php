<?php

namespace App\Http\Controllers;

use App\Models\Proyecto;
use App\Models\Repositorio;
use CzProject\GitPhp\GitRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use stdClass;

class RepositorioController extends Controller
{

    public function getInfoProyecto(Request $request){
        try{
            $user = $request->user();
            if($user->gh_token == ''){
                throw new Exception("El usuario no tiene token de autorizacion.");
            }
            $api = new \SolucionTotal\APIGit\API($user->gh_user,$user->gh_token);

            $usuario = $api->getCurrentUser();

            $project = Proyecto::findOrFail($request->project_id);

            $repositorio = Repositorio::find($project->repositorio_id);
            $nombre = explode('/', $repositorio->nombre);
            $repo = $api->getRepo($nombre[0], $nombre[1]);
            $collab = $api->getCollaborators($nombre[0], $nombre[1]);
            $issues = $api->getIssuesCount($nombre[0], $nombre[1], 2, 1);
            $branches = $api->getBranches($nombre[0], $nombre[1]);
            $commits = $api->getCommits($nombre[0], $nombre[1]);
            $proyectos = $api->getProjects($nombre[0], $nombre[1]);// tableros
            $ncommits = 0;
            $arr = [];
            $path = public_path();
            $path = str_replace(' ', '\ ', $path);
            $path_project = $path.'/'.$nombre[1];

            $ncommits = shell_exec('cd '.$path_project.' && sudo git rev-list HEAD --count');
            Log::info('cd '.$path_project.' && sudo git rev-list HEAD --count');
            /*foreach($stats as $stat){
                $ncommits += $stat->total;
            }*/
            $collabs = [];
            foreach($collab as $col){
                array_push($collabs, ["name" => $col->login, "avatar" => $col->avatar_url]);
            }
            $data = [
                "nombre" => $nombre[1],
                "autor" => $nombre[0],
                'collabs' => $collabs,
                'issues' => $issues,
                'branches' => count($branches),
                'ncommits' => $ncommits,
                'commits' => $commits,
                'has_wiki' => $repo->has_wiki,
                'proyectos' => count($proyectos),
                'created_date' => $repo->created_at
            ];

            return response()->json($data);
        }catch(Exception $ex){
            return $ex;
            return response()->json([
                'status' => 500,
                'msg' => $ex->getMessage()
            ]);
        }
    }

    public function getInfoRepo(Request $request){
        $user = $request->user();
        $api = new \SolucionTotal\APIGit\API($user->gh_user,$user->gh_token);

        $usuario = $api->getCurrentUser();
        $project = Proyecto::findOrFail($request->project_id);

        $repositorio = Repositorio::find($project->repositorio_id);
        $nombre = explode('/', $repositorio->nombre);
        $collab = $api->getCollaborators($nombre[0], $nombre[1]);
        return $collab;
        $data = [];
        foreach($collab as $col){
            $commits = $api->getCommits($nombre[0], $nombre[1], '', 1, $col->login);
            // ver la forma de hacer lo siguiente, si hay 100 commits, pedir la hoja 2 para agregarlos a la lista de commits y sucesivamente, tambein hacer con issues y comments para metricas basicas
            $data[$col->login] = [];
            array_push($data[$col->login], [
                'commits' => count($commits)
            ]);
        }

        return $data;
    }


    public function getFileRangeComplexityAnalysis(Request $request){
        try{
            $user = $request->user();
            $project = Proyecto::findOrFail($request->project_id);

            $repositorio = Repositorio::find($project->repositorio_id);
            $nombre = explode('/', $repositorio->nombre);
            $path = public_path();
            $path = str_replace(' ', '\ ', $path);
            $path_project = $path.'/'.$nombre[1];
            /** AQUI BUSCAR COMO OBTENER LOS HASH SEGUN FECHA */

            $file = file_get_contents(public_path($request->project_id.'_'.$project->repositorio_id.'_testLS2.log'));
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
            $rangeEnd = strtotime($request->hasta);
            $rangeStart = strtotime($request->desde);
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
            $str = 'cd '.$path_project.' && python2.7 ../scripts/git_complexity_trend.py --end '.$start_sha.' --start '.$end_sha.' --file '.$request->filename;
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
            return response()->json($data);
        }catch(Exception $ex){
            return $ex;
        }

    }

    public function getComplexityAnalysis(Request $request){
        try{
            $user = $request->user();
            $project = Proyecto::findOrFail($request->project_id);

            $repositorio = Repositorio::find($project->repositorio_id);
            $nombre = explode('/', $repositorio->nombre);
            $path = public_path();
            $path = str_replace(' ', '\ ', $path);
            $path_project = $path.'/'.$nombre[1];
            $str = 'cd '.$path.' && sudo python2.7 scripts/complexity_analysis.py '.$nombre[1].'/'.$request->filename;
            $res = shell_exec($str);
            $lines = explode(PHP_EOL, $res);
            $values = explode(',', $lines[1]);
            return response()->json([
                'n' => $values[0],
                'total' => $values[1],
                'mean' => $values[2],
                'sd' => $values[3],
                'max' => $values[4],
            ]);
        }catch(Exception $ex){
            return $ex;
        }
    }

    public function getMaatReport(Request $request){
        try{
            $fila = 1;
            $data = [];
            $project = Proyecto::findOrFail($request->project_id);
            $repositorio = Repositorio::find($project->repositorio_id);
            if (($gestor = fopen(public_path($request->project_id.'_'.$project->repositorio_id.'_hib_freqs.csv'), "r")) !== FALSE) {
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
        return response()->json($data);
    }

    public function getTableros(Request $request){
        try{
            $user = $request->user();
            $api = new \SolucionTotal\APIGit\API($user->gh_user,$user->gh_token);

            $usuario = $api->getCurrentUser();

            $project = Proyecto::findOrFail($request->project_id);

            $repositorio = Repositorio::find($project->repositorio_id);
            $nombre = explode('/', $repositorio->nombre);

            return $api->getProjects($nombre[0], $nombre[1]);
        }catch(Exception $ex){
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el tablero',
                'error' => $ex,
            ]);
        }
    }


    public function getTablero(Request $request){
        try{
            $user = $request->user();
            $api = new \SolucionTotal\APIGit\API($user->gh_user,$user->gh_token);

            $usuario = $api->getCurrentUser();

            $columnas = $api->getColumns($request->project_id);
            $tablero = [];
            $tamanos = [];
            foreach($columnas as $columna){
                $tarjetas = $api->getCards($columna->id);
                $tablero[$columna->name] = [];
                foreach($tarjetas as $tarjeta){
                    $issue = null;
                    $tamanos[$columna->name] = count($tarjetas);
                    if(isset($tarjeta->content_url)){
                        $urlParse = explode('/', str_replace('https://api.github.com/repos/', '', $tarjeta->content_url));
                        $issue = $api->getIssue($urlParse[0], $urlParse[1], $urlParse[3]);
                    }
                    array_push($tablero[$columna->name], [
                        'nota' => $tarjeta->note,
                        'autor' => $tarjeta->creator->login,
                        'issue' => ($issue!=null)?$issue->title:null,
                    ]);
                }
            }
            return $tablero;
        }catch(Exception $ex){
            return $ex;
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el tablero',
                'error' => $ex,
            ]);
        }
    }

    public function getUserActivity(Request $request){
        try{
            $user = $request->user();
            $api = new \SolucionTotal\APIGit\API($user->gh_user,$user->gh_token);

            $usuario = $api->getCurrentUser();

            $project = Proyecto::findOrFail($request->project_id);

            $repositorio = Repositorio::find($project->repositorio_id);
            $nombre = explode('/', $repositorio->nombre);

            $stats = $api->getStats($nombre[0], $nombre[1], 'contributors');
            $path = public_path();
            $path = str_replace(' ', '\ ', $path);
            $last_commit = shell_exec('cd '.$path.'/'.$nombre[1].' && git log --pretty=format:"%h;%an;%ad;%s" --date=iso -n 1');
            $last_commit = addslashes($last_commit);
            $fecha = explode(';', $last_commit);
            $data = [
                'unix_weeks' => [],
                'weeks' => [],
                'additions' => [],
                'deletions' => [],
                'commits' => []
            ];
            foreach($stats as $stat){
                if($stat->author->login == $request->user){
                    foreach($stat->weeks as $info){
                        if($info->w <= strtotime($fecha[2])){
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

            $grafico1 = shell_exec('cd '.$path.' && python2.7 grafico_usuario.py  \''.json_encode($data). '\'');
            $grafico2 = shell_exec('cd '.$path.' && python2.7 grafico_usuario_commits.py  \''.json_encode($data). '\'');
            return '<img src="data:image/png;base64,'.$grafico1.'" border="0" /><img src="data:image/png;base64,'.$grafico2.'" border="0" />';
        }catch(Exception $ex){
            return $ex;
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el tablero',
                'error' => $ex,
            ]);
        }
    }

    public function getKlocReport(Request $request){
        try{
            $fila = 1;
            $data = [];
            $resumen = [];
            $project = Proyecto::findOrFail($request->project_id);
            $repositorio = Repositorio::find($project->repositorio_id);
            if (($gestor = fopen(public_path($request->project_id.'_'.$project->repositorio_id.'_hib_lines.csv'), "r")) !== FALSE) {
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
        return response()->json(['resumen' => $resumen, 'data' => $data]);
    }

    public function getMDFiles(Request $request){
        try{
            $user = $request->user();
            $project = Proyecto::findOrFail($request->project_id);
            $repositorio = Repositorio::find($project->repositorio_id);
            $nombre = explode('/', $repositorio->nombre);
            $path = public_path().'/'.$nombre[1].'.wiki';
            //$path = str_replace(' ', '\ ', $path);
            $files = scandir($path, SCANDIR_SORT_DESCENDING);
            $files = array_diff(scandir($path), array('.', '..','.git','.DS_Store'));
            return response()->json([
                'files' => array_values($files),
                'last_update' => date("F d Y H:i:s.", filemtime($path.'/'.array_values($files)[0]))
            ]);
        }catch(Exception $ex){
            return response()->json([
                'success' => false,
                'files' => [],
                'message' => 'Error al obtener el fichero MD',
                'error' => $ex,
            ]);
        }
    }

    public function getMDFile(Request $request){
        try{
            $user = $request->user();
            $project = Proyecto::findOrFail($request->project_id);
            $repositorio = Repositorio::find($project->repositorio_id);
            $nombre = explode('/', $repositorio->nombre);
            $path = public_path().'/'.$nombre[1].'.wiki';
            //$path = str_replace(' ', '\ ', $path);
            $value = file_get_contents($path.'/'.$request->file);
            return $value;
        }catch(Exception $ex){
            return $ex;
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el fichero MD',
                'error' => $ex,
            ]);
        }
    }

    public function getAnalyticsReports(Request $request){
        try{
            $user = $request->user();
            $project = Proyecto::findOrFail($request->project_id);

            $repositorio = Repositorio::find($project->repositorio_id);
            $nombre = explode('/', $repositorio->nombre);
            $path = public_path();
            $path = str_replace(' ', '\ ', $path);

            $fileNames = [
                $request->project_id.'_'.$project->repositorio_id.'_testLS2.log',
                $request->project_id.'_'.$project->repositorio_id.'_test.log',
                $request->project_id.'_'.$project->repositorio_id.'_hib_lines.csv',
                $request->project_id.'_'.$project->repositorio_id.'_hib_freqs.csv',
                $request->project_id.'_'.$project->repositorio_id.'_Prueba.csv',
            ];

            $path_project = $path.'/'.$nombre[1];
            Log::info('PATH PROYECTO: '.$path_project);
            $repo_cli = false;
            if(!is_dir($path_project)){
                Log::info('se clona');
                // revisar script por que genera mal el log
                $str = 'cd '.$path.' && sudo git clone https://'.$user->gh_user.':'.$user->gh_token.'@github.com/'.$nombre[0].'/'.$nombre[1].'.git && cd ./'.$nombre[1].' && sudo git log --pretty=format:"[%h] %an %ad %s" --date=short --numstat --before='.date('Y-m-d').' > ../'.$fileNames[0].' && cd ../ && sudo java -jar code-maat-0.8.5-standalone.jar maat -l '.$fileNames[0].' -c git -a summary > '.$fileNames[1].' && sudo perl cloc ./'.$nombre[1].' --by-file --csv --quiet --report-file='.$fileNames[2].' && sudo java -jar code-maat-0.8.5-standalone.jar maat -l '.$fileNames[0].' -c git -a revisions > '.$fileNames[3].' && sudo python2.7 scripts/merge_comp_freqs.py '.$fileNames[3].' '.$fileNames[2].' > '.$fileNames[4];
                $res = shell_exec($str);
                shell_exec('cd '.$path_project. ' && sudo git log --graph --full-history --all --pretty=format:"[%h][%cn]%d%x20%s" > ../tree_'.$project->repositorio_id.'.txt');
                Log::info($res);
                if($res != ''){
                    $repo_cli = true;
                }
            }else{
                Log::info('se hace pull(rm dir y clone)');
                $str = 'cd '.$path.' && sudo rm -Rf '.$nombre[1].' && sudo git clone https://'.$user->gh_user.':'.$user->gh_token.'@github.com/'.$nombre[0].'/'.$nombre[1].'.git && cd ./'.$nombre[1].' && sudo git log --pretty=format:"[%h] %an %ad %s" --date=short --numstat --before='.date('Y-m-d').' > ../'.$fileNames[0].' && cd ../ && sudo java -jar code-maat-0.8.5-standalone.jar maat -l '.$fileNames[0].' -c git -a summary > '.$fileNames[1].' && sudo perl cloc ./'.$nombre[1].' --by-file --csv --quiet --report-file='.$fileNames[2].' && sudo java -jar code-maat-0.8.5-standalone.jar maat -l '.$fileNames[0].' -c git -a revisions > '.$fileNames[3].' && sudo python2.7 scripts/merge_comp_freqs.py '.$fileNames[3].' '.$fileNames[2].' > '.$fileNames[4];
                Log::info($str);
                //$str = 'cd '.$path_project.' && sudo git pull --ff-only && git log --pretty=format:"[%h] %an %ad %s" --date=short --numstat --before='.date('Y-m-d').' > ../'.$fileNames[0].' && cd ../ && java -jar code-maat-0.8.5-standalone.jar maat -l '.$fileNames[0].' -c git -a summary > '.$fileNames[1].' && perl cloc ./'.$nombre[1].' --by-file --csv --quiet --report-file='.$fileNames[2].' && java -jar code-maat-0.8.5-standalone.jar maat -l '.$fileNames[0].' -c git -a revisions > '.$fileNames[3].' && python2.7 scripts/merge_comp_freqs.py '.$fileNames[3].' '.$fileNames[2].' > '.$fileNames[4];
                $res = shell_exec($str);
                Log::info($res);
                shell_exec('cd '.$path_project. ' && sudo git log --graph --full-history --all --pretty=format:"[%h][%cn]%d%x20%s" > ../tree_'.$project->repositorio_id.'.txt');

                if($res != ''){
                    $repo_cli = true;
                }
            }
            // se clona la wiki, exista o no exista
            if(!is_dir($path.'/'.$nombre[1].'.wiki')){
                $str = 'cd '.$path.' && sudo git clone https://'.$user->gh_user.':'.$user->gh_token.'@github.com/'.$nombre[0].'/'.$nombre[1].'.wiki.git';
                $res = shell_exec($str);
            }else{
                $str = 'cd '.$path.'/'.$nombre[1].'.wiki && git pull';
                $res = shell_exec($str);
            }
            $project->touch();
/*
            if(is_dir($path)){
                $str = 'cd '.$path.' && git pull && git -c ./'.$nombre[1].' log --pretty=format:"[%h] %an %ad %s" --date=short --numstat --before='.date('Y-m-d').' > '.$fileNames[0].' && java -jar code-maat-0.8.5-standalone.jar maat -l '.$fileNames[0].' -c git -a summary > '.$fileNames[1].' && perl cloc ./'.$nombre[1].' --by-file --csv --quiet --report-file='.$fileNames[2].' && java -jar code-maat-0.8.5-standalone.jar maat -l '.$fileNames[0].' -c git -a revisions > '.$fileNames[3].' && python2.7 scripts/merge_comp_freqs.py '.$fileNames[3].' '.$fileNames[2].' > '.$fileNames[4];
                $res = shell_exec($str);
            }else{
                $str = 'cd '.$path.' && git clone https://'.$user->gh_user.':'.$user->gh_token.'@github.com/'.$nombre[0].'/'.$nombre[1].'.git && git -c ./'.$nombre[1].' log --pretty=format:"[%h] %an %ad %s" --date=short --numstat --before='.date('Y-m-d').' > '.$fileNames[0].' && java -jar code-maat-0.8.5-standalone.jar maat -l '.$fileNames[0].' -c git -a summary > '.$fileNames[1].' && perl cloc ./'.$nombre[1].' --by-file --csv --quiet --report-file='.$fileNames[2].' && java -jar code-maat-0.8.5-standalone.jar maat -l '.$fileNames[0].' -c git -a revisions > '.$fileNames[3].' && python2.7 scripts/merge_comp_freqs.py '.$fileNames[3].' '.$fileNames[2].' > '.$fileNames[4];
                $res = shell_exec($str);
            }*/
            /*$res = shell_exec('cd '.$path.' && git clone https://'.$user->gh_user.':'.$user->gh_token.'@github.com/'.$nombre[0].'/'.$nombre[1].'.git');
            $resultado = shell_exec('cd '.$path.' && git -c ./'.$nombre[1].' log --pretty=format:"[%h] %an %ad %s" --date=short --numstat --before=2018-11-01 > testLS2.log');
            $resultado2 = shell_exec('cd '.$path.' && java -jar code-maat-0.8.5-standalone.jar maat -l testLS2.log -c git -a summary > test.log');
            $resultado3 = shell_exec('cd '.$path.' && perl cloc ./'.$nombre[1].' --by-file --csv --quiet --report-file=hib_lines.csv');
            $resultado4 = shell_exec('cd '.$path.' && java -jar code-maat-0.8.5-standalone.jar maat -l testLS2.log -c git -a revisions > hib_freqs.csv');
            $resultado5 = shell_exec('cd '.$path.' && python2.7 scripts/merge_comp_freqs.py hib_freqs.csv hib_lines.csv > Prueba.csv');*/
            //Storage::deleteDirectory('/storage/app/public/'.$nombre[1]);

            return response()->json([
                'success' => true,
                'msg' => 'Analisis realizado correctamente.',
                'repo_cli' => $repo_cli
            ]);
        }catch(Exception $ex){
            return response()->json([
                'success' => false,
                'message' => 'Error al realizar analisis al repositorio',
                'error' => $ex,
            ]);
        }
    }

    public function getBranchesInfo(Request $request){
        try{
            $user = $request->user();
            $project = Proyecto::findOrFail($request->project_id);
            $repositorio = Repositorio::find($project->repositorio_id);
            $nombre = explode('/', $repositorio->nombre);
            $api = new \SolucionTotal\APIGit\API($user->gh_user,$user->gh_token);
            $branches = $api->getBranches($nombre[0], $nombre[1]);

            $info = [];
            if(count($branches) > 0){
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
            }
            return $info;
        }catch(Exception $ex){
            return $ex;
        }
    }

    public function getRepositorios(Request $request){
        $user = $request->user();
        $api = new \SolucionTotal\APIGit\API($user->gh_user,$user->gh_token);
        $repos = [];


        $usuario = $api->getCurrentUser();
        return $api->getCollaborators('lgsilvestre', 'NoHacemos_Metodologia_2_2019');
        echo '<b>Repos del usuario '.$usuario->login.'</b></br>';

        foreach($repos as $repo){
            echo $repo->name.'</br>';
        }
        echo '<hr>';
        $issues = $api->getIssues('lgsilvestre', 'SoftProyectAdmin_G2', 2, 1);
        return $issues;
        echo '<b>Issues del repositorio SoftProyectAdmin_G2</b></br>';
        foreach($issues as $issue){
            echo '['.$issue->number.'] '.$issue->title.' &lt;'.$issue->user->login.'&gt;</br>';
        }
        echo '<hr>';
        echo '<b>Comentarios del Issue 25 en repositorio SoftProyectAdmin_G2</b></br>';
        $comentarios = $api->getIssueComments('lgsilvestre', 'SoftProyectAdmin_G2', 33);




        foreach($comentarios as $comentario){
            echo '<b>Autor:</b> '.$comentario->user->login.'</br>';
            echo '<b>Cuerpo:</b> </br>'.$comentario->body.'</br>';
        }
        echo '<hr>';
        echo '<b>Commits repositorio SoftProyectAdmin_G2</b></br>';
        $commits = $api->getCommits('lgsilvestre', 'SoftProyectAdmin_G2');

        foreach($commits as $commit){
            echo '<b>SHA:</b> '.$commit->commit->message.'</br>';
            echo '<b>Autor:</b> '.$commit->commit->author->name.'</br>';
        }
        echo '<hr>';
        echo '<b>Branches repositorio SoftProyectAdmin_G2</b></br>';
        $branches = $api->getBranches('lgsilvestre', 'SoftProyectAdmin_G2');

        foreach($branches as $branch){
            echo '<b>Nombre:</b> '.$branch->name.'</br>';
            echo '<b>SHA:</b> '.$branch->commit->sha.'</br>';
        }
        echo '<hr>';
        echo '<b>Commits repositorio SoftProyectAdmin_G2 desde branch Moris</b></br>';
        $commits = $api->getCommits('lgsilvestre', 'SoftProyectAdmin_G2', 'Moris');

        foreach($commits as $commit){
            echo '<b>SHA:</b> '.$commit->sha.'</br>';
            echo '<b>Autor:</b> '.$commit->commit->author->name.'</br>';
        }
        echo '<hr>';
        echo '<b>Commit 1 repositorio SoftProyectAdmin_G2</b></br>';

        $commit1 = $api->getCommit('lgsilvestre', 'SoftProyectAdmin_G2', '32b055e42d466e2a49b498fb798e9e665bfb86bf');
        echo '<b>SHA:</b> '.$commit1->sha.'</br>';
        echo '<b>Autor:</b> '.$commit->commit->author->name.'</br>';
        echo '<b>Estadisticas</b></br>';
        echo '<b>Total:</b> '.$commit1->stats->total.'</br>';
        echo '<b>Agregan:</b> '.$commit1->stats->additions.'</br>';
        echo '<b>Eliminan:</b> '.$commit1->stats->deletions.'</br>';

        echo '<hr>';
        echo '<b>Registro de eventos SoftProyectAdmin_G2</b></br>';

        $eventos = $api->getEventsLog('lgsilvestre', 'SoftProyectAdmin_G2');
        foreach($eventos as $evento){
            if($evento->type == 'IssuesEvent'){
                echo '<b>Evento del tipo IssuesEvent</b></br>';
                echo '<b>Accion:</b> '.$evento->payload->action.'</br>';
                echo '<b>Numero:</b> '.$evento->payload->issue->number.'</br>';
                echo '<b>Titulo:</b> '.$evento->payload->issue->title.'</br>';
            }else if($evento->type == 'IssueCommentEvent'){
                echo '<b>Evento del tipo IssueCommentEvent</b></br>';
                echo '<b>Accion:</b> '.$evento->payload->action.'</br>';
                echo '<b>Numero:</b> '.$evento->payload->issue->number.'</br>';
                echo '<b>Titulo:</b> '.$evento->payload->issue->title.'</br>';
                echo '<b>Comentario:</b> '.$evento->payload->comment->body.'</br>';
            }
        }
    }

    public function showAll(){
        return Repositorio::all();
    }

    public function show($id){
        return Repositorio::find($id);
    }

    public function create(Request $request){
        try{
            $validador = Validator::make($request->all(), [
                'nombre' => 'required',
                'url' => 'required',
                'proyecto' => 'required'
            ]);

            if($validador->fails()){
                return response()->json([
                    'success' => false,
                    'message' => 'No se pudo validar los parametros',
                    'error' => $validador->errors()
                ]);
            }

            $repo = new Repositorio();
            $repo->nombre = $request->nombre;
            $repo->url = $request->url;
            $repo->proyecto_id = $request->proyecto;
            $repo->save();

            return response()->json([
                'success' => true,
                'message' => 'Repositorio creado exitosamente'
            ]);

        }catch(Exception $ex){
            return response()->json([
                'success' => false,
                'message' => 'Error al crear repositorio',
                'error' => $ex,
            ]);
        }
    }

    public function update(Request $request, $id){
        try{
            $validador = Validator::make($request->all(), [
                'nombre' => 'required',
                'url' => 'required',
                'proyecto' => 'required'
            ]);
            if($validador->fails()){
                return response()->json([
                    'success' => false,
                    'message' => 'No se pudo validar los parametros',
                    'error' => $validador->errors()
                ]);
            }

            $repo = Repositorio::findOrFail($id);
            $repo->nombre = $request->nombre;
            $repo->url = $request->url;
            $repo->proyecto_id = $request->proyecto;
            $repo->save();

            return response()->json([
                'success' => true,
                'message' => 'Repositorio modificado exitosamente'
            ]);
        }catch(Exception $ex){
            return response()->json([
                'success' => false,
                'message' => 'Error al modificar repositorio',
                'error' => $ex,
            ]);
        }
    }

    public function delete($id){
        try{
            $repo = Repositorio::findOrFail($id);
            $repo->delete();
            return response()->json([
                'success' => true,
                'message' => 'Repositorio eliminado exitosamente'
            ]);
        }catch(Exception $ex){
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar repositorio',
                'error' => $ex,
            ]);
        }
    }
}
