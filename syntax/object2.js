//함수는 배열과 객체에 담을 수 있다

var f1 = function() {
    console.log(1+1);
    console.log(1+2);
}
console.log(f1);  // [Function: f1]
f1(); //2, 3
console.log("-----");

var a = [f1];
a[0](); //2, 3
console.log("-----");

console.log(a[0]);  // [Function: f1]

var o = {
  func:f1
}
o.func(); //2, 3
