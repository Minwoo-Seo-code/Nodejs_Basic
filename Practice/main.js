var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('../libPractice/template');
var path = require('path');

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
      fs.readdir('./dataPractice', 'utf8', function(error, filelist){
        var title = 'Welcome';
        var description = 'Hello, Nodejs';
        list = template.list(filelist);
        var html = template.HTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/create">파일생성</a>`);
        response.writeHead(200);
        response.end(html);
      });

    } else {
      /*var data = fs.readFileSync(__dirname  + _url); //__dirname = 현재 디렉토리 C:|nodejs|Practice
      console.log('__dirname :: ' + __dirname);
      console.log('url :: ' + _url); // '/'
      */
      fs.readdir('./dataPractice', 'utf8', function(error, filelist){
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`dataPractice/${filteredId}`, 'utf8', function (err, description){
          var title = queryData.id;
          var list = template.list(filelist);
          var html = template.HTML(title, list, `<h2>${title}</h2>${description}`,
            `<a href="/create">파일생성</a> |
             <a href="/update?id=${title}">파일수정</a>
             <form action="/delete_process" method="post">
                <input type="hidden" name="id" value="${title}">
                <input type="submit" value="파일삭제">
             </form>
             `);
          response.writeHead(200);
          response.end(html);
        });
      });
    }

  } else if(pathname === '/create'){
      fs.readdir('./dataPractice', 'utf8', function(error, filelist){
          var title = 'WEB = create';
          var list = template.list(filelist);
          var html = template.HTML(title, list, `
            <form action="/create_process" method="post">
              <p>
                <input type="text" name="title" placeholder="title">
              </p>
              <p>
                <textarea name="description" placeholder="description"></textarea>
              </p>
              <p>
                <input type="submit" value="파일 생성하기">
              </p>
            </form>`,
            `<a href="/create">파일생성</a>`
          );
            response.writeHead(200);
            response.end(html);
    });
  } else if(pathname === '/create_process') {
      var body = '';
      request.on('data', function(data){
        body += data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`dataPractice/${title}`, description, function(err){
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        });
      });
  } else if(pathname === '/update') {
    var filteredId = path.parse(queryData.id).base;
    fs.readFile(`dataPractice/${filteredId}`, 'utf8', function (err, description){
          var title = queryData.id;
          var list = template.list(filelist);
          var html = template.HTML(title, list,
            `<form action="/update_process" method="post">
              <p>
                <input type="hidden" name="id" value="${title}">
                <input type="text" name="title" value="${title}">
              </p>
              <p>
                <textarea name="description" placeholder="description">${description}</textarea>
              </p>
              <p>
                <input type="submit" value="파일 수정하기">
              </p>
            </form>`,
            `<a href="/create">파일생성</a> | <a href="/update?id=${title}">파일수정</a>`);
          response.writeHead(200);
          response.end(html);
        });

  } else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
        body += data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;
        fs.rename(`dataPractice/${id}`, `dataPractice/${title}`, function(err1){ //기존의 id를 새로이 title값으로 rename하겠다.
          fs.writeFile(`dataPractice/${title}`, description, function(err2){
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
          });
        });
      });

  } else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
        body += data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var filteredId = path.parse(id).base;
        fs.unlink(`dataPractice/${filteredId}`, function(error){
          response.writeHead(302, {Location: `/`});
          response.end();
        });
      });

  } else {
      response.writeHead(404);
      response.end('Not Found');
  }



});

app.listen(3000);
