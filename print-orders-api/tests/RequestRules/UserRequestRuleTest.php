<?php
namespace AppTest\RequestRules;

use App\Http\RequestRules\UserRequestRule;
use AppTest\TestCase;

class UserRequestRuleTest extends TestCase
{
    public function testPostRules()
    {
        $userRequestRule = app(UserRequestRule::class);
        $postRules = $userRequestRule->getPostRules();
        $nameRule = $postRules['name'];
        $roleRule = $postRules['role'];
        $this->assertEquals('required|string', $nameRule);
        $this->assertEquals('required|in:user,admin', $roleRule);
    }
}
