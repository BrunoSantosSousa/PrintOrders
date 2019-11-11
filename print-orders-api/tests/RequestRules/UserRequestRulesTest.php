<?php
namespace AppTest\RequestRules;

use App\Http\RequestRules\UserRequestRule;
use AppTest\TestCase;

class UserRequestRulesTest extends TestCase
{
    public function testPostRules()
    {
        $userRequestRule = app(UserRequestRule::class);
        $postRules = $userRequestRule->getPostRules();
        $nameRule = $postRules['name'];
        $roleRule = $postRules['role'];
        $this->assertEquals('required|string', $nameRule);
        $this->assertEquals('in:user,admin', $roleRule);
    }
}
