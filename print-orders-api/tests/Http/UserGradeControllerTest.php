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
}
