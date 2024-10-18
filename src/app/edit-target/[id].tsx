"use client"; // Adicione esta linha

import { useEffect, useState } from "react";
import { editTarget, fetchTarget } from "../api";

interface EditTargetProps {
    params: {
        id: string; // O id ainda é uma string aqui
    };
}

export default function EditTarget({ params }: EditTargetProps) {
    const { id } = params;
    const [target, setTarget] = useState<{ name: string }>({ name: "" });
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState<string | null>(null); // Estado de erro
    const [success, setSuccess] = useState<string | null>(null); // Estado de sucesso

    useEffect(() => {
        const getTarget = async () => {
            try {
                const data = await fetchTarget(Number(id)); // Convertendo para number
                setTarget(data);
            } catch (err) {
                setError("Erro ao carregar o target."); // Define mensagem de erro
            } finally {
                setLoading(false); // Finaliza o carregamento
            }
        };
        getTarget();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await editTarget(Number(id), target); // Convertendo para number
            setSuccess("Target editado com sucesso!"); // Mensagem de sucesso
            setError(null); // Limpa erro anterior
        } catch (err) {
            setError("Erro ao editar o target."); // Define mensagem de erro
            setSuccess(null); // Limpa mensagem de sucesso anterior
        }
    };

    if (loading) return <p>Carregando...</p>; // Mensagem de carregamento
    if (error) return <p>{error}</p>; // Mensagem de erro

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={target.name}
                onChange={(e) => setTarget({ ...target, name: e.target.value })}
            />
            <button type="submit">Edit Target</button>
            {success && <p>{success}</p>} {/* Mensagem de sucesso */}
        </form>
    );
}
