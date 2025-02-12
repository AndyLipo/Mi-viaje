import { useState } from 'react';

export const ModalTarea = ({ onAddTask }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = () => {
    if (titulo.trim() && descripcion.trim()) {
      onAddTask({
        id: Date.now().toString(), // Añadir ID único
        titulo,
        descripcion,
        estado: 'porHacer'
      });
      
      setTitulo('');
      setDescripcion('');
      document.getElementById('modal_tareas').close();
    }
  };

  return (
    <div>
      <div>
        <h3 className="font-bold text-lg text-center">Nueva Tarea</h3>
        <label className="form-control w-full max-w-lg max-h-xl pl-12">
          <div className="label text-center">
            <span className="text-md ">Titulo de la tarea</span>
          </div>
          <input 
            type="text" 
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Escribe el Titulo" 
            className="input input-bordered w-full max-w-sm h-8" 
          />
          <div className="label">
            <span className="text-md">Tarea</span>
          </div>
          <textarea 
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="textarea textarea-bordered max-h-xl max-w-sm" 
            placeholder="Escribe la Tarea"
          />
        </label>
        <div className="modal-action">
          <form method="dialog" className="w-full flex justify-around items-end">
            <button 
              className="btn btn-success" 
              type="button"
              onClick={handleSubmit}
            >
              Guardar
            </button>
            <button 
              className="btn" 
              type="button"
              onClick={() => {
                setTitulo('');
                setDescripcion('');
                document.getElementById('modal_tareas').close();
              }}
            >
              Cerrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};