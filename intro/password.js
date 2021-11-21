module.exports = {
  id:'egoing',
  password:'111111'
};

/* 프롬프트에서 실행한 path 분석 내용
> var path = require('path');
undefined
> path.parse('../password.js')
{
  root: '',
  dir: '..',  //별도의 property
  base: 'password.js',
  ext: '.js', //확장자
  name: 'password'
}
*/
