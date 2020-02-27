<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Order;
use App\Services\IOrderService;
use App\Http\RequestRules\OrderRequestRule;

class OrderController extends Controller
{
    private $orderService = null;

    public function __construct(IOrderService $orderService)
    {
        $this->orderService = $orderService;
        parent::__construct(app(OrderRequestRule::class));
    }

    public function index(Request $request)
    {
        try {
            $statusList = [];
            $checked = null;
            if($request->has('status')) {
                array_push($statusList, $request->input('status'));
            }
            if($request->has('checked')) {
                $checked = $request->input('checked');
            }
            return $this->orderService->filterOrders($statusList, $checked);
        } catch(\Exception $e) {
            return response()->json(['message' => "Failed to load order's data."]);
        }
    }
}
