var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring') ;
var template = require('../lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;  //Query String
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){
      if(queryData.id === undefined){
          console.log(pathname);    //localhost:3000'/' 여기 /를 의미함
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = template.list(filelist);
          var html = template.html(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`  //home 이니까 업데이트를 지운다.
            ); //`<h2>${title}</h2>${description}` 자체가 body이다.

          response.writeHead(200);
          response.end(html);
        });

      } else {
        fs.readdir('./data', function(error, filelist){
          var filteredId = path.parse(queryData.id).base;
          fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
            var title = queryData.id;
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizedDescription = sanitizeHtml(description);
            var list = template.list(filelist);
            var html = template.html(sanitizedTitle, list, `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
            `<a href="/create">create</a>
             <a href="/update?id=${sanitizedTitle}">update</a>
             <form action="/delete_process" method="post">
                <input type="hidden" name="id" value="${sanitizedTitle}">
                <input type="submit" value="삭제">
             </form>
            `); //이 부분은 아이디값을 선택한 것이니까 update가 나와도 된다.
            response.writeHead(200);
            response.end(html);
          });
        });
      }
    } else if(pathname === '/create'){
      fs.readdir('./data', function(error, filelist){
        var title = 'WEB - create';
        var list = template.list(filelist);
        var html = template.html(title, list, `
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit" name="제출">
            </p>
          </form>
          `, '');
        response.writeHead(200);
        response.end(html);
      })
    } else if(pathname === '/create_process') {
      var body = '';
      request.on('data', function(data){  //서버쪽에서 수신할때마다 data라는 인자를 통해서 수신한 정보를 넘겨준다.
        body += data; //body데이터에 data를 추가한다.

        if (body.length > 1e6) {  //수신받는 데이터가 초과할 시 서버 연결을 끊겠다.
          request.connection.destroy();
        }

      });
      request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf8', function (err){  //에러를 처리하는 콜백함수
          response.writeHead(302, {Location: `/?id=${title}`});  //200은 성공했다면...302는 일시적으로 이 페이지로 이동시켜라
          response.end('successfull');
        });
      });

    } else if (pathname === '/update') {
      fs.readdir('./data', function(error, filelist){
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
          var title = queryData.id;
          var list = template.list(filelist);
          var template = template.html(title, list,
            `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <p><input type="text" name="title" value="${title}"></p>
              <p>
                <textarea name="description" placeholder="description">${description}</textarea>
              </p>
              <p><input type="submit" value="수정"></p>
            </form>
            `,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
          );
          response.writeHead(200);
          response.end(html);
        });
      });
    } else if (pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){  //서버쪽에서 수신할때마다 data라는 인자를 통해서 수신한 정보를 넘겨준다.
        body += data; //body데이터에 data를 추가한다.
        if (body.length > 1e6) {  //수신받는 데이터가 초과할 시 서버 연결을 끊겠다.
          request.connection.destroy();
        }
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;
        fs.rename(`data/${id}`, `data/${title}`, function (err){
          fs.writeFile(`data/${title}`, description, 'utf8', function (err){  //에러를 처리하는 콜백함수
            response.writeHead(302, {Location: `/?id=${title}`});  //200은 성공했다면...302는 일시적으로 이 페이지로 이동시켜라
            response.end();
          });
      });
    });
  } else if (pathname === '/delete_process'){
    var body = '';
    request.on('data', function(data){  //서버쪽에서 수신할때마다 data라는 인자를 통해서 수신한 정보를 넘겨준다.
      body += data; //body데이터에 data를 추가한다.
    });

    request.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      var filteredId = path.parse(id).base;
      fs.unlink(`data/${filteredId}`, function(error){
        response.writeHead(302, {Location: `/`});
        response.end();
      });
  });

} else {
      response.writeHead(404);
      response.end('Not found');
    }

});
app.listen(3000);
