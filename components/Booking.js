// Booking Component

const { useState, useEffect, useRef} = React;
const Booking = () => {
    const [formData, setFormData] = useState({
        pseudonym: '',
        counsellor: '',
        date: '',
        time: '',
        urgency: 'normal',
        notes: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const counsellors = [
        { id: 1, name: 'Dr. Sarah Sharma', specialty: 'Anxiety & Stress Management', available: 'Mon-Fri' },
        { id: 2, name: 'Dr. Raj Patel', specialty: 'Depression & Mood Disorders', available: 'Tue-Sat' },
        { id: 3, name: 'Dr. Priya Kumar', specialty: 'Academic Pressure & Performance', available: 'Mon-Wed-Fri' },
        { id: 4, name: 'Dr. Amit Singh', specialty: 'Relationship & Social Issues', available: 'Mon-Thu' },
        { id: 5, name: 'Dr. Neha Gupta', specialty: 'General Counseling & Support', available: 'Daily' }
    ];

    const timeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
    ];

    const urgencyLevels = [
        { value: 'normal', label: 'Normal (within a week)', color: 'text-green-600' },
        { value: 'urgent', label: 'Urgent (within 2-3 days)', color: 'text-yellow-600' },
        { value: 'emergency', label: 'Emergency (within 24 hours)', color: 'text-red-600' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsSubmitted(true);
        setIsLoading(false);
    };

    const handleReset = () => {
        setIsSubmitted(false);
        setFormData({
            pseudonym: '',
            counsellor: '',
            date: '',
            time: '',
            urgency: 'normal',
            notes: ''
        });
    };

    const generateBookingId = () => {
        return 'ME-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    };

    if (isSubmitted) {
        const selectedCounsellor = counsellors.find(c => c.name === formData.counsellor);
        
        return (
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto text-center fade-in">
                <div className="mb-6">
                    <div className="w-20 h-20 bg-brand-accent rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
                        <span className="text-3xl">✓</span>
                    </div>
                    <h2 className="text-3xl font-bold text-brand-text mb-4">Appointment Confirmed!</h2>
                    
                    <div className="bg-brand-secondary rounded-xl p-6 text-left mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-brand-text opacity-75">Booking ID</p>
                                <p className="font-semibold text-brand-text">{generateBookingId()}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-brand-text opacity-75">Name</p>
                                <p className="font-semibold text-brand-text">{formData.pseudonym}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-brand-text opacity-75">Counsellor</p>
                                <p className="font-semibold text-brand-text">{selectedCounsellor?.name}</p>
                                <p className="text-xs text-brand-text opacity-60">{selectedCounsellor?.specialty}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-brand-text opacity-75">Date & Time</p>
                                <p className="font-semibold text-brand-text">{formData.date}</p>
                                <p className="font-semibold text-brand-text">{formData.time}</p>
                            </div>
                        </div>
                        
                        {formData.urgency !== 'normal' && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-sm font-medium text-brand-text opacity-75">Priority Level</p>
                                <p className={`font-semibold ${urgencyLevels.find(u => u.value === formData.urgency)?.color}`}>
                                    {urgencyLevels.find(u => u.value === formData.urgency)?.label}
                                </p>
                            </div>
                        )}
                    </div>
                    
                    <div className="space-y-4 text-brand-text opacity-75">
                        <p>You'll receive a confirmation email with meeting details and preparation instructions.</p>
                        <p><strong>All sessions are completely confidential</strong> - your real identity is protected.</p>
                        
                        {formData.urgency === 'emergency' && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                <p className="text-red-800 font-medium">🆘 Emergency Priority</p>
                                <p className="text-red-700 text-sm">You will be contacted within 2 hours to confirm your emergency session.</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <button
                            onClick={handleReset}
                            className="bg-brand-primary text-white px-8 py-3 rounded-xl hover:bg-blue-600 transition-colors font-medium"
                        >
                            Book Another Appointment
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="border border-brand-primary text-brand-primary px-8 py-3 rounded-xl hover:bg-brand-secondary transition-colors font-medium"
                        >
                            Print Confirmation
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto fade-in">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-brand-text mb-3">Book Confidential Session</h2>
                <p className="text-brand-text opacity-75">Schedule a private appointment with a professional counselor</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-brand-text mb-2">
                        Pseudonym <span className="text-red-500">*</span>
                        <span className="block text-xs font-normal opacity-60">Your privacy is completely protected</span>
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.pseudonym}
                        onChange={(e) => setFormData({...formData, pseudonym: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                        placeholder="Enter a name to use for your appointment"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-brand-text mb-2">
                        Priority Level <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                        {urgencyLevels.map(level => (
                            <label key={level.value} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="urgency"
                                    value={level.value}
                                    checked={formData.urgency === level.value}
                                    onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                                    className="text-brand-primary focus:ring-brand-primary"
                                />
                                <span className={`text-sm font-medium ${level.color}`}>{level.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-brand-text mb-2">
                        Select Counsellor <span className="text-red-500">*</span>
                    </label>
                    <select
                        required
                        value={formData.counsellor}
                        onChange={(e) => setFormData({...formData, counsellor: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                    >
                        <option value="">Choose a counsellor...</option>
                        {counsellors.map(counsellor => (
                            <option key={counsellor.id} value={counsellor.name}>
                                {counsellor.name} - {counsellor.specialty} ({counsellor.available})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-brand-text mb-2">
                            Preferred Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-brand-text mb-2">
                            Preferred Time <span className="text-red-500">*</span>
                        </label>
                        <select
                            required
                            value={formData.time}
                            onChange={(e) => setFormData({...formData, time: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                        >
                            <option value="">Select time...</option>
                            {timeSlots.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-brand-text mb-2">
                        Additional Notes (Optional)
                    </label>
                    <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all resize-none"
                        placeholder="Any specific concerns or preferences..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-brand-primary text-white py-4 rounded-xl hover:bg-blue-600 transition-colors font-medium text-lg disabled:opacity-50 flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <div className="loading-spinner mr-2"></div>
                            Booking Appointment...
                        </>
                    ) : (
                        'Book Appointment'
                    )}
                </button>
            </form>

            <div className="mt-8 p-6 bg-brand-secondary rounded-xl">
                <h3 className="font-semibold text-brand-text mb-2">Privacy & Confidentiality</h3>
                <ul className="text-sm text-brand-text opacity-75 space-y-1">
                    <li>• All appointments are completely confidential</li>
                    <li>• Your real identity is never shared with counselors</li>
                    <li>• Sessions can be conducted online or in-person</li>
                    <li>• Emergency support available 24/7</li>
                </ul>
            </div>
        </div>
    );
};
                