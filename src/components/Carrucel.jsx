import { useState } from 'react';

const ProyectosCarousel = ({ proyectos }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextProject = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === proyectos.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevProject = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? proyectos.length - 1 : prevIndex - 1
        );
    };

    const goToProject = (index) => {
        setCurrentIndex(index);
    };

    if (!proyectos || proyectos.length === 0) {
        return (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <p className="text-gray-500 text-lg mb-2">No hay proyectos disponibles</p>
                <p className="text-gray-400 text-sm">Vuelve pronto para ver nuevos proyectos</p>
            </div>
        );
    }

    const proyecto = proyectos[currentIndex];

    return (
        <div className="relative max-w-6xl mx-auto">
            {/* Card del proyecto */}
            <div className="bg-white rounded-2xl p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 shadow-lg border border-gray-100">
                {/* Columna izquierda */}
                <div className="flex flex-col justify-center">
                    <div>
                        {proyecto.enlace ? (
                            <a href={proyecto.enlace} target="_blank" rel="noopener noreferrer" className="group">
                                <div className="flex flex-row items-center justify-center gap-5 mb-4">
                                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 text-center group-hover:text-blue-600 transition-colors">
                                        {proyecto.nombre}
                                    </h1>
                                    {proyecto.icono && (
                                        <img
                                            src={proyecto.icono}
                                            alt={proyecto.nombre}
                                            className="w-14 h-14 rounded group-hover:scale-110 transition-transform"
                                        />
                                    )}
                                </div>
                            </a>
                        ) : (
                            <div className="flex flex-row items-center justify-center gap-5 mb-4">
                                <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 text-center">
                                    {proyecto.nombre}
                                </h1>
                                {proyecto.icono && (
                                    <img
                                        src={proyecto.icono}
                                        alt={proyecto.nombre}
                                        className="w-14 h-14 rounded"
                                    />
                                )}
                            </div>
                        )}
                        <p className="text-lg text-gray-600 mb-6 text-center">
                            {proyecto.descripcion}
                        </p>
                    </div>

                    <div className="mt-2">
                        <img
                            src={proyecto.imagen}
                            alt={proyecto.nombre}
                            className="w-full h-64 object-cover rounded-xl shadow-md"
                        />
                    </div>
                </div>

                {/* Columna derecha - Grid de información */}
                <div className="grid grid-cols-1 gap-4">
                    {/* Tarjeta principal */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Detalles del Proyecto
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                                <p className="text-gray-600">
                                    <strong className="text-gray-800">Materia:</strong> {proyecto.materia}
                                </p>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
                                <p className="text-gray-600">
                                    <strong className="text-gray-800">Tipo:</strong> {proyecto.tipo || "Proyecto académico"}
                                </p>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 shrink-0"></div>
                                <p className="text-gray-600">
                                    <strong className="text-gray-800">Estado:</strong> {proyecto.estado || "Completado"}
                                </p>
                            </div>

                            {proyecto.periodo && (
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 shrink-0"></div>
                                    <p className="text-gray-600">
                                        <strong className="text-gray-800">Periodo:</strong> {proyecto.periodo}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tecnologías */}
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Tecnologías Utilizadas
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {proyecto.tecnologias && proyecto.tecnologias.map((tech, index) => (
                                <span
                                    key={index}
                                    className="bg-white px-3 py-1 rounded-lg text-sm font-medium text-blue-700 border border-blue-200"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-green-600">
                                {proyecto.estadisticas?.participantes || "N/A"}
                            </div>
                            <div className="text-sm text-green-800">Participantes</div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-purple-600">
                                {proyecto.estadisticas?.duracion || "N/A"}
                            </div>
                            <div className="text-sm text-purple-800">Duración</div>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-orange-600">
                                {proyecto.estadisticas?.version || "1.0"}
                            </div>
                            <div className="text-sm text-orange-800">Versión</div>
                        </div>
                        <div className="bg-cyan-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-cyan-600">
                                {proyecto.estadisticas?.calificacion || "A"}
                            </div>
                            <div className="text-sm text-cyan-800">Calificación</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controles del carousel */}
            {proyectos.length > 1 && (
                <>
                    <div className="flex justify-between items-center mt-8">
                        {/* Botón anterior */}
                        <button
                            onClick={prevProject}
                            className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:shadow-xl"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="font-semibold text-gray-700">Anterior</span>
                        </button>

                        {/* Indicadores */}
                        <div className="flex gap-2">
                            {proyectos.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToProject(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        index === currentIndex ? 'bg-blue-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                />
                            ))}
                        </div>

                        {/* Botón siguiente */}
                        <button
                            onClick={nextProject}
                            className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:shadow-xl"
                        >
                            <span className="font-semibold text-gray-700">Siguiente</span>
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Contador de proyectos */}
                    <div className="text-center mt-4">
                        <span className="text-gray-500 text-sm">
                            Proyecto {currentIndex + 1} de {proyectos.length}
                        </span>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProyectosCarousel;