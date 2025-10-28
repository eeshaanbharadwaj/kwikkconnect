# KwikkConnect 🔗

A comprehensive incident management and expert collaboration platform that streamlines critical issue resolution through AI-powered expert matching, real-time collaboration, and automated postmortem analysis.

![KwikkConnect](https://img.shields.io/badge/React-18.2.0-blue?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0.0-purple?style=flat&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.6-38B2AC?style=flat&logo=tailwind-css)
![Gemini AI](https://img.shields.io/badge/Gemini%20AI-1.5%20Flash-green?style=flat&logo=google)

## 🚀 Features

### 📊 **Dashboard & Case Management**  
- **Comprehensive Case Overview**: Track all  incidents with real-time status updates             
- **Advanced Filtering**: Filter cases by status, module, severity, and custom criteria
- **Quick Stats**: Monitor key metrics and case distribution  
- **Bulk Operations**: Select and manage multiple cases simultaneously

### 🎯 **AI-Powered Expert Matching**
- **Intelligent Matching**: AI algorithms match cases with the most suitable experts
- **Skill-Based Matching**: Consider expert skills, availability, and past performance
- **Confidence Scoring**: Get confidence levels for each expert match
- **Historical Analysis**: Learn from past case resolutions to improve matching

### 💬 **Real-Time Collaboration (Swarm Room)**
- **Live Chat Interface**: Real-time messaging between team members
- **Case Context Integration**: Access case details and timeline during discussions
- **Participant Management**: Track who's online and their roles
- **Timeline Synchronization**: Keep everyone updated on case progress

### 📈 **Timeline & Activity Tracking**
- **Visual Timeline**: Track case progress with interactive timeline
- **Activity Logging**: Record all actions, decisions, and updates
- **Filter & Search**: Find specific events or time periods quickly
- **Export Capabilities**: Generate reports for stakeholders

### 📋 **Postmortem Analysis & Documentation**
- **Automated Generation**: AI-powered postmortem creation
- **Root Cause Analysis**: Structured analysis of incident causes
- **Executive Summary**: High-level overview for management
- **Lessons Learned**: Document insights for future prevention
- **Similar Cases**: Find related incidents for pattern analysis

### 🤖 **AI Assistant Integration**
- **Floating AI Assistant**: Context-aware help throughout the application
- **Gemini AI Integration**: Powered by Google's Gemini 1.5 Flash/Pro models
- **Smart Suggestions**: Get recommendations for case resolution
- **Natural Language Processing**: Chat with AI about case details

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0 with Vite
- **Styling**: Tailwind CSS with custom components
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **AI Integration**: Google Gemini AI (1.5 Flash/Pro)
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Charts**: Recharts & D3.js
- **Icons**: Lucide React
- **Forms**: React Hook Form

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kwikkconnect.git
   cd kwikkconnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🎯 Usage

### Getting Started

1. **Login**: Access the application through the login page
2. **Dashboard**: View all cases and key metrics
3. **Create Case**: Use the case creation form to log new incidents
4. **Expert Matching**: Let AI find the best experts for your case
5. **Collaborate**: Join the swarm room for real-time collaboration
6. **Track Progress**: Monitor case timeline and activities
7. **Document**: Generate comprehensive postmortem reports

### Key Workflows

#### Case Management
- Create new cases with detailed descriptions
- Assign severity levels and categorize by module
- Track case status through the resolution lifecycle
- Filter and search cases efficiently

#### Expert Matching
- AI analyzes case requirements and expert profiles
- Get confidence scores for each match
- Request expert assistance with custom messages
- Track expert response times and availability

#### Real-Time Collaboration
- Join case-specific swarm rooms
- Chat with team members in real-time
- Access case context and timeline
- Share files and updates

#### Postmortem Analysis
- Generate comprehensive incident reports
- Analyze root causes with AI assistance
- Document lessons learned
- Share findings with stakeholders

## 🔧 Configuration

### AI Service Configuration
The application uses Google Gemini AI for various features. Configure your API key in the environment variables:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

### Customization
- Modify `tailwind.config.js` for theme customization
- Update component styles in `src/components/ui/`
- Configure AI prompts in `src/utils/geminiService.js`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/            # Base UI components
│   └── ...            # Feature-specific components
├── pages/             # Main application pages
│   ├── dashboard-case-management-overview/
│   ├── expert-matching-panel/
│   ├── swarm-room-real-time-collaboration/
│   ├── postmortem-analysis-documentation/
│   └── ...
├── utils/             # Utility functions and services
│   ├── geminiService.js
│   └── expertMatchingService.js
├── styles/            # Global styles and Tailwind config
└── Routes.jsx         # Application routing
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices
- Use TypeScript for new components (optional)
- Maintain consistent code formatting
- Write meaningful commit messages
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the code comments and component documentation
- **Issues**: Report bugs and feature requests via GitHub Issues
- **Discussions**: Join our GitHub Discussions for questions and ideas

## 🚀 Roadmap

- [ ] **Mobile App**: Native mobile application
- [ ] **Advanced Analytics**: Enhanced reporting and insights
- [ ] **Integration APIs**: Connect with external tools
- [ ] **Multi-language Support**: Internationalization
- [ ] **Advanced AI Features**: More sophisticated AI capabilities
- [ ] **Real-time Notifications**: Push notifications and alerts

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful AI capabilities
- **Tailwind CSS** for the beautiful design system
- **React Community** for the excellent ecosystem
- **All Contributors** who help improve this project

---

**Made with ❤️ for incident management teams worldwide** 
