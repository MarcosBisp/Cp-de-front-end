"use client"; // Adicione esta linha

import Targets from './targets'; // Ajuste o caminho conforme necessário
import AddTarget from './add-target'; // Ajuste o caminho conforme necessário
import AddTodo from './add-todo'; // Ajuste o caminho conforme necessário

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Minhas Tarefas</h1>
      
      <div className="mb-6">
        <AddTarget />
      </div>

      <div className="mb-6">
        <Targets />
      </div>

      <div className="mb-6">
        <AddTodo />
      </div>
    </div>
  );
}
