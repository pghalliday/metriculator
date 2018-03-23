const blessed = require('blessed');
const asciichart = require('asciichart');

const PADDING = '          ';

let data = [];

const screen = blessed.screen({
  smartCSR: true
});
 
screen.title = 'my window title';
 
const chart = blessed.box({
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
});
screen.append(chart);

// Quit on Escape, q, or Control-C. 
screen.key(['escape', 'q', 'C-c'], (ch, key) => {
  return process.exit(0);
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function pushValue() {
  data.push(getRandomInt(1000));
}

function render() {
  const subset = data.slice(-(chart.width - PADDING.length - 2));
  chart.setContent(asciichart.plot(subset, {
    padding: PADDING,
    height: chart.height - 1,
  }));
  screen.render();
}

chart.on('resize', render);

process.on('SIGWINCH', function() {
  screen.emit('resize');
});

pushValue();
pushValue();
render();

setInterval(() => {
  pushValue();
  render();
}, 50);
