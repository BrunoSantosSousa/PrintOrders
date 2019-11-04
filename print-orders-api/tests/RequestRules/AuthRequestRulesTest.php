<?php
namespace AppTest\RequestRules;

use App\Http\RequestRules\AuthRequestRule;
use AppTest\TestCase;

class AuthRequestRules extends TestCase
{

    public function testPostRules()
    {
        $authRequestRule = app(AuthRequestRule::class);
        $postRules = $authRequestRule->getPostRules();
        $nameRule = $postRules['name'];
        $this->assertEquals($nameRule, 'required|string');
    }

}
