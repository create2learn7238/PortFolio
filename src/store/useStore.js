import { create } from 'zustand';

export const useStore = create((set) => ({
  // OS State
  isBooted: false,
  isLoggedIn: false,
  bootOS: () => set({ isBooted: true }),
  loginUser: () => set({ isLoggedIn: true }),

  // Start Menu
  isStartMenuOpen: false,
  toggleStartMenu: () => set((state) => ({ isStartMenuOpen: !state.isStartMenuOpen })),
  closeStartMenu: () => set({ isStartMenuOpen: false }),

  // Windows State
  windows: [], // Array of open windows { id, title, component, isMinimized, isMaximized, zIndex }
  activeWindowId: null,
  highestZIndex: 10,

  openWindow: (appData) => set((state) => {
    // Check if window is already open
    const existingWindow = state.windows.find(w => w.id === appData.id);
    const newZIndex = state.highestZIndex + 1;
    
    if (existingWindow) {
      return {
        windows: state.windows.map(w => 
          w.id === appData.id ? { ...w, isMinimized: false, zIndex: newZIndex } : w
        ),
        activeWindowId: appData.id,
        highestZIndex: newZIndex,
        isStartMenuOpen: false
      };
    }

    // Open new window
    return {
      windows: [...state.windows, { 
        ...appData, 
        isMinimized: false, 
        isMaximized: false, 
        zIndex: newZIndex 
      }],
      activeWindowId: appData.id,
      highestZIndex: newZIndex,
      isStartMenuOpen: false
    };
  }),

  closeWindow: (id) => set((state) => {
    const remainingWindows = state.windows.filter(w => w.id !== id);
    // Find the next highest z-index window to make active
    let nextActiveId = null;
    let maxZ = -1;
    remainingWindows.forEach(w => {
      if (!w.isMinimized && w.zIndex > maxZ) {
        maxZ = w.zIndex;
        nextActiveId = w.id;
      }
    });

    return {
      windows: remainingWindows,
      activeWindowId: nextActiveId
    };
  }),

  minimizeWindow: (id) => set((state) => ({
    windows: state.windows.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ),
    activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
  })),

  maximizeWindow: (id) => set((state) => ({
    windows: state.windows.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    )
  })),

  focusWindow: (id) => set((state) => {
    if (state.activeWindowId === id) return state; // Already focused
    
    const newZIndex = state.highestZIndex + 1;
    return {
      windows: state.windows.map(w => 
        w.id === id ? { ...w, isMinimized: false, zIndex: newZIndex } : w
      ),
      activeWindowId: id,
      highestZIndex: newZIndex,
      isStartMenuOpen: false
    };
  }),
}));
