var http = require('http');
var gm = require('gm').subClass({ imageMagick: true });
var buf = require('fs').readFileSync('img/batmanIsSad.jpg');
var port = process.env.PORT || 1337;

http.createServer(function (req, res) {

  var url = req.url;
  console.log(url);

  if(url == '/') {
    res.end('Hola mundo.');
  }
  else if(url == '/twist') {
    twist(req, res);
  }
  else if(url == '/contrast') {
    contrast(req, res);
  }
  else if(url == '/blur') {
    blur(req, res);
  }
  else {
    res.end('que haces hijo?');
  }

}).listen(port);

console.log('Server running at http://127.0.0.1:' + port + '/');

function twist(req, res) {
  gm(buf, 'img.png')
  .implode(-1.5)
  .colorize(0, 200, 256)
  .autoOrient()
  .stream()
  .pipe(res);
}

function contrast(req, res) {
  gm(buf, 'img.png')
  .contrast(-6)
  .autoOrient()
  .stream()
  .pipe(res);
}

function blur(req, res) {
  gm(buf, 'img.png')
  .blur(30, 20)
  .autoOrient()
  .stream()
  .pipe(res);
}