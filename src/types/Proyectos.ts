export interface EstadisticasProyecto {
    participantes?: string;
    duracion?: string;
    version?: string;
    calificacion?: string;
    [key: string]: string | undefined; 
}

export interface Proyecto {
    nombre: string;
    descripcion: string;
    materia: string;
    tecnologias: string[];
    imagen: string;
    icono?: string; 
    enlace?: string;
    tipo?: string; 
    estado?: string; 
    periodo?: string; 
    estadisticas?: EstadisticasProyecto; 
    fechaCreacion?: string; 
    equipo?: string[]; 
    repositorio?: string;
    destacado?: boolean; 
}

export interface ProyectosCarouselProps {
    proyectos: Proyecto[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
    showControls?: boolean;
    showIndicators?: boolean;
}

export interface EstadisticasGenerales {
    totalProyectos: number;
    totalTecnologias: number;
    proyectosActivos: number;
    proyectosCompletados: number;
    tecnologiasUnicas: string[];
}