
//Module
var M = {
  v:'v',
  f:function(){
    console.log(this.v);
    console.log('moduld.export');
  }
}

module.exports = M; // M이라는 객체를 이 모듈 바깥에서 사용할 수 있도록 export 하겠다.
