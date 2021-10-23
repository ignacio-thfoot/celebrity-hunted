<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
    // if(!isset($_SESSION['logged'])):
    //     return redirect('login');
    // endif;
    return view('home');
});

Route::get('/login', function() {
    return view('login');
});

Route::post('/login', function(Request $request) {
    $data = $request->all();
    if($request['text_user'] == 'admin' && $_POST['text_pwd'] == 'N@8hqbRy4g5@e5Xj'):
        $_SESSION['logged'] = TRUE;
        return redirect('/');
    endif;
});
