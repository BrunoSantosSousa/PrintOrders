<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\RequestRules\TestOrderRequestRule;
use App\TestOrder;
use App\Services\IOrderService;

class TestOrderController extends Controller
{
    private $orderService = null;

    public function __construct()
    {
        parent::__construct(app(TestOrderRequestRule::class));
        $this->orderService = app(IOrderService::class);
    }

    public function post(Request $request)
    {
        $this->validatePost($request);
        try {
            $order = $this->orderService->createOrder($request, 'test');
            $testOrder = TestOrder::create([
                'order_id' => $order->id,
                'description' => $request->input('description')
            ]);
            return response()->json(['test_order' => $testOrder, 'message' => 'CREATED']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'TestOrder registration failed!', 'stack' => $e->getMessage()]);
        }
    }

    public function put(Request $request, $id)
    {
        $this->validatePut($request);
        try {
            $testOrder = TestOrder::find($id);
            $this->orderService->updateOrder($request, $testOrder->order_id);
            if($request->has('description')) {
                $testOrder->description = $request->input('description');
                $testOrder->save();
            }
            return response()->json(['test_order' => $testOrder, 'message' => 'UPDATED']);
        } catch(\Exception $e) {
            return response()->json(['message' => 'TestOrder update failed!', 'stack' => $e->getMessage()]);
        }
    }
}
