<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class InvitarUsuario implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $email, $nombre, $password;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($email, $nombre, $password)
    {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->password = $password;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $correo_body = [
            "Messages" => [
                  [
                     "From" => [
                        "Email" => "no-reply@jesusmoris.cl",
                        "Name" => "Github Tracker 3.0"
                     ],
                     "To" => [
                           [
                              "Email" => $this->email,
                              "Name" => $this->nombre,
                           ]
                        ],
                     "Subject" => "Creación de nuevo usuario",
                     "HTMLPart" => '<div style="width:500px">
                     <p>Bienvenido al sistema de gestión <b>Github Tracker 3.0</b></br>
                   Hemos detectado que tu usuario fue creado por carga masiva y necesitamos de algunosdatos tuyos para completar el registro.
                   A continuación está tu clave generada aleatoriamente para que puedas entrar al sistema y actualizar tu información.</p>

                   <div style="border:1px solid gainsboro; width:40%; height: 50px;margin:0 auto;text-align:center; padding-top:5px; padding-bottom:5px;">
                     <span style="color:gainsboro">TU CLAVE</span></br>
                     '.$this->password.'
                   </div>
                   <div style="text-align:center">
                   <a href="http://memoria.jesusmoris.cl/#/sessions/signin">Ingreso al sistema</a>
                   </div>

                   <p>Correo enviado automaticamente.
                     Favor no contestar.</p>
                    Equipo <b>Github Tracker 3.0</b>
                     </p>
                   </div>'
                  ]
               ]
         ];


        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, 'https://api.mailjet.com/v3.1/send');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($correo_body));
        curl_setopt($ch, CURLOPT_USERPWD, '4bd11c44dbf66e28eeef58f0fd39a4be' . ':' . 'b93698430ac0713a4ff1976bf2d33f5c');

        $result = curl_exec($ch);
        curl_close($ch);
    }
}
