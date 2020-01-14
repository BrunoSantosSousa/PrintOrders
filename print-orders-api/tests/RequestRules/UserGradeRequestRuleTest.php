<?php
namespace AppTest\RequestRules;

use App\Http\RequestRules\UserGradeRequestRule;
use AppTest\TestCase;

class UserGradeRequestRuleTest extends TestCase
{
    public function testPostRules()
    {
        $userGradeRequestRule = app(UserGradeRequestRule::class);
        $postRules = $userGradeRequestRule->getPostRules();
        $gradeIdRule = $postRules['grade_id'];
        $this->assertEquals('required|number', $gradeIdRule);
    }
}
