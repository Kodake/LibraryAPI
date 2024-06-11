<?php

namespace App\Interfaces;

interface IBookRepository
{
    public function paginate($size, $page);
    public function getById($id);
    public function store(array $data);
    public function update(array $data, $id);
    public function delete($id);
}
