# Urge Tracker App

An intelligent urge tracking application that helps users identify patterns and triggers through structured data collection and insightful analytics.

## Features

### MVP (Phase 1) ✅
- **Quick Urge Logging**: Log urges in under 60 seconds
- **Offline Support**: Full functionality without internet connection
- **Analytics Dashboard**: Visual patterns and insights
- **Entry History**: View, edit, and filter past entries
- **Privacy First**: All data stored locally on your device

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Charts**: Chart.js + react-chartjs-2
- **Storage**: IndexedDB (via idb)
- **PWA**: Installable on iOS and Android

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. **Log an Urge**: Click the + button to quickly log when you experience an urge
2. **View Patterns**: Check the Dashboard to see your patterns and trends
3. **Review History**: Browse all past entries with search and filter
4. **Track Progress**: Monitor your success rate and current streak

## Privacy & Security

- All data is stored locally on your device using IndexedDB
- No data is sent to external servers
- No account required
- You can delete all data at any time

## Progressive Web App

This app can be installed on your device:
- **iOS**: Open in Safari, tap Share → Add to Home Screen
- **Android**: Open in Chrome, tap Menu → Install App
- **Desktop**: Look for the install icon in your browser's address bar

## Roadmap

### Phase 2 (Planned)
- Pattern insights with AI-generated observations
- Trigger profiles and deep-dive analysis
- Progress tracking with milestone celebrations

### Phase 3 (Planned)
- Smart notifications based on patterns
- Coping strategies library
- Data export (PDF & CSV)

## Important Notice

This app is a tracking tool and is not a replacement for professional treatment. If you're struggling, please reach out to a healthcare provider or counselor.

## License

MIT License - See LICENSE file for details
