<?php
namespace AppTest\RequestRules;

use App\Http\RequestRules\BookOrderRequestRule;
use AppTest\TestCase;

class BookOrderRequestRuleTest extends TestCase
{
    public function testPostRule()
    {
        $bookOrderRequestRule = app(BookOrderRequestRule::class);
        $postRule = $bookOrderRequestRule->getPostRules();
        $gradeIdRule = $postRule['grade_id'];
        $deliveryDateRule = $postRule['delivery_date'];
        $bookNameRule = $postRule['book_name'];
        $pagesRule = $postRule['pages'];
        $this->assertEquals('required', $gradeIdRule);
        $this->assertEquals('required', $deliveryDateRule);
        $this->assertEquals('required', $bookNameRule);
        $this->assertEquals('required', $pagesRule);
    }

    public function testPutRules()
    {
        $bookOrderRequestRule = app(BookOrderRequestRule::class);
        $putRules = $bookOrderRequestRule->getPutRules();
        $statusRule = $putRules['status'];
        $checkedRule = $putRules['checked'];
        $this->assertEquals('required|in:pending,awaiting,done', $statusRule);
        $this->assertEquals('required', $checkedRule);
    }
}
