import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import {ArticuloType} from "../types";

const API_URL = 'http://localhost:3000/articulos';

const useCrudAcciones = () => {
    const [Articulos, setArticulos] = useState<ArticuloType[]>([]);
    const [Articulo, setArticulo] = useState<ArticuloType | null>(null);

    useEffect(() => {
        cargararticulos();
    }, []);

    const cargararticulos = async () => {
        console.log('Cargando articulos...');
        try {
          const response = await axios.get(API_URL);
          console.log('Respuesta recibida:', response.data);
          setArticulos(response.data.length);
        } catch (error) {
          console.error('Error al cargar articulos:', error);
        }
      };
      
    const agregarArticulo = async (titulo: string, contenido: string, autor: string, fecha: number, Articulo?: ArticuloType) => {
        if (Articulo) {
            await axios.put(`${API_URL}/${Articulo.id}`, { ...Articulo, contenido, titulo, autor, fecha });
            setArticulos(
                Articulos.map((t) => (t.id === Articulo.id ? { ...t, contenido, titulo, autor, fecha} : t))
            );
            setArticulo(null);

            //Mostrar una alerta de éxito sencilla
            alerta('Articulo actualizada');

            return;
        }

        //Mostrar una alerta de éxito sencilla
        alerta('Articulo agregada');
    };

    const editarArticulo = (id: number) => {
        const Articulo = Articulos.find((t) => t.id === id);
        if (Articulo) {
            setArticulo(Articulo);
        }
    };

    const toggleArticulo = async (id: number) => {
        const Articulo = Articulos.find((t) => t.id === id);
        if (Articulo) {
            const estado = !Articulo.completado;
            await axios.put(`${API_URL}/${id}`, { ...Articulo, completado: estado });
            setArticulos(
                Articulos.map((t) => (t.id === id ? { ...t, completado: estado } : t))
            );
        }
    };

    const eliminarArticulo = async (id: number) => {
        // Obtenemos la Articulo a eliminar
        const Articulo = Articulos.find((t) => t.id === id);
        // Usamos sweetalert2 para confirmar la eliminación
        const result = await Swal.fire({
            title: Articulo?.titulo,
            text: '¿Estás seguro de eliminar esta Articulo?',
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#f56565',
            cancelButtonColor: '#718096'
        });

        if (!result.isConfirmed) {
            return;
        }
        await axios.delete(`${API_URL}/${id}`);
        setArticulos(Articulos.filter((t) => t.id !== id));
    };

    const alerta = (title: string) => {
        Swal.fire({
            icon: 'success',
            title,
            showConfirmButton: false,
            timer: 1500,
            position: 'top-end',
        });
    }

    return {
        Articulos,
        Articulo,
        agregarArticulo,
        editarArticulo,
        toggleArticulo,
        eliminarArticulo
    };
};

export default useCrudAcciones;
