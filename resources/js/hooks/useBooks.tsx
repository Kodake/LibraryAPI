import useNotifications from "@/utils/useNotifications";
import store from "../store/bookStore";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useForm, usePage } from "@inertiajs/react";

const useBooks = () => {
    const { get } = useForm();
    const { id } = usePage().props;

    const cargarListaPaginada = () => {
        useEffect(() => {
            store.listarPaginado(store.pageNumber, store.pageSize);
        }, [store.pageNumber, store.pageSize]);
    };

    const buscarPorId = () => {
        useEffect(() => {
            if (id !== undefined) {
                store.buscarPorId(Number(id));
            }
        }, [id]);
    };

    const handleInputBook = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "pages") {
            const pagesValue = parseInt(value);
            store.setBook({ ...store.book, [name]: pagesValue });
        }
        store.setBook({ ...store.book, [name]: value });
    };

    const handlePageChange = (page: number) => {
        store.setCurrentPage(page);
    };

    const handleClearBook = () => {
        useEffect(() => {
            return () => {
                store.limpiar();
            };
        }, []);
    };

    const handleSaveBook = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const book = await store.guardar();
        if (book === null) {
            return;
        }
        useNotifications(
            "Guardado",
            "El registro ha sido guardado satisfactoriamente.",
            "success"
        );
        get(route("dashboard"));
    };

    const handleUpdateBook = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const Book = await store.actualizar();
        if (Book === null) {
            return;
        }
        get(route("dashboard"));
        useNotifications(
            "Guardado",
            "El registro ha sido actualizado satisfactoriamente.",
            "success"
        );
    };

    const handleBookSelected = async (id: number) => {
        get(route("edit", id));
    };

    const handleDeleteConfirmation = async (id: number) => {
        const result = await Swal.fire({
            title: "¿Está seguro que desea eliminar este libro?",
            text: "No se puede revertir este cambio",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminarlo",
            allowOutsideClick: false,
        });

        if (result.isConfirmed) {
            store.eliminar(id);
            store.setCurrentPage(0);
            useNotifications(
                "Eliminado",
                "El registro ha sido eliminado satisfactoriamente.",
                "success"
            );
        }
    };

    return {
        cargarListaPaginada,
        buscarPorId,
        handleInputBook,
        handlePageChange,
        handleClearBook,
        handleSaveBook,
        handleUpdateBook,
        handleBookSelected,
        handleDeleteConfirmation,
    };
};

export default useBooks;
