<?php
namespace AppTest\Model;

use AppTest\TestCase;

class UserTest extends TestCase
{

    public function testGetUserByUid()
    {
        $model = app(\App\User::class);
        $recent = factory(\App\User::class)->create();
        $record = $model->getUserByUid($recent->uid);
        $this->assertTrue($uid->name, $record->name);
    }

}
