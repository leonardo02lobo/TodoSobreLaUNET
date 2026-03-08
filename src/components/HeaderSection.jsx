import React from 'react';

const HeaderSection = ({ title, subTitle, description, children }) => {
    return (
        <div class="text-center mb-16">
            <div class="inline-block">
                <div class="mb-4">
                    <div
                        class="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4"
                    >
                        {children}
                    </div>
                </div>
                <h1 class="text-4xl font-bold text-gray-800 mb-4">
                    {title}
                    <p
                        class="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                    >
                        {subTitle}
                    </p>
                </h1>
            </div>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                {description}
            </p>
        </div>
    );
};

export default HeaderSection;