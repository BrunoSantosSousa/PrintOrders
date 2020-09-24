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
            $start_date = null;
            $end_date = null;
            if($request->has('status')) {
                array_push($statusList, $request->input('status'));
            }
            if($request->has('start_date') && $request->has('end_date')) {
                $start_date = $request->input('start_date');
                $end_date = $request->input('end_date');
            }
            return $this->orderService->filterOrders($statusList, $start_date, $end_date);
        } catch(\Exception $e) {
            return response()->json(['message' => "Failed to load order's data.", 'stack' => $e->getMessage()]);
        }
    }
}
