<?php

namespace App\Repositories;

use App\Interfaces\IBookRepository;
use App\Models\Book;

class BookRepository implements IBookRepository
{
    public function paginate($size, $page) {
        return Book::paginate($size, ['*'], 'page', $page);
    }

    public function getById($id) {
        return Book::findOrFail($id);
    }

    public function store(array $data) {
        return Book::create($data);
    }

    public function update(array $data, $id) {
        return Book::whereId($id)->update($data);
    }

    public function delete($id) {
        Book::destroy($id);
    }
}
