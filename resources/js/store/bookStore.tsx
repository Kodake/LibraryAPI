import { makeAutoObservable, observable, runInAction } from "mobx";
import { BookDTO } from "../classes/appClasses";
import axios from "axios";
import useNotifications from "@/utils/useNotifications";
import { renderToString } from "react-dom/server";
import {
    Key,
    ReactElement,
    JSXElementConstructor,
    ReactNode,
    ReactPortal,
} from "react";

import.meta.env.VITE_API_URL;

class BookStore {
    totalPages = 0;
    pageNumber = 1;
    pageSize = 5;
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
        const url = `${
            import.meta.env.VITE_API_URL
        }/books?page=${pageNumber}&size=${pageSize}`;

        await axios
            .get(url)
            .then((resp) => {
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

    async buscarPorId(id: number): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/books/${id}`;

        await axios
            .get(url)
            .then((resp) => {
                const data = resp.data;
                this.setBook(data);

                runInAction(() => {
                    this.setBook(data);
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async guardar(): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/books`;

        try {
            await axios.post(url, this.book);

            this.limpiar();
            await this.listarPaginado(this.pageNumber, this.pageSize);
        } catch (error: any) {
            const validationError: Record<string, string[]> =
                error.response.data.errors;

            const errorMessages = Object.entries(validationError).map(
                ([field, messages]) => (
                    <li key={field} className="border-0 text-start">
                        {messages.join(", ")}
                    </li>
                )
            );

            const errorMessage = renderToString(<ul>{errorMessages}</ul>);

            useNotifications("Validation error", errorMessage, "error");

            throw error;
        }
    }

    async actualizar(): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/books/${this.book.id}`;

        try {
            await axios.put(url, this.book);

            this.limpiar();
            await this.listarPaginado(this.pageNumber, this.pageSize);
        } catch (error: any) {
            useNotifications("Error", error.response.data, "error");
            throw error;
        }
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

const bookStore = new BookStore();
export default bookStore;
