'use strict';

var Mat = source('mat');

var EventEmitter = require('events').EventEmitter;

describe('Cylon.Drivers.OpenCV.Mat', function() {
  var mat = new Mat({
    device: new EventEmitter
  });

  it("provides a 'readImage' function", function() {
    expect(mat.readImage).to.be.a('function');
  });

  it("provides a 'detectFaces' function", function() {
    expect(mat.detectFaces).to.be.a('function');
  });
});
