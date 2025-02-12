const RouteButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 w-full sm:w-auto mx-auto md:mx-0"
    >
      Trazar Ruta
    </button>
  );
};

export default RouteButton;

