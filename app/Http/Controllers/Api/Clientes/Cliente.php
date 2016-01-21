<?php

use lalocespedes\Clientes;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/api/cliente/{CveCliente}', function(Request $request, Response $response, $args) {

    $cliente = Clientes::select('NomCliente', 'CveCliente')
    ->where('CveCliente', $args['CveCliente'])->first();

     $response = $this->response->withStatus(200)
            ->withHeader('Content-type', 'application/json')
            ->write(json_encode([
                'item' => $cliente
                ]));
    
    return $response;

});
