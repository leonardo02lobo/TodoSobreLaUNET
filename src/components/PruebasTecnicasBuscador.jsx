import { useMemo, useState } from 'react';

const normalizar = (texto) =>
    (texto || '')
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '');

const TIPO_ETIQUETA = {
    parcial: 'Parcial',
    examen: 'Examen',
    quiz: 'Quiz',
};

const PruebaTecnicaCard = ({ prueba }) => (
    <a
        href={`/pruebas-tecnicas/${prueba.id}`}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 group hover:border-blue-300 hover:-translate-y-1 flex flex-col min-h-[220px]"
    >
        <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200">
                {TIPO_ETIQUETA[prueba.tipo] || prueba.tipo}
            </span>
            <span className="text-xs font-mono text-gray-400 uppercase">
                {prueba.extension}
            </span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {prueba.titulo}
        </h3>

        <p className="text-sm text-gray-500 mb-4">{prueba.materia}</p>

        <div className="grow" />

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 group-hover:border-blue-200 transition-colors">
            <span className="text-xs text-gray-500">{prueba.departamento}</span>
            <span className="text-xs font-semibold text-gray-600">{prueba.anio}</span>
        </div>
    </a>
);

const PruebasTecnicasBuscador = ({ pruebas = [] }) => {
    const [query, setQuery] = useState('');

    const resultados = useMemo(() => {
        const termino = normalizar(query.trim());
        if (!termino) return pruebas;

        return pruebas.filter((prueba) => {
            const haystack = normalizar(
                [prueba.titulo, prueba.materia, prueba.departamento].join(' '),
            );
            return haystack.includes(termino);
        });
    }, [pruebas, query]);

    return (
        <div>
            <div className="max-w-2xl mx-auto mb-10">
                <div className="relative">
                    <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar por título, materia o departamento..."
                        aria-label="Buscar pruebas técnicas"
                        className="w-full bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-gray-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    />
                </div>
                <p className="text-center text-sm text-gray-500 mt-3">
                    {resultados.length} de {pruebas.length} prueba
                    {pruebas.length === 1 ? '' : 's'} técnica
                    {pruebas.length === 1 ? '' : 's'}
                </p>
            </div>

            {resultados.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-2xl">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            className="w-8 h-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <p className="text-gray-500 text-lg mb-2">
                        No se encontraron pruebas técnicas para tu búsqueda
                    </p>
                    <p className="text-gray-400 text-sm">
                        Intenta con otro término, materia o departamento
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {resultados.map((prueba) => (
                        <PruebaTecnicaCard key={prueba.id} prueba={prueba} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PruebasTecnicasBuscador;
