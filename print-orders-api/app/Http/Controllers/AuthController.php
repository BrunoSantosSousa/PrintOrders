<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Auth;
use App\Http\RequestRules\AuthRequestRule;
use App\User;


class AuthController extends Controller
{
    private $userModel;

    public function __construct(User $userModel)
    {
        parent::__construct(app(AuthRequestRule::class));
        $this->userModel = $userModel;
    }

    public function post(Request $request)
    {
        $this->validatePost($request);
        $user = $this->userModel->getUserByUid($request->input('uid'));
        if(!isset($user) || ! $user->isActive()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        return $this->respondWithToken(Auth::login($user), $user);
    }

    private function respondWithToken($token, $user)
    {
        return response()->json([
            'name' => $user->name,
            'role' => $user->role,
            'id' => $user->id,
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ], 200);
    }
}
