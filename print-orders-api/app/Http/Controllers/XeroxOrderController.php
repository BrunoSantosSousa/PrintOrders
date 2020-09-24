<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\RequestRules\XeroxOrderRequestRule;
use App\XeroxOrder;
use App\Services\IOrderService;
use App\Order;
use App\Http\Resources\XeroxOrderResource as Resource;


class XeroxOrderController extends Controller
{
    private $orderService = null;
    private $resource = null;

    public function __construct()
    {
        parent::__construct(app(XeroxOrderRequestRule::class));
        $this->orderService = app(IOrderService::class);
        $this->resource = app(Resource::class);
    }

    public function show(Request $request, $orderId)
    {
        $joins = [
            'grade',
            'xerox_order'
        ];
        $order = Order::with($joins)->find($orderId);
        return $this->resource->format($order);
    }

    public function post(Request $request)
    {
        $this->validatePost($request);
        try {
            $order = $this->orderService->createOrder($request, 'xerox');
            $xeroxOrder = XeroxOrder::create([
                'order_id' => $order->id,
                'description' => $request->input('description')
            ]);
            return response()->json(['xerox_order' => $xeroxOrder , 'message' => 'CREATED', ]);
        } catch(\Exception $e) {
            return response()->json(['message' => 'XeroxOrder registration failed!', 'stack' => $e->getMessage()]);
        }
    }

    public function put(Request $request, $id)
    {
        $this->validatePut($request);
        try {
            $xeroxOrder = XeroxOrder::find($id);
            $this->orderService->updateOrder($request, $xeroxOrder->order_id);
            if($request->has('description')) {
                $xeroxOrder->description = $request->description;
                $xeroxOrder->save();
            }
            return response()->json(['xerox_order' => $xeroxOrder, 'message' => 'UPDATED']);
        } catch(\Exception $e) {
            return response()->json(['message' => 'XeroxOrder update failed!', 'stack' => $e->getMessage()]);
        }
    }

}
