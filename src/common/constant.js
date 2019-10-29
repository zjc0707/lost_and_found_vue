import common from "./common";
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
      return common.isStrLengthBetweenMaxAndMin(s, this.max, this.min);
    }
  },
  userName:{
    max: 10,
    min: 2,
    toString: function () {
      return this.min + '-' + this.max;
    },
    isRight: function (s) {
      return common.isStrLengthBetweenMaxAndMin(s, this.max, this.min);
    }
  },
  loginName:{
    max: 11,
    min: 6,
    toString: function () {
      return this.min + '-' + this.max;
    },
    isRight: function (s) {
      return common.isStrLengthBetweenMaxAndMin(s, this.max, this.min);
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
