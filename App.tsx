
import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import ExerciseCard from './components/ExerciseCard';
import ExerciseDrawer from './components/ExerciseDrawer';
import AIChat from './components/AIChat';
import { EXERCISES } from './constants';
import { Exercise, MuscleGroup, Equipment, Difficulty } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('library');
  const [onboardingStep, setOnboardingStep] = useState(0); // 0: Assessment, 1: Generating, 2: Ready, 3: Completed
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Library Filters
  const [selectedMuscles, setSelectedMuscles] = useState<MuscleGroup[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

  const filteredExercises = useMemo(() => {
    return EXERCISES.filter(ex => {
      const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMuscle = selectedMuscles.length === 0 || ex.muscles.some(m => selectedMuscles.includes(m));
      const matchesEquipment = selectedEquipment.length === 0 || ex.equipment.some(e => selectedEquipment.includes(e));
      const matchesDifficulty = !selectedDifficulty || ex.difficulty === selectedDifficulty;
      return matchesSearch && matchesMuscle && matchesEquipment && matchesDifficulty;
    });
  }, [searchQuery, selectedMuscles, selectedEquipment, selectedDifficulty]);

  // Views rendering logic
  const renderView = () => {
    if (onboardingStep < 3) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-8 max-w-4xl mx-auto text-center space-y-12 animate-in fade-in zoom-in duration-500">
          {onboardingStep === 0 && (
            <div className="space-y-8">
              <span className="text-primary font-black uppercase tracking-[0.2em] text-sm">Initial Assessment</span>
              <h2 className="text-5xl font-black text-white leading-tight">What is your primary training goal?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Hypertrophy', 'Fat Loss', 'Maximum Strength', 'Athletic Performance'].map(goal => (
                  <button key={goal} onClick={() => setOnboardingStep(1)} className="p-8 bg-surface-dark border border-border-dark rounded-3xl hover:border-primary transition-all text-left group">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary mb-1">{goal}</h3>
                    <p className="text-sm text-slate-500">Optimized plans for {goal.toLowerCase()} and overall health.</p>
                  </button>
                ))}
              </div>
            </div>
          )}
          {onboardingStep === 1 && (
            <div className="space-y-8 py-20">
              <div className="w-24 h-24 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <h2 className="text-3xl font-black text-white">Analyzing your profile...</h2>
              <p className="text-slate-400 animate-pulse">Our AI is crafting your personalized 12-week blueprint.</p>
              {setTimeout(() => setOnboardingStep(2), 2500) && null}
            </div>
          )}
          {onboardingStep === 2 && (
            <div className="space-y-8">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary">
                <span className="material-symbols-outlined text-4xl">verified</span>
              </div>
              <h2 className="text-5xl font-black text-white">Your 12-Week Path is Ready, Alex!</h2>
              <div className="bg-surface-dark border border-border-dark p-8 rounded-3xl text-left space-y-6">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-slate-900 font-black">01</div>
                  <div>
                    <h4 className="text-white font-bold">Base Phase: Stability & Form</h4>
                    <p className="text-xs text-slate-500">Weeks 1-4 • 4 Sessions/week</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center opacity-50">
                  <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 font-black">02</div>
                  <div>
                    <h4 className="text-white font-bold">Build Phase: Progressive Overload</h4>
                    <p className="text-xs text-slate-500">Weeks 5-8 • 5 Sessions/week</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setOnboardingStep(3)} className="w-full py-5 bg-primary text-slate-950 font-black rounded-2xl text-lg hover:bg-primary-dark transition-all">Start Your Transformation</button>
            </div>
          )}
        </div>
      );
    }

    switch (currentView) {
      case 'dashboard':
        return (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black text-white">Welcome back, Alex</h1>
                <p className="text-slate-500">You're on day 14 of your streak. Keep it up!</p>
              </div>
              <div className="flex gap-3">
                <div className="px-4 py-2 bg-primary/10 rounded-xl text-primary font-black text-xs border border-primary/20">7-DAY STREAK</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'STEPS', val: '8,432', icon: 'steps', color: 'text-primary' },
                { label: 'CALORIES', val: '1,650', icon: 'local_fire_department', color: 'text-orange-400' },
                { label: 'SLEEP', val: '7h 20m', icon: 'bedtime', color: 'text-indigo-400' },
                { label: 'WATER', val: '1.8L', icon: 'water_drop', color: 'text-blue-400' },
              ].map(stat => (
                <div key={stat.label} className="bg-surface-dark p-6 rounded-3xl border border-border-dark flex flex-col gap-2">
                  <span className="material-symbols-outlined text-slate-500">{stat.icon}</span>
                  <p className="text-xs font-black text-slate-500 tracking-widest">{stat.label}</p>
                  <p className={`text-2xl font-black text-white`}>{stat.val}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-xl font-black text-white">Next Session: Upper Body Power</h3>
                <div className="bg-slate-950 border border-border-dark rounded-3xl overflow-hidden">
                  <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800)' }}>
                    <div className="h-full w-full bg-slate-950/40 flex items-center justify-center">
                      <button onClick={() => setCurrentView('workout')} className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-slate-900 shadow-xl"><span className="material-symbols-outlined text-4xl">play_arrow</span></button>
                    </div>
                  </div>
                  <div className="p-6 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-bold text-white">45-60 Minutes</p>
                      <p className="text-xs text-slate-500">Target: Chest, Shoulders, Triceps</p>
                    </div>
                    <button onClick={() => setCurrentView('workout')} className="bg-white text-slate-900 px-6 py-2 rounded-xl font-black text-xs uppercase">Start Now</button>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-black text-white">Weekly Calendar</h3>
                <div className="bg-surface-dark border border-border-dark rounded-3xl p-6 space-y-4">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-500">{day}</span>
                      <div className={`h-2 flex-1 mx-4 rounded-full ${idx < 3 ? 'bg-primary' : 'bg-slate-800'}`} />
                      <span className={`material-symbols-outlined text-sm ${idx < 3 ? 'text-primary' : 'text-slate-700'}`}>check_circle</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'workout':
        return (
          <div className="max-w-4xl mx-auto space-y-10 animate-in slide-in-from-bottom-10 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-primary font-black uppercase text-xs tracking-widest">Active Session</span>
                <h1 className="text-4xl font-black text-white">Barbell Bench Press</h1>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-primary">12:45</p>
                <p className="text-xs font-bold text-slate-500">WORKOUT TIME</p>
              </div>
            </div>

            <div className="aspect-video bg-black rounded-3xl overflow-hidden relative shadow-2xl">
              <img src="https://images.unsplash.com/photo-1534367507873-d2d7e249a3f2?q=80&w=800" className="w-full h-full object-cover opacity-70" alt="Exercise" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-primary/90 text-slate-900 rounded-full flex items-center justify-center"><span className="material-symbols-outlined text-5xl">pause</span></button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-black text-white">Log Sets</h3>
                {[1, 2, 3, 4].map(s => (
                  <div key={s} className={`p-6 rounded-2xl border flex items-center justify-between transition-all ${s === 1 ? 'bg-primary/10 border-primary shadow-lg shadow-primary/5' : 'bg-surface-dark border-border-dark opacity-50'}`}>
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-black text-primary">0{s}</span>
                      <div>
                        <p className="text-xs font-black text-slate-500 uppercase">Target</p>
                        <p className="text-white font-bold">12 Reps • 60 kg</p>
                      </div>
                    </div>
                    <button className={`w-10 h-10 rounded-full flex items-center justify-center ${s === 1 ? 'bg-primary text-slate-950' : 'bg-slate-800 text-slate-500'}`}><span className="material-symbols-outlined">check</span></button>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                <div className="p-8 bg-slate-950 border border-border-dark rounded-3xl flex flex-col items-center justify-center gap-4 text-center">
                  <span className="material-symbols-outlined text-primary text-5xl">smart_toy</span>
                  <h4 className="text-white font-black uppercase tracking-widest text-sm">AI Form Tip</h4>
                  <p className="text-slate-400 text-sm italic">"Keep your shoulder blades retracted and feet firmly planted for maximum power transfer during the press."</p>
                </div>
                <div className="flex gap-4">
                  <button className="flex-1 py-4 bg-slate-800 text-white font-black rounded-2xl">Rest 90s</button>
                  <button className="flex-1 py-4 bg-primary text-slate-900 font-black rounded-2xl">Next Set</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'library':
        return (
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white">Exercise Library</h1>
                <p className="text-slate-400 max-w-lg">Master your form and discover over 500 movements.</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
                 <span className="text-primary">{filteredExercises.length}</span> Exercises Found
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              <aside className="lg:w-64 space-y-10 flex-shrink-0">
                {/* Filters implementation kept from previous version */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-white">
                    <span className="material-symbols-outlined text-primary">accessibility_new</span>
                    <h3 className="font-black uppercase tracking-wider text-sm">Muscles</h3>
                  </div>
                  <div className="bg-surface-dark/50 border border-border-dark p-4 rounded-3xl grid grid-cols-1 gap-2">
                    {Object.values(MuscleGroup).map(m => (
                      <button 
                        key={m} 
                        onClick={() => toggleMuscle(m)}
                        className={`text-left px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedMuscles.includes(m) ? 'bg-primary text-slate-900' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredExercises.map(ex => (
                  <ExerciseCard key={ex.id} exercise={ex} onClick={setSelectedExercise} />
                ))}
              </div>
            </div>
          </div>
        );

      case 'progress':
        return (
          <div className="space-y-10 animate-in fade-in duration-500">
            <h1 className="text-4xl font-black text-white">Progress Analytics</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'AVG INTENSITY', val: '84%', trend: '+4%' },
                { label: 'TOTAL VOLUME', val: '42.5 tons', trend: '+1.2t' },
                { label: 'COMPLIANCE', val: '98%', trend: 'Steady' },
              ].map(card => (
                <div key={card.label} className="bg-surface-dark p-8 rounded-3xl border border-border-dark">
                  <p className="text-xs font-black text-slate-500 mb-2">{card.label}</p>
                  <p className="text-3xl font-black text-white">{card.val}</p>
                  <p className="text-xs font-bold text-primary mt-2">{card.trend}</p>
                </div>
              ))}
            </div>
            <div className="bg-slate-950 border border-border-dark p-10 rounded-[40px] h-96 relative overflow-hidden">
               <div className="absolute top-10 left-10">
                 <h3 className="text-xl font-black text-white">Weight Trend</h3>
                 <p className="text-slate-500 text-sm">Last 90 days</p>
               </div>
               {/* Simple SVG Chart */}
               <svg className="w-full h-full mt-10" viewBox="0 0 1000 400" preserveAspectRatio="none">
                 <path d="M0,350 Q250,300 500,200 T1000,50" fill="none" stroke="#f97316" strokeWidth="6" />
                 <path d="M0,350 Q250,300 500,200 T1000,50 V400 H0 Z" fill="url(#grad1)" />
                 <defs>
                   <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                     <stop offset="0%" style={{stopColor:'#f97316', stopOpacity:0.2}} />
                     <stop offset="100%" style={{stopColor:'#f97316', stopOpacity:0}} />
                   </linearGradient>
                 </defs>
               </svg>
            </div>
          </div>
        );

      case 'goals':
        return (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-black text-white">My Targets</h1>
                <p className="text-slate-500">SMART goals drive consistent results.</p>
              </div>
              <button className="bg-primary text-slate-950 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest">+ New Target</button>
            </div>
            <div className="space-y-6">
              {[
                { name: '100kg Squat', current: 85, target: 100, unit: 'kg' },
                { name: '75kg Body Weight', current: 78, target: 75, unit: 'kg' },
                { name: '5km Run', current: 4.2, target: 5.0, unit: 'km' },
              ].map(goal => (
                <div key={goal.name} className="bg-surface-dark border border-border-dark p-8 rounded-3xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-black text-white">{goal.name}</h3>
                    <p className="text-sm font-bold text-slate-400">{goal.current} / {goal.target} {goal.unit}</p>
                  </div>
                  <div className="h-4 w-full bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${(goal.current / goal.target) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'gamification':
        return (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-black text-white tracking-tighter">Your Achievements</h1>
              <p className="text-slate-500">Unlock more by staying consistent.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { label: 'Early Bird', icon: 'wb_sunny', unlocked: true },
                { label: 'Iron Mind', icon: 'psychology', unlocked: true },
                { label: 'Streak Master', icon: 'bolt', unlocked: true },
                { label: 'Social Star', icon: 'star', unlocked: false },
                { label: 'Beast Mode', icon: 'fitness_center', unlocked: false },
                { label: 'Night Owl', icon: 'bedtime', unlocked: false },
              ].map((badge, i) => (
                <div key={i} className={`flex flex-col items-center gap-4 p-8 rounded-[32px] border transition-all ${badge.unlocked ? 'bg-primary/10 border-primary/30' : 'bg-surface-dark/40 border-border-dark opacity-30 grayscale'}`}>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${badge.unlocked ? 'bg-primary shadow-xl shadow-primary/20' : 'bg-slate-800'}`}>
                    <span className={`material-symbols-outlined text-3xl ${badge.unlocked ? 'text-slate-900' : 'text-slate-500'}`}>{badge.icon}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-center">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'community':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in fade-in duration-500">
             <div className="lg:col-span-2 space-y-10">
               <h1 className="text-4xl font-black text-white">Community Feed</h1>
               {[
                 { user: 'Sarah Miller', action: 'completed Leg Day', time: '2h ago', likes: 24, map: true },
                 { user: 'David Chen', action: 'earned "Iron Mind" Badge', time: '5h ago', likes: 12, map: false },
               ].map((post, idx) => (
                 <div key={idx} className="bg-surface-dark border border-border-dark rounded-3xl overflow-hidden shadow-sm">
                   <div className="p-6 flex items-center justify-between border-b border-border-dark">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-700" />
                        <div>
                          <p className="text-sm font-bold text-white">{post.user}</p>
                          <p className="text-xs text-slate-500">{post.action} • {post.time}</p>
                        </div>
                     </div>
                     <button className="text-slate-500"><span className="material-symbols-outlined">more_horiz</span></button>
                   </div>
                   {post.map && (
                     <div className="aspect-video bg-slate-900 flex items-center justify-center relative">
                        <img src="https://picsum.photos/id/16/800/400" className="w-full h-full object-cover opacity-50" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                        <span className="absolute bottom-4 left-6 text-xs font-bold text-white flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">location_on</span> San Francisco Route • 5.2km</span>
                     </div>
                   )}
                   <div className="p-4 px-6 flex items-center gap-6">
                      <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-sm">favorite</span> {post.likes}</button>
                      <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-sm">chat_bubble</span> 3</button>
                      <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-primary ml-auto"><span className="material-symbols-outlined text-sm">share</span></button>
                   </div>
                 </div>
               ))}
             </div>
             <div className="space-y-8 pt-20">
                <div className="bg-primary/5 border border-primary/20 p-8 rounded-3xl space-y-4">
                  <h4 className="text-primary font-black uppercase text-xs tracking-widest">Active Challenges</h4>
                  <div className="space-y-4">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary font-black">1</div>
                        <div>
                          <p className="text-xs font-bold text-white">Squat Heavy Challenge</p>
                          <p className="text-[10px] text-slate-500">240 participants</p>
                        </div>
                     </div>
                  </div>
                  <button className="w-full py-3 bg-primary text-slate-950 font-black text-xs uppercase rounded-xl">View All</button>
                </div>
             </div>
          </div>
        );

      case 'wellness':
        return (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="space-y-4">
              <h1 className="text-5xl font-black text-white tracking-tighter">Holistic Wellness</h1>
              <p className="text-slate-500">Optimize your lifestyle for elite performance.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'The Science of Sleep Phases', cat: 'RECOVERY', img: 'https://images.unsplash.com/photo-1541781719197-08316335b247?q=80&w=400' },
                { title: 'Anti-Inflammatory Nutrition', cat: 'DIET', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=400' },
                { title: 'Mobility Routine for Desk Workers', cat: 'MOBILITY', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400' },
              ].map((art, i) => (
                <div key={i} className="group bg-surface-dark border border-border-dark rounded-[32px] overflow-hidden cursor-pointer hover:border-primary/50 transition-all">
                  <div className="h-48 overflow-hidden relative">
                    <img src={art.img} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-slate-950/80 backdrop-blur rounded-lg text-[10px] font-black text-primary uppercase tracking-widest">{art.cat}</div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors leading-tight">{art.title}</h3>
                    <div className="flex items-center gap-2 mt-4 text-xs font-bold text-slate-500">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      6 min read
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div className="p-20 text-center text-slate-500">View implementation coming soon...</div>;
    }
  };

  const toggleMuscle = (m: MuscleGroup) => {
    setSelectedMuscles(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
  };

  const clearFilters = () => {
    setSelectedMuscles([]);
    setSelectedEquipment([]);
    setSelectedDifficulty(null);
    setSearchQuery('');
  };

  return (
    <div className="flex bg-slate-950 text-slate-100 min-h-screen">
      {onboardingStep === 3 && (
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      )}

      <main className="flex-1 flex flex-col max-h-screen overflow-hidden">
        {onboardingStep === 3 && (
          <header className="h-20 border-b border-border-dark flex items-center justify-between px-8 bg-slate-950/80 backdrop-blur-xl z-20 sticky top-0 shrink-0">
            <div className="flex items-center gap-4">
              <button className="lg:hidden text-white" onClick={() => {}}>
                <span className="material-symbols-outlined">menu</span>
              </button>
              <div className="relative group w-96 hidden sm:block">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">search</span>
                <input
                  type="text"
                  placeholder="Search training..."
                  className="w-full bg-surface-dark border-none rounded-2xl pl-12 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary shadow-inner"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <button className="relative text-slate-400 hover:text-white transition-colors">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
              </button>
              <button className="flex items-center gap-2 bg-primary text-slate-950 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-primary-dark transition-all">
                <span className="material-symbols-outlined text-sm">bolt</span>
                Upgrade
              </button>
            </div>
          </header>
        )}

        <div className={`flex-1 overflow-y-auto scrollbar-hide p-8 lg:p-12 bg-background-dark`}>
          {renderView()}
        </div>
      </main>

      <ExerciseDrawer exercise={selectedExercise} onClose={() => setSelectedExercise(null)} />
      <AIChat />
    </div>
  );
};

export default App;
