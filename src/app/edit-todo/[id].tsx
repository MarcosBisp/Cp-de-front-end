"use client"; // Adicione esta linha

import { useEffect, useState } from "react";
import { editTodo, fetchTodo } from "../api"; // As funções devem ser importadas corretamente

interface Params {
    id: string; // Define o tipo de id como string
}

interface Todo {
    title: string;
}

export default function EditTodo({ params }: { params: Params }) {
    const { id } = params;
    const [todo, setTodo] = useState<Todo>({ title: "" });
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState<string | null>(null); // Estado de erro
    const [success, setSuccess] = useState<string | null>(null); // Estado de sucesso

    useEffect(() => {
        const getTodo = async () => {
            try {
                const data = await fetchTodo(Number(id)); // Converte id para number
                setTodo(data);
            } catch (err) {
                setError("Erro ao carregar o TODO."); // Define mensagem de erro
            } finally {
                setLoading(false); // Finaliza o carregamento
            }
        };
        getTodo();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // Adiciona o tipo para o evento
        e.preventDefault();
        try {
            await editTodo(Number(id), todo); // Converte id para number
            setSuccess("TODO editado com sucesso!"); // Mensagem de sucesso
            setError(null); // Limpa erro anterior
        } catch (err) {
            setError("Erro ao editar o TODO."); // Define mensagem de erro
            setSuccess(null); // Limpa mensagem de sucesso anterior
        }
    };

    if (loading) return <p>Carregando...</p>; // Mensagem de carregamento
    if (error) return <p>{error}</p>; // Mensagem de erro

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={todo.title}
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            />
            <button type="submit">Edit TODO</button>
            {success && <p>{success}</p>} {/* Mensagem de sucesso */}
        </form>
    );
}

