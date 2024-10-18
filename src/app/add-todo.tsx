"use client"; // Adicione esta linha

import { useState } from "react";
import { addTodo } from "./api"; // Certifique-se de que a função addTodo esteja definida em api.ts

export default function AddTodo() {
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null); // Estado para erro
    const [success, setSuccess] = useState<string | null>(null); // Estado para sucesso

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // Tipando o evento
        e.preventDefault();
        setError(null); // Limpa o erro anterior
        setSuccess(null); // Limpa a mensagem de sucesso anterior

        try {
            await addTodo({ title });
            setSuccess("TODO adicionado com sucesso!"); // Mensagem de sucesso
            setTitle(""); // Limpa o campo de entrada após o envio
        } catch (err) {
            setError("Erro ao adicionar o TODO."); // Mensagem de erro
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="TODO Title"
                required // Campo obrigatório
            />
            <button type="submit">Add TODO</button>
            {error && <p className="text-red-500">{error}</p>} {/* Mensagem de erro */}
            {success && <p className="text-green-500">{success}</p>} {/* Mensagem de sucesso */}
        </form>
    );
}
