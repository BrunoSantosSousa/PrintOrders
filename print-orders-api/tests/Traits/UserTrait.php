<?php
namespace AppTest\Traits;

trait UserTrait
{
    public function getUser()
    {
        return factory(\App\User::class)->create(['role' => 'user']);
    }
}
