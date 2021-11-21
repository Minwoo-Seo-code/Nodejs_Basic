var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request, response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;  //queryString을 알아내기 위해서 사용
  var pathname = url.parse(_url, true).pathname;
  var title = queryData.id;
  console.log('queryData :: ', queryData);
  console.log('queryData.id :: ', queryData.id);  ///'?id=' 이후에 나오는 queryString을 의미한다.
  console.log('pathname :: ', pathname);  //

  if (pathname === '/') {
    if (queryData.id === undefined) {
      var title = 'Welcome';
      var description = 'Hello, Nodejs';
      var template = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - Welcome</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ul>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=HTMLPractice">HTMLPractice</a></li>
        </ul>
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
      `;
      response.writeHead(200);
      response.end(template);
    } else {
      /*var data = fs.readFileSync(__dirname  + _url); //__dirname = 현재 디렉토리 C:|nodejs|Practice
      console.log('__dirname :: ' + __dirname);
      console.log('url :: ' + _url); // '/'
      */
      fs.readFile(`dataPractice/${queryData.id}`, 'utf8', function (err, description){
        var title = queryData.id;
        var template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - Welcome</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ul>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=HTMLPractice">HTMLPractice</a></li>
          </ul>
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `;
        response.writeHead(200);
        response.end(template);
      });
    }

  } else {
      response.writeHead(404);
      response.end('Not Found');
  }



});

app.listen(3000);
