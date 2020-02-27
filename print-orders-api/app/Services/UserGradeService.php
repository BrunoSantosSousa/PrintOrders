<?php
namespace App\Services;
use App\UserGrade;

class UserGradeService implements IUserGradeService
{
    public function listUserGradeId($user) : Array
    {
        $userGrades = UserGrade::where('user_id', $user->id)->get();
        if($userGrades->count() > 0) {
            return $userGrades->map(function($userGrade) {
                return $userGrade->grade_id;
            })->toArray();
        }
        return [];
    }
}
