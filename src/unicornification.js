const path = require('path');
const { app, BrowserWindow, TouchBar } = require('electron');

const { TouchBarButton } = TouchBar;

const unicorns = [
  new TouchBarButton({
    icon: path.join(__dirname, '/unicorn/frame-1.png'),
    backgroundColor: '#000',
  }),
];

const touchBar = new TouchBar(unicorns);

let unicornFrame = 0;

const updateUnicornFrames = () => {
  if (unicornFrame > 9) {
    unicornFrame = 0;
  } else {
    unicornFrame += 1;
  }

  const unicornPath = path.join(
    __dirname,
    `/unicorn/frame-${unicornFrame}.png`
  );

  unicorns[0].icon = unicornPath;
};

const animateUnicorns = () => {
  setInterval(updateUnicornFrames, 1000 / 60);
};

let window;

app.once('ready', () => {
  window = new BrowserWindow({
    width: 200,
    height: 200,
  });
  window.loadURL(`file://${path.join(__dirname, '/index.html')}`);
  window.setTouchBar(touchBar);
  animateUnicorns();
});

// Quit when all windows are closed and no other one is listening to this.
app.on('window-all-closed', () => {
  app.quit();
});
