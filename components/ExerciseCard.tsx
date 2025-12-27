
import React from 'react';
import { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  onClick: (exercise: Exercise) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onClick }) => {
  return (
    <div
      onClick={() => onClick(exercise)}
      className="group bg-surface-dark border border-border-dark rounded-2xl overflow-hidden cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={exercise.image}
          alt={exercise.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-4">
          <span className="bg-primary/90 text-slate-900 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded">
            {exercise.type}
          </span>
        </div>
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-xl">
            <span className="material-symbols-outlined text-3xl">play_arrow</span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
            {exercise.name}
          </h3>
          <button className="text-slate-500 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">add_circle</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {exercise.muscles.slice(0, 2).map((m) => (
            <span
              key={m}
              className="px-2 py-0.5 rounded-lg bg-slate-900 border border-border-dark text-[10px] font-semibold text-slate-400 uppercase tracking-wide"
            >
              {m}
            </span>
          ))}
          {exercise.equipment.slice(0, 1).map((e) => (
            <span
              key={e}
              className="px-2 py-0.5 rounded-lg bg-slate-900 border border-border-dark text-[10px] font-semibold text-slate-400 uppercase tracking-wide"
            >
              {e}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
