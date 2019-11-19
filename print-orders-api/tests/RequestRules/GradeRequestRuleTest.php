<?php
namespace AppTest\RequestRules;

use App\Http\RequestRules\GradeRequestRule;
use AppTest\TestCase;

class GradeRequestRuleTest extends TestCase
{

    public function testPostRules()
    {
        $gradeRequestRule = app(GradeRequestRule::class);
        $postRules = $gradeRequestRule->getPostRules();
        $descriptionRule = $postRules['description'];
        $this->assertEquals('required|string', $descriptionRule);
    }

    public function testPutRules()
    {
        $gradeRequestRule = app(GradeRequestRule::class);
        $putRules = $gradeRequestRule->getPutRules();
        $descriptionRule = $putRules['description'];
        $this->assertEquals('required|string', $descriptionRule);
    }

}
