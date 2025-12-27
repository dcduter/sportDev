
export enum MuscleGroup {
  CHEST = 'Chest',
  BACK = 'Back',
  LEGS = 'Legs',
  SHOULDERS = 'Shoulders',
  ARMS = 'Arms',
  CORE = 'Core'
}

export enum Equipment {
  DUMBBELL = 'Dumbbell',
  BARBELL = 'Barbell',
  MACHINE = 'Machine',
  BODYWEIGHT = 'Bodyweight',
  KETTLEBELL = 'Kettlebell'
}

export enum Difficulty {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
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
