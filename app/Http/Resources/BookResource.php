<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    /**
     * @OA\Schema(
     *     schema="BookResource",
     *     type="object",
     *     @OA\Property(
     *         property="id",
     *         type="integer",
     *         description="Id of the book"
     *     ),
     *     @OA\Property(
     *         property="title",
     *         type="string",
     *         description="Title of the book"
     *     ),
     *     @OA\Property(
     *         property="author",
     *         type="string",
     *         description="Author of the book"
     *     ),
     *     @OA\Property(
     *         property="isbn",
     *         type="string",
     *         description="ISBN of the book"
     *     ),
     *     @OA\Property(
     *         property="publication_date",
     *         type="string",
     *         format="date",
     *         description="Publication Date of the book"
     *     ),
     *     @OA\Property(
     *         property="pages",
     *         type="integer",
     *         description="Pages of the book"
     *     )
     * )
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'author' => $this->author,
            'isbn' => $this->isbn,
            'publication_date' => $this->publication_date,
            'pages' => $this->pages,
        ];
    }
}
