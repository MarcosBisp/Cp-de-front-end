import { useEffect, useState } from "react";
import { fetchTargets, Target } from "./api";

export default function Targets() {
  const [targets, setTargets] = useState<Target[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento
  const [error, setError] = useState<string | null>(null); // Estado de erro

  useEffect(() => {
    const getTargets = async () => {
      try {
        const data = await fetchTargets();
        setTargets(data);
      } catch (err) {
        setError("Failed to fetch targets."); // Mensagem de erro
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    };
    getTargets();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Exibe mensagem de carregamento
  }

  if (error) {
    return <div>{error}</div>; // Exibe mensagem de erro
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Targets</h1>
      <ul className="list-disc pl-5">
        {targets.map((target) => (
          <li key={target.id} className="mb-2">
            <a
              href={`/todos/${target.id}`}
              className="text-blue-500 hover:underline"
            >
              {target.name}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="/add-target" // Adicione a página de adição de targets
        className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Target
      </a>
    </div>
  );
}
