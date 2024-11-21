import { useState } from 'react';
import axios from 'axios';

const AddQuestion = ({ onQuestionAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('https://eduacers-backend.onrender.com/questions', {
                title,
                description
            });
            onQuestionAdded();
            setTitle('');
            setDescription('');
        } catch (error) {
            setError('Error adding question: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-6 transition-transform transform hover:scale-105">
            {error && <p className="text-red-500">{error}</p>}
            <h2 className="text-lg font-semibold mb-4">Add a Question</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Question Title"
                required
                className="w-full p-3 mb-4 border-2 border-gray-300 rounded focus:outline-none focus:border-green-500"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Question Description"
                required
                className="w-full p-3 mb-4 border-2 border-gray-300 rounded focus:outline-none focus:border-green-500"
            />
            <button 
                type="submit" 
                className="w-full bg-yellow-600 text-white font-semibold py-3 rounded hover:bg-yellow-500 transition duration-200"
            >
                Add Question
            </button>
        </form>
    );
};

export default AddQuestion;