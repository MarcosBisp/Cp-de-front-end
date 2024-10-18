"use client"; // Adicione esta linha

import { useState } from "react";
import { addTarget } from "./api";

export default function AddTarget() {
    const [name, setName] = useState("");
    const [error, setError] = useState<string | null>(null); // Estado para erro
    const [success, setSuccess] = useState<string | null>(null); // Estado para sucesso

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // Tipando o evento
        e.preventDefault();
        setError(null); // Limpa o erro anterior
        setSuccess(null); // Limpa a mensagem de sucesso anterior

        try {
            await addTarget({ name });
            setSuccess("Target adicionado com sucesso!"); // Mensagem de sucesso
            setName(""); // Limpa o campo de entrada após o envio
        } catch (err) {
            setError("Erro ao adicionar o Target."); // Mensagem de erro
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Target Name"
                required // Campo obrigatório
            />
            <button type="submit">Add Target</button>
            {error && <p className="text-red-500">{error}</p>} {/* Mensagem de erro */}
            {success && <p className="text-green-500">{success}</p>} {/* Mensagem de sucesso */}
        </form>
    );
}
