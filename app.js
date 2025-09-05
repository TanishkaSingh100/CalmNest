// Main App Component
const App = () => {
    const [activePage, setActivePage] = useState('chatbot');
    const [isLoading, setIsLoading] = useState(true);

    const { useState, useEffect, useRef } = React;

    useEffect(() => {
        // Simulate initial loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const renderActivePage = () => {
        switch (activePage) {
            case 'chatbot':
                return <Chatbot setActivePage={setActivePage} />;
            case 'booking':
                return <Booking />;
            case 'resources':
                return <Resources />;
            case 'peer-support':
                return <PeerSupport />;
            case 'admin':
                return <AdminDashboard />;
            default:
                return <Chatbot setActivePage={setActivePage} />;
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-brand-calm flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto animate-pulse">
                        M
                    </div>
                    <h1 className="text-2xl font-bold text-brand-text mb-2">MindEase</h1>
                    <p className="text-brand-text opacity-75 mb-6">Loading your mental health support platform...</p>
                    <div className="loading-spinner mx-auto"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-calm">
            <Header activePage={activePage} setActivePage={setActivePage} />
            <main className="py-8 px-6">
                {renderActivePage()}
            </main>
            
            {/* Footer */}
            <footer className="bg-white border-t border-brand-secondary py-8 mt-16">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                                    M
                                </div>
                                <h3 className="font-bold text-brand-text">MindEase</h3>
                            </div>
                            <p className="text-sm text-brand-text opacity-75">
                                Supporting student mental health with confidential, accessible care.
                            </p>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold text-brand-text mb-3">Quick Links</h4>
                            <ul className="space-y-2 text-sm text-brand-text opacity-75">
                                <li><a href="#" className="hover:text-brand-primary">Chat Support</a></li>
                                <li><a href="#" className="hover:text-brand-primary">Book Session</a></li>
                                <li><a href="#" className="hover:text-brand-primary">Resources</a></li>
                                <li><a href="#" className="hover:text-brand-primary">Peer Forum</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold text-brand-text mb-3">Emergency</h4>
                            <ul className="space-y-2 text-sm text-brand-text opacity-75">
                                <li>Crisis Hotline: 988</li>
                                <li>Campus Security: 911</li>
                                <li>24/7 Text Support</li>
                                <li>Emergency Booking</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold text-brand-text mb-3">Privacy</h4>
                            <ul className="space-y-2 text-sm text-brand-text opacity-75">
                                <li>Completely Anonymous</li>
                                <li>HIPAA Compliant</li>
                                <li>Encrypted Sessions</li>
                                <li>No Records Stored</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border-t border-brand-secondary mt-8 pt-6 text-center">
                        <p className="text-sm text-brand-text opacity-75">
                            © 2024 MindEase. Built for student mental health and wellbeing.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));