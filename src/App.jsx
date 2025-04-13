import './styles/global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Learning from './components/learning/Learning';
import Games from './components/games/Games';
import VideoLectures from './components/lectures/VideoLectures';
import StudyTools from './components/tools/StudyTools';
import Analytics from './components/analytics/Analytics';
import Sidebar from './components/Dashboard/Sidebar';
import './App.css';
import NextGenFeatures from "./components/nextgen/NextGenFeatures";
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/games" element={<Games />} />
            <Route path="/video-lectures" element={<VideoLectures />} />
            <Route path="/study-tools" element={<StudyTools />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/next-gen" element={<NextGenFeatures />} /> {/* Add this line */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
