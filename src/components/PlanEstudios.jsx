import { useState, useMemo } from "react";
import plan from "../data/Pensum.json";

const PlanEstudiosAvanzado = () => {
    const [selectedSemestre, setSelectedSemestre] = useState(plan[0].semestre);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMateria, setSelectedMateria] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Encontrar los datos del semestre seleccionado
    const semestreData = plan.find((s) => s.semestre === selectedSemestre);

    // Filtrar materias basado en el término de búsqueda
    const filteredMaterias = useMemo(() => {
        if (!searchTerm.trim()) return semestreData.materias;
        
        return semestreData.materias.filter(materia =>
            materia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            materia.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
            materia.profesor.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [semestreData.materias, searchTerm]);

    // Calcular total de UC del semestre
    const totalUC = useMemo(() => {
        return semestreData.materias.reduce((total, materia) => 
            total + parseInt(materia.unidad_credito), 0
        );
    }, [semestreData.materias]);

    // Función para abrir el modal con la materia seleccionada
    const openModal = (materia) => {
        setSelectedMateria(materia);
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMateria(null);
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Plan de Estudios - Ingeniería Informática
                </h1>
                <p className="text-gray-600">
                    Explora las materias de cada semestre
                </p>
            </div>

            {/* Barra de búsqueda */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Buscar materias, profesores..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md mx-auto block px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
            </div>

            {/* Botones de semestres */}
            <div className="flex justify-center mb-8 flex-wrap gap-3">
                {plan.map((semestre) => (
                    <button
                        key={semestre.semestre}
                        className={`px-4 py-2 rounded-2xl font-semibold transition-all duration-300 ${
                            selectedSemestre === semestre.semestre
                                ? "bg-blue-600 text-white shadow-lg transform scale-105"
                                : "bg-gray-200 hover:bg-blue-100 hover:shadow-md"
                        }`}
                        onClick={() => {
                            setSelectedSemestre(semestre.semestre);
                            setSearchTerm(""); // Limpiar búsqueda al cambiar semestre
                        }}
                    >
                        {semestre.semestre}
                    </button>
                ))}
            </div>

            {/* Información del semestre */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6 text-center">
                <h2 className="text-xl font-semibold text-blue-800 mb-1">
                    Semestre {selectedSemestre}
                </h2>
                <div className="flex justify-center gap-6 text-sm text-blue-600">
                    <span>
                        <strong>{filteredMaterias.length}</strong> materias
                    </span>
                    <span>
                        <strong>{totalUC}</strong> unidades de crédito
                    </span>
                </div>
            </div>

            {/* Grid de materias simplificado */}
            {filteredMaterias.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredMaterias.map((materia, index) => (
                        <div 
                            key={`${selectedSemestre}-${materia.nombre}-${index}`}
                            className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-blue-200 hover:transform hover:scale-105 cursor-pointer group"
                            onClick={() => openModal(materia)}
                        >
                            <div className="flex flex-col h-full">
                                <div className="grow">
                                    <h2 className="text-base font-bold text-gray-800 group-hover:text-blue-700 transition-colors line-clamp-2 mb-2">
                                        {materia.nombre}
                                    </h2>
                                </div>
                                <div className="flex justify-between items-center mt-auto">
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                                        {materia.unidad_credito} UC
                                    </span>
                                    <span className="text-xs text-gray-500 group-hover:text-blue-600 transition-colors">
                                        Click para detalles
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-2xl">
                    <p className="text-gray-500 text-lg mb-2">
                        No se encontraron materias
                    </p>
                    <p className="text-gray-400 text-sm">
                        Intenta con otros términos de búsqueda
                    </p>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && selectedMateria && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div 
                        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header del modal */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800">
                                Detalles de la Materia
                            </h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Contenido del modal */}
                        <div className="p-6">
                            <div className="bg-white p-5 rounded-2xl border border-gray-200">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-xl font-bold text-blue-700">
                                        {selectedMateria.nombre}
                                    </h2>
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-semibold">
                                        {selectedMateria.unidad_credito} UC
                                    </span>
                                </div>
                                
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Descripción:</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {selectedMateria.descripcion}
                                    </p>
                                </div>
                                
                                <div className="border-t border-gray-100 pt-4">
                                    <p className="text-sm text-gray-600">
                                        <strong className="text-gray-700">Profesor:</strong> {selectedMateria.profesor}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer del modal */}
                        <div className="flex justify-end p-6 border-t border-gray-200">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlanEstudiosAvanzado;