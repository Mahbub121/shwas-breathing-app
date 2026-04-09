import { AppProvider, useApp } from './context/AppContext';
import HomeScreen from './screens/HomeScreen';
import SessionScreen from './screens/SessionScreen';
import CompleteScreen from './screens/CompleteScreen';
import HistoryScreen from './screens/HistoryScreen';
import './styles/global.css';

function AppContent() {
  const { screen } = useApp();

  switch (screen) {
    case 'session':
      return <SessionScreen />;
    case 'complete':
      return <CompleteScreen />;
    case 'history':
      return <HistoryScreen />;
    case 'home':
    default:
      return <HomeScreen />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
