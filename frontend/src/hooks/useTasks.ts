import { useCallback, useEffect, useMemo, useState } from "react";
import { QueryParams, Task } from "../types/types";
import { toast } from "sonner";
import useAuth from "./useAuth";

export const useTasks = () => {
  const API_HOST = import.meta.env.VITE_BASE_URL
  console.log(API_HOST)
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuth();
  const getTasks = useCallback(async (params?: QueryParams) => {
    if (!user?.id) return; 
    
    let url = `${API_HOST}/tarea/usuario/${user.id}`;
    
    if (params) {
      const queryParams = new URLSearchParams();
      if (params.filtro) queryParams.append('filtro', params.filtro);
      if (params.fechaDespuesDe) queryParams.append('fechaDespuesDe', params.fechaDespuesDe);
      if (params.fechaAntesDe) queryParams.append('fechaAntesDe', params.fechaAntesDe);
      if (params.estado) queryParams.append('estado', params.estado.toString());
      

      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (res.ok) {
        const json = await res.json();
        setTasks(json.rows);
      } else {
        toast.error("Error al obtener tareas");
      }
    } catch (error) {
      toast.error("Error al obtener tareas: " + error);
    }
  }, [user?.id,API_HOST]);

  useEffect(() => {
    getTasks();
  }, [getTasks, API_HOST]);

  const createTask = useCallback(async (task: Task) => {
    try {
        const res = await fetch(`${API_HOST}/tarea`, {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error("Error al crear nueva tarea");
        }
        toast.success("Tarea creada");
        
        await getTasks();
        
    } catch (error) {
        toast.error("Error al crear nueva tarea: " + error);
        return;
    }
}, [getTasks, API_HOST]); 

const updateTask = useCallback(async (task: Task) => {
  try {
    const res = await fetch(`${API_HOST}/tarea/${task.id}`, {
        method: "PUT",
        body: JSON.stringify(task),
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Error al actualizar tarea");
    }
    toast.success("Tarea actualizada");
    await getTasks();
    
} catch (error) {
    toast.error("Error al actualizar tarea: " + error);
    return;
}
},[getTasks, API_HOST]);

const deleteTask = useCallback(async (id: number) => {
  try {
    const res = await fetch(`${API_HOST}/tarea/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    if(!res.ok) {
      throw new Error("Error al eliminar tarea");
    }
    toast.success("Tarea eliminada");
    await getTasks();
  } catch (error) {
    toast.error("Error al eliminar tarea: " + error);
    return;
  }
},[getTasks, API_HOST])

const finishTask = useCallback(async (id: number) => {
  try {
    const res = await fetch(`${API_HOST}/tarea/terminar/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    if(!res.ok) {
      throw new Error("La tarea no esta en progreso");
    }
    toast.success("Tarea finalizada");
    await getTasks();
  } catch (error) {
    toast.error("Error al finalizar tarea: " + error);
    return;
  }
},[getTasks, API_HOST])   


const memoValue = useMemo(
  () => ({
      tasks,
      getTasks,
      createTask,
      updateTask,
      deleteTask,
      finishTask
  }),
  [tasks, createTask, getTasks, updateTask, deleteTask,finishTask]
);

  return memoValue;
};
