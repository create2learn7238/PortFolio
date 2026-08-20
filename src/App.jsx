import { useStore } from './store/useStore';
import Desktop from './components/os/Desktop';
import Taskbar from './components/os/Taskbar';
import StartMenu from './components/os/StartMenu';
import WindowManager from './components/os/WindowManager';
import BootScreen from './components/boot/BootScreen';
import LoginScreen from './components/boot/LoginScreen';

function App() {
  const { isBooted, isLoggedIn } = useStore();

  if (!isBooted) {
    return <BootScreen />;
  }

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      <div 
        className="relative flex-1 w-full overflow-hidden"
        style={{ background: "url('/assets/bliss.jpg') center/cover no-repeat", backgroundColor: '#3a6ea5' }}
      >
        <Desktop />
        <WindowManager />
        <StartMenu />
      </div>
      
      {/* Bottom Taskbar */}
      <Taskbar />
    </div>
  );
}

export default App;
