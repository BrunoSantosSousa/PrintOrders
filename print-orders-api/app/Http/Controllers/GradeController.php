<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\RequestRules\GradeRequestRule;
use App\Grade;

class GradeController extends Controller
{
    public function __construct()
    {
        parent::__construct(app(GradeRequestRule::class));
    }

    public function index(Request $request)
    {
        try {
            return Grade::paginate(10);
        } catch (\Exception $e) {
            return response()->json(['message', "Failed to load grade's data.", 'stack' => $e->getMessage()], 409);
        }
    }

    public function post(Request $request)
    {
        $this->validatePost($request);
        try {
            $grade = Grade::create($request->only('description'));
            return response()->json(['grade' => $grade, 'message' => 'CREATED'], 201);
        } catch(\Exception $e) {
            return response()->json(['message' => 'Grade registration failed!', 'stack' => $e->getMessage()], 409);
        }
    }

    public function put(Request $request, Grade $grade)
    {
        $this->validatePut($request);
        try {
            $grade->description = $request->input('description');
            $grade->save();
            return response()->json(['grade' => $grade, 'message' => 'UPDATED'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Grade update failed!', 'stack' => $e->getMessage()], 409);
        }
    }

    public function delete(Request $request, $id)
    {
        try {
            Grade::destroy($id);
            return response()->json(['message' => 'DELETED'], 200);
        } catch(\Exception $e) {
            return response()->json(['message' => 'Failed to delete Grade', 'stack' => $e->getMessage()], 409);
        }
    }

}
