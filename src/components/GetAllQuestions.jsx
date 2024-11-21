import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteQuestion from "./DeleteQuestion";

const GetAllQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get("https://eduacers-backend.onrender.com/questions");
                setQuestions(response.data);
            } catch (error) {
                setError(
                    error.response ? error.response.data : "An error occurred while fetching data"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    if (loading) return <p className="text-gray-500 text-lg">Loading...</p>;
    if (error) return <p className="text-red-500 text-lg">Error: {error}</p>;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-4">All Questions</h1>
            <ul className="space-y-4">
                {questions.map((question) => (
                    <li key={question._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow transition-transform transform hover:scale-105">
                        <div>
                            <h2 className="font-semibold text-xl">{question.title}</h2>
                            <Link to={`/questions/${question._id}`} className="text-blue-500 hover:underline">View</Link>
                            <Link to={`/update/${question._id}`} className="ml-4 text-blue-500 hover:underline">Update</Link>
                        </div>
                        <DeleteQuestion
                            id={question._id}
                            onDeleteSuccess={() => setQuestions((prev) => prev.filter(q => q._id !== question._id))} 
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetAllQuestions;