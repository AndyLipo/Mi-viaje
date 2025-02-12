import { 
  DndContext, 
  DragOverlay, 
  pointerWithin,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { 
  verticalListSortingStrategy, 
  arrayMove,
  SortableContext
} from "@dnd-kit/sortable";
import { useState } from "react";
import { Column } from "./Column";
import { CardTarea } from "./CardTarea";

export const KanbanBoard = ({ tareas, setTareas }) => {
  const [activeTarea, setActiveTarea] = useState(null);
  const columns = ["porHacer", "enProceso", "hecho"];

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 100,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragStart = (event) => {
    const { active } = event;
    const draggedTask = tareas.find((task) => task.id === active.id);
    setActiveTarea(draggedTask);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveTarea(null);
      return;
    }

    // Crear una copia del array de tareas para manipular
    let newTareas = [...tareas];
    const activeTask = newTareas.find(task => task.id === active.id);

    if (!activeTask) {
      setActiveTarea(null);
      return;
    }

    // Si se suelta sobre una columna
    if (columns.includes(over.id)) {
      newTareas = newTareas.map(task =>
        task.id === active.id ? { ...task, estado: over.id } : task
      );
    } else {
      // Si se suelta sobre otra tarea
      const overTask = newTareas.find(task => task.id === over.id);
      
      if (overTask) {
        // Si se mueve a una columna diferente
        if (activeTask.estado !== overTask.estado) {
          newTareas = newTareas.map(task =>
            task.id === active.id ? { ...task, estado: overTask.estado } : task
          );
        } else {
          // Reordenar dentro de la misma columna
          const columnTasks = newTareas.filter(task => task.estado === activeTask.estado);
          const oldIndex = columnTasks.findIndex(task => task.id === active.id);
          const newIndex = columnTasks.findIndex(task => task.id === over.id);
          
          if (oldIndex !== newIndex) {
            const reorderedTasks = arrayMove(columnTasks, oldIndex, newIndex);
            newTareas = [
              ...newTareas.filter(task => task.estado !== activeTask.estado),
              ...reorderedTasks
            ];
          }
        }
      }
    }

    // Actualizar el estado con las nuevas tareas
    setTareas(newTareas);
    setActiveTarea(null);
  };

  return (
    <div className="container mx-auto px-2 sm:px-4">
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {columns.map((columnId) => {
            const columnTareas = tareas.filter((task) => task.estado === columnId);
            const title =
              columnId === "porHacer"
                ? "Pendiente"
                : columnId === "enProceso"
                ? "Realizando"
                : "Hecho";
                
            return (
              <Column
                key={columnId}
                id={columnId}
                title={title}
                tareas={columnTareas}
              />
            );
          })}
        </div>

        <DragOverlay>
          {activeTarea ? (
            <div className="transform scale-105 touch-none">
              <CardTarea {...activeTarea} isDragging />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
