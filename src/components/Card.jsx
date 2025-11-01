import { useState } from 'react';

const Card = ({
    title,
    content,
    depa = false,
    hora,
    dias,
    correo,
    jefe_departamento
}) => {
    const [showModal, setShowModal] = useState(false);

    const checkContentOverflow = (text) => {
        return text?.length > 120;
    };

    const truncatedContent = content?.length > 120 ? content.substring(0, 120) + '...' : content;

    return (
        <>
            <article
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 group hover:border-blue-300 hover:transform hover:scale-105 flex flex-col min-h-[280px] w-full max-w-sm mx-auto cursor-pointer"
                onClick={() => {
                    if (checkContentOverflow(content) && !depa) {
                        setShowModal(true);
                    }
                }}
            >
                <div className="flex items-center justify-center mb-6">
                    <div
                        className="w-16 h-1.5 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full group-hover:w-20 transition-all duration-300"
                    >
                    </div>
                </div>

                <h2
                    className="text-xl font-bold text-gray-800 text-center mb-6 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2"
                >
                    {title}
                </h2>

                <div className="grow flex items-center">
                    {depa ? (
                        <div className="text-gray-600 text-center leading-relaxed space-y-3 w-full">
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                <span><strong className="text-gray-700">Jefe:</strong> {jefe_departamento}</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                <span><strong className="text-gray-700">Correo:</strong> {correo}</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                                <span><strong className="text-gray-700">Días:</strong> {dias}</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                                <span><strong className="text-gray-700">Horario:</strong> {hora}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full">
                            <p className="text-gray-600 text-center leading-relaxed">
                                {truncatedContent}
                            </p>
                            {checkContentOverflow(content) && (
                                <div className="text-center mt-4">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowModal(true);
                                        }}
                                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200 group/btn"
                                    >
                                        Ver más
                                        <svg
                                            className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex justify-center mt-6 pt-4 border-t border-gray-100 group-hover:border-blue-200 transition-colors duration-300">
                    <div
                        className="w-12 h-0.5 bg-gray-300 group-hover:bg-linear-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300"
                    >
                    </div>
                </div>
            </article>

            {showModal && !depa && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-500 animate-modal-enter"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start gap-4 p-8 border-b border-gray-200/60">
                            <div className="shrink-0">
                                <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-bold text-gray-800 wrap-break-words leading-tight">
                                    {title}
                                </h3>
                                <p className="text-blue-600 text-sm font-medium mt-1">
                                    Información completa
                                </p>
                            </div>

                            <button
                                onClick={() => setShowModal(false)}
                                className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-xl hover:bg-gray-100 ml-2"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-8">
                            <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></div>
                                            Descripción
                                        </h4>
                                        <p className="text-gray-600 leading-relaxed text-base">
                                            {content}
                                        </p>
                                    </div>

                                    {hora && (
                                        <div className="border-t border-gray-200/60 pt-4">
                                            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full shrink-0"></div>
                                                Información Adicional
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                <strong className="text-gray-700">Horario:</strong> {hora}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end p-8 border-t border-gray-200/60">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
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
        </>
    );
};

export default Card;