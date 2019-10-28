const message = {
  state:{
    CHECK: 0,
    NORMAL: 1,
    OVER: 2,
    CHECK_FAILURE: 3,
  },
  title:{
    max: 20,
  },
  content: {
    max: 200,
  }
};
const user ={
  password:{
    max: 11,
    min: 6,
    toString: function () {
      return this.min + '-' + this.max;
    },
    isRight: function (s) {
      return s.length >= this.min && s.length <= this.max;
    }
  },
  userName:{
    max: 9,
    min: 2,
    toString: function () {
      return this.min + '-' + this.max;
    },
    isRight: function (s) {
      return s.length >= this.min && s.length <= this.max;
    }
  },
  loginName:{
    max: 11,
    min: 6,
    toString: function () {
      return this.min + '-' + this.max;
    },
    isRight: function (s) {
      return s.length >= this.min && s.length <= this.max;
    }
  },
  telephone:{
    length: 11,
    isRight: function (s) {
      return s.length === this.length;
    }
  },
  role:{
    manage: 1,
    superManage: 2,
    normal: null,
  }
};

export default {
  message,
  user,
}
