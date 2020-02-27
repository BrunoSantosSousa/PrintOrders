<?php

use App\Services\IUidGenerator;
use Illuminate\Support\Facades\Crypt;
/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'uid' => Crypt::encrypt(app(IUidGenerator::class)->generate()),
        'role' => 'user',
        'status' => 'active'
    ];
});

$factory->define(App\Grade::class, function(Faker\Generator $faker) {
    return [
        'description' => $faker->randomElement([
            'Maternal',
            'Jardim I',
            'Jardim II',
            '1º Ano',
            '2º Ano',
            '3º Ano',
            '4º Ano',
            '5º Ano',
            '6º Ano',
            '7º Ano',
            '8º Ano',
            '9º Ano'
        ])
    ];
});

$factory->define(App\UserGrade::class, function(Faker\Generator $faker) {
    return [
        'user_id' => factory(App\User::class)->create()->id,
        'grade_id' => factory(App\Grade::class)->create()->id
    ];
});

$factory->define(App\Order::class, function(Faker\Generator $faker) {
    return [
        'grade_id' => factory(App\Grade::class)->create()->id,
        'type' => $faker->randomElement(['xerox', 'book', 'test']),
        'status' => 'pending',
        'checked' => 0,
        'comments' => '',
        'drive_path' => '',
        'delivery_date' => '2020-02-10'
    ];
});

$factory->define(App\XeroxOrder::class, function(Faker\Generator $faker) {
    return [
        'order_id' => factory(App\Order::class)->create(['type' => 'xerox'])->id,
        'description' => 'random description'
    ];
});

$factory->define(App\TestOrder::class, function(Faker\Generator $faker) {
    return [
        'order_id' => factory(App\Order::class)->create(['type' => 'test'])->id,
        'description' => 'random description'
    ];
});

$factory->define(App\BookOrder::class, function(Faker\Generator $faker){
    return [
        'order_id' => factory(App\Order::class)->create(['type' => 'book'])->id,
        'book_name' => 'Trilhas',
        'pages' => '1, 2 e 3'
    ];
});
