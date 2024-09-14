import React, { useState, useEffect } from 'react';
import { TablaProps } from '../types'; 

// Interfaces y tipos
interface Articulo {
  id: string;
  titulo: string;
  contenido: string;
  fecha: string;
  autor: string;
}

// Función principal
const Tabla: React.FC<TablaProps> = ({ }) => {
  const [articulos, setArticulos] = useState<Articulo[]>([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await fetch('http://localhost:3000/articulos');
        const data: Articulo[] = await response.json();
        setArticulos(data);
      } catch (error) {
        console.error('Error al obtener articulos:', error);
      }
    };

    obtenerDatos().catch(error => console.error('Error en la promesa:', error));
  }, []);

  // Funciones auxiliares
  const handleEditar = (id: string) => {
    // Logica para editar
  };

  const handleEliminar = (id: string) => {
    // Logica para eliminar
  };

  
  return (
    <div className="p-4 bg-background">
      <h1 className="text-xl font-bold text-primary">Blog informativo: Universidad Martín Lutero</h1>
      
      <div className="mt-4 space-y-4">
        {articulos.map((articulo) => (
          <div key={articulo.id} className="p-4 bg-card rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-primary">{articulo.titulo}</h2>
            <p className="text-sm text-muted-foreground">{articulo.fecha}</p>
            <p className="text-muted">{articulo.contenido}</p>
            <p className="text-sm text-muted-foreground">{articulo.autor}</p>
            <div className="flex space-x-2 mt-2">
              <button onClick={() => handleEditar(articulo.id)} className="text-accent hover:text-accent-foreground">
                ✏️
              </button>
              <button onClick={() => handleEliminar(articulo.id)} className="text-destructive hover:text-destructive-foreground">
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabla;
