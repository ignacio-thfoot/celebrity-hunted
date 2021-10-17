<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Models\Participant;
use App\Models\AverageTime;
use App\Models\Score;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('participants', 'ParticipantController@store');
Route::post('participants', function(Request $request) {
    $data = $request->all();
    return Participant::create([
        'email' => $data['email'],
        'type' => $data['type']
    ]);
});

Route::get('participants', function() {
    return Participant::all();
});

//find first participant by email
Route::get('participants/{email}', function($email) {
    return Participant::where('email',$email)->firstOrFail();
});

//get all average times
Route::get('average_times', function() {
    // If the Content-Type and Accept headers are set to 'application/json', 
    // this will return a JSON structure. This will be cleaned up later.
    return AverageTime::all();
});

//create average time
Route::post('average_time', function(Request $request) {
    return AverageTime::create($request->all);
});

Route::get('scores', function() {
    // If the Content-Type and Accept headers are set to 'application/json', 
    // this will return a JSON structure. This will be cleaned up later.
    return Score::all();
});

Route::post('scores', 'ScoreController@store');
Route::post('scores', function(Request $request) {
    
    $data = $request->all();
    
    Score::create([
        'teamName' => $data['teamName'],
        'timePassed' => $data['timePassed'],
    ]);
    
    //return avg time for that team
    return array('teamName' => $data['teamName'], 'avg' => round(Score::where('teamName', $data['teamName'])->avg('timePassed'),0));
});