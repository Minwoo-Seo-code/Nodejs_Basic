module.exports = {  //함수를 객체화 통해 중복된 코드를 간략화 하는 작업, 수정에도 용이하다.
    HTML:function(title, list, body, controls){
      return `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          ${controls}
          <p>${body}</p>
        </body>
        </html>
        `;
    },
    list:function(filelist){
      var list = '<ul>';
      var i = 0;
      while (i < filelist.length){
        list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        i++;
      }
      list += '</ul>';
      return list;
    }
}
