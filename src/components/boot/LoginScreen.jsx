import { useState } from 'react';
import { useStore } from '../../store/useStore';

export default function LoginScreen() {
  const loginUser = useStore((state) => state.loginUser);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === '1234') {
      loginUser();
    } else {
      setError('The password you typed is incorrect. Please try again.');
    }
  };

  return (
    <div className="w-full h-screen bg-[#003399] flex flex-col font-tahoma overflow-hidden">
      
      {/* Top Banner */}
      <div className="h-24 bg-gradient-to-b from-[#0058e6] to-[#003dbb] w-full border-b-2 border-white flex items-center shadow-lg relative z-10">
        <h1 className="text-white text-3xl font-italic ml-12 italic tracking-tighter">
          Windows<span className="text-orange-alert font-normal">XP</span>
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex w-full relative z-0">
        
        {/* Left Side (Logo) */}
        <div className="flex-1 flex justify-end items-center pr-16 border-r border-gray-400">
          <div className="text-white text-right">
            <h2 className="text-4xl">To begin, click your user name</h2>
          </div>
        </div>

        {/* Right Side (Users) */}
        <div className="flex-1 flex justify-start items-center pl-16">
          
          <div className="flex items-start">
            {/* User Avatar */}
            <div className="w-16 h-16 rounded-md border-2 border-white overflow-hidden shadow-lg mr-4 bg-orange-400 flex items-center justify-center text-white text-3xl">
              D
            </div>
            
            {/* User Details */}
            <div className="flex flex-col pt-1">
              <span className="text-white text-2xl font-semibold mb-2">Dixit Patel</span>
              
              <form onSubmit={handleLogin} className="flex items-center space-x-2">
                <input 
                  type="password" 
                  autoFocus
                  placeholder="Type your password" 
                  className="px-1 border border-gray-400 shadow-inner w-48 text-black focus:outline-none focus:border-blue-500 rounded-sm h-7"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="w-7 h-7 bg-green-500 border border-white rounded-md flex items-center justify-center shadow-md hover:bg-green-400 cursor-pointer">
                  <span className="text-white text-lg font-bold leading-none">➔</span>
                </button>
              </form>
              
              <div className="text-white text-xs mt-1 min-h-[20px]">
                {error ? <span className="text-yellow-300">{error}</span> : <span>Hint: 1234</span>}
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="h-20 bg-gradient-to-t from-[#0058e6] to-[#003dbb] w-full border-t border-blue-400 flex items-center px-12 justify-between">
        <div className="flex space-x-6 text-white text-sm">
          <button className="flex items-center hover:underline cursor-pointer">
            <span className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-2 border border-white">
              ⏻
            </span>
            Turn off computer
          </button>
        </div>
        <div className="text-white text-sm opacity-80">
          After you log on, you can add or change accounts. Just go to Control Panel and click User Accounts.
        </div>
      </div>
    </div>
  );
}
