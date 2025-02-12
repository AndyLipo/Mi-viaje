import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableTask } from "./SortableTask";

export const Column = ({ id, title, tareas }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div 
      className={`
        flex flex-col 
        rounded-lg 
        bg-gray-100 
        dark:bg-gray-700 
        p-4 
        shadow-md 
        min-h-[440px]
        transition-colors
        duration-200
        ${isOver ? 'bg-gray-200 dark:bg-gray-600' : ''}
      `}
    >
      <h2 className="text-lg font-bold p-2 text-center">{title}</h2>
      <div
        ref={setNodeRef}
        className="flex flex-col gap-4 p-2 min-h-[150px] touch-pan-y"
      >
        <SortableContext 
          items={tareas.map(t => t.id)} 
          strategy={verticalListSortingStrategy}
        >
          {tareas.map((tarea) => (
            <SortableTask key={tarea.id} {...tarea} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};