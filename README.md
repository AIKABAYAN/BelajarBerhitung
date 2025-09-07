# Monster Math Quest

An educational math game for children aged 7-12 to master multiplication tables through interactive gameplay.

## Game Overview

Monster Math Quest is an educational game that helps children understand and memorize multiplication tables from 1 to 10 through two engaging modes:

1. **Learning Mode**: Visualize multiplication concepts through grids and interactive examples
2. **Quiz Mode**: Defend your castle from monsters by solving multiplication problems

## Features

- Two game modes: Learning and Quiz
- Visual learning with grid representations
- Progressive difficulty levels
- Score tracking and level progression
- Fun monster-themed gameplay
- Responsive design for all devices

## Game Design

Based on the Game Design Document (GDD), the game includes:

### Learning Mode
- Visual grid representations of multiplication problems
- Interactive examples to understand multiplication concepts
- Tables from 1 to 10

### Quiz Mode
- Monster defense gameplay
- Progressive difficulty levels (1-100)
- Increasing monster speed and complexity
- Score system with level progression
- Visual feedback for correct/incorrect answers
- Laser effects for correct answers

## Technology Stack

- HTML5
- CSS3
- JavaScript (ES6)
- Docker for deployment

## Deployment

### Using Docker

1. Build the Docker image:
   ```
   docker build -t monster-math-quest .
   ```

2. Run the container:
   ```
   docker run -p 80:80 monster-math-quest
   ```

### Using Docker Compose

1. Run with docker-compose:
   ```
   docker-compose up
   ```

The game will be accessible at http://localhost

## Development

To run the game locally without Docker:

1. Serve the files using any HTTP server:
   ```
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if http-server is installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

2. Open your browser and navigate to http://localhost:8000

## Game Instructions

### Main Menu
- Choose between "Belajar Perkalian" (Learning Mode) and "Quiz Monster" (Quiz Mode)

### Learning Mode
1. Select a multiplication table (1-10)
2. View visual representations of the multiplication concepts
3. See all equations for the selected table

### Quiz Mode
1. Monsters will descend from the top of the screen with multiplication problems
2. Use the on-screen numpad to enter your answer
3. Press "Enter" to submit your answer
4. Correct answers will destroy the monster with a laser effect
5. Incorrect answers will cause the monster to advance
6. Prevent monsters from reaching your castle to protect your lives
7. Earn points for each correct answer
8. Progress through levels as you earn more points

## Future Enhancements

As outlined in the GDD roadmap:
- Reward system (coins, castle upgrades)
- Richer audio and animations
- Progress statistics for children
- Additional game modes and features

## License

This project is developed for educational purposes.