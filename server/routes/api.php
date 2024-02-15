<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Article;
use App\Models\Tag;


use App\Http\Controllers\AuthController;
use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\TagsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Get all articles
Route::get('/articles', function () {
    return App\Models\Article::all();
});

// Create an article
/*Route::post('/article', function(Request $request) {
    
    $f = $request->file('thumbnail')->hashName();
    $request->file('thumbnail')->move("upload", $f);

    $article = Article::create([
        "title" => $request->input('title'),
        "content" => $request->input('content'),
        "thumbnailURL" => 'upload/'.$f,
        "mediaType" => $request->input('mediaType'),
        "mediaURL" => $request->input('mediaURL'),
        "leadStory" => $request->input('leadStory')
    ]);

    
    $tmp = $request->input('tags');
    $tags = explode(",", $tmp);
    foreach ($tags as $tag ) {
        $newTag = Tag::find($tag);
        $article->tags()->attach([$newTag->id]);
    }


    return response($article, 201);
});*/
Route::post('/article', [ArticlesController::class, 'create']);

//Get a specific article
Route::get('/article/{id}', function($id){
    return App\Models\Article::findOrFail($id);
});


//Get only articles that are lead story
Route::get('/articles/lead/', function (){
    return App\Models\Article::where('leadStory', true)->get();
});


//Get only articles that are not lead story
Route::get('/articles/notLead', function (){
    return App\Models\Article::where('leadStory', false)->get();
});

//Delete a specific article
/*
Route::delete('/article/{id}', function($id){
    $article = App\Models\Article::find($id);

    if ($article == false) {
        return response("", 204);
    }

    $article->delete();
    return response("", 202);
});
*/

Route::delete('/article/{id}', [ArticlesController::class, 'delete']);

//Get an article by Title
Route::get('/article/title/{title}', function($title){
    return Article::where('title',$title)->get();
});

//Get articles with a specific tag
Route::get('/articles/tag/{id}', function($id){
 $tag = Tag::findOrFail($id);
 return $tag->articles;
});

//Get all Tags
Route::get('/tags', function(){
    return Tag::all();
});

// Get Tags of an article
Route::get('/article/{id}/tags', function($id){
    $a = Article::findOrFail($id);
    return $a->tags;
});

//Create a tag
Route::post('/tag/create', function(Request $request){
    Tag::create(["name" => $request->input('name')]);
});

//Link a tag to an article
Route::get('/link/article/{article_id}/tag/{tag_id}', function($article_id, $tag_id){
    $article = Article::findOrFail($article_id);
    $tag = Tag::findOrFail($tag_id);
    $article->tags()->attach([$tag->id]);
});

//Unlink a tag to an article
Route::get('/unlink/article/{article_id}/tag/{tag_id}', function($article_id, $tag_id){
    $article = Article::findOrFail($article_id);
    $tag = Tag::findOrFail($tag_id);
    $article->tags()->detach([$tag->id]);
});


//Update an article
Route::put('article/{id}', function(Request $request, $id){
    $article = Article::findOrFail($id);
    $article->title = $request->input('title');
    $article->content = $request->input('content');
    $article->save();
});


Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::group([
    'middleware' => 'auth:sanctum',
], function () {
    Route::get('/logout',  [AuthController::class, 'logout']);

    Route::get('/user',  function (Request $request) {
                                return $request->user();
                         });

    Route::put('/updateUsername', [AuthController::class, 'updateUsername']);
    
});