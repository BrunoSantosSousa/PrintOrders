<?php
namespace AppTest\Http;

use AppTest\TestCase;
use Laravel\Lumen\Testing\DatabaseMigrations;

class AuthControllerTest extends TestCase
{
    use DatabaseMigrations;

    public function testAuthentication()
    {
        $user = factory(\App\User::class)->create();
        $response = $this->call('POST', '/api/auth', ['uid' => $user->uid]);
        $this->assertEquals(200, $response->status());
    }

}
