<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Article;
use App\Models\Tag;

class ArticlesController extends Controller
{

    public function create(Request $request){
    

        $path = $request->file('thumbnailURL')->store();
        $path2 = $request->file('mediaURL')->store();
        
    $article = Article::create([
        "title" => $request->input('title'),
        "content" => $request->input('content'),
        "thumbnailURL" => "storage/" . $path,
        "mediaType" => $request->input('mediaType'),
        "mediaURL" => "storage/" . $path2,
        "leadStory" => $request->input('leadStory')
    ]);


    return response($article, 201);
    }


    public function getArticleById($id){
        return App\Models\Article::findOrFail($id);
    }
    
    public function getArticleByTag($id){
        $tag = Tag::findOrFail($id);
        return $tag->articles;
    }

    public function getLeadArticles(){
        return App\Models\Article::where('leadStory', true)->get();
    }


    public function getNonLeadArticles(){
        return App\Models\Article::where('leadStory', false)->get();
    }

    
    public function update(Request $request, $id){
        $article = Article::findOrFail($id);
        $article->title = $request->input('title');
        $article->content = $request->input('content');
        $article->save();
    }

    public function delete($id){
        $article = Article::find($id);

        if ($article == false) {
            return response("", 204);
        }
    
        $article->delete();
        return response("", 202);
    }

}