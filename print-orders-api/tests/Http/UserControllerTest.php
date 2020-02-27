<?php
namespace AppTest\Http;

use AppTest\TestCase;
use AppTest\Traits\AdminUserTrait;
use Laravel\Lumen\Testing\DatabaseMigrations;

class UserControllerTest extends TestCase
{
    use DatabaseMigrations;
    use AdminUserTrait;

    /**
     * User controller post method MUST create a new user in database.
     *
     * @return void
     */
    public function testPostRequest()
    {
        $user = $this->getAdminUser();
        $data = [
            'name' => 'Roy Fielding',
            'role' => 'user'
        ];
        $response = $this->actingAs($user)->json('POST', '/api/user', $data);
        $response->seeJson([
            'message' => 'CREATED'
        ]);
        $this->seeInDatabase('users', ['name' => 'Roy Fielding', 'role' => 'user']);
    }

    /**
     * User controller's get without id method MUST return a pagination
     * of 10 users.
     *
     * @return void
     */
    public function testGetRequest()
    {
        $user = $this->getAdminUser();
        $response = $this->actingAs($user)->call('GET', '/api/user');

        $this->assertEquals(200, $response->status());
    }

    public function testPutRequest()
    {
        $admin = $this->getAdminUser();
        $user = factory(\App\User::class)->create();
        $data = [
            'name' => 'Administrator',
            'role' => 'admin'
        ];
        $response = $this->actingAs($admin)->json('PUT', "/api/user/{$user->id}", $data);
        $response->seeJson([
            'message' => 'UPDATED'
        ]);
        $this->seeInDatabase('users', ['name' => 'Administrator', 'role' => 'admin', 'id' => $user->id]);
    }

}
