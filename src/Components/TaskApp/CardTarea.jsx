export const CardTarea = ({ titulo, descripcion, isDragging }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 transition-transform duration-200 ${
        isDragging ? "opacity-60 scale-95" : "hover:shadow-lg hover:scale-[1.02]"
      } cursor-move border border-gray-200 dark:border-gray-700`}
    >
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 break-words">
        {titulo}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 break-words overflow-auto max-h-40">
        {descripcion}
      </p>
    </div>
  );
};