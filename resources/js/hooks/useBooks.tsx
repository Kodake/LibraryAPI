import store from "../store/bookStore";
import { useEffect } from "react";
import Swal from 'sweetalert2';

const useBooks = () => {
    const cargarListaPaginada = () => {
        useEffect(() => {
            store.listarPaginado(store.pageNumber, store.pageSize);
        }, [store.pageNumber, store.pageSize]);
    };

    const handleInputBook = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        store.setBook({ ...store.book, [name]: value });
    };

    const handlePageChange = (page: number) => {
        debugger;
        store.setCurrentPage(page);
    };

    const handleClearCliente = () => {
        store.limpiar();
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
            Swal.fire({
                title: 'Eliminado',
                text: 'El registro ha sido eliminado satisfactoriamente.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                allowOutsideClick: false
            });
        }
    };

    return {
        cargarListaPaginada,
        handleInputBook,
        handlePageChange,
        handleClearCliente,
        handleDeleteConfirmation
    };
};

export default useBooks;
