const API_URL = "https://todo-caio.azurewebsites.net/api";

// Defina a interface para Target
export interface Target {
  id?: number;
  name: string;
}

// Funções para Targets
export const fetchTargets = async (): Promise<Target[]> => {
  const response = await fetch(`${API_URL}/targets`);
  if (!response.ok) {
    throw new Error("Erro ao buscar targets");
  }
  return response.json();
};

export const fetchTarget = async (id: number): Promise<Target> => {
  const response = await fetch(`${API_URL}/targets/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar target");
  }
  return response.json();
};

export const addTarget = async (targetData: Target): Promise<Target> => {
  const response = await fetch(`${API_URL}/targets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(targetData),
  });
  if (!response.ok) {
    throw new Error("Erro ao adicionar target");
  }
  return response.json();
};

export const editTarget = async (id: number, targetData: Target): Promise<Target> => {
  const response = await fetch(`${API_URL}/targets/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(targetData),
  });
  if (!response.ok) {
    throw new Error("Erro ao editar target");
  }
  return response.json();
};

export const deleteTarget = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/targets/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Erro ao deletar target");
  }
};

// Defina a interface para Todo
export interface Todo {
  id?: number;
  title: string;
}

// Funções para TODOs
export const fetchTodos = async (targetId: number): Promise<Todo[]> => {
  const response = await fetch(`${API_URL}/todos?targetId=${targetId}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar todos");
  }
  return response.json();
};

export const fetchTodo = async (id: number): Promise<Todo> => {
  const response = await fetch(`${API_URL}/todos/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar todo");
  }
  return response.json();
};

export const addTodo = async (todoData: Todo): Promise<Todo> => {
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todoData),
  });
  if (!response.ok) {
    throw new Error("Erro ao adicionar todo");
  }
  return response.json();
};

export const editTodo = async (id: number, todoData: Todo): Promise<Todo> => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todoData),
  });
  if (!response.ok) {
    throw new Error("Erro ao editar todo");
  }
  return response.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/todos/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Erro ao deletar todo");
  }
};
export async function fetchTodosByTargetId(targetId: number): Promise<Todo[]> {
    const response = await fetch(`https://todo-caio.azurewebsites.net/api/todos?targetId=${targetId}`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }

    return response.json();
}
