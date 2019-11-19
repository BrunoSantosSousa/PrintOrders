<?php
namespace AppTest\Http;

use AppTest\TestCase;
use AppTest\Traits\AdminUserTrait;
use AppTest\Traits\UserTrait;
use Laravel\Lumen\Testing\DatabaseMigrations;

class GradeControllerTest extends TestCase
{
    use DatabaseMigrations;
    use AdminUserTrait;
    use UserTrait;

    public function testIndexRequest()
    {
        $user = $this->getUser();
        factory(\App\Grade::class, 7)->create();
        $response = $this->actingAs($user)->json('GET', '/api/grade');
        $response->seeJson(['total' => 7, 'per_page' => 10, 'current_page' => 1]);
    }

    public function testPostRequest()
    {
        $user = $this->getAdminUser();
        $data = [
            'description' => "1º Ano"
        ];
        $response = $this->actingAs($user)->json('POST', '/api/grade', $data);
        $response->seeJson(['message' => 'CREATED']);
        $this->seeInDatabase('grades', ['description' => '1º Ano']);
    }

    public function testPutRequest()
    {
        $user = $this->getAdminUser();
        $grade = factory(\App\Grade::class)->create();
        $data = [
            'description' => "2º Ano"
        ];
        $route = "/api/grade/{$grade->id}";
        $response = $this->actingAs($user)->json('PUT', $route, $data);
        $response->seeJson(['message' => 'UPDATED']);
        $this->seeInDatabase('grades', ['description' => '2º Ano']);
    }

    public function testDeleteRequest()
    {
        $user = $this->getAdminUser();
        $grade = factory(\App\Grade::class)->create();
        $route = "/api/grade/{$grade->id}";
        $response = $this->actingAs($user)->json('DELETE', $route);
        $response->seeJson(['message' => "DELETED"]);
        $this->notSeeInDatabase('grades', $grade->toArray());
    }

}
