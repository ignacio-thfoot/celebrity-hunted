<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Session;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {    
    return view('post');    
});

Route::get('/framework', function() {
    return view('framework');
});

Route::get('/post', function() {
    return view('post');
});

Route::get('/login', function() {
    return view('login');
});

Route::post('/login', function(Request $request) {
    $data = $request->all();
    
    if($request['text_user'] == 'admin' && $_POST['text_pwd'] == 'N@8hqbRy4g5@e5Xj'):
        session(['logged' => TRUE]);

        return redirect('/');
    endif;
});