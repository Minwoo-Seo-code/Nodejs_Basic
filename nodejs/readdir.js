var testFolder = './data';  //data폴더를 가리킨다.
var fs = require('fs');

fs.readdir(testFolder, function(error, filelist){
  console.log("error :: " + error); //null
  console.log("filelist :: " + filelist); //CSS, HTML, JavaScript
  console.log(filelist);  //['CSS', 'HTML', 'JavaScript']
});

var Folder = 'intro';

fs.readdir(Folder, function(err, files){
  console.log(files);
});
