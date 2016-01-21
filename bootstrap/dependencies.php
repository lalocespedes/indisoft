<?php

$container = $app->getContainer();

// Database
$container['capsule'] = function ($c) {

    $capsule = new Illuminate\Database\Capsule\Manager;

    $capsule->addConnection([
        'driver' => 'mysql',
        'host' => getenv('DB_HOST'),
        'database' => getenv('DB_DATABASE'),
        'username' => getenv('DB_USERNAME'),
        'password' => getenv('DB_PASSWORD'),
        'charset' => 'utf8',
        'collation' => 'utf8_general_ci',
        'prefix' => ''
    ]);

    return $capsule;

};

// Twig

$container['view'] = function($c) {

    $view = new \Slim\Views\Twig('./resources/views');
    
    $view->addExtension(new \Slim\Views\TwigExtension(
        $c['router'],
        $c['request']->getUri()
    ));

    return $view;

};