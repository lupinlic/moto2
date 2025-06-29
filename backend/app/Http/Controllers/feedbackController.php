<?php

namespace App\Http\Controllers;

use App\Models\feedback;
use Illuminate\Http\Request;

class feedbackController extends Controller
{
    //
    public function index()
    {
        //
        $feedback = feedback::with('customer')->get();
        
        return response()->json([
            "message" => "đã lấy danh mục thành công",
            "data" => $feedback,
        ]);
    }
    public function store(Request $request)
    {
        //
        $feedback = feedback::create([
            "CustomerID" => $request->CustomerID,
            "Content" => $request->Content,
            "Feedback" => "Chưa trả lời",         
        ]);
        return response()->json([
            "message" => "đã tạo danh mục thành công",
            "data" => $feedback,
        ]);
    }
    public function destroy($fbID)
    {
        //
        $feedback = feedback::find($fbID);
        

    if (!$feedback) {
        return response()->json([
            "message" => "Không tìm thấy danh mục cần xóa"
        ], 404);
    }
        $feedback->delete();

        return response()->json([
            "message" => "đã xóa danh mục thành công"
        ]);
    }
    public function update(Request $request,$FeedbackID)
    {
        //
        $feedback = feedback::find($FeedbackID);
        if (!$feedback) {
            return response()->json([
                "message" => "Không tìm thấy danh mục",
                "data" => null
            ], 404);
        }
    
        // Cập nhật dữ liệu
        $feedback->update([
            "Feedback" => $request->Feedback,
        ]);
    
        return response()->json([
            "message" => "Đã sửa danh mục thành công",
            "data" => $feedback,
        ]);
    }
    public function show($FeedbackID)
    {
        //
        $feedback = feedback::find($FeedbackID); // Tìm theo FeedbackID

        if (!$feedback) {
            return response()->json([
                "message" => "Không tìm thấy danh mục",
                "data" => null
            ], 404);
        }
    
        return response()->json([
            "message" => "Hiển thị danh mục thành công",
            "data" => $feedback,
        ]);
    }
    public function showbyCustomer($CustomerID)
    {
        //
        $feedback = feedback::where('CustomerID', $CustomerID)->get();

        if ($feedback->isEmpty()) {
            return response()->json([
                "message" => "Không tìm thấy phản hồi cho khách hàng này",
                "data" => null
            ], 404);
        }
    
        return response()->json([
            "message" => "Hiển thị phản hồi thành công",
            "data" => $feedback,
        ]);
    }
   

}