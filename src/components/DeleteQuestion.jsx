import React from 'react';
import axios from 'axios';

const DeleteQuestion = ({ id, onDeleteSuccess }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`https://eduacers-backend.onrender.com/questions/${id}`);
            onDeleteSuccess();
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    return (
        <button 
            onClick={handleDelete} 
            className="ml-2 bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-500 transition duration-200"
        >
            Delete Question
        </button>
    );
};

export default DeleteQuestion;