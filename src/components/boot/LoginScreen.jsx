import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { playStartupSound, playErrorSound } from '../../utils/audio';

export default function LoginScreen() {
  const { loginUser, turnOffOS } = useStore();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === '1234') {
      playStartupSound();
      loginUser();
    } else {
      playErrorSound();
      setError('The password you typed is incorrect. Please try again.');
    }
  };

  const handleTurnOff = () => {
    turnOffOS();
  };

  return (
    <div className="w-full h-screen bg-[#003399] flex flex-col font-tahoma overflow-hidden select-none">
      
      {/* Top Banner */}
      <div className="h-16 sm:h-24 bg-gradient-to-b from-[#0058e6] to-[#003dbb] w-full border-b-2 border-white flex items-center shadow-lg relative z-10 px-4 sm:px-12">
        <h1 className="text-white text-2xl sm:text-3xl font-italic italic tracking-tighter">
          Windows<span className="text-orange-alert font-normal">XP</span>
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row w-full relative z-0 overflow-y-auto justify-center items-center py-6 md:py-0">
        
        {/* Left Side (Logo / Heading) */}
        <div className="w-full md:flex-1 flex justify-center md:justify-end items-center px-4 md:pr-12 md:border-r border-gray-400/50 mb-6 md:mb-0 text-center md:text-right">
          <div className="text-white">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-normal">To begin, click your user name</h2>
          </div>
        </div>

        {/* Right Side (Users) */}
        <div className="w-full md:flex-1 flex justify-center md:justify-start items-center px-4 md:pl-12">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left bg-blue-900/20 sm:bg-transparent p-4 sm:p-0 rounded-lg border border-white/10 sm:border-0">
            {/* User Avatar */}
            <div className="w-16 h-16 rounded-md border-2 border-white overflow-hidden shadow-lg mb-3 sm:mb-0 sm:mr-4 bg-orange-400 flex items-center justify-center text-white text-3xl flex-shrink-0">
              D
            </div>
            
            {/* User Details */}
            <div className="flex flex-col pt-1 items-center sm:items-start">
              <span className="text-white text-xl sm:text-2xl font-semibold mb-2">Dixit Patel</span>
              
              <form onSubmit={handleLogin} className="flex items-center space-x-2">
                <input 
                  type="password" 
                  autoFocus
                  placeholder="Type your password" 
                  className="px-2 border border-gray-400 shadow-inner w-40 sm:w-48 text-black focus:outline-none focus:border-blue-500 rounded-sm h-8 sm:h-7 text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="w-8 h-8 sm:w-7 sm:h-7 bg-green-500 border border-white rounded-md flex items-center justify-center shadow-md hover:bg-green-400 cursor-pointer active:scale-95 transition-transform touch-action-manipulation">
                  <span className="text-white text-lg font-bold leading-none">➔</span>
                </button>
              </form>
              
              <div className="text-white text-xs mt-2 min-h-[20px]">
                {error ? <span className="text-yellow-300">{error}</span> : <span>Hint: 1234</span>}
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="min-h-14 sm:h-20 bg-gradient-to-t from-[#0058e6] to-[#003dbb] w-full border-t border-blue-400 flex flex-col sm:flex-row items-center px-4 sm:px-12 justify-between py-2 sm:py-0 gap-2">
        <div className="flex space-x-6 text-white text-xs sm:text-sm">
          <button onClick={handleTurnOff} className="flex items-center hover:underline cursor-pointer">
            <span className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-2 border border-white text-xs">
              ⏻
            </span>
            Turn off computer
          </button>
        </div>
        <div className="text-white text-xs opacity-80 text-center sm:text-right hidden sm:block">
          After you log on, you can add or change accounts. Just go to Control Panel and click User Accounts.
        </div>
      </div>
    </div>
  );
}
