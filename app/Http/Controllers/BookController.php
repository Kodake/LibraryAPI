<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Http\Resources\BookResource;
use App\Interfaces\IBookRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookController extends Controller
{
    private IBookRepository $bookRepository;

    public function __construct(IBookRepository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    /**
     * Display a listing of the books.
     */
    public function index(Request $request)
    {
        $firstPage = 1;
        $maxSize = 5;

        $page = $request->query('page', $firstPage);
        $size = $request->query('size', $maxSize);

        $books = $this->bookRepository->paginate($size, $page);

        // return ApiResponseHelper::sendResponse(BookResource::collection($books), '', 200);
        return response()->json($books);
    }

    /**
     * Display the specified book.
     */
    public function show($id)
    {
        $book = $this->bookRepository->getById($id);
        return ApiResponseHelper::sendResponse(new BookResource($book), '', 200);
    }

    /**
     * Store a newly created book in storage.
     */
    public function store(StoreBookRequest $request)
    {
        $data = [
            'title' => $request->title,
            'author' => $request->author,
            'isbn' => $request->isbn,
            'publication_date' => $request->publication_date,
            'pages' => $request->pages,
        ];

        DB::beginTransaction();
        try {
            $book = $this->bookRepository->store($data);
            DB::commit();
            return ApiResponseHelper::sendResponse(new BookResource($book, 'Record created successful', 201));
        } catch (\Exception $ex) {
            DB::rollback();
            return ApiResponseHelper::rollback($ex);
        }
    }

    /**
     * Update the specified book in storage.
     */
    public function update(UpdateBookRequest $request, $id)
    {
        $data = [
            'title' => $request->title,
            'author' => $request->author,
            'isbn' => $request->isbn,
            'publication_date' => $request->publication_date,
            'pages' => $request->pages,
        ];

        DB::beginTransaction();
        try {
            $book = $this->bookRepository->update($data, $id);
            DB::commit();
            return ApiResponseHelper::sendResponse(new BookResource($book, 'Record updated successful', 200));
        } catch (\Exception $ex) {
            DB::rollback();
            return ApiResponseHelper::rollback($ex);
        }
    }

    /**
     * Remove the specified book from storage.
     */
    public function destroy($id)
    {
        $this->bookRepository->delete($id);
        return ApiResponseHelper::sendResponse(null, 'Record deleted successful');
    }
}
