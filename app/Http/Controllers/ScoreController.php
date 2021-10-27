<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ScoreController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();
        $score = Score::save();
        return response()->json($score, array('avg' => Score::avg('teamName', $req['teamName'])), 201);
     }
}