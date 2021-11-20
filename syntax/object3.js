var v1 = 'v1';

v1 = 'egoing';

var v2 = 'v2';

var p = {
  v1 : 'v1',
  v2 : 'v2',
  f1 : function(){
    console.log(this.v1); //this는 해당 함수가 속해있는 객체를 참조한다. 
  },
  f2 : function(){
    console.log(this.v2);
  }
};

p.f1();
p.f2();
