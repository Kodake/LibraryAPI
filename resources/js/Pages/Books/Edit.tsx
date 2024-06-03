import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import useBooks from "@/hooks/useBooks";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import store from '../../store/bookStore';
import { observer } from "mobx-react";

const Edit = ({ auth }: PageProps) => {
    const {buscarPorId, handleInputBook, handleUpdateBook, handleClearBook} = useBooks();

    buscarPorId();

    handleClearBook();

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
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">
                                Update Book
                            </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Update an existing book with the information below.
                            </p>
                        </header>

                        <section className={"max-w-xl"}>
                            <form onSubmit={handleUpdateBook} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="title" value="Title" />

                                    <TextInput
                                        id="title"
                                        name="title"
                                        onChange={handleInputBook}
                                        type="text"
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        value={store.book.title || ''}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="author"
                                        value="Author"
                                    />

                                    <TextInput
                                        id="author"
                                        name="author"
                                        onChange={handleInputBook}
                                        type="text"
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        value={store.book.author || ''}
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="isbn" value="ISBN" />

                                    <TextInput
                                        id="isbn"
                                        name="isbn"
                                        onChange={handleInputBook}
                                        type="text"
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        value={store.book.isbn || ''}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="publication_date"
                                        value="Publication Date"
                                    />

                                    <TextInput
                                        id="publication_date"
                                        name="publication_date"
                                        onChange={handleInputBook}
                                        type="text"
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        value={store.book.publication_date || ''}
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="pages" value="Pages" />

                                    <TextInput
                                        id="pages"
                                        name="pages"
                                        onChange={handleInputBook}
                                        type="number"
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        value={store.book.pages || 0}
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton>Save</PrimaryButton>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default observer(Edit);
