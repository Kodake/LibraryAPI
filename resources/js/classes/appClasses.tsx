export class BookDTO {
    id: number;
    title: string;
    author: string;
    isbn: string;
    publication_date: string;
    pages: number;
  
    constructor(
        id: number,
        title: string,
        author: string,
        isbn: string,
        publication_date: string,
        pages: number
    ) {
      this.id = id;
      this.title = title;
      this.author = author;
      this.isbn = isbn;
      this.publication_date = publication_date;
      this.pages = pages;
    }
  }