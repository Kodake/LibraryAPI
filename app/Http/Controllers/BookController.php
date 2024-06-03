<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the books.
     */
    public function index(Request $request)
    {
        $firstPage = 1;
        $maxSize = 10;
        
        $page = $request->query('page', $firstPage);
        $size = $request->query('size', $maxSize);

        $books = Book::paginate($size, ['*'], 'page', $page);

        return response()->json($books);
    }

    /**
     * Store a newly created book in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'required|string|max:13|unique:books,isbn',
            'publication_date' => 'required|date',
            'pages' => 'required|integer|min:1',
        ]);

        $book = Book::create($request->all());

        return response()->json($book, 201);
    }

    /**
     * Display the specified book.
     */
    public function show(Book $book)
    {
        return $book;
    }

    /**
     * Update the specified book in storage.
     */
    public function update(Request $request, Book $book)
    {
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'author' => 'sometimes|required|string|max:255',
            'isbn' => 'sometimes|required|string|max:13|unique:books,isbn,' . $book->id,
            'publication_date' => 'sometimes|required|date',
            'pages' => 'sometimes|required|integer|min:1',
        ]);

        $book->update($request->all());

        return response()->json($book);
    }

    /**
     * Remove the specified book from storage.
     */
    public function destroy(Book $book)
    {
        $book->delete();

        return response()->json(null, 204);
    }
}