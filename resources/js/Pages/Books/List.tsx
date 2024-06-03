import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import useBooks from "@/hooks/useBooks";
import store from "../../store/bookStore";
import { observer } from "mobx-react";

const List = ({ auth }: PageProps) => {
    const { cargarListaPaginada, handlePageChange, handleBookSelected, handleDeleteConfirmation } = useBooks();

    cargarListaPaginada();

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Books
                </h2>
            }
        >
            <Head title="Books" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white rounded-lg shadow">
                            <div className="flex justify-end mb-4">
                                <Link href={route('add')} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                                    Add book
                                </Link>
                            </div>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {"ID"}
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {"Title"}
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {"Author"}
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {"ISBN"}
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {"Pages"}
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {"Actions"}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {store.books.length > 1 ? (
                                        store.books.map((book) => (
                                            <tr key={book.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {book.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {book.title}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {book.author}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {book.isbn}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {book.pages}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleBookSelected(book.id)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        {"Edit"}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteConfirmation(book.id)}
                                                        className="ml-2 text-red-600 hover:text-red-900"
                                                    >
                                                        {"Delete"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-500"
                                            >
                                                No Data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {store.totalPages > 0 && (
                                <nav
                                    aria-label="Page navigation"
                                    className="mt-4 text-center"
                                >
                                    <ul className="inline-flex -space-x-px">
                                        <li>
                                            <button
                                                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                                onClick={() =>
                                                    handlePageChange(1)
                                                }
                                                disabled={store.pageNumber === 1}
                                            >
                                                First
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                                onClick={() =>
                                                    handlePageChange(store.pageNumber - 1)
                                                }
                                                disabled={store.pageNumber === 1}
                                            >
                                                Previous
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                                onClick={() =>
                                                    handlePageChange(store.pageNumber + 1)
                                                }
                                                disabled={store.pageNumber === store.totalPages}
                                            >
                                                Next
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                                onClick={() =>
                                                    handlePageChange(store.totalPages)
                                                }
                                                disabled={store.pageNumber === store.totalPages}
                                            >
                                                Last
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default observer(List);