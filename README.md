# ⚾ Baseball 9 - Game

A fun, interactive baseball game built with HTML, CSS, and JavaScript. Pitch, swing, and score runs in this turn-based baseball experience!

## 🎮 Features

- **Interactive Gameplay**: Pitch balls and swing to hit them
- **Score Tracking**: Keep track of home and away team scores
- **Full Game Mechanics**:
  - Balls and strikes
  - Bases and runners
  - Outs and innings
  - Home runs and hits
  - Complete 9-inning game
- **Responsive Design**: Play on desktop or mobile devices
- **Realistic Animations**: Ball throw animations and visual feedback
- **Keyboard Support**: Use spacebar to pitch or swing

## 🚀 How to Play

1. **Click "Pitch Ball"** (or press Spacebar) to throw a pitch
2. **Watch the ball** as it travels toward the batter
3. **Click "Swing!"** (or press Spacebar) to swing at the pitch
4. **Outcomes depend on the ball location**:
   - **Strike**: Ball in the strike zone
   - **Ball**: Ball outside the strike zone
   - **Perfect Hit**: Rare opportunity for an extra-base hit

## 📊 Game Stats

- **Balls**: Count of balls thrown (4 = walk)
- **Strikes**: Count of strikes called (3 = out)
- **Outs**: Count of outs (3 = end of inning)
- **Innings**: Plays through 9 innings

## 🎯 Hit Types

- **Single**: Get to first base
- **Double**: Get to second base
- **Triple**: Get to third base
- **Home Run**: Score immediately!

## 🔧 Technologies

- **HTML5**: Game structure
- **CSS3**: Styling and animations
- **JavaScript (ES6+)**: Game logic and interactivity

## 📁 File Structure

```
baseball-game/
├── index.html      # Game structure and layout
├── style.css       # Styling and animations
├── script.js       # Game logic and interactivity
└── README.md       # This file
```

## 🎮 Controls

| Action | Method |
|--------|--------|
| Pitch Ball | Click button or press Spacebar |
| Swing | Click button or press Spacebar |
| New Game | Click "🔄 New Game" button |
| Play Again | Click button on game over screen |

## 🌟 Game Rules

1. **Strike Zone**: A zone where pitches count as strikes
2. **Walks**: 4 balls = batter walks to first base
3. **Strikeouts**: 3 strikes = batter is out
4. **Outs**: 3 outs per inning
5. **Innings**: 9 innings total (both teams bat each inning)
6. **Winner**: Highest score after 9 innings wins

## 🔄 Game Loop

1. Home team bats (3 outs)
2. Away team bats (3 outs)
3. Move to next inning
4. Repeat until 9 innings are complete
5. Winner is team with most runs

## 💡 Tips

- **Watch the ball**: Different pitch locations yield different outcomes
- **Timing is key**: Click swing at the right moment
- **Build runners**: Get hits to advance base runners and score more
- **Manage the count**: 3 strikes and you're out!

## 🎨 Customization

You can easily customize the game by modifying:

- **Colors**: Edit the CSS gradients and colors in `style.css`
- **Game Duration**: Change `TOTAL_INNINGS` in `script.js`
- **Hit Probabilities**: Adjust the percentages in `handlePerfectHit()`
- **Animations**: Modify animation timing in CSS

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers

## 🏆 Future Enhancements

- [ ] Multiplayer support
- [ ] Different difficulty levels
- [ ] Power-ups and special moves
- [ ] Stadium themes
- [ ] Player statistics tracking
- [ ] Sound effects
- [ ] Leaderboard

## 📄 License

This project is open source and available for personal use and modification.

## 🤝 Contributing

Feel free to fork this repository and submit pull requests with improvements!

---

**Enjoy the game! ⚾**
