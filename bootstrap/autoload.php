<?php

define('INC_ROOT', dirname(__DIR__));

require_once INC_ROOT . '/vendor/autoload.php';

$dotenv = new Dotenv\Dotenv(dirname(__DIR__));
$dotenv->load();

date_default_timezone_set('Mexico/General');

session_cache_limiter(false);

if (!isset($_SESSION)) {
    session_start();
}

ini_set('display_errors', getenv('APP_DEBUG'));

$app = new Slim\App();

//dependencies
require_once INC_ROOT . '/bootstrap/dependencies.php';

// Register routes
require_once INC_ROOT . '/app/Http/routes.php';

// Register the database connection with Eloquent
$capsule = $app->getContainer()->get('capsule');
$capsule->bootEloquent();