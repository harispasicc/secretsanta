const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const challenges = [
  { id: 1, message: "Decorate the house", disabled: true },
  { id: 2, message: "Watch a Christmas Mickey Mouse movie", disabled: true },
  { id: 3, message: "Write a letter to Santa", disabled: true },
  { id: 4, message: "Plan a family photoshoot.", disabled: true },
  { id: 5, message: "Host A Holiday Game Night", disabled: true },
  { id: 6, message: "Host a Gingerbread House Competition", disabled: true },
  { id: 7, message: "Create Snowglobes From Mason Jars", disabled: true },
  { id: 8, message: "Take the Family Ice Skating", disabled: true },
  { id: 9, message: "Go on a Hike or Walk", disabled: true },
  { id: 10, message: "Build a Snowman", disabled: true },
  { id: 11, message: "Make Salt Dough Ornaments", disabled: true },
  { id: 12, message: "Make Hot Cocoa", disabled: true },
  { id: 13, message: "Read a bedtime story by the tree", disabled: true },
  { id: 14, message: "Have a family party under the tree", disabled: true },
  { id: 15, message: "Have a craft day with your kids", disabled: true },
  { id: 16, message: "Throw on your favorite Christmas sweater", disabled: true },
  { id: 17, message: "Hang mistletoe in every doorway", disabled: true },
  { id: 18, message: "Video chat with an out-of-town friend", disabled: true },
  { id: 19, message: "Go sledding", disabled: true },
  { id: 20, message: "Cut paper snowflakes", disabled: true },
  { id: 21, message: "Donate a toy", disabled: true },
  { id: 22, message: "Do Christmas Karaoke ", disabled: true },
  { id: 23, message: "Wrap Presents", disabled: true },
  { id: 24, message: "Watch a Holiday Movie", disabled: true },
  { id: 25, message: "Hang Christmas Lights", disabled: true },
  { id: 26, message: "Make Your Own Stockings", disabled: true },
  { id: 27, message: "Make Scented Holiday Candles", disabled: true },
  { id: 28, message: "Plan Your Holiday Feast", disabled: true },
  { id: 29, message: "Watch a Slideshow of the Old Year", disabled: true },
  { id: 30, message: "Give a lottery ticket to a stranger", disabled: true },
  { id: 31, message: "Visit Santa at the Mall", disabled: true },
]
const createCalendar = () => shuffle(challenges);
export default createCalendar;