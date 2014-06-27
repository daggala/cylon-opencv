'use strict';

var Cylon = require('cylon');

var Camera = source('camera');

describe('Camera', function() {
  var camera;

  beforeEach(function() {
    camera = new Camera({
      device: {},
      extraParams: {
        camera: 0,
        haarcascade: 'path/to/cascade.xml'
      }
    });
  });

  it('subclasses Cylon.Driver', function() {
    expect(camera).to.be.an.instanceOf(Cylon.Driver);
    expect(camera).to.be.an.instanceOf(Camera);
  });

  describe("constructor", function() {
    it("defaults @displayingVideo to false", function() {
      expect(camera.displayingVideo).to.be.eql(false);
    });

    it("sets @cameraId to the provided camera ID", function() {
      expect(camera.cameraId).to.be.eql(0);
    });

    it("sets @haarcascade to the provided file", function() {
      expect(camera.haarcascade).to.be.eql("path/to/cascade.xml");
    });
  });

  describe("#commands", function() {
    it("is an array of Camera commands", function() {
      var commands = camera.commands;
      expect(commands).to.be.an('array');
      commands.forEach(function(command) {
        expect(command).to.be.a('string');
      });
    });
  });

  describe("#start", function() {
    var args;

    beforeEach(function() {
      camera.connection = { initCamera: spy() };
      camera.defineDriverEvent = spy();

      camera.start(function() { });

      args = { eventName: '', sendUpdate: false };
    });

    it("defines a 'cameraReady' driver event", function() {
      args.eventName = "cameraReady";
      expect(camera.defineDriverEvent).to.be.calledWith(args);
    });

    it("defines a 'frameReady' driver event", function() {
      args.eventName = "frameReady";
      expect(camera.defineDriverEvent).to.be.calledWith(args);
    });

    it("defines a 'facesDetected' driver event", function() {
      args.eventName = "facesDetected";
      expect(camera.defineDriverEvent).to.be.calledWith(args);
    });

    it("tells the connection to initialize the camera", function() {
      var initCamera = camera.connection.initCamera;
      expect(initCamera).to.be.calledWith(0, "path/to/cascade.xml");
    });
  });

  describe("readFrame", function() {
    beforeEach(function() {
      camera.connection = { readFrame: spy() }
    });

    it("tells the connection to read a frame from the camera", function() {
      camera.readFrame();
      expect(camera.connection.readFrame).to.be.calledWith(0);
    });
  });

  describe("detectFaces", function() {
    beforeEach(function() {
      camera.connection = { detectFaces: spy() }
    });

    it("tells the connection to detect faces from the camera", function() {
      var detectFaces = camera.connection.detectFaces;
      camera.detectFaces('frame');
      expect(detectFaces).to.be.calledWith('frame', 'path/to/cascade.xml');
    });
  });
});
