
import { Exercise, MuscleGroup, Equipment, Difficulty } from './types';

export const EXERCISES: Exercise[] = [
  {
    id: '1',
    name: 'Sentadilla con Barra',
    type: 'Compound',
    muscles: [MuscleGroup.LEGS],
    equipment: [Equipment.BARBELL],
    difficulty: Difficulty.BEGINNER,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
    description: 'El rey de todos los ejercicios, dirigido principalmente a cuádriceps y glúteos.',
    instructions: [
      'Coloca la barra a la altura del pecho. Colócate debajo de la barra y apóyala en la parte superior de la espalda.',
      'Saca la barra y da dos pasos atrás. Coloca los pies a la anchura de los hombros.',
      'Baja las caderas hacia atrás y abajo, manteniendo el pecho erguido y el core tenso.',
      'Empuja con los talones para volver a la posición inicial.'
    ],
    musclesWorked: [
      { name: 'Cuádriceps', level: 'Primary', percentage: 90 },
      { name: 'Glúteos', level: 'Secondary', percentage: 65 }
    ]
  },
  {
    id: '2',
    name: 'Peso Muerto',
    type: 'Compound',
    muscles: [MuscleGroup.BACK, MuscleGroup.LEGS],
    equipment: [Equipment.BARBELL],
    difficulty: Difficulty.ADVANCED,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop',
    description: 'Un movimiento de potencia total que trabaja la cadena posterior.',
    instructions: [
      'Párate con los pies a la anchura de las caderas, la barra sobre el medio pie.',
      'Flexiona caderas y rodillas, agarra la barra justo por fuera de las piernas.',
      'Levanta extendiendo caderas y rodillas hasta estar completamente de pie.',
      'Devuelve la barra al suelo bajo control.'
    ],
    musclesWorked: [
      { name: 'Cadena Posterior', level: 'Primary', percentage: 95 },
      { name: 'Zona Lumbar', level: 'Secondary', percentage: 70 }
    ]
  },
  {
    id: '3',
    name: 'Zancadas Caminando',
    type: 'Unilateral',
    muscles: [MuscleGroup.LEGS],
    equipment: [Equipment.DUMBBELL],
    difficulty: Difficulty.BEGINNER,
    image: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?q=80&w=800&auto=format&fit=crop',
    description: 'Excelente para la estabilidad dinámica y fuerza de piernas.',
    instructions: [
      'Da un paso largo hacia adelante con una pierna.',
      'Baja las caderas hasta que ambas rodillas estén dobladas a 90 grados.',
      'Empuja con el talón delantero para traer la pierna trasera hacia adelante.',
      'Repite con la pierna opuesta.'
    ],
    musclesWorked: [
      { name: 'Glúteos', level: 'Primary', percentage: 85 },
      { name: 'Cuádriceps', level: 'Secondary', percentage: 60 }
    ]
  },
  {
    id: '4',
    name: 'Peso Muerto Rumano',
    type: 'Stretch',
    muscles: [MuscleGroup.LEGS],
    equipment: [Equipment.BARBELL],
    difficulty: Difficulty.INTERMEDIATE,
    image: 'https://images.unsplash.com/photo-1590239098569-e124dd2d9730?q=80&w=800&auto=format&fit=crop',
    description: 'Un ejercicio enfocado en los isquiotibiales y glúteos.',
    instructions: [
      'Sostén una barra a la altura de la cadera con agarre prono.',
      'Bisagra en caderas, bajando la barra mientras mantienes rodillas ligeramente flexionadas.',
      'Baja hasta sentir un estiramiento en isquiotibiales.',
      'Vuelve a la posición inicial contrayendo glúteos.'
    ],
    musclesWorked: [
      { name: 'Isquiotibiales', level: 'Primary', percentage: 90 },
      { name: 'Erectores Espinales', level: 'Secondary', percentage: 50 }
    ]
  }
];
