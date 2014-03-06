var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'opencv', adaptor: 'opencv' },
  devices: [
    { name: 'window', driver: 'window' },
    {
      name: 'camera',
      driver: 'camera',
      camera: 0,
      haarcascade: __dirname + "/haarcascade_frontalface_alt.xml"
    }
  ],

  work: function(my) {
    my.camera.once('cameraReady', function() {
      console.log('The camera is ready!');

      my.camera.on('frameReady', function(err, im) {
        console.log("FRAMEREADY!");
        my.window.show(im, 40);
      });

      every(50, my.camera.readFrame);
    });
  }
}).start();
