import { useCallback, useEffect, useMemo, useState } from "react";
import { QueryParams, Task } from "../types/types";
import { toast } from "sonner";
import { Endpoints } from "../constants/constants";
import axios from "axios";

export const useTasks = () => {
  const API_HOST = import.meta.env.VITE_BASE_URL
  const [tasks, setTasks] = useState<Task[]>([]);
  const getTasks = useCallback(async (params?: QueryParams) => {; 
    
    let url = `${API_HOST}${Endpoints.TASKS}`;
    
    if (params) {
      const queryParams = new URLSearchParams();
      if (params.search) queryParams.append('search', params.search);
      if (params.dateAfter) queryParams.append('dateAfter', params.dateAfter);
      if (params.dateBefore) queryParams.append('dateBefore', params.dateBefore);
      if (params.status) queryParams.append('status', params.status);
      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    
    try {
      const response = await axios.get(url, { withCredentials: true });
  
      if (response.status === 200) {
        setTasks(response.data.rows);
      } else {
        toast.error("Error al obtener tareas");
      }
    } catch (error) {
      toast.error("Error al obtener tareas: " + error);
    }
  }, [API_HOST]);

  useEffect(() => {
    getTasks();
  }, [getTasks, API_HOST]);

  const createTask = useCallback(async (task: Task) => {
    try {

        const response = await axios.post(`${API_HOST}${Endpoints.TASKS}`, task, {
          withCredentials: true,
        } )

        if (response.status !== 200) {
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
    const response = await axios.put(`${API_HOST}${Endpoints.TASKS}/${task.id}`, task, {
      withCredentials: true,
    });
    if (response.status !== 200) {
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
    const response = await axios.delete(`${API_HOST}${Endpoints.TASKS}/${id}`, {
      withCredentials: true,
    });

    if(response.status !== 200) {
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
    const response = await axios.put(`${API_HOST}${Endpoints.TASKS}/finish/${id}`, {}, {
      withCredentials: true,
    });

    if(response.status !== 200) {
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
