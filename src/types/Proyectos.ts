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
    icono?: string; // Opcional
    enlace?: string; // Opcional
    tipo?: string; // Opcional
    estado?: string; // Opcional
    periodo?: string; // Opcional
    estadisticas?: EstadisticasProyecto; // Opcional
    fechaCreacion?: string; // Opcional - formato ISO o fecha legible
    equipo?: string[]; // Opcional - nombres de los participantes
    repositorio?: string; // Opcional - link al repositorio
    destacado?: boolean; // Opcional - para proyectos destacados
}

// Interface para el componente ProyectosCarousel
export interface ProyectosCarouselProps {
    proyectos: Proyecto[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
    showControls?: boolean;
    showIndicators?: boolean;
}

// Interface para las estadísticas generales
export interface EstadisticasGenerales {
    totalProyectos: number;
    totalTecnologias: number;
    proyectosActivos: number;
    proyectosCompletados: number;
    tecnologiasUnicas: string[];
}