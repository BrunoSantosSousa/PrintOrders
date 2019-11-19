<?php
namespace AppTest\Traits;

trait AdminUserTrait
{
    public function getAdminUser()
    {
        return factory(\App\User::class)->create(['role' => 'admin']);
    }
}
