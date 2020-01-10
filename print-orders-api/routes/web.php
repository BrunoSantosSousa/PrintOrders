<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function() use($router) {
    $router->post('auth', 'AuthController@post');

    // Authenticated routes
    $router->group(['middleware' => 'auth'], function() use($router) {

        // Admin level routes
        $router->group(['middleware' => 'admin-auth'], function() use ($router){
            $router->post('user', 'UserController@post');
            $router->get('user', 'UserController@index');
            $router->post('grade', 'GradeController@post');
            $router->put('grade/{id}', 'GradeController@put');
            $router->delete('grade/{id}', 'GradeController@delete');
        });

        // User level routes
        $router->get('grade', 'GradeController@index');

    });

});
