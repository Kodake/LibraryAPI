<?php

namespace App\Interfaces;

interface IBookRepository
{
    public function paginate(int $size, int $page);
    public function getById($id);
    public function store(array $data);
    public function update($id, array $data);
    public function delete($id);
}
