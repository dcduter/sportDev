
import React, { useState } from 'react';
import { Exercise } from '../types';
import { analyzeMedia } from '../services/geminiService';

interface ExerciseDrawerProps {
  exercise: Exercise | null;
  onClose: () => void;
}

const ExerciseDrawer: React.FC<ExerciseDrawerProps> = ({ exercise, onClose }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  if (!exercise) return null;

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalyzing(true);
    setAiAnalysis(null);
    try {
      const result = await analyzeMedia(file, type, `Help me analyze my form for ${exercise.name}. Check for key alignment and technique.`);
      setAiAnalysis(result);
    } catch (error) {
      console.error(error);
      setAiAnalysis("Error during AI analysis. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 h-screen w-full lg:w-[480px] bg-slate-900 border-l border-border-dark z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-[60] w-10 h-10 bg-slate-800/80 hover:bg-primary rounded-full flex items-center justify-center text-white hover:text-slate-900 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="relative aspect-video bg-black">
          <img src={exercise.image} alt={exercise.name} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-slate-900 shadow-xl hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl">play_arrow</span>
            </button>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800">
            <div className="h-full bg-primary w-1/3"></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide p-8 space-y-8">
          <div>
            <h2 className="text-3xl font-black text-white mb-3">{exercise.name}</h2>
            <div className="flex gap-2">
              <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">{exercise.type}</span>
              <span className="bg-slate-800 text-slate-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">{exercise.difficulty}</span>
            </div>
          </div>

          <div className="bg-slate-950/50 p-6 rounded-2xl border border-border-dark">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Músculos Trabajados</h3>
            <div className="flex items-center gap-6">
              <div className="w-20 h-28 bg-primary/10 rounded-xl flex items-center justify-center">
                 <span className="material-symbols-outlined text-primary text-5xl">accessibility_new</span>
              </div>
              <div className="flex-1 space-y-4">
                {exercise.musclesWorked.map((m) => (
                  <div key={m.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-white">{m.name}</span>
                      <span className={m.level === 'Primary' ? 'text-primary' : 'text-slate-500'}>
                        {m.level === 'Primary' ? 'Primario' : 'Secundario'}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ${m.level === 'Primary' ? 'bg-primary' : 'bg-slate-500'}`}
                        style={{ width: `${m.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black text-white mb-4">Instrucciones</h3>
            <ol className="space-y-6">
              {exercise.instructions.map((step, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-slate-800 border border-border-dark flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-primary">
                    {idx + 1}
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-xl">smart_toy</span>
              <h3 className="font-black text-sm uppercase tracking-wider">Análisis de Forma con IA</h3>
            </div>
            <p className="text-xs text-slate-400">Sube una foto o video realizando este ejercicio para recibir retroalimentación personalizada de SportDev IA.</p>
            
            <div className="grid grid-cols-2 gap-3">
              <label className="cursor-pointer flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-primary/30 hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-primary">add_a_photo</span>
                <span className="text-[10px] font-bold text-slate-300">Análisis de Foto</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleMediaUpload(e, 'image')} disabled={analyzing} />
              </label>
              <label className="cursor-pointer flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-primary/30 hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-primary">videocam</span>
                <span className="text-[10px] font-bold text-slate-300">Análisis de Video</span>
                <input type="file" accept="video/*" className="hidden" onChange={(e) => handleMediaUpload(e, 'video')} disabled={analyzing} />
              </label>
            </div>

            {analyzing && (
              <div className="flex items-center justify-center gap-3 py-4">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-primary font-bold animate-pulse">La IA está pensando...</span>
              </div>
            )}

            {aiAnalysis && (
              <div className="bg-slate-950 p-4 rounded-xl border border-primary/20 animate-in fade-in slide-in-from-bottom-2">
                <h4 className="text-[10px] font-black text-primary uppercase mb-2">Veredicto del Entrenador</h4>
                <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">{aiAnalysis}</div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 bg-slate-950 border-t border-border-dark flex gap-3">
          <button className="flex-1 py-4 bg-white text-slate-950 font-black rounded-2xl hover:bg-slate-200 transition-colors">
            Añadir al Entrenamiento
          </button>
          <button className="w-14 h-14 bg-slate-800 border border-border-dark rounded-2xl flex items-center justify-center text-slate-300 hover:text-primary transition-colors">
             <span className="material-symbols-outlined">favorite</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ExerciseDrawer;
