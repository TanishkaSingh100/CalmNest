// Admin Dashboard Component

const { useState, useEffect, useRef} = React;
const StatCard = ({ title, value, icon, trend, trendValue, color = "bg-white" }) => (
    <div className={`${color} rounded-xl shadow-lg p-6 stat-card`}>
        <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">{icon}</div>
            {trend && (
                <div className={`flex items-center space-x-1 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    <span>{trend === 'up' ? '↗️' : '↘️'}</span>
                    <span>{trendValue}</span>
                </div>
            )}
        </div>
        <div>
            <p className="text-brand-text opacity-75 text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold text-brand-text">{value}</p>
        </div>
    </div>
);

const ProgressBar = ({ label, value, maxValue, color = "bg-brand-primary" }) => {
    const percentage = (value / maxValue) * 100;
    
    return (
        <div className="flex items-center space-x-4">
            <div className="w-32 text-sm font-medium text-brand-text">
                {label}
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                <div
                    className={`${color} h-6 rounded-full flex items-center justify-end pr-3 text-white text-sm font-medium progress-bar`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                >
                    {value}
                </div>
            </div>
            <div className="text-sm text-brand-text opacity-75 w-12 text-right">
                {Math.round(percentage)}%
            </div>
        </div>
    );
};

const AdminDashboard = () => {
    const [selectedTimeframe, setSelectedTimeframe] = useState('week');
    const [selectedMetric, setSelectedMetric] = useState('users');

    const keywordData = [
        { keyword: 'Anxiety', count: 145, trend: 'up', change: '+12%' },
        { keyword: 'Stress', count: 132, trend: 'up', change: '+8%' },
        { keyword: 'Depression', count: 98, trend: 'down', change: '-5%' },
        { keyword: 'Academic Pressure', count: 87, trend: 'up', change: '+15%' },
        { keyword: 'Sleep Issues', count: 76, trend: 'up', change: '+7%' },
        { keyword: 'Loneliness', count: 64, trend: 'up', change: '+18%' },
        { keyword: 'Career Anxiety', count: 52, trend: 'up', change: '+22%' }
    ];

    const maxCount = Math.max(...keywordData.map(item => item.count));

    const interventionData = [
        { month: 'Jan', successful: 8, total: 9 },
        { month: 'Feb', successful: 12, total: 14 },
        { month: 'Mar', successful: 15, total: 16 },
        { month: 'Apr', successful: 11, total: 13 },
        { month: 'May', successful: 18, total: 19 },
        { month: 'Jun', successful: 22, total: 23 }
    ];

    const departmentData = [
        { name: 'Engineering', users: 487, sessions: 156, color: 'bg-blue-500' },
        { name: 'Business', users: 342, sessions: 98, color: 'bg-green-500' },
        { name: 'Arts & Sciences', users: 298, sessions: 87, color: 'bg-purple-500' },
        { name: 'Medicine', users: 189, sessions: 72, color: 'bg-red-500' },
        { name: 'Law', users: 156, sessions: 45, color: 'bg-yellow-500' },
        { name: 'Education', users: 134, sessions: 38, color: 'bg-pink-500' }
    ];

    const totalUsers = departmentData.reduce((sum, dept) => sum + dept.users, 0);

    const timeFrames = [
        { value: 'week', label: 'This Week' },
        { value: 'month', label: 'This Month' },
        { value: 'quarter', label: 'This Quarter' },
        { value: 'year', label: 'This Year' }
    ];

    const alertData = [
        {
            id: 1,
            type: 'crisis',
            message: 'High-priority crisis intervention needed',
            time: '2 minutes ago',
            severity: 'urgent'
        },
        {
            id: 2,
            type: 'trend',
            message: 'Anxiety keywords increased by 18% this week',
            time: '1 hour ago',
            severity: 'warning'
        },
        {
            id: 3,
            type: 'resource',
            message: 'Depression resource guide reached 1000 downloads',
            time: '3 hours ago',
            severity: 'info'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto fade-in">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-4xl font-bold text-brand-text mb-2">Admin Dashboard</h2>
                        <p className="text-brand-text opacity-75">Analytics and insights for university mental health services</p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <select
                            value={selectedTimeframe}
                            onChange={(e) => setSelectedTimeframe(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        >
                            {timeFrames.map(frame => (
                                <option key={frame.value} value={frame.value}>
                                    {frame.label}
                                </option>
                            ))}
                        </select>
                        
                        <button className="bg-brand-primary text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition-colors">
                            📊 Export Report
                        </button>
                    </div>
                </div>
            </div>

            {/* Alert Banner */}
            <div className="mb-8">
                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm">
                                🚨
                            </div>
                            <div>
                                <p className="font-medium text-red-800">Crisis Alert</p>
                                <p className="text-red-700 text-sm">2 high-priority interventions pending review</p>
                            </div>
                        </div>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm">
                            Review Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                    title="Active Users" 
                    value="1,247" 
                    icon="👥" 
                    trend="up" 
                    trendValue="+15%" 
                    color="bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                />
                <StatCard 
                    title="Appointments Booked" 
                    value="89" 
                    icon="📅" 
                    trend="up" 
                    trendValue="+8%" 
                    color="bg-gradient-to-br from-green-500 to-green-600 text-white"
                />
                <StatCard 
                    title="Resources Accessed" 
                    value="2,156" 
                    icon="📚" 
                    trend="up" 
                    trendValue="+23%" 
                    color="bg-gradient-to-br from-purple-500 to-purple-600 text-white"
                />
                <StatCard 
                    title="Forum Posts" 
                    value="334" 
                    icon="💬" 
                    trend="up" 
                    trendValue="+11%" 
                    color="bg-gradient-to-br from-pink-500 to-pink-600 text-white"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
                {/* Keywords Analysis */}
                <div className="xl:col-span-2">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-brand-text">Most Common Keywords</h3>
                            <button className="text-brand-primary hover:text-blue-600 text-sm font-medium">
                                View Full Report →
                            </button>
                        </div>
                        <div className="space-y-4">
                            {keywordData.map(item => (
                                <div key={item.keyword}>
                                    <ProgressBar 
                                        label={item.keyword} 
                                        value={item.count} 
                                        maxValue={maxCount}
                                        color={item.trend === 'up' ? 'bg-red-500' : 'bg-green-500'}
                                    />
                                    <div className="flex justify-end mt-1">
                                        <span className={`text-xs ${item.trend === 'up' ? 'text-red-600' : 'text-green-600'}`}>
                                            {item.change} from last period
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Alerts */}
                <div>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-brand-text mb-6">Recent Alerts</h3>
                        <div className="space-y-4">
                            {alertData.map(alert => (
                                <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-brand-calm transition-colors">
                                    <div className={`w-3 h-3 rounded-full mt-2 ${
                                        alert.severity === 'urgent' ? 'bg-red-500' :
                                        alert.severity === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                                    }`}></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-brand-text">{alert.message}</p>
                                        <p className="text-xs text-brand-text opacity-60 mt-1">{alert.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 text-brand-primary hover:text-blue-600 text-sm font-medium">
                            View All Alerts
                        </button>
                    </div>
                </div>
            </div>

            {/* Department Breakdown */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-brand-text mb-6">Usage by Department</h3>
                    <div className="space-y-4">
                        {departmentData.map(dept => (
                            <div key={dept.name} className="flex items-center space-x-4">
                                <div className={`w-4 h-4 ${dept.color} rounded-full`}></div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-medium text-brand-text">{dept.name}</span>
                                        <span className="text-sm text-brand-text opacity-75">
                                            {dept.users} users
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`${dept.color} h-2 rounded-full transition-all duration-500`}
                                            style={{ width: `${(dept.users / totalUsers) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="text-sm text-brand-text opacity-75">
                                    {dept.sessions} sessions
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Crisis Interventions */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-brand-text mb-6">Crisis Interventions (6 months)</h3>
                    <div className="space-y-3">
                        {interventionData.map(data => (
                            <div key={data.month} className="flex items-center justify-between">
                                <span className="text-sm font-medium text-brand-text w-12">{data.month}</span>
                                <div className="flex-1 mx-4">
                                    <div className="flex justify-between text-xs text-brand-text opacity-75 mb-1">
                                        <span>Successful: {data.successful}</span>
                                        <span>Total: {data.total}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-green-500 h-3 rounded-full"
                                            style={{ width: `${(data.successful / data.total) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-green-600">
                                    {Math.round((data.successful / data.total) * 100)}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-brand-text mb-4">Success Rate</h3>
                    <div className="text-4xl font-bold text-brand-accent mb-2">94.7%</div>
                    <p className="text-brand-text opacity-75 text-sm">User satisfaction with services</p>
                    <div className="mt-3 text-xs text-green-600">+2.1% from last month</div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-brand-text mb-4">Response Time</h3>
                    <div className="text-4xl font-bold text-blue-600 mb-2">1.2h</div>
                    <p className="text-brand-text opacity-75 text-sm">Average crisis response time</p>
                    <div className="mt-3 text-xs text-green-600">-15% improvement</div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-brand-text mb-4">Peak Usage</h3>
                    <div className="text-4xl font-bold text-purple-600 mb-2">9PM</div>
                    <p className="text-brand-text opacity-75 text-sm">Most active hour daily</p>
                    <div className="mt-3 text-xs text-brand-text opacity-60">Exam period: 11PM</div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-brand-text mb-4">Counselor Load</h3>
                    <div className="text-4xl font-bold text-orange-600 mb-2">78%</div>
                    <p className="text-brand-text opacity-75 text-sm">Average capacity utilization</p>
                    <div className="mt-3 text-xs text-yellow-600">Near capacity - consider hiring</div>
                </div>
            </div>
        </div>
    );
};