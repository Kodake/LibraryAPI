import { makeAutoObservable, observable, runInAction } from "mobx";
import { BookDTO } from "../classes/appClasses";
import axios from "axios";

import.meta.env.VITE_API_URL;

class ClienteStore {
    totalPages = 0;
    pageNumber = 1;
    pageSize = 10;
    book: BookDTO = {
        id: 0,
        title: "",
        author: "",
        isbn: "",
        publication_date: "",
        pages: 0,
    };
    books: BookDTO[] = [];
    isValid: boolean = false;
    isLoading: boolean = false;
    focusInput: boolean = false;

    constructor() {
        makeAutoObservable(this, {
            book: observable,
            isLoading: observable,
            focusInput: observable,
        });
    }

    bookInitial: BookDTO = {
        id: 0,
        title: "",
        author: "",
        isbn: "",
        publication_date: "",
        pages: 0,
    };

    limpiar = () => {
        this.setBook(this.bookInitial);
    };

    setBook(book: BookDTO) {
        this.book = book;
    }

    setBooks(books: BookDTO[]) {
        this.books = books;
    }

    setIsValid(isValid: boolean) {
        this.isValid = isValid;
    }

    setIsLoading(isLoading: boolean) {
        this.isLoading = isLoading;
    }

    setFocusInput(focusInput: boolean) {
        this.focusInput = focusInput;
    }

    setTotalPages(totalPages: number) {
        this.totalPages = totalPages;
    }

    setCurrentPage(pageNumber: number) {
        this.pageNumber = pageNumber;
    }

    async listarPaginado(pageNumber: number, pageSize: number): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/books?page=${pageNumber}&size=${pageSize}`;

        await axios
            .get(url)
            .then((resp) => {
                debugger;
                const data = resp.data.data;
                this.setBooks(data);
                this.setTotalPages(resp.data.last_page);

                runInAction(() => {
                    this.setBooks(data);
                    this.setTotalPages(resp.data.last_page);
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async eliminar(id: number): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/books/${id}`;

        try {
            await axios.delete(url);

            await this.listarPaginado(this.pageNumber, this.pageSize);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const clienteStore = new ClienteStore();
export default clienteStore;
