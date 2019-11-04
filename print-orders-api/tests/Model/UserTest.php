<?php
namespace AppTest\Model;

use AppTest\TestCase;
use Laravel\Lumen\Testing\DatabaseMigrations;

class UserTest extends TestCase
{
    use DatabaseMigrations;

    public function testGetUserByUid()
    {
        $model = app(\App\User::class);
        $recent = factory(\App\User::class)->create();
        $record = $model->getUserByUid($recent->uid);
        $this->assertEquals($recent->name, $record->name);
    }

}
