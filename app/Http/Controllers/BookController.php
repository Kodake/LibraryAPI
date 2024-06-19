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

/**
 * @OA\Info(
 *      title="API Swagger",
 *      version="1.0",
 *      description="API CRUD Books"
 * )
 *
 * @OA\Server(url="http://localhost:8040")
 */
class BookController extends Controller
{
    private IBookRepository $bookRepository;

    public function __construct(IBookRepository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    /**
     * @OA\Get(
     *     path="/api/books",
     *     tags={"Books"},
     *     summary="Get paginated list of books",
     *     description="Returns a paginated list of books",
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Page number",
     *         required=false,
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Parameter(
     *         name="size",
     *         in="query",
     *         description="Number of books per page",
     *         required=false,
     *         @OA\Schema(type="integer", default=10)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="current_page", type="integer"),
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/BookResource")
     *             ),
     *             @OA\Property(property="first_page_url", type="string", format="url"),
     *             @OA\Property(property="from", type="integer"),
     *             @OA\Property(property="last_page", type="integer"),
     *             @OA\Property(property="last_page_url", type="string", format="url"),
     *             @OA\Property(
     *                 property="links",
     *                 type="array",
     *                 @OA\Items(
     *                     @OA\Property(property="url", type="string", nullable=true),
     *                     @OA\Property(property="label", type="string"),
     *                     @OA\Property(property="active", type="boolean")
     *                 )
     *             ),
     *             @OA\Property(property="next_page_url", type="string", format="url", nullable=true),
     *             @OA\Property(property="path", type="string", format="url"),
     *             @OA\Property(property="per_page", type="integer"),
     *             @OA\Property(property="prev_page_url", type="string", format="url", nullable=true),
     *             @OA\Property(property="to", type="integer"),
     *             @OA\Property(property="total", type="integer")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad request"
     *     )
     * )
     */
    public function index(Request $request)
    {
        $firstPage = 1;
        $maxSize = 10;

        $page = $request->query('page', $firstPage);
        $size = $request->query('size', $maxSize);

        $books = $this->bookRepository->paginate($size, $page);

        return response()->json($books);
    }


    /**
     * @OA\Get(
     *     path="/api/books/{id}",
     *     tags={"Books"},
     *     summary="Get book information",
     *     description="Get book details by ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/BookResource")
     *     )
     * )
     */
    public function show(string $id)
    {
        $book = $this->bookRepository->getById($id);
        return ApiResponseHelper::sendResponse(new BookResource($book), '', 200);
    }

    /**
     * @OA\Post(
     *     path="/api/books",
     *     tags={"Books"},
     *     summary="Create a new book",
     *     description="Store new book details",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="title", type="string", description="Title of the book"),
     *             @OA\Property(property="author", type="string", description="Author of the book"),
     *             @OA\Property(property="isbn", type="string", description="ISBN of the book"),
     *             @OA\Property(property="publication_date", type="string", format="date", description="Publication Date of the book"),
     *             @OA\Property(property="pages", type="integer", description="Pages of the book")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Record created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/BookResource")
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad request"
     *     )
     * )
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
            return ApiResponseHelper::sendResponse(new BookResource($book), 'Record created successfully', 201);
        } catch (\Exception $ex) {
            DB::rollback();
            return ApiResponseHelper::rollback($ex);
        }
    }

    /**
     * @OA\Put(
     *     path="/api/books/{id}",
     *     tags={"Books"},
     *     summary="Update book information",
     *     description="Update book details by ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="title", type="string", description="Title of the book"),
     *             @OA\Property(property="author", type="string", description="Author of the book"),
     *             @OA\Property(property="isbn", type="string", description="ISBN of the book"),
     *             @OA\Property(property="publication_date", type="string", format="date", description="Publication Date of the book"),
     *             @OA\Property(property="pages", type="integer", description="Pages of the book")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Record updated successfully"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad request"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Resource not found"
     *     )
     * )
     */
    public function update(UpdateBookRequest $request, string $id)
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
            $this->bookRepository->update($data, $id);
            DB::commit();
            return ApiResponseHelper::sendResponse(null, 'Record updated successfully', 200);
        } catch (\Exception $ex) {
            DB::rollBack();
            return ApiResponseHelper::rollback($ex);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/books/{id}",
     *     tags={"Books"},
     *     summary="Delete book record",
     *     description="Delete book by ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Record deleted successfully"
     *     )
     * )
     */
    public function destroy($id)
    {
        $this->bookRepository->delete($id);
        return ApiResponseHelper::sendResponse(null, 'Record deleted successful');
    }
}
