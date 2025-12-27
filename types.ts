export enum MuscleGroup {
  CHEST = 'Pecho',
  BACK = 'Espalda',
  LEGS = 'Piernas',
  SHOULDERS = 'Hombros',
  ARMS = 'Brazos',
  CORE = 'Core'
}

export enum Equipment {
  DUMBBELL = 'Mancuernas',
  BARBELL = 'Barra',
  MACHINE = 'Máquina',
  BODYWEIGHT = 'Peso Corporal',
  KETTLEBELL = 'Pesa Rusa'
}

export enum Difficulty {
  BEGINNER = 'Principiante',
  INTERMEDIATE = 'Intermedio',
  ADVANCED = 'Avanzado'
}

export interface Exercise {
  id: string;
  name: string;
  type: 'Compound' | 'Isolation' | 'Unilateral' | 'Stretch';
  muscles: MuscleGroup[];
  equipment: Equipment[];
  difficulty: Difficulty;
  image: string;
  description: string;
  instructions: string[];
  musclesWorked: {
    name: string;
    level: 'Primary' | 'Secondary';
    percentage: number;
  }[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
