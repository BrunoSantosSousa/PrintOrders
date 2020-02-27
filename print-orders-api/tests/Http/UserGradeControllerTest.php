<?php
namespace AppTest\Http;

use AppTest\TestCase;
use AppTest\Traits\AdminUserTrait;
use Laravel\Lumen\Testing\DatabaseMigrations;
use App\UserGrade;

class UserGradeControllerTest extends TestCase
{
    use DatabaseMigrations;
    use AdminUserTrait;

    /**
     * UserGradeController get method MUST return a set of user grades.
     *
     * @return void
     */
    public function testGetRequest()
    {
        $admin = $this->getAdminUser();
        $user = factory(\App\User::class)->create();
        $grade = factory(\App\Grade::class)->create();
        $userGrade = UserGrade::create([
            'user_id' => $user->id,
            'grade_id' => $grade->id
        ]);
        $response = $this->actingAs($user)->call('GET', "/api/user/{$user->id}/grade");
        $this->assertEquals(200, $response->status());
    }

    /**
     * UserGradeController post methd MUST create a new user_grade row.
     *
     * @return void
     */
    public function testPostRequest()
    {
        $admin = $this->getAdminUser();
        $user = factory(\App\User::class)->create();
        $grade = factory(\App\Grade::class)->create();
        $data = [
            'grade_id' => $grade->id
        ];
        $response = $this->actingAs($admin)->call('POST', "/api/user/{$user->id}/grade/", $data);
        $this->assertEquals(200, $response->status());
    }

    /**
     * UserGradeController post MUST delete a row from database.
     *
     * @return void
     */
    public function testDeleteRequest()
    {
        $admin = $this->getAdminUser();
        $userGrade = factory(\App\UserGrade::class)->create();
        $response = $this->actingAs($admin)->call("DELETE", "/api/user/{$userGrade->user_id}/grade/{$userGrade->id}");
        $this->assertEquals(200, $response->status());
    }
}
