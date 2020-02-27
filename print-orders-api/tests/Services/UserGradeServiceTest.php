<?php
namespace AppTest\Services;

use AppTest\TestCase;
use App\Services\IUserGradeService;
use Laravel\Lumen\Testing\DatabaseMigrations;

class UserGradeServiceTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * @group UserGradeService
     * Test userGradeService function to list all the grade_id of an user.
     */
    public function testListUserGradeId()
    {
        $userGradeService = app(IUserGradeService::class);
        $user = factory(\App\User::class)->create();
        factory(\App\UserGrade::class, 5)->create(['user_id' => $user->id]);
        $ids = $userGradeService->listUserGradeId($user);
        $this->assertEquals(5, count($ids));
    }
}
