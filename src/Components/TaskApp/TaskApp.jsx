import { useState } from 'react';
import { ModalTarea } from './ModalTarea';
import { KanbanBoard } from './KanbanBoard ';


export const TaskApp = () => {
  const [tareas, setTareas] = useState([]);

  const handleAddTask = (nuevaTarea) => {
    // Es importante generar un id único para cada tarea (por ejemplo, usando Date.now() o una librería como uuid)
    setTareas([...tareas, nuevaTarea]);
  };

  return (
    <div className="mt-24">
      <nav>
        <div className="navbar bg-base-100">
          <div className="flex-1 justify-center">
            <a className="btn btn-ghost text-xl">Organizador</a>
          </div>
          <div className="flex-none">
            <button
              className="btn"
              onClick={() => document.getElementById('modal_tareas').showModal()}
            >
              Agregar Tarea
            </button>
          </div>
        </div>
      </nav>

      <dialog id="modal_tareas" className="modal">
        <div className="modal-box">
          <ModalTarea onAddTask={handleAddTask} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <KanbanBoard tareas={tareas} setTareas={setTareas} />
    </div>
  );
};
