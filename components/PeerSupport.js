// Peer Support Component

const { useState, useEffect, useRef} = React;
const PeerSupport = () => {
    const [selectedPost, setSelectedPost] = useState(null);

    const posts = [
        {
            id: 1,
            title: "Feeling overwhelmed with final exams - any study tips?",
            author: "QuietPanda",
            authorColor: "bg-blue-500",
            replies: 12,
            hasVolunteerReply: false,
            timeAgo: "2 hours ago",
            category: "Academic Stress",
            preview: "I have 5 exams in the next two weeks and I'm feeling completely overwhelmed...",
            likes: 8,
            tags: ["exam-stress", "study-tips", "time-management"]
        },
        {
            id: 2,
            title: "How to deal with homesickness in first year?",
            author: "MountainEcho",
            authorColor: "bg-green-500",
            replies: 8,
            hasVolunteerReply: true,
            timeAgo: "4 hours ago",
            category: "Adjustment",
            preview: "I'm 3 months into college and still missing home terribly. Is this normal?",
            likes: 15,
            tags: ["homesickness", "first-year", "adjustment"],
            volunteerReply: {
                author: "Sarah_PeerVolunteer",
                preview: "This is completely normal! Here are some strategies that have helped many students...",
                verified: true
            }
        },
        {
            id: 3,
            title: "Anxiety about job interviews - need confidence boost",
            author: "SilentStar",
            authorColor: "bg-purple-500",
            replies: 15,
            hasVolunteerReply: false,
            timeAgo: "6 hours ago",
            category: "Career Anxiety",
            preview: "I have my dream job interview next week but I'm terrified I'll freeze up...",
            likes: 22,
            tags: ["job-interviews", "anxiety", "confidence"]
        },
        {
            id: 4,
            title: "Making friends in a new city - feeling isolated",
            author: "WanderingWave",
            authorColor: "bg-pink-500",
            replies: 6,
            hasVolunteerReply: false,
            timeAgo: "8 hours ago",
            category: "Social Connection",
            preview: "Moved here for college and don't know anyone. How do you make genuine friends as an adult?",
            likes: 11,
            tags: ["friendship", "social-anxiety", "new-city"]
        },
        {
            id: 5,
            title: "Coping with rejection from grad school",
            author: "BraveHeart",
            authorColor: "bg-red-500",
            replies: 9,
            hasVolunteerReply: true,
            timeAgo: "1 day ago",
            category: "Disappointment",
            preview: "Got rejected from my top choice program. Feeling like all my hard work was for nothing...",
            likes: 18,
            tags: ["rejection", "grad-school", "disappointment"],
            volunteerReply: {
                author: "Mike_PeerVolunteer",
                preview: "I understand this pain deeply. Rejection doesn't define your worth or potential...",
                verified: true
            }
        },
        {
            id: 6,
            title: "Balancing work and studies - burnout prevention?",
            author: "NightOwl",
            authorColor: "bg-indigo-500",
            replies: 14,
            hasVolunteerReply: false,
            timeAgo: "1 day ago",
            category: "Work-Life Balance",
            preview: "Working 20 hours/week while taking 18 credits. Starting to feel burnt out...",
            likes: 25,
            tags: ["burnout", "work-study", "balance"]
        }
    ];

    const categories = ["All", "Academic Stress", "Adjustment", "Career Anxiety", "Social Connection", "Disappointment", "Work-Life Balance"];
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredPosts = selectedCategory === "All" 
        ? posts 
        : posts.filter(post => post.category === selectedCategory);

    const PostCard = ({ post }) => (
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover-lift"
             onClick={() => setSelectedPost(post)}>
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${post.authorColor} rounded-full flex items-center justify-center text-white font-medium text-sm`}>
                        {post.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-medium text-brand-text">{post.author}</p>
                        <p className="text-sm text-brand-text opacity-60">{post.timeAgo}</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="inline-block bg-brand-secondary text-brand-text px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                    </span>
                </div>
            </div>

            <h3 className="text-lg font-semibold text-brand-text mb-2 hover:text-brand-primary transition-colors">
                {post.title}
            </h3>
            
            <p className="text-brand-text opacity-75 mb-4 line-clamp-2">
                {post.preview}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                    <span key={tag} className="bg-brand-calm text-brand-text px-2 py-1 rounded text-xs">
                        #{tag}
                    </span>
                ))}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-brand-text opacity-75">
                    <span className="flex items-center space-x-1">
                        <span>💬</span>
                        <span>{post.replies} replies</span>
                    </span>
                    <span className="flex items-center space-x-1">
                        <span>❤️</span>
                        <span>{post.likes} likes</span>
                    </span>
                </div>
                
                {post.hasVolunteerReply && (
                    <span className="bg-brand-accent text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <span>✓</span>
                        <span>Peer Volunteer replied</span>
                    </span>
                )}
            </div>

            {post.volunteerReply && (
                <div className="mt-4 p-3 bg-brand-secondary rounded-lg border-l-4 border-brand-accent">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-brand-accent text-white px-2 py-1 rounded text-xs font-medium">
                            [Trained Peer Volunteer]
                        </span>
                        <span className="font-medium text-sm text-brand-text">{post.volunteerReply.author}</span>
                    </div>
                    <p className="text-sm text-brand-text opacity-75">{post.volunteerReply.preview}</p>
                </div>
            )}
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto fade-in">
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-brand-text mb-3">Peer Support Forum</h2>
                <p className="text-brand-text opacity-75 text-lg">Connect with fellow students in a safe, moderated environment</p>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-brand-secondary rounded-xl p-4">
                        <h3 className="font-semibold text-brand-text mb-2">📋 Community Guidelines</h3>
                        <p className="text-sm text-brand-text opacity-75">
                            Be respectful, supportive, and authentic. All posts are anonymous and moderated.
                        </p>
                    </div>
                    <div className="bg-brand-secondary rounded-xl p-4">
                        <h3 className="font-semibold text-brand-text mb-2">🛡️ Safe Space</h3>
                        <p className="text-sm text-brand-text opacity-75">
                            Trained peer volunteers monitor discussions and provide professional guidance.
                        </p>
                    </div>
                    <div className="bg-brand-secondary rounded-xl p-4">
                        <h3 className="font-semibold text-brand-text mb-2">🤝 Peer Support</h3>
                        <p className="text-sm text-brand-text opacity-75">
                            Share experiences, offer support, and learn from others facing similar challenges.
                        </p>
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                selectedCategory === category
                                    ? 'bg-brand-primary text-white'
                                    : 'bg-white text-brand-text hover:bg-brand-secondary border border-gray-200'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="stat-card bg-white rounded-xl shadow-lg p-4 text-center">
                    <div className="text-2xl font-bold text-brand-primary">247</div>
                    <div className="text-sm text-brand-text opacity-75">Active Discussions</div>
                </div>
                <div className="stat-card bg-white rounded-xl shadow-lg p-4 text-center">
                    <div className="text-2xl font-bold text-brand-accent">1,832</div>
                    <div className="text-sm text-brand-text opacity-75">Total Posts</div>
                </div>
                <div className="stat-card bg-white rounded-xl shadow-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">89</div>
                    <div className="text-sm text-brand-text opacity-75">Peer Volunteers</div>
                </div>
                <div className="stat-card bg-white rounded-xl shadow-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-500">24/7</div>
                    <div className="text-sm text-brand-text opacity-75">Support Available</div>
                </div>
            </div>

            {/* Posts List */}
            <div className="space-y-6">
                {filteredPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {/* New Discussion Button */}
            <div className="mt-12 text-center">
                <button className="bg-brand-primary text-white px-8 py-4 rounded-xl hover:bg-blue-600 transition-colors font-medium text-lg shadow-lg">
                    ✏️ Start New Discussion
                </button>
                <p className="mt-3 text-sm text-brand-text opacity-75">
                    Your identity remains completely anonymous
                </p>
            </div>

            {/* Crisis Support Banner */}
            <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-xl">
                        🚨
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-red-800 mb-1">Crisis Support Available</h3>
                        <p className="text-red-700 text-sm">
                            If you're having thoughts of self-harm or suicide, please reach out immediately. 
                            Our crisis counselors are available 24/7.
                        </p>
                    </div>
                    <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium">
                        Get Help Now
                    </button>
                </div>
            </div>
        </div>
    );
};