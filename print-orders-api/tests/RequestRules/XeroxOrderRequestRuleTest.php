<?php
namespace AppTest\RequestRules;

use App\Http\RequestRules\XeroxOrderRequestRule;
use AppTest\TestCase;

class XeroxOrderRequestRuleTest extends TestCase
{

    public function testPostRules()
    {
        $xeroxOrderRequestRule = app(XeroxOrderRequestRule::class);
        $postRules = $xeroxOrderRequestRule->getPostRules();
        $gradeIdRule = $postRules['grade_id'];
        $deliveryDateRule = $postRules['delivery_date'];
        $descriptionRule = $postRules['description'];
        $this->assertEquals('required', $gradeIdRule);
        $this->assertEquals('required', $deliveryDateRule);
        $this->assertEquals('required', $descriptionRule);
    }

    public function testPutRules()
    {
        $xeroxOrderRequestRule = app(XeroxOrderRequestRule::class);
        $putRules = $xeroxOrderRequestRule->getPutRules();
        $statusRule = $putRules['status'];
        $checkedRule = $putRules['checked'];
        $this->assertEquals('required|in:pending,awaiting,done', $statusRule);
        $this->assertEquals('required', $checkedRule);
    }

}
