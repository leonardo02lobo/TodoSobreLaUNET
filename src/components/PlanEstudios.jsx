import { useState, useMemo } from "react";
import plan from "../data/Pensum.json";
import HeaderSection from "./HeaderSection.jsx";

const PlanEstudiosAvanzado = () => {
    const [selectedSemestre, setSelectedSemestre] = useState(plan[0].semestre);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMateria, setSelectedMateria] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const semestreData = plan.find((s) => s.semestre === selectedSemestre);

    const filteredMaterias = useMemo(() => {
        if (!searchTerm.trim()) return semestreData.materias;

        return semestreData.materias.filter(materia =>
            materia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            materia.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
            materia.profesor.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [semestreData.materias, searchTerm]);

    const totalUC = useMemo(() => {
        return semestreData.materias.reduce((total, materia) =>
            total + parseInt(materia.unidad_credito), 0
        );
    }, [semestreData.materias]);

    const openModal = (materia) => {
        setSelectedMateria(materia);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMateria(null);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-gray-100 py-16 px-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-3">
                <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow"></div>
                <div className="absolute top-0 right-0 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow animation-delay-4000"></div>
            </div>

            <div className="relative max-w-6xl mx-auto">
                <HeaderSection
                    title="Plan de Estudios"
                    subTitle="Ingeniería Informática"
                    description="Explora las materias de cada semestre y organiza tu trayectoria académica"
                >
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v6l9-5m-9 5l-9-5m9 5l9-5"></path>
                    </svg>
                </HeaderSection>
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Buscar materias, profesores, descripción..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-md mx-auto block px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm bg-white/80 backdrop-blur-sm text-gray-700 placeholder-gray-400"
                    />
                </div>

                <div className="flex justify-center mb-8 flex-wrap gap-3">
                    {plan.map((semestre) => (
                        <button
                            key={semestre.semestre}
                            className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 border ${selectedSemestre === semestre.semestre
                                ? "bg-blue-600 text-white shadow-lg transform scale-105 border-blue-600"
                                : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-blue-50 hover:shadow-md border-gray-200 hover:border-blue-300"
                                }`}
                            onClick={() => {
                                setSelectedSemestre(semestre.semestre);
                                setSearchTerm("");
                            }}
                        >
                            {semestre.semestre}
                        </button>
                    ))}
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 text-center border border-gray-200 shadow-sm">
                    <h2 className="text-2xl font-bold text-blue-800 mb-2">
                        Semestre {selectedSemestre}
                    </h2>
                    <div className="flex justify-center gap-8 text-base text-blue-600">
                        <span className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <strong>{filteredMaterias.length}</strong> materias
                        </span>
                        <span className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <strong>{totalUC}</strong> unidades de crédito
                        </span>
                    </div>
                </div>

                {filteredMaterias.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredMaterias.map((materia, index) => (
                            <div
                                key={`${selectedSemestre}-${materia.nombre}-${index}`}
                                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:transform hover:scale-105 cursor-pointer group"
                                onClick={() => openModal(materia)}
                            >
                                <div className="flex flex-col h-full">
                                    <div className="grow">
                                        <h2 className="text-lg font-bold text-gray-800 group-hover:text-blue-700 transition-colors line-clamp-2 mb-3">
                                            {materia.nombre}
                                        </h2>
                                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                                            {materia.descripcion}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center mt-auto">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-xl text-sm font-semibold">
                                            {materia.unidad_credito} UC
                                        </span>
                                        <span className="text-xs text-gray-500 group-hover:text-blue-600 transition-colors font-medium">
                                            Ver detalles →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <p className="text-gray-500 text-lg mb-2 font-medium">
                            No se encontraron materias
                        </p>
                        <p className="text-gray-400 text-sm">
                            Intenta con otros términos de búsqueda
                        </p>
                    </div>
                )}

                {isModalOpen && selectedMateria && (
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300"
                        onClick={closeModal}
                    >
                        <div
                            className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-500 animate-modal-enter"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center p-8 border-b border-gray-200/60">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">
                                            Detalles de la Materia
                                        </h3>
                                        <p className="text-blue-600 text-sm font-medium">Información completa</p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-xl hover:bg-gray-100"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="p-8">
                                <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm">
                                    <div className="flex justify-between items-start mb-6">
                                        <h2 className="text-2xl font-bold text-blue-700 pr-4">
                                            {selectedMateria.nombre}
                                        </h2>
                                        <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-xl text-base font-semibold shrink-0">
                                            {selectedMateria.unidad_credito} UC
                                        </span>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                                Información General
                                            </h4>
                                            <div className="space-y-2">
                                                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                                    <span className="text-gray-700">Código:</span> {selectedMateria.Codigo}
                                                </p>
                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    {selectedMateria.descripcion}
                                                </p>
                                            </div>
                                        </div>
                                        {/*
                                        <div className="border-t border-gray-200/60 pt-6">
                                            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                                Docente
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                <strong className="text-gray-700">Profesor:</strong> {selectedMateria.profesor}
                                            </p>
                                        </div>*/}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end p-8 border-t border-gray-200/60">
                                <button
                                    onClick={closeModal}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.5; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 6s ease-in-out infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                @keyframes modal-enter {
                    0% {
                        opacity: 0;
                        transform: translateY(-20px) scale(0.95);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                .animate-modal-enter {
                    animation: modal-enter 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default PlanEstudiosAvanzado;