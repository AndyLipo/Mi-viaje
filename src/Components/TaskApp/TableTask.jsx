import { CardTarea } from './CardTarea';

export const TableTask = ({ tareas, setTareas }) => {
  const tareasPorHacer = tareas.filter(tarea => tarea.estado === 'porHacer');
  const tareasEnProceso = tareas.filter(tarea => tarea.estado === 'enProceso');
  const tareasHechas = tareas.filter(tarea => tarea.estado === 'hecho');

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-3 gap-4">
        {/* Columna Por Hacer */}
        <div className="flex flex-col">
          <h2 className="text-md font-bold p-4 text-center">Por Hacer</h2>
          <div className="flex flex-col gap-4 p-4">
            {tareasPorHacer.map((tarea, index) => (
              <CardTarea 
                key={`porHacer-${index}`}
                titulo={tarea.titulo} 
                descripcion={tarea.descripcion} 
              />
            ))}
          </div>
        </div>

        {/* Columna En Proceso */}
        <div className="flex flex-col">
          <h2 className="text-md font-bold p-4 text-center">En Proceso</h2>
          <div className="flex flex-col gap-4 p-4">
            {tareasEnProceso.map((tarea, index) => (
              <CardTarea 
                key={`enProceso-${index}`}
                titulo={tarea.titulo} 
                descripcion={tarea.descripcion} 
              />
            ))}
          </div>
        </div>

        {/* Columna Hecho */}
        <div className="flex flex-col">
          <h2 className="text-md font-bold p-4 text-center">Hecho</h2>
          <div className="flex flex-col gap-4 p-4">
            {tareasHechas.map((tarea, index) => (
              <CardTarea 
                key={`hecho-${index}`}
                titulo={tarea.titulo} 
                descripcion={tarea.descripcion} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
