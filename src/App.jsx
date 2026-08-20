import { useStore } from './store/useStore';
import Desktop from './components/os/Desktop';
import Taskbar from './components/os/Taskbar';
import StartMenu from './components/os/StartMenu';
import WindowManager from './components/os/WindowManager';
import BootScreen from './components/boot/BootScreen';
import LoginScreen from './components/boot/LoginScreen';
import RoverAssistant from './components/os/RoverAssistant';

function App() {
  const { isBooted, isLoggedIn, currentWallpaper } = useStore();

  if (!isBooted) {
    return <BootScreen />;
  }

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  const wallpaperStyle = currentWallpaper.url.startsWith('http') || currentWallpaper.url.startsWith('/')
    ? { background: `url('${currentWallpaper.url}') center/cover no-repeat`, backgroundColor: currentWallpaper.bgColor }
    : { backgroundColor: currentWallpaper.bgColor };

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col font-tahoma select-none">
      <div 
        className="relative flex-1 w-full overflow-hidden transition-all duration-300"
        style={wallpaperStyle}
      >
        <Desktop />
        <WindowManager />
        <StartMenu />
        <RoverAssistant />
      </div>
      
      {/* Bottom Taskbar */}
      <Taskbar />
    </div>
  );
}

export default App;
