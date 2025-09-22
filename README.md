<div align="center">

# 🎯 Saarthi: PM Youna Portal

<img src="https://img.shields.io/badge/Next.js-14.2.25-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
<img src="https://img.shields.io/badge/Django-4.2+-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Django" />
<img src="https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
<img src="https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />

### 🚀 Connecting Students with Government Internship Opportunities

*A modern, AI-powered platform that bridges the gap between talented students and meaningful government internships through intelligent matching and streamlined applications.*

[🌟 **Live Demo**](https://saarthi-demo.vercel.app) • [📖 **Documentation**](https://docs.saarthi.dev) • [🐛 **Report Bug**](https://github.com/Naman-56-56/saarthi/issues) • [💡 **Request Feature**](https://github.com/Naman-56-56/saarthi/issues)

---

</div>

## ✨ What Makes Saarthi Special?

<table>
<tr>
<td width="50%">

### 🎯 **Smart Matching**
AI-powered recommendations that understand your skills, interests, and career goals to suggest the perfect internship opportunities.

### 🔐 **Secure & Reliable**
Enterprise-grade security with OTP verification, secure data handling, and robust authentication systems.

</td>
<td width="50%">

### 📊 **Progress Tracking**
Real-time analytics, skill-based leaderboards, and achievement badges to gamify your internship journey.

### 🎨 **Modern Experience**
Beautiful, responsive design with dark/light themes and smooth animations for an engaging user experience.

</td>
</tr>
</table>

---

## 🚀 Key Features

<div align="center">

| Feature | Description | Status |
|---------|-------------|--------|
| 🔐 **Authentication** | Secure sign-up/login with email OTP verification | ✅ Complete |
| 🎯 **Smart Recommendations** | AI-powered internship matching using ML algorithms | ✅ Complete |
| 📋 **Profile Management** | Comprehensive profile builder with resume upload | ✅ Complete |
| 🏆 **Leaderboard System** | Skill-based rankings and achievement tracking | ✅ Complete |
| 📱 **Responsive Design** | Mobile-first design with theme switching | ✅ Complete |
| 👨‍💼 **Admin Dashboard** | Complete management system for internships & users | ✅ Complete |

</div>

---

## 🛠️ Technology Stack

<div align="center">

### Frontend Architecture
\`\`\`mermaid
graph TD
    A[Next.js 14] --> B[React 18]
    A --> C[TypeScript]
    B --> D[Tailwind CSS]
    B --> E[Framer Motion]
    B --> F[shadcn/ui]
    C --> G[React Hook Form]
    C --> H[Zod Validation]
\`\`\`

### Backend Architecture
\`\`\`mermaid
graph TD
    I[Django 4.2+] --> J[Django REST Framework]
    I --> K[SQLite/PostgreSQL]
    J --> L[scikit-learn]
    J --> M[pandas]
    K --> N[User Management]
    K --> O[Internship Data]
\`\`\`

</div>

<table align="center">
<tr>
<th>Category</th>
<th>Technologies</th>
</tr>
<tr>
<td><strong>Frontend</strong></td>
<td>
<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" />
</td>
</tr>
<tr>
<td><strong>Backend</strong></td>
<td>
<img src="https://img.shields.io/badge/Django-092E20?style=flat-square&logo=django&logoColor=white" />
<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" />
<img src="https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white" />
</td>
</tr>
<tr>
<td><strong>AI/ML</strong></td>
<td>
<img src="https://img.shields.io/badge/scikit--learn-F7931E?style=flat-square&logo=scikit-learn&logoColor=white" />
<img src="https://img.shields.io/badge/pandas-150458?style=flat-square&logo=pandas&logoColor=white" />
<img src="https://img.shields.io/badge/joblib-FF6B6B?style=flat-square" />
</td>
</tr>
</table>

---

## 📦 Project Architecture

\`\`\`
saarthi/
├── 🎨 frontend/                 # Next.js Frontend Application
│   ├── 📱 app/                  # App Router pages & layouts
│   │   ├── globals.css          # Global styles & theme variables
│   │   ├── layout.tsx           # Root layout with providers
│   │   └── page.tsx             # Landing page
│   ├── 🧩 components/           # Reusable UI components
│   │   ├── ui/                  # shadcn/ui component library
│   │   ├── theme-provider.tsx   # Theme context provider
│   │   └── theme-toggle.tsx     # Dark/light mode switcher
│   ├── 🎣 hooks/                # Custom React hooks
│   ├── 📚 lib/                  # Utility functions & configs
│   └── 🖼️ public/               # Static assets & images
├── 🔧 saarthi/                  # Django Backend Application
│   ├── 👥 users/                # User management & authentication
│   ├── 🎯 recommendations/      # ML-powered recommendation engine
│   ├── ⚙️ saarthi/              # Project settings & configuration
│   └── 🚀 manage.py             # Django management commands
├── 📋 requirements.txt          # Python dependencies
├── 🔐 .env.example              # Environment variables template
└── 📖 README.md                 # This beautiful documentation
\`\`\`

---

## ⚡ Quick Start Guide

### 🔧 Prerequisites

<div align="center">

| Requirement | Version | Download |
|-------------|---------|----------|
| **Python** | 3.9+ | [Download](https://python.org/downloads/) |
| **Node.js** | 18+ | [Download](https://nodejs.org/) |
| **pnpm** | Latest | `npm install -g pnpm` |
| **Git** | Latest | [Download](https://git-scm.com/) |

</div>

### 🚀 Installation

<details>
<summary><strong>📥 1. Clone & Setup</strong></summary>

\`\`\`bash
# Clone the repository
git clone https://github.com/Naman-56-56/saarthi.git
cd saarthi

# Create environment file
cp .env.example .env
# Edit .env with your configuration
\`\`\`

</details>

<details>
<summary><strong>🐍 2. Backend Setup (Django)</strong></summary>

\`\`\`bash
# Navigate to backend directory
cd saarthi

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (admin)
python manage.py createsuperuser

# Start Django server
python manage.py runserver
\`\`\`

**🎉 Backend running at:** `http://localhost:8000`

</details>

<details>
<summary><strong>⚛️ 3. Frontend Setup (Next.js)</strong></summary>

\`\`\`bash
# Navigate to frontend directory
cd frontend

# Install dependencies
pnpm install

# Start development server
pnpm dev
\`\`\`

**🎉 Frontend running at:** `http://localhost:3000`

</details>

### 🌐 Access Points

<div align="center">

| Service | URL | Description |
|---------|-----|-------------|
| 🎨 **Frontend** | [localhost:3000](http://localhost:3000) | Main application interface |
| 🔧 **Backend API** | [localhost:8000](http://localhost:8000) | Django REST API |
| 👨‍💼 **Admin Panel** | [localhost:8000/admin](http://localhost:8000/admin) | Django admin interface |

</div>

---

## 🔐 Environment Configuration

<details>
<summary><strong>📧 Email Configuration</strong></summary>

\`\`\`env
# Gmail SMTP Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_app_password
EMAIL_USE_TLS=True
DEFAULT_FROM_EMAIL=your_email@gmail.com
\`\`\`

> **💡 Pro Tip:** Use Gmail App Passwords for enhanced security!

</details>

<details>
<summary><strong>🗄️ Database Configuration</strong></summary>

\`\`\`env
# SQLite (Default - Development)
DATABASE_URL=sqlite:///db.sqlite3

# PostgreSQL (Production)
DATABASE_URL=postgresql://user:password@localhost:5432/saarthi
\`\`\`

</details>

---

## 🎯 Usage Examples

### 🔐 User Authentication Flow

\`\`\`python
# Django Backend - OTP Verification
from users.models import User
from users.utils import send_otp_email

# Generate and send OTP
user = User.objects.get(email="student@example.com")
otp_code = generate_otp()
send_otp_email(user.email, otp_code)
\`\`\`

### 🤖 AI Recommendation System

\`\`\`python
# ML-powered internship matching
from recommendations.models import InternshipRecommendation
from recommendations.ml_engine import RecommendationEngine

engine = RecommendationEngine()
recommendations = engine.get_recommendations(
    user_id=user.id,
    skills=["Python", "Django", "React"],
    preferences={"location": "Remote", "duration": "3 months"}
)
\`\`\`

---

## 🤝 Contributing

<div align="center">

### 🌟 We Welcome Contributors!

*Help us make Saarthi even better for students across the nation*

</div>

<details>
<summary><strong>🚀 Getting Started</strong></summary>

1. **🍴 Fork** the repository
2. **🌿 Create** your feature branch
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`
3. **💾 Commit** your changes
   \`\`\`bash
   git commit -m 'Add some amazing feature'
   \`\`\`
4. **📤 Push** to the branch
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`
5. **🔄 Open** a Pull Request

</details>

<details>
<summary><strong>📋 Contribution Guidelines</strong></summary>

- ✅ Follow existing code style and conventions
- ✅ Write clear, descriptive commit messages
- ✅ Add tests for new features
- ✅ Update documentation as needed
- ✅ Ensure all tests pass before submitting

</details>

---

## 📊 Project Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/Naman-56-56/saarthi?style=social)
![GitHub forks](https://img.shields.io/github/forks/Naman-56-56/saarthi?style=social)
![GitHub issues](https://img.shields.io/github/issues/Naman-56-56/saarthi)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Naman-56-56/saarthi)

![GitHub last commit](https://img.shields.io/github/last-commit/Naman-56-56/saarthi)
![GitHub repo size](https://img.shields.io/github/repo-size/Naman-56-56/saarthi)
![Lines of code](https://img.shields.io/tokei/lines/github/Naman-56-56/saarthi)

</div>

---

## 📄 License

<div align="center">

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

*Feel free to use, modify, and distribute this project as per the license terms.*

</div>

---

## 🙏 Acknowledgements

<div align="center">

### 💝 Special Thanks To

<table>
<tr>
<td align="center">
<img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" /><br>
<strong>Django Team</strong><br>
<em>Robust backend framework</em>
</td>
<td align="center">
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" /><br>
<strong>Vercel Team</strong><br>
<em>Amazing React framework</em>
</td>
<td align="center">
<img src="https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" /><br>
<strong>Tailwind Labs</strong><br>
<em>Beautiful utility-first CSS</em>
</td>
</tr>
<tr>
<td align="center">
<img src="https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" /><br>
<strong>scikit-learn</strong><br>
<em>Powerful ML algorithms</em>
</td>
<td align="center">
<img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" /><br>
<strong>shadcn/ui</strong><br>
<em>Beautiful component library</em>
</td>
<td align="center">
<img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" /><br>
<strong>Framer Motion</strong><br>
<em>Smooth animations</em>
</td>
</tr>
</table>

</div>

---

## 💬 Support & Contact

<div align="center">

### 🤔 Need Help?

<table>
<tr>
<td align="center">
<strong>📧 Email Support</strong><br>
<a href="mailto:codeweave12@gmail.com">codeweave12@gmail.com</a>
</td>
<td align="center">
<strong>🐛 Bug Reports</strong><br>
<a href="https://github.com/Naman-56-56/saarthi/issues">GitHub Issues</a>
</td>
<td align="center">
<strong>💡 Feature Requests</strong><br>
<a href="https://github.com/Naman-56-56/saarthi/discussions">GitHub Discussions</a>
</td>
</tr>
</table>

---

### 🌟 Show Your Support

*If this project helped you, please consider giving it a ⭐ on GitHub!*

**Made with ❤️ by the Saarthi Team**

</div>

---

<div align="center">
<sub>Built with modern technologies • Designed for the future • Made in India 🇮🇳</sub>
</div>
