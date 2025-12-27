
import React from 'react';

interface SidebarItemProps {
  icon: string;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
      active
        ? 'bg-primary text-slate-900 shadow-lg shadow-primary/20'
        : 'text-slate-400 hover:bg-surface-dark hover:text-primary'
    }`}
  >
    <span className={`material-symbols-outlined ${active ? 'fill-1' : ''}`}>
      {icon}
    </span>
    <span className="font-semibold text-sm">{label}</span>
  </button>
);

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'training', icon: 'fitness_center', label: 'Training Plan' },
    { id: 'workout', icon: 'play_circle', label: 'Start Workout' },
    { id: 'library', icon: 'menu_book', label: 'Exercise Library' },
    { id: 'progress', icon: 'monitoring', label: 'Progress Analytics' },
    { id: 'goals', icon: 'target', label: 'My Targets' },
    { id: 'gamification', icon: 'military_tech', label: 'Achievements' },
    { id: 'community', icon: 'group', label: 'Community Feed' },
    { id: 'wellness', icon: 'self_improvement', label: 'Wellness & Recovery' },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-950 border-r border-border-dark flex flex-col p-6 sticky top-0 hidden lg:flex shrink-0 overflow-y-auto scrollbar-hide">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-slate-900">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 48 48">
            <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" />
          </svg>
        </div>
        <h1 className="text-xl font-black tracking-tight text-white">SportDev</h1>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map(item => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={currentView === item.id}
            onClick={() => setCurrentView(item.id)}
          />
        ))}
      </nav>

      <div className="mt-8 pt-6 border-t border-border-dark space-y-1">
        <SidebarItem
          icon="settings"
          label="Settings"
          active={currentView === 'settings'}
          onClick={() => setCurrentView('settings')}
        />
        <div className="pt-4 flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full border-2 border-primary/30 overflow-hidden shrink-0">
            <img src="https://picsum.photos/id/64/100/100" alt="User" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">Alex Johnson</p>
            <p className="text-xs text-slate-400 uppercase font-black tracking-tighter">Pro</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
