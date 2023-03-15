<?php

namespace App\Http\Controllers\SSO;

use App\Http\Controllers\Controller;
use App\Models\Institucion;
use App\Models\Role;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use InvalidArgumentException;

class SSOController extends Controller
{
    public function getLogin(Request $request)
    {
        $request->session()->put("state", $state =  Str::random(40));
        $request->session()->put('institucion', $request->institucion);
        $query = http_build_query([
            "client_id" => config("auth.client_id"),
            "redirect_uri" => config("auth.callback"),
            "response_type" => "code",
            "scope" => config("auth.scopes"),
            "state" => $state,
            "prompt" => true
        ]);
        return redirect(config("auth.sso_host") .  "/oauth/authorize?" . $query);
    }
    public function getCallback(Request $request)
    {
        $state = $request->session()->pull("state");
        $institucion = $request->session()->pull("institucion");
        Log::info("Institucion escogida: " . $institucion);
        throw_unless(strlen($state) > 0 && $state == $request->state, InvalidArgumentException::class);

        $response = Http::asForm()->post(
            config("auth.sso_host") .  "/oauth/token",
            [
                "grant_type" => "authorization_code",
                "client_id" => config("auth.client_id"),
                "client_secret" => config("auth.client_secret"),
                "redirect_uri" => config("auth.callback"),
                "code" => $request->code
            ]
        );
        $request->session()->put($response->json());
        return redirect(route("sso.connect") . '?institucion=' . $institucion);
    }
    public function connectUser(Request $request)
    {
        $institucion = $request->institucion;
        Log::info("Institucion al conetar:" . $institucion);

        if (Institucion::find($institucion) == null) {
            throw new Exception("La institucion escogida no existe");
        }

        $access_token = $request->session()->get("access_token");
        session()->put('access_token', $access_token);
        $response = Http::withHeaders([
            "Accept" => "application/json",
            "Authorization" => "Bearer " . $access_token
        ])->get(config("auth.sso_host") .  "/api/user");
        $userArray = $response->json();
        try {
            $email = $userArray['email'];
        } catch (\Throwable $th) {
            return redirect("login")->withError("Failed to get login information! Try again.");
        }
        $user = User::where("email", $email)->first();
        if (!$user) {
            $user = new User;
            $user->name = $userArray['name'];
            $user->lastname = $userArray['lastname'];
            $user->email = $userArray['email'];
            $user->email_verified_at = $userArray['email_verified_at'];
            $role = null;
            if($userArray['role'] == 0){
                $role = 2;
            }else if($userArray['role'] == 1){
                $role = 3;
            }else if($userArray['role'] == 2){
                $role = 4;
            }
            $user->save();
            $user->instituciones()->attach($institucion, ['role_id' => $role]);
        }
        Auth::login($user);

        $rolePivot = $user->instituciones()->withPivot('role_id')->find($institucion);
        $role = Role::find($rolePivot->pivot->role_id);
        $tokenResult = $user->createToken('authToken')->plainTextToken;

        return redirect("http://ghtracker.site/#/sessions/oauth2/signin?" . http_build_query([
            'success' => true,
            'token' => $tokenResult,
            'role' => $role->name,
            'user' => json_encode($user),
            'institucion' => $institucion,
            'token_type' => 'Bearer',
        ]));
    }
}
