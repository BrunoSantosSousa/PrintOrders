<?php
namespace AppTest\Model;

use AppTest\TestCase;
use Laravel\Lumen\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\Crypt;
use App\UserGrade;

class UserTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * Test function getUserByUid from User Model.
     *
     * @return void
     */
    public function testGetUserByUid()
    {
        $model = app(\App\User::class);
        $recent = factory(\App\User::class)->create();
        $record = $model->getUserByUid($recent->uid);
        $this->assertEquals($recent->name, $record->name);
    }

    /**
     * Test function uidAlreadyInUse from user Model.
     * Case 1: There is a user.
     *
     * @return void
     */
    public function testUidAlreadyInUseCaseOne()
    {
        $model = app(\App\User::class);
        $user = factory(\App\User::class)->create();
        $this->assertTrue($model->uidAlreadyInUse($user->uid));
    }

    /**
     * Test function uidAlreadyInUse from user Model.
     * Case 2: There isn't a user.
     *
     * @return void
     */
    public function testUidAlreadyInUseCaseTwo()
    {
        $model = app(\App\User::class);
        $this->assertFalse($model->uidAlreadyInUse('a1wk09'));
    }

    /**
     * Test function isActive from user Model.
     *
     * @return void
     */
    public function testIsActive()
    {
        $inactiveUser = factory(\App\User::class)->create(['status' => 'inactive']);
        $activeUser = factory(\App\User::class)->create(['status' => 'active']);
        $this->assertFalse($inactiveUser->isActive());
        $this->assertTrue($activeUser->isActive());
    }

    /**
     * Test user_grades function from user Model.
     *
     * @return void
     */
    public function testUserGrades()
    {
        $user = factory(\App\User::class)->create(['status' => 'active']);
        $grade = factory(\App\Grade::class)->create();
        UserGrade::create(['user_id' => $user->id, 'grade_id' => $grade->id]);
        $userGrades = $user->user_grades;
        $this->assertEquals($grade->id, $userGrades[0]->grade_id);
        $this->assertEquals($user->id, $userGrades[0]->user_id);
    }
}
