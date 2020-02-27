<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\RequestRules\UserGradeRequestRule;
use App\User;
use App\UserGrade;

class UserGradeController extends Controller
{
    private $resourceCollection;

    public function __construct()
    {
        parent::__construct(app(UserGradeRequestRule::class));
        $this->resourceCollection = app('App/Http/Resources/UserGradeResourceCollection');
    }

    public function index(Request $request, $userId)
    {
        try {
            $user = User::find($userId);
            $userGrades = $user->user_grades;
            return $this->resourceCollection->format($userGrades);
        } catch (\Exception $e) {
            return response()->json(['message' => "Failed to load user's grade data.", 'stack' => $e->getMessage()], 409);
        }
    }

    public function post(Request $request, $userId)
    {
        $this->validatePost($request);
        try {
            $rows = UserGrade::where([['user_id', '=', $userId], ['grade_id' , '=', $request->input('grade_id')]])->get();
            if($rows->count() > 0) {
                return response()->json(['message' => 'DUPLICATED'], 409);
            }
            $userGrade = UserGrade::create([
                'user_id' => $userId,
                'grade_id' => $request->input('grade_id')
            ]);
            return response()->json(['user_grade' => $userGrade, 'message' => "CREATED"]);
        } catch (\Exception $e) {
            return response()->json(['message' => "UserGrade registration failed!"]);
        }
    }

    public function delete($userId, $gradeId)
    {
        try {
            UserGrade::destroy($gradeId);
            return response()->json(['message' => "DELETED"]);
        } catch (\Exception $e) {
            return response()->json(['message' => "Failed to destroy UserGrade!"]);
        }
    }
}
