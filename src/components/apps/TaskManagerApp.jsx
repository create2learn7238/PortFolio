import { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { playClickSound } from '../../utils/audio';

export default function TaskManagerApp() {
  const { windows, closeWindow } = useStore();
  const [activeTab, setActiveTab] = useState('applications');
  const [cpuUsage, setCpuUsage] = useState([12, 18, 25, 14, 30, 22, 19, 28, 15, 20]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage((prev) => [...prev.slice(1), Math.floor(Math.random() * 35) + 10]);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const handleEndTask = () => {
    if (selectedTask) {
      playClickSound();
      closeWindow(selectedTask);
      setSelectedTask(null);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#ece9d8] p-2 text-xs font-tahoma select-none overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-400 gap-1 mb-2">
        <button
          onClick={() => { setActiveTab('applications'); playClickSound(); }}
          className={`px-3 py-1 border-t-2 border-l border-r rounded-t ${
            activeTab === 'applications' ? 'bg-white border-blue-600 font-bold text-gray-800' : 'bg-gray-200 border-gray-400 text-gray-600'
          }`}
        >
          Applications ({windows.length})
        </button>
        <button
          onClick={() => { setActiveTab('performance'); playClickSound(); }}
          className={`px-3 py-1 border-t-2 border-l border-r rounded-t ${
            activeTab === 'performance' ? 'bg-white border-blue-600 font-bold text-gray-800' : 'bg-gray-200 border-gray-400 text-gray-600'
          }`}
        >
          Performance
        </button>
      </div>

      {activeTab === 'applications' ? (
        /* Applications List Tab */
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 bg-white border border-gray-400 overflow-y-auto mb-2 shadow-inner">
            <div className="flex bg-[#ece9d8] border-b border-gray-300 font-bold px-2 py-1 sticky top-0 text-gray-700">
              <div className="flex-1">Task</div>
              <div className="w-24 text-right">Status</div>
            </div>

            {windows.length === 0 ? (
              <div className="p-4 text-center text-gray-400">No active applications open</div>
            ) : (
              windows.map((w) => (
                <div
                  key={w.id}
                  onClick={() => setSelectedTask(w.id)}
                  className={`flex items-center px-2 py-1.5 border-b border-gray-100 cursor-pointer ${
                    selectedTask === w.id ? 'bg-[#316ac5] text-white font-semibold' : 'hover:bg-blue-50 text-gray-800'
                  }`}
                >
                  <i className={`bi ${w.iconClass || 'bi-app'} mr-2 text-base`}></i>
                  <div className="flex-1 truncate">{w.title}</div>
                  <div className="w-24 text-right text-xs opacity-90">{w.isMinimized ? 'Minimized' : 'Running'}</div>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="text-[11px] text-gray-600">Processes: {windows.length + 18}</div>
            <button
              onClick={handleEndTask}
              disabled={!selectedTask}
              className={`xp-button ${!selectedTask ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              End Task
            </button>
          </div>
        </div>
      ) : (
        /* Performance Tab */
        <div className="flex-1 flex flex-col space-y-3 p-1 overflow-y-auto">
          {/* CPU Usage Box */}
          <div className="bg-white border border-gray-400 p-2 rounded shadow-inner">
            <div className="flex justify-between items-center font-bold text-gray-700 mb-1">
              <span>CPU Usage History</span>
              <span className="text-green-600">{cpuUsage[cpuUsage.length - 1]}%</span>
            </div>

            {/* Waveform graph */}
            <div className="h-24 bg-black rounded p-1 border border-gray-600 flex items-end justify-between gap-1 overflow-hidden">
              {cpuUsage.map((val, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-gradient-to-t from-green-700 to-green-400 rounded-t transition-all duration-300"
                  style={{ height: `${val * 2.2}%` }}
                />
              ))}
            </div>
          </div>

          {/* Memory Usage Box */}
          <div className="bg-white border border-gray-400 p-2 rounded shadow-inner">
            <div className="flex justify-between items-center font-bold text-gray-700 mb-1">
              <span>Physical Memory Usage</span>
              <span className="text-blue-600">412 MB / 2048 MB</span>
            </div>
            <div className="w-full bg-gray-200 h-4 rounded border border-gray-400 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full w-[28%]"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
