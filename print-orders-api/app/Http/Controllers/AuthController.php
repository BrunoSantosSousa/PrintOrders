<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\RequestRules\AuthRequestRule;
use App\Services\IUidGenerator;
use App\User;


class AuthController extends Controller
{

    private $uidGenerator;

    public function __construct(IUidGenerator $uidGenerator)
    {
        parent::__construct(app(AuthRequestRule::class));
        $this->uidGenerator = $uidGenerator;
    }

    public function post(Request $request)
    {
        $this->validatePost($request);
        $uid = $this->uidGenerator->generate();
        return $uid;
    }
}
