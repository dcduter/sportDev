
import { Exercise, MuscleGroup, Equipment, Difficulty } from './types';

export const EXERCISES: Exercise[] = [
  {
    id: '1',
    name: 'Barbell Back Squat',
    type: 'Compound',
    muscles: [MuscleGroup.LEGS],
    equipment: [Equipment.BARBELL],
    difficulty: Difficulty.BEGINNER,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
    description: 'The king of all exercises, primarily targeting the quadriceps and glutes.',
    instructions: [
      'Set the bar at chest height. Step under the bar and rest it on your upper back muscles.',
      'Unrack the bar and take two steps back. Position your feet shoulder-width apart.',
      'Lower your hips back and down, keeping your chest up and core tight.',
      'Drive through your heels to return to the starting position.'
    ],
    musclesWorked: [
      { name: 'Quadriceps', level: 'Primary', percentage: 90 },
      { name: 'Glutes', level: 'Secondary', percentage: 65 }
    ]
  },
  {
    id: '2',
    name: 'Deadlift',
    type: 'Compound',
    muscles: [MuscleGroup.BACK, MuscleGroup.LEGS],
    equipment: [Equipment.BARBELL],
    difficulty: Difficulty.ADVANCED,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop',
    description: 'A total body power movement that targets the posterior chain.',
    instructions: [
      'Stand with feet hip-width apart, bar over mid-foot.',
      'Bend at hips and knees, grip the bar just outside legs.',
      'Lift by extending hips and knees to full standing position.',
      'Return bar to floor under control.'
    ],
    musclesWorked: [
      { name: 'Posterior Chain', level: 'Primary', percentage: 95 },
      { name: 'Lower Back', level: 'Secondary', percentage: 70 }
    ]
  },
  {
    id: '3',
    name: 'Walking Lunges',
    type: 'Unilateral',
    muscles: [MuscleGroup.LEGS],
    equipment: [Equipment.DUMBBELL],
    difficulty: Difficulty.BEGINNER,
    image: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?q=80&w=800&auto=format&fit=crop',
    description: 'Excellent for dynamic stability and leg strength.',
    instructions: [
      'Take a large step forward with one leg.',
      'Lower hips until both knees are bent at 90-degree angles.',
      'Push through the front heel to bring the back leg forward to meet the front.',
      'Repeat with opposite leg.'
    ],
    musclesWorked: [
      { name: 'Glutes', level: 'Primary', percentage: 85 },
      { name: 'Quadriceps', level: 'Secondary', percentage: 60 }
    ]
  },
  {
    id: '4',
    name: 'Romanian Deadlift',
    type: 'Stretch',
    muscles: [MuscleGroup.LEGS],
    equipment: [Equipment.BARBELL],
    difficulty: Difficulty.INTERMEDIATE,
    image: 'https://images.unsplash.com/photo-1590239098569-e124dd2d9730?q=80&w=800&auto=format&fit=crop',
    description: 'A focused exercise for the hamstrings and gluteal muscles.',
    instructions: [
      'Hold a barbell at hip level with an overhand grip.',
      'Hinge at hips, lowering the bar while keeping knees slightly bent.',
      'Lower until a stretch is felt in hamstrings.',
      'Return to starting position by contracting glutes.'
    ],
    musclesWorked: [
      { name: 'Hamstrings', level: 'Primary', percentage: 90 },
      { name: 'Erector Spinae', level: 'Secondary', percentage: 50 }
    ]
  }
];
