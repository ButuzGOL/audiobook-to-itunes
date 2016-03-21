#!/usr/bin/env node
'use strict';

process.bin = process.title = 'audiobook-to-itunes';

var ffmetadata = require('ffmetadata');
var dir = require('node-dir');
var path = require('path');

const dirpath = process.argv[2];
const baseData = {
  artist: '',
  album: '',
  track: ''
};

dir.readFiles(
  dirpath,
  { match: /.mp3$/ },
  (err, content, next) => { next(); },
  (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      let filename = path.basename(file);
      ffmetadata.write(
        file,
        Object.assign({}, baseData, { title: filename }),
        (err) => {
          if (err) throw err;
          console.log(`Track ready ${filename}`);
        });
    });
  });
