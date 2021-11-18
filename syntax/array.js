//CRUD

var arr = ['A','B','C','D'];

console.log('arr[0] :: ' + arr[0]);  //A
console.log('arr[1] :: ' + arr[1]);  //B
console.log('arr[2] :: ' + arr[2]);  //C
console.log('arr[3] :: ' + arr[3]);  //D

arr[0] = 'Hello';
console.log('arr[0] :: ' + arr[0]);  //Hello
console.log('arr.length :: ' + arr.length);

arr.push("E");
console.log(arr);

arr.push("F");
console.log(arr);

var length = arr.length;
console.log("length = " + length);
