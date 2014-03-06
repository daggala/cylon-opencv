var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'opencv', adaptor: 'opencv' },
  devices: [
    { name: 'window', driver: 'window' },

    {
      name: 'camera',
      driver: 'camera',
      camera: 1,
      haarcascade: __dirname + "/haarcascade_frontalface_alt.xml"
    }
  ],

  work: function(my) {
    my.camera.once('cameraReady', function() {
      console.log('The camera is ready!');

      my.camera.on('facesDetected', function(err, im, faces) {
        for (var i = 0; i < faces.length; i++) {
          var face = faces[i];
          im.rectangle(
            [face.x, face.y],
            [face.x + face.width, face.y + face.height],
            [0, 255, 0],
            2
          );
        }

        my.window.show(im, 40);
        my.camera.readFrame();
      });

      my.camera.on('frameReady', function(err, im) {
        my.camera.detectFaces(im);
      });

      my.camera.readFrame();
    });
  }
}).start();
