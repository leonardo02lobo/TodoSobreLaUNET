export interface PruebaTecnica {
    id: string;
    titulo: string;
    materia: string;
    departamento: string;
    anio: number;
    tipo: string;
    archivo: string;
    extension: string;
    descripcion?: string;
}

export interface PruebasTecnicasBuscadorProps {
    pruebas: PruebaTecnica[];
}
