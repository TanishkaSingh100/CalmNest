// Header Component
const Header = ({ activePage, setActivePage }) => {
    const navItems = [
        { id: 'chatbot', label: 'Chat Support', icon: '💬' },
        { id: 'booking', label: 'Book Session', icon: '📅' },
        { id: 'resources', label: 'Resources', icon: '📚' },
        { id: 'peer-support', label: 'Peer Support', icon: '👥' },
        { id: 'admin', label: 'Admin Dashboard', icon: '📊' }
    ];

    return (
        <header className="sticky top-0 bg-white shadow-lg z-50 border-b border-brand-secondary">
            <div className="max-w-4xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActivePage('chatbot')}>
                        <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-white text-xl font-bold hover:bg-blue-600 transition-colors">
                            M
                        </div>
                        <h1 className="text-2xl font-bold text-brand-text">MindEase</h1>
                    </div>
                    
                    <nav className="flex space-x-2">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActivePage(item.id)}
                                className={`nav-button px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                                    activePage === item.id
                                        ? 'bg-brand-primary text-white shadow-md'
                                        : 'text-brand-text hover:bg-brand-secondary hover:scale-105'
                                }`}
                            >
                                <span>{item.icon}</span>
                                <span className="hidden sm:inline">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};