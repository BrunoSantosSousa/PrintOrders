<?php
namespace AppTest\RequestRules;

use App\Http\RequestRules\TestOrderRequestRule;
use AppTest\TestCase;

class TestOrderRequestRuleTest extends TestCase
{
    public function testPostRule()
    {
        $testOrderRequestRule = app(TestOrderRequestRule::class);
        $postRules = $testOrderRequestRule->getPostRules();
        $gradeIdRule = $postRules['grade_id'];
        $deliveryDateRule = $postRules['delivery_date'];
        $descriptionRule = $postRules['description'];
        $this->assertEquals('required', $gradeIdRule);
        $this->assertEquals('required', $deliveryDateRule);
        $this->assertEquals('required', $descriptionRule);
    }

    public function testPutRules()
    {
        $testOrderRequestRule = app(TestOrderRequestRule::class);
        $putRules = $testOrderRequestRule->getPutRules();
        $statusRule = $putRules['status'];
        $checkedRule = $putRules['checked'];
        $this->assertEquals('required|in:pending,awaiting,done', $statusRule);
        $this->assertEquals('required', $checkedRule);
    }
}
