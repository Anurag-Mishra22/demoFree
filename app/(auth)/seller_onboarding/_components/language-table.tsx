import React from 'react';

interface Language {
    language: string;
    level: string;
}

interface LanguageTableProps {
    languages: Language[];
}

const LanguageTable: React.FC<LanguageTableProps> = ({ languages }) => {
    return (
        <div className="overflow-x-auto mt-4 flex-1">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Language
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Level
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {languages.length > 0 ? (
                        languages.map((lang, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {lang.language}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {lang.level}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">
                                No languages available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LanguageTable;
