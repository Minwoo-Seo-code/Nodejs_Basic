//refactoring
module.exports = {
  html : function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB11 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB2</a></h1>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },
  list : function(filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
      list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i++;
    }
    list = list+'</ul>';
    return list;
  }
};
