export interface ArticuloType {
    id: number;
    titulo: string;
  contenido : string;
  fecha: number;
  autor: string;
  completado: boolean;
}

export interface TablaProps {
    Articulos: ArticuloType[];
    onEliminarArticulo: (id: number) => void;
    onEditarArticulo: (id: number) => void;
}
