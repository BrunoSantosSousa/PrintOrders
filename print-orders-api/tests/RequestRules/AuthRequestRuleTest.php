<?php
namespace AppTest\RequestRules;

use App\Http\RequestRules\AuthRequestRule;
use AppTest\TestCase;

class AuthRequestRuleTest extends TestCase
{

    public function testPostRules()
    {
        $authRequestRule = app(AuthRequestRule::class);
        $postRules = $authRequestRule->getPostRules();
        $uidRule = $postRules['uid'];
        $this->assertEquals('required|string', $uidRule);
    }

}
