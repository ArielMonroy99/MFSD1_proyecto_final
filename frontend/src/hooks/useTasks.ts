import { useCallback, useEffect, useMemo, useState } from "react";
import { Task } from "../types/types";
import { toast } from "sonner";
import useAuth from "./useAuth";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuth();

  const getTasks = useCallback(async () => {
    if (!user?.id) return; 
    console.log('obtaining tasks')
    try {
      const res = await fetch(`http://localhost:3001/tarea/usuario/${user.id}`, {
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
  }, [user?.id]); // Se asegura de que no se ejecute sin un `id` válido

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const createTask = useCallback(async (task: Task) => {
    try {
        const res = await fetch("http://localhost:3001/tarea", {
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
        
        // Llamamos a getTasks después de crear la tarea
        await getTasks();
        
    } catch (error) {
        toast.error("Error al crear nueva tarea: " + error);
        return;
    }
}, [getTasks]); // Añadimos getTasks a las dependencias

const memoValue = useMemo(
  () => ({
      tasks,
      getTasks,
      createTask,
  }),
  [tasks, createTask, getTasks]
);

  return memoValue;
};
