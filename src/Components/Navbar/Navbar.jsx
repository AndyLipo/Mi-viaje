import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar el dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Cerrar el dropdown si se hace clic afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 w-full z-50">
      <div className="navbar bg-slate-800/90 backdrop-blur-md shadow-lg">
        <div className="navbar-start">
          <div className="dropdown relative">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle text-white"
              onClick={toggleDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            {isOpen && (
              <ul
                tabIndex={0}
                className="absolute left-0 top-12 w-56 bg-slate-800/95 backdrop-blur-md rounded-lg shadow-xl text-white p-3 space-y-2
                          md:w-64 md:top-14"
                onClick={() => setIsOpen(false)}
              >
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/tasks">Organizador</NavLink>
                </li>
                <li>
                  <NavLink to="/map">Mapa</NavLink>
                </li>
                <li>
                  <NavLink to="/calculator">Calculadora de consumo</NavLink>
                </li>
                <li>
                  <NavLink to="/clima">Clima</NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="navbar">
          <NavLink 
            to="/" 
            className="btn btn-ghost text-base sm:text-lg md:text-xl lg:text-2xl text-white ml-3 sm:ml-20 md:ml-24 lg:ml-28"
          >
            Mi Primer viaje
          </NavLink>
        </div>
      </div>
    </div>
  );
};
