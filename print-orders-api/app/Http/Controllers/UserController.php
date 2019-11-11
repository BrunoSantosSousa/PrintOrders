<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Auth;
use App\Http\RequestRules\UserRequestRule;
use App\Services\IUidGenerator;
use App\User;

class UserController extends Controller
{
    private $uidGenerator;

    public function __construct(IUidGenerator $uidGenerator)
    {
        parent::__construct(app(UserRequestRule::class));
        $this->uidGenerator = $uidGenerator;
    }

    public function post(Request $request)
    {
        $this->validatePost($request);
        $uid = $this->uidGenerator->generate();
        try {
            $user = User::create([
                'name' => $request->input('name'),
                'uid' => Crypt::encrypt($uid),
                'role' => $request->input('role'),
                'status' => 'active'
            ]);
            return response()->json(['user' => $user, 'message' => 'CREATED'], 201);
        } catch(\Exception $e) {
            return response()->json(['message' => 'User registration failed!', 'stack' => $e->getMessage()], 409);
        }
    }
}
