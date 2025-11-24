const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        About Flux
                    </h1>
                    <div className="prose prose-lg text-gray-600">
                        <p className="mb-4">
                            Flux is a modern expense tracking application designed to help you
                            manage your finances effortlessly.
                        </p>
                        <p className="mb-4">
                            Built with React, TypeScript, and Tailwind CSS, Flux provides
                            a seamless experience for tracking your daily expenses and
                            understanding your spending patterns.
                        </p>
                        <div className="mt-8 p-6 bg-indigo-50 rounded-lg border border-indigo-100">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                Key Features
                            </h2>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-indigo-600 mr-2">•</span>
                                    Easy expense tracking
                                </li>
                                <li className="flex items-start">
                                    <span className="text-indigo-600 mr-2">•</span>
                                    Visual analytics and reports
                                </li>
                                <li className="flex items-start">
                                    <span className="text-indigo-600 mr-2">•</span>
                                    Budget management
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;