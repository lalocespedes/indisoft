<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/', function(Request $request, Response $response) {


    echo "welcome";


    //return $response->withRedirect('dashboard');

    //return $this->view->render($response, 'home.twig');

});
