import React, { useState } from "react";
import "./App.css";

const App = () => {
    const initialCards = [
        { title: "Card 1", description: "Description 1", value: "normal" },
        { title: "Card 2", description: "Description 2", value: "important" },
        { title: "Card 3", description: "Description 3", value: "normal" },
    ];

    const [cards, setCards] = useState(initialCards);
    const [newCard, setNewCard] = useState({
        title: "",
        description: "",
        value: "normal",
    });
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        value: "normal",
    });
    const [addForm, setAddForm] = useState(false);
    const toggleAddForm = () => setAddForm(!addForm);
    const handleChange = (e) => {
        setNewCard({ ...newCard, [e.target.name]: e.target.value });
    };
    const handleAdd = (e) => {
        e.preventDefault();
        setCards((prev) => [...prev, newCard]);
        setNewCard({ title: "", description: "", value: "normal" });
        toggleAddForm();
    };

    const [editIndex, setEditIndex] = useState(null);
    const [editForm, setEditForm] = useState(false);
    const toggleEditForm = () => setEditForm(!editForm);
    const startEdit = (index) => {
        setEditIndex(index);
        setFormData(cards[index]);
        setEditForm(true);
    };
    const handleEditChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleEdit = (e) => {
        e.preventDefault();
        setCards((prev) =>
            prev.map((card, idx) => (idx === editIndex ? formData : card))
        );
        setEditIndex(null);
        toggleEditForm();
    };

    const [deleteIndex, setDeleteIndex] = useState(null);
    const [dltForm, setDltForm] = useState(false);
    const toggleDltForm = () => setDltForm(!dltForm);
    const startDelete = (index) => {
        setDeleteIndex(index);
        toggleDltForm();
    };
    const confirmDelete = () => {
        setCards((prev) => prev.filter((_, idx) => idx !== deleteIndex));
        setDeleteIndex(null);
        toggleDltForm();
    };

    return (
        <>
            <div className='navbar flex flex-col justify-center items-center bg-gray-700 text-white p-4'>
                <h1 className='font-bold text-3xl'>Todo List</h1>
                <div className='flex justify-center items-center gap-5 mt-4'>
                    <input
                        type='text'
                        placeholder='Search...'
                        className='p-2 w-[40vw] bg-gray-200 text-black rounded-md'
                    />
                    <button
                        className='border-1 p-2 rounded-xl bg-gray-200 text-black hover:bg-yellow-200 transition duration-200 ease-in-out'
                        onClick={toggleAddForm}
                    >
                        Add New
                    </button>
                </div>
            </div>

            <form
                className={`add fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] bg-white border-2 border-gray-300 rounded-xl shadow-md p-4 flex-col ${
                    addForm ? "flex" : "hidden"
                }`}
            >
                <div
                    className='absolute top-2 right-2 w-6 h-6 border-1 border-gray-200 rounded-full text-sm flex items-center justify-center hover:bg-yellow-200 cursor-pointer'
                    onClick={toggleAddForm}
                >
                    ✕
                </div>
                <h2 className='text-center text-lg mb-5'>Add Task</h2>
                <input
                    type='text'
                    name='title'
                    value={newCard.title}
                    onChange={handleChange}
                    placeholder='title'
                    className='w-full border border-gray-400 rounded-md p-2 mb-5'
                />
                <textarea
                    placeholder='description'
                    name='description'
                    onChange={handleChange}
                    value={newCard.description}
                    className='w-full h-[10vh] border border-gray-400 rounded-md p-2 mb-5'
                />
                <div className='flex justify-between items-center'>
                    <select
                        className='border border-gray-400 rounded-md p-2 mb-5'
                        name='value'
                        value={newCard.value}
                        onChange={handleChange}
                    >
                        <option value='normal'>Normal</option>
                        <option value='important'>Important</option>
                    </select>
                    <button
                        type='submit'
                        onClick={handleAdd}
                        className='border-1 p-2 rounded-xl bg-gray-200 text-black hover:bg-yellow-200 transition duration-200 ease-in-out'
                    >
                        Add
                    </button>
                </div>
            </form>

            <form
                className={`edit fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] bg-white border-2 border-gray-300 rounded-xl shadow-md p-4 flex-col ${
                    editForm ? "flex" : "hidden"
                }`}
            >
                <div
                    className='absolute top-2 right-2 w-6 h-6 border-1 border-gray-200 rounded-full text-sm flex items-center justify-center hover:bg-yellow-200 cursor-pointer'
                    onClick={toggleEditForm}
                >
                    ✕
                </div>
                <h2 className='text-center text-lg mb-5'>Edit Task</h2>
                <input
                    type='text'
                    name='title'
                    value={formData.title}
                    onChange={handleEditChange}
                    placeholder='title'
                    className='w-full border border-gray-400 rounded-md p-2 mb-5'
                />
                <textarea
                    name='description'
                    value={formData.description}
                    onChange={handleEditChange}
                    placeholder='description'
                    className='w-full h-[10vh] border border-gray-400 rounded-md p-2 mb-5'
                />
                <div className='flex justify-between items-center'>
                    <select
                        className='border border-gray-400 rounded-md p-2 mb-5'
                        name='value'
                        value={formData.value}
                        onChange={handleEditChange}
                    >
                        <option value='normal'>Normal</option>
                        <option value='important'>Important</option>
                    </select>
                    <button
                        type='submit'
                        onClick={handleEdit}
                        className='border-1 p-2 rounded-xl bg-gray-200 text-black hover:bg-yellow-200 transition duration-200 ease-in-out'
                    >
                        Save
                    </button>
                </div>
            </form>

            <form
                className={`add fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] bg-white border-2 border-gray-300 rounded-xl shadow-md p-4 flex-col ${
                    dltForm ? "flex" : "hidden"
                }`}
            >
                <h1 className='text-2xl text-center mt-5 pb-7'>
                    Are You Sure?
                </h1>
                <div className='flex gap-2 justify-evenly'>
                    <button
                        className='border-1 p-2 px-6 rounded-xl bg-gray-200 text-black hover:bg-yellow-200 transition duration-200 ease-in-out'
                        onClick={(e) => {
                            e.preventDefault();
                            confirmDelete();
                        }}
                    >
                        Yes
                    </button>
                    <button
                        className='border-1 p-2 px-6 rounded-xl bg-gray-200 text-black hover:bg-yellow-200 transition duration-200 ease-in-out'
                        onClick={(e) => {
                            e.preventDefault();
                            toggleDltForm();
                        }}
                    >
                        No
                    </button>
                </div>
            </form>

            <div className='flex flex-col justify-center items-center'>
                <div className='bg-gray-100 w-[70vw] flex flex-col'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 gap-4'>
                        {cards.map((card, index) => (
                            <div className='bg-white flex flex-col justify-around p-6 mt-3 ml-3.5 rounded-lg shadow-md w-full max-w-sm'>
                                <h2
                                    className={`font-bold text-2xl mb-2 ${
                                        card.value === "important"
                                            ? "text-red-400"
                                            : "text-black"
                                    }`}
                                >
                                    Title: {card.title}
                                </h2>
                                <p className='font-semibold'>Description:</p>
                                <p className='italic m-2'>{card.description}</p>
                                <div className='flex justify-between mt-4'>
                                    <button
                                        className='border-1 p-2 rounded-xl bg-gray-200 text-black hover:bg-yellow-200 transition duration-200 ease-in-out'
                                        onClick={() => startEdit(index)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className='border-1 p-2 rounded-xl bg-gray-200 text-black hover:bg-yellow-200 transition duration-200 ease-in-out'
                                        onClick={() => startDelete(index)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
