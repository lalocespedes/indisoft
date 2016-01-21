<?php

use lalocespedes\Cotiza;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/cotizaciones', function(Request $request, Response $response) {

    $cotizaciones = Cotiza::all();

     $response = $this->response->withStatus(200)
            ->withHeader('Content-type', 'application/json')
            ->write(json_encode([
                'total' => $cotizaciones->count(),
                'items' => $cotizaciones
                ]));
    
    return $response;

    //return $response->withRedirect('dashboard');

    //return $this->view->render($response, 'home.twig');

});
