// Chatbot Component

const { useState, useEffect, useRef} = React;
const Chatbot = ({ setActivePage }) => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm here to support you. How are you feeling today?", sender: 'bot', timestamp: new Date() }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const getBotResponse = (userInput) => {
        const input = userInput.toLowerCase();
        
        // Crisis keywords
        if (input.includes('suicide') || input.includes('hopeless') || input.includes('help me') || input.includes('end it all') || input.includes('hurt myself')) {
            return {
                text: "I'm really concerned about you. Please know that you're not alone and help is available. Would you like me to connect you with a professional counselor right away?",
                showBookingButton: true
            };
        }
        
        // Emotional support keywords
        if (input.includes('sad') || input.includes('stressed') || input.includes('anxious') || input.includes('worried') || input.includes('depressed')) {
            return {
                text: "I hear that you're going through a difficult time. These feelings are valid, and it's okay to not be okay. Can you tell me more about what's been weighing on your mind?",
                showBookingButton: false
            };
        }
        
        if (input.includes('exam') || input.includes('test') || input.includes('study') || input.includes('grades')) {
            return {
                text: "Academic pressure can be overwhelming. Remember to take breaks, practice deep breathing, and break tasks into smaller steps. You're capable of handling this! Would you like some study tips or relaxation techniques?",
                showBookingButton: false
            };
        }
        
        if (input.includes('sleep') || input.includes('insomnia') || input.includes('tired')) {
            return {
                text: "Sleep is crucial for mental health. Try establishing a bedtime routine, avoiding screens before bed, and creating a calm environment. I can guide you to our sleep resources if you'd like.",
                showBookingButton: false
            };
        }

        if (input.includes('lonely') || input.includes('alone') || input.includes('friends')) {
            return {
                text: "Feeling lonely is tough, especially in a new environment. Consider joining clubs, study groups, or our peer support forum where you can connect with others who understand.",
                showBookingButton: false
            };
        }
        
        // Default response
        return {
            text: "Thank you for sharing that with me. I'm here to listen and support you. Is there anything specific you'd like to talk about or any way I can help you today?",
            showBookingButton: false
        };
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Bot response after delay
        setTimeout(() => {
            const botResponse = getBotResponse(inputValue);
            const botMessage = {
                id: Date.now() + 1,
                text: botResponse.text,
                sender: 'bot',
                timestamp: new Date(),
                showBookingButton: botResponse.showBookingButton
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const quickResponses = [
        "I'm feeling anxious",
        "I'm stressed about exams",
        "I can't sleep",
        "I feel lonely"
    ];

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto fade-in">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-brand-text mb-2">AI Chat Support</h2>
                <p className="text-brand-text opacity-75">Get immediate support and guidance 24/7</p>
            </div>

            <div className="chat-container bg-brand-calm rounded-xl p-4 mb-4">
                {messages.map(message => (
                    <div key={message.id} className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl ${
                            message.sender === 'user' 
                                ? 'bg-brand-primary text-white user-message' 
                                : 'bg-white text-brand-text shadow-sm message-bubble'
                        }`}>
                            <p className="text-sm leading-relaxed">{message.text}</p>
                            {message.showBookingButton && (
                                <button
                                    onClick={() => setActivePage('booking')}
                                    className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors pulse"
                                >
                                    🆘 Book Emergency Session
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                
                {isTyping && (
                    <div className="mb-4 flex justify-start">
                        <div className="bg-white text-brand-text shadow-sm px-4 py-3 rounded-xl max-w-xs">
                            <div className="flex items-center space-x-2">
                                <div className="loading-spinner"></div>
                                <span className="text-sm opacity-75">Typing...</span>
                            </div>
                        </div>
                    </div>
                )}
                
                <div ref={chatEndRef} />
            </div>

            {/* Quick Response Buttons */}
            <div className="mb-4">
                <p className="text-sm text-brand-text opacity-75 mb-2">Quick responses:</p>
                <div className="flex flex-wrap gap-2">
                    {quickResponses.map((response, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setInputValue(response);
                                setTimeout(handleSendMessage, 100);
                            }}
                            className="bg-brand-secondary text-brand-text px-3 py-1 rounded-full text-sm hover:bg-brand-primary hover:text-white transition-colors"
                        >
                            {response}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex space-x-2">
                <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here... (Press Enter to send)"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary resize-none"
                    rows="1"
                    style={{ minHeight: '44px', maxHeight: '120px' }}
                />
                <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-brand-primary text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Send
                </button>
            </div>

            <div className="mt-4 p-3 bg-brand-secondary rounded-xl">
                <p className="text-xs text-brand-text opacity-75">
                    <strong>Privacy Note:</strong> This chat is confidential. In case of emergency, please call your local crisis hotline or emergency services.
                </p>
            </div>
        </div>
    );
};