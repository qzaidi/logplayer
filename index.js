var fs = require('fs');

var offset = 3600;
var now = Date.now();
var lazy = require('lazy');


var logbuf = [];
var buffer = '';
var prev;

function playLogs(line,ts) {
  if (!prev) {
    prev = ts;
  } else if (prev != ts) {
    logbuf.push(buffer);
    buffer = '';
    prev = ts;
  }
  buffer += line.toString() + '\n';
}

function changeModeToPlay() {
  setInterval(function() {
    console.log(logbuf.shift());
  },1000);
  return 1;
}

(function main() {
  
  var mode = 0;
  var filename;
  var pattern;

  process.argv.shift();
  if (process.argv.length < 2) {
    console.log('usage: logplayer filename <timestamp>');
    process.exit(1);
  }

  filename = process.argv[1];
  pattern = process.argv[2];
  mode = pattern?0:changeModeToPlay();

  new lazy(fs.createReadStream(filename))
  .lines
  .forEach(function(line){
    var ts = line.toString().match(/\[(.*) \+\d*\]/)[1];
    if (mode) {
      playLogs(line,ts);
    } else {
      if (ts == pattern) {
        mode = changeModeToPlay();
      }
    }
  });

}());
