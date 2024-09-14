import React, { FC, useEffect, useState } from 'react';
import { MdSave  } from "react-icons/md";
import { ArticuloType } from '../types';

interface FormularioProps {
  onAddTask: (title: string, Articulo?: ArticuloType) => void;
  Articulo?: ArticuloType | null;
}

const Formulario: FC<FormularioProps> = ({ onAddTask, Articulo }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim());
      setTitle('');
    }

    if (Articulo) {
      onAddTask(title.trim(), Articulo);
      setTitle('');
    }
  };

  useEffect(() => {
    if (Articulo) {
      setTitle(Articulo.titulo);
    }
  }, [Articulo]);

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-center justify-between w-full p-4 mt-4 bg-gray-500 rounded-lg">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nueva Articulo"
        className="flex-1 mr-2 rounded-lg form-input"
      />
      
      <button
        type="submit"
        className="flex items-center p-2 text-white bg-blue-500 rounded">
        {Articulo ? 'Actualizar' : 'Agregar'}
        <MdSave />
      </button>
    </form>
  );
};

export default Formulario;
