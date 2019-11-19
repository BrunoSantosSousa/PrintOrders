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
