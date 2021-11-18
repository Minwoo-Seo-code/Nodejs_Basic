function a(){
  console.log('A');
}

var b  = function(){  //JavaScript에서는 함수가 값이다.
  console.log('B');
};

a();
b();

function slowfunc(callback){
  callback();
}
console.log('callback');
slowfunc(b);  //B
