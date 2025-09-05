// Resources Component
const ResourceCard = ({ resource }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const renderContent = () => {
        switch (resource.type) {
            case 'video':
                return (
                    <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                        {isExpanded ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src={resource.embedUrl}
                                title={resource.title}
                                className="rounded-lg"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div 
                                className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center cursor-pointer hover:from-blue-200 hover:to-blue-300 transition-all"
                                onClick={() => setIsExpanded(true)}
                            >
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 mx-auto shadow-lg">
                                        <span className="text-2xl">▶️</span>
                                    </div>
                                    <p className="text-brand-text font-medium">Click to play video</p>
                                </div>
                            </div>
                        )}
                    </div>
                );
            case 'audio':
                return (
                    <div className="mb-4 p-4 bg-brand-calm rounded-lg">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center">
                                <span className="text-white">🎵</span>
                            </div>
                            <div>
                                <p className="font-medium text-brand-text">Audio Content</p>
                                <p className="text-sm text-brand-text opacity-60">Duration: {resource.duration}</p>
                            </div>
                        </div>
                        <audio controls className="w-full">
                            <source src={resource.audioUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                );
            case 'guide':
                return (
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-3">
                            <span className="inline-block bg-brand-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                                {resource.language}
                            </span>
                            <span className="text-sm text-brand-text opacity-60">{resource.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-brand-text opacity-75 text-sm">
                            <span>📄</span>
                            <span>{resource.pages} pages</span>
                            <span>•</span>
                            <span>PDF Format</span>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="resource-card bg-white rounded-xl shadow-lg p-6 hover-lift">
            {renderContent()}
            <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-semibold text-brand-text flex-1">{resource.title}</h3>
                <div className="flex items-center space-x-1 ml-2">
                    {[...Array(resource.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                </div>
            </div>
            <p className="text-brand-text opacity-75 mb-4 leading-relaxed">{resource.description}</p>
            
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-sm text-brand-text opacity-60">
                    <span>{resource.views} views</span>
                    <span>•</span>
                    <span>{resource.category}</span>
                </div>
                
                {resource.type === 'guide' && (
                    <button className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                        📖 Read Guide
                    </button>
                )}
                
                {resource.type === 'video' && !isExpanded && (
                    <button 
                        onClick={() => setIsExpanded(true)}
                        className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                    >
                        ▶️ Watch Video
                    </button>
                )}
            </div>
        </div>
    );
};

const Resources = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const resources = [
        {
            id: 1,
            type: 'video',
            title: 'Managing Exam Anxiety: Proven Techniques',
            description: 'Learn practical, science-backed techniques to handle pre-exam stress and anxiety. Includes breathing exercises, time management, and mindset shifts.',
            embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            rating: 5,
            views: '12.4K',
            category: 'Academic Stress',
            duration: '15 mins'
        },
        {
            id: 2,
            type: 'audio',
            title: 'Guided Meditation for Better Sleep',
            description: 'A soothing 10-minute guided meditation designed specifically for students struggling with sleep issues and racing thoughts.',
            audioUrl: '#',
            rating: 5,
            views: '8.2K',
            category: 'Sleep & Relaxation',
            duration: '10 mins'
        },
        {
            id: 3,
            type: 'guide',
            title: 'Understanding & Overcoming Depression',
            description: 'A comprehensive guide covering the signs, symptoms, and coping strategies for depression. Includes self-help techniques and when to seek professional help.',
            language: 'English',
            rating: 4,
            views: '15.7K',
            category: 'Mental Health',
            pages: 24,
            readTime: '20 min read'
        },
        {
            id: 4,
            type: 'guide',
            title: 'तनाव प्रबंधन और मानसिक स्वास्थ्य',
            description: 'Comprehensive stress management techniques explained in Hindi. Covers traditional and modern approaches to mental wellness.',
            language: 'हिंदी',
            rating: 5,
            views: '6.8K',
            category: 'Stress Management',
            pages: 18,
            readTime: '15 min read'
        },
        {
            id: 5,
            type: 'video',
            title: 'Building Healthy Relationships in College',
            description: 'Expert advice on maintaining healthy relationships during college years. Covers communication, boundaries, and conflict resolution.',
            embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            rating: 4,
            views: '9.1K',
            category: 'Relationships',
            duration: '22 mins'
        },
        {
            id: 6,
            type: 'audio',
            title: '5-Minute Breathing Exercises',
            description: 'Quick and effective breathing techniques for immediate stress relief. Perfect for use between classes or during study breaks.',
            audioUrl: '#',
            rating: 5,
            views: '11.3K',
            category: 'Quick Relief',
            duration: '5 mins'
        },
        {
            id: 7,
            type: 'video',
            title: 'Time Management for Students',
            description: 'Master the art of effective time management. Learn prioritization, scheduling techniques, and how to balance academics with personal life.',
            embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            rating: 4,
            views: '18.9K',
            category: 'Academic Stress',
            duration: '18 mins'
        },
        {
            id: 8,
            type: 'guide',
            title: 'Social Anxiety: A Student\'s Guide',
            description: 'Practical strategies for managing social anxiety in college settings. Includes tips for presentations, group work, and social events.',
            language: 'English',
            rating: 5,
            views: '7.4K',
            category: 'Social Anxiety',
            pages: 16,
            readTime: '12 min read'
        }
    ];

    const categories = [
        'all',
        'Academic Stress',
        'Mental Health',
        'Sleep & Relaxation',
        'Stress Management',
        'Relationships',
        'Social Anxiety',
        'Quick Relief'
    ];

    const filteredResources = resources.filter(resource => {
        const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
        const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            resource.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="max-w-6xl mx-auto fade-in">
            <div className="mb-8 text-center">
                <h2 className="text-4xl font-bold text-brand-text mb-3">Mental Health Resources</h2>
                <p className="text-brand-text opacity-75 text-lg">Curated content to support your well-being journey</p>
            </div>

            {/* Search and Filter */}
            <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="md:col-span-2">
                        <input
                            type="text"
                            placeholder="Search resources..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        />
                    </div>
                    <div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category === 'all' ? 'All Categories' : category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                    {categories.slice(1).map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                selectedCategory === category
                                    ? 'bg-brand-primary text-white'
                                    : 'bg-brand-secondary text-brand-text hover:bg-brand-primary hover:text-white'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
                <p className="text-brand-text opacity-75">
                    Showing {filteredResources.length} of {resources.length} resources
                    {selectedCategory !== 'all' && ` in "${selectedCategory}"`}
                    {searchTerm && ` matching "${searchTerm}"`}
                </p>
            </div>

            {/* Resource Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredResources.map(resource => (
                    <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>

            {filteredResources.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-24 h-24 bg-brand-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-3xl">🔍</span>
                    </div>
                    <h3 className="text-xl font-semibold text-brand-text mb-2">No resources found</h3>
                    <p className="text-brand-text opacity-75">Try adjusting your search or filter criteria</p>
                </div>
            )}

            {/* Call to Action */}
            <div className="mt-12 bg-gradient-to-r from-brand-primary to-blue-600 rounded-xl p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-3">Need Personalized Support?</h3>
                <p className="mb-6 opacity-90">Our resources are great, but sometimes you need one-on-one guidance.</p>
                <button className="bg-white text-brand-primary px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors font-medium">
                    Book a Counseling Session
                </button>
            </div>
        </div>
    );
};