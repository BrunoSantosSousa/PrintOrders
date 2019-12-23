<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Crypt;
use App\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the User table seed.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Administrador',
            'uid' => Crypt::encrypt('a1b2c3'),
            'role' => 'admin',
            'status' => 'active'
        ]);
        User::create([
            'name' => 'Professor',
            'uid' => Crypt::encrypt('123456'),
            'role' => 'user',
            'status' => 'active'
        ]);
    }
}
