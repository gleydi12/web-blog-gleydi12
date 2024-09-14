import Tabla from './Components/Tabla.tsx'
import Formulario from './Components/Formulario.tsx';
import useCrudAcciones from './hooks/useCrudAcciones';

const App = () => {
  const {
    Articulos,
    Articulo,
    agregarArticulo,
    editarArticulo,
    eliminarArticulo
  } = useCrudAcciones();

  return (
   <div className="container w-full p-4 mx-auto bg-gray-200 rounded-lg shadow-lg shadow-gray-200">
    <h1 className="mb-4 text-xl font-bold text-white-600 bg-blue-400 px-4 py-2 rounded-lg"
    > Planificación de mis Artículos</h1>
    
        <Tabla
            Articulos={Articulos}
            onEliminarArticulo={eliminarArticulo}
            onEditarArticulo={editarArticulo}
        />
      </div>
  );
};

export default App;
