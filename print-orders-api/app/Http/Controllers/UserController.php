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

    public function index(Request $request)
    {
        try {
            return User::paginate(10);
        } catch (\Exception $e) {
            return response()->json(['message' => "Failed to load user's data."]);
        }
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

    public function put(Request $request, $id)
    {
        $this->validatePut($request);
        try {
            $user = User::find($id);
            $user->name = $request->input('name');
            if($request->has('role')) {
                $user->role = $request->input('role');
            }
            if($request->has('status')) {
                $user->status = $request->input('status');
            }
            $user->save();
            return response()->json(['user' => $user, 'message' => 'UPDATED']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'User edit failed!', 'stack' => $e->getMessage()], 409);
        }
    }
}
