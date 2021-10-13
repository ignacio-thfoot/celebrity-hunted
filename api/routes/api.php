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

Route::post('participants', function(Request $request) {
    return Participant::create($request->all);
});

Route::get('participants', function() {
    // If the Content-Type and Accept headers are set to 'application/json', 
    // this will return a JSON structure. This will be cleaned up later.
    return Participant::all();
});
 
Route::get('participants/{id}', function($id) {
    return Participant::find($id);
});

Route::get('average_times', function() {
    // If the Content-Type and Accept headers are set to 'application/json', 
    // this will return a JSON structure. This will be cleaned up later.
    return AverageTime::all();
});

Route::post('average_time', function(Request $request) {
    return AverageTime::create($request->all);
});

Route::get('scores', function() {
    // If the Content-Type and Accept headers are set to 'application/json', 
    // this will return a JSON structure. This will be cleaned up later.
    return Score::all();
});

Route::post('score', function(Request $request) {
    return Score::create($request->all);
});