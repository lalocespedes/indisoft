<?php

use lalocespedes\Invprodterm;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/api/invprodterm/{PTNumArticulo}', function(Request $request, Response $response, $args) {

    $query = Invprodterm::select('PTNumArticulo', 'PTDesc', 'PTPrecioVta')
        ->where('PTNumArticulo', $args['PTNumArticulo'])->first();

    $response = $this->response->withStatus(200)
        ->withHeader('Content-type', 'application/json')
        ->write(json_encode([
            'item' => $query
        ]));

    return $response;

});
