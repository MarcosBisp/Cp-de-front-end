"use client"; // Adicione esta linha

import { useEffect, useState } from "react";
import { fetchTodosByTargetId, Todo } from "../api"; // Certifique-se de que a função está definida corretamente

interface Params {
    id: string; // ID do target como string
}

export default function TargetTodos({ params }: { params: Params }) {
    const { id } = params;
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getTodos = async () => {
            try {
                const data = await fetchTodosByTargetId(Number(id)); // Convertendo id para number
                setTodos(data);
            } catch (err) {
                setError("Failed to fetch todos."); // Mensagem de erro
            } finally {
                setLoading(false); // Finaliza o estado de carregamento
            }
        };
        getTodos();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>; // Exibe mensagem de carregamento
    }

    if (error) {
        return <div>{error}</div>; // Exibe mensagem de erro
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">TODOs for Target ID: {id}</h1>
            <ul className="list-disc pl-5">
                {todos.length === 0 ? (
                    <li>No TODOs available for this target.</li>
                ) : (
                    todos.map((todo) => (
                        <li key={todo.id} className="mb-2">
                            {todo.title}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
