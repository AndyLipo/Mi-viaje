import { useState } from 'react';

const NaftaCalc = () => {
  const [distancia, setDistancia] = useState('');
  const [consumo, setConsumo] = useState('');
  const [precioNafta, setPrecioNafta] = useState('');
  const [resultado, setResultado] = useState(null);
  const [modelo, setModelo] = useState('');
  const [modeloPersonalizado, setModeloPersonalizado] = useState('');
  const [usarModeloPersonalizado, setUsarModeloPersonalizado] = useState(false);

  // Ejemplos de modelos de auto con sus consumos promedio (km/l)
  const modelosAuto = [
    { nombre: 'Toyota Corolla', consumoPromedio: 13.5 },
    { nombre: 'Volkswagen Gol', consumoPromedio: 12 },
    { nombre: 'Ford Focus', consumoPromedio: 11.8 },
    { nombre: 'Honda Civic', consumoPromedio: 14.2 }
  ];

  const calcularGasto = () => {
    if (!distancia || !consumo || !precioNafta || (!modelo && !modeloPersonalizado && usarModeloPersonalizado)) {
      alert('Por favor complete todos los campos');
      return;
    }

    const distanciaNum = parseFloat(distancia);
    const consumoNum = parseFloat(consumo);
    const precioNum = parseFloat(precioNafta);

    const litrosNecesarios = distanciaNum / consumoNum;
    const costoTotal = litrosNecesarios * precioNum;

    setResultado({
      litros: litrosNecesarios.toFixed(2),
      costo: costoTotal.toFixed(2),
      kmPorLitro: consumoNum.toFixed(1)
    });
  };

  const handleModeloChange = (e) => {
    const selectedModelo = e.target.value;
    setModelo(selectedModelo);
    if (selectedModelo) {
      const modeloSeleccionado = modelosAuto.find(m => m.nombre === selectedModelo);
      if (modeloSeleccionado) {
        setConsumo(modeloSeleccionado.consumoPromedio.toString());
        setUsarModeloPersonalizado(false);
        setModeloPersonalizado('');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl my-12">
        <div className="card-body">
          <h2 className="card-title text-center">Calculadora de Consumo de Combustible</h2>
          
          <div className="form-control w-full">
            <label className="label cursor-pointer">
              <span className="label-text">¿Usar modelo personalizado?</span>
              <input 
                type="checkbox" 
                className="toggle toggle-primary"
                checked={usarModeloPersonalizado}
                onChange={(e) => {
                  setUsarModeloPersonalizado(e.target.checked);
                  if (e.target.checked) {
                    setModelo('');
                  } else {
                    setModeloPersonalizado('');
                  }
                }}
              />
            </label>
          </div>

          {!usarModeloPersonalizado ? (
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Modelo del Auto</span>
              </label>
              <select 
                className="select select-bordered w-full"
                value={modelo}
                onChange={handleModeloChange}
              >
                <option value="">Seleccione un modelo</option>
                {modelosAuto.map((modelo) => (
                  <option key={modelo.nombre} value={modelo.nombre}>
                    {modelo.nombre}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Nombre del modelo</span>
              </label>
              <input
                type="text"
                value={modeloPersonalizado}
                onChange={(e) => setModeloPersonalizado(e.target.value)}
                placeholder="Ej: Fiat Uno"
                className="input input-bordered w-full"
              />
            </div>
          )}

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Consumo (km/l)</span>
            </label>
            <input
              type="number"
              value={consumo}
              onChange={(e) => setConsumo(e.target.value)}
              placeholder="Ej: 12"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Distancia (km)</span>
            </label>
            <input
              type="number"
              value={distancia}
              onChange={(e) => setDistancia(e.target.value)}
              placeholder="Ej: 100"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Precio del combustible por litro ($)</span>
            </label>
            <input
              type="number"
              value={precioNafta}
              onChange={(e) => setPrecioNafta(e.target.value)}
              placeholder="Ej: 800"
              className="input input-bordered w-full"
            />
          </div>

          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary w-full" onClick={calcularGasto}>
              Calcular
            </button>
          </div>

          {resultado && (
            <div className="mt-4 p-4 bg-base-200 rounded-lg">
              <h3 className="font-semibold mb-2">Resultados:</h3>
              <p>Modelo: {usarModeloPersonalizado ? modeloPersonalizado : modelo}</p>
              <p>Consumo: {resultado.kmPorLitro} km/l</p>
              <p>Litros necesarios: {resultado.litros} L</p>
              <p>Costo total: ${resultado.costo}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NaftaCalc;