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
}
