import { Navbar } from "../Components/Navbar/Navbar"
import MapImg from '../assets/mapa-mundi.avif'
export const HomePage = () => {
  return (
    <>
       <Navbar /> 
       <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: `url(${MapImg})` }}
      >
        {/* Capa oscura */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Contenido */}
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Bienvenido a tu proximo viaje</h1>
          <p className="text-xl text-white">Planifica tu aventura</p>
        </div>
      </div>

    </>
  )
}
