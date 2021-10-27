<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ParticipantController extends Controller
{
    public function store(Request $request)
    {
       $participant = Participant::save();
       return response()->json($participant, 201);
    }
}
