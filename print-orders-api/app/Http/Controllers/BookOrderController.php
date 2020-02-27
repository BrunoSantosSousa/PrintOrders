<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\RequestRules\BookOrderRequestRule;
use App\BookOrder;
use App\Services\IOrderService;

class BookOrderController extends Controller
{
    private $orderService = null;

    public function __construct()
    {
        parent::__construct(app(BookOrderRequestRule::class));
        $this->orderService = app(IOrderService::class);
    }

    public function post(Request $request)
    {
        $this->validatePost($request);
        try {
            $order = $this->orderService->createOrder($request, 'book');
            $bookOrder = BookOrder::create([
                'order_id' => $order->id,
                'book_name' => $request->input('book_name'),
                'pages' => $request->input('pages')
            ]);
            return response()->json(['book_order' => $bookOrder, 'message' => 'CREATED']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'BookOrder registration failed!', 'stack' => $e->getMessage()]);
        }
    }

    public function put(Request $request, $id)
    {
        $this->validatePut($request);
        try {
            $bookOrder = BookOrder::find($id);
            $this->orderService->updateOrder($request, $bookOrder->order_id);
            $changes = 0;
            if($request->has('book_name')) {
                $bookOrder->book_name = $request->input('book_name');
                $changes++;
            }
            if($request->has('pages')) {
                $bookOrder->pages = $request->input('pages');
                $changes++;
            }
            if($changes > 0) {
                $bookOrder->save();
            }
            return response()->json(['book_order' => $bookOrder, 'message' => 'UPDATED']);
        } catch(\Exception $e) {
            return response()->json(['message' => 'BookOrder update failed!', 'stack' => $e->getMessage()]);
        }
    }
}
