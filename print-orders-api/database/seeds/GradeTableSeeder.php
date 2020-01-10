<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Crypt;
use App\Grade;

class GradeTableSeeder extends Seeder
{

    /**
     * Run the Grade table seed.
     *
     * @return void
     */
    public function run()
    {
        Grade::create(['description' => 'Maternal']);
        Grade::create(['description' => 'Jardim I']);
        Grade::create(['description' => 'Jardim II']);
        Grade::create(['description' => '1º Ano']);
        Grade::create(['description' => '2º Ano']);
        Grade::create(['description' => '3º Ano']);
        Grade::create(['description' => '4º Ano']);
        Grade::create(['description' => '5º Ano']);
        Grade::create(['description' => '6º Ano']);
        Grade::create(['description' => '7º Ano']);
        Grade::create(['description' => '8º Ano']);
        Grade::create(['description' => '9º Ano']);
    }
}
