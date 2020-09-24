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
            // User's routes
            $router->post('user', 'UserController@post');
            $router->get('user', 'UserController@index');
            $router->put('user/{id}', 'UserController@put');

            // Grade's routes
            $router->post('grade', 'GradeController@post');
            $router->put('grade/{id}', 'GradeController@put');
            $router->delete('grade/{id}', 'GradeController@delete');

            // UserGrade's routes
            $router->post('user/{userId}/grade/', 'UserGradeController@post');
            $router->delete('user/{userId}/grade/{id}', 'UserGradeController@delete');
        });

        // User level routes
        $router->get('grade', 'GradeController@index');
        $router->get('user/{userId}/grade', 'UserGradeController@index');

        $router->get('order/', 'OrderController@index');

        $router->post('order/xerox/', 'XeroxOrderController@post');
        $router->put('order/xerox/{id}', 'XeroxOrderController@put');
        $router->get('order/xerox/{orderId}', 'XeroxOrderController@show');

        $router->get('order/test/{order_id}', 'TestOrderController@show');
        $router->post('order/test/', 'TestOrderController@post');
        $router->put('order/test/{id}', 'TestOrderController@put');

        $router->post('order/book/', 'BookOrderController@post');
        $router->put('order/book/{id}', 'BookOrderController@put');
        $router->get('order/book/{orderId}', 'BookOrderController@show');
    });

});
