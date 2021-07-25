<template>
  <div class="login">
    <video
      src="../../assets/video/bg.mp4"
      muted="muted"
      autoplay="autoplay"
      loop="loop"
      preload="auto"
    ></video>

    <div class="loginBox">
      <h1>东邪西毒</h1>
      <svg class="icon iconEW" aria-hidden="true" @click="flag = !flag">
        <use
          :xlink:href="
            flag ? '#icon-diannaojiaobiao' : '#icon-erweimajiaobiao2'
          "
        ></use>
      </svg>

      <transition>
        <div class="Ewm" v-if="flag">
          <div class="img">
            <img :src="scanCodeUrl" alt="" />
            <div class="mask" v-show="login">
              <svg class="icon iconY" aria-hidden="true" @click="flag = !flag">
                <use xlink:href="#icon-icn_dengluchenggong"></use>
              </svg>
            </div>
          </div>
          <p>请用微信扫码登录</p>
        </div>

        <el-form
          v-else
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="login-ruleForm"
          @keydown.native.enter="submitForm('ruleForm')"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              type="text"
              v-model="ruleForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="验证码" prop="check" class="zero">
            <el-input
              maxlength="5"
              type="text"
              v-model="ruleForm.check"
              autocomplete="off"
            ></el-input>
            <span v-html="captcha" class="captcha" @click="refresh"> </span>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </transition>
    </div>
  </div>
</template>
<script>
import {
  loginApi,
  getCaptcha,
  verifyCaptcha,
  getScancode,
  WeChatLogin,
} from "api";
import { mapMutations } from "vuex";

import io from "socket.io-client";
import qr from "qrcode";

var validateUser = (rule, value, callback) => {
  //用户名正则，3到16位（字母，数字，下划线，减号）
  var uPattern = /^[a-zA-Z0-9_-]{3,16}$/;
  if (uPattern.test(value)) {
    callback();
  } else {
    callback("用户名请输入3到16位（字母，数字，下划线，减号）");
  }
};
var validatePass = (rule, value, callback) => {
  //密码长度6-16，自己改变数字可以调节
  var pPattern = /^.{3,16}$/;
  if (pPattern.test(value)) {
    callback();
  } else {
    callback("密码长度6-16位");
  }
};
var validateCheck = (rule, value, callback) => {
  //验证码长度6-16，自己改变数字可以调节
  var cPattern = /^.{5,5}$/;
  if (cPattern.test(value)) {
    callback();
  } else {
    callback("验证码请输入正确");
  }
};

export default {
  watch: {
    flag(newVal) {
      if (newVal) {
        const socket = io("ws://chst.vip");
        socket.on("connect", () => {
          console.log("链接成功");
          getScancode().then((res) => {
            qr.toDataURL(res.data.scanCodeUrl, (err, url) => {
              if (err) throw err;
              this.scanCodeUrl = url;
            });
          });

          socket.on("scancodeSuccess", (data) => {
            console.log(data);
            if (data.state) {
              this.login = true;
              let wechatCode = data.wechatCode;
              WeChatLogin(wechatCode).then((res) => {
                console.log(res);
                if (res.data.state) {
                  localStorage.setItem("DX", res.data.token);

                  localStorage.setItem(
                    "userInfo",
                    JSON.stringify(res.data.userInfo)
                  );
                  this.SET_INFO(res.data.userInfo);

                  this.$router.push("/");
                }
              });
            }
          });
        });
      }
    },
  },
  created() {
    this.refresh();
  },
  data() {
    return {
      captcha: "",
      flag: false,
      scanCodeUrl: "",
      login: false,
      ruleForm: {
        username: "",
        password: "",
        check: "",
      },
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        check: [{ validator: validateCheck, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations(["SET_INFO"]),
    refresh() {
      getCaptcha().then((res) => {
        // console.log(res);
        this.captcha = res.data.img;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "正在登入",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          let { username, password, check } = this.ruleForm;
          // console.log(username, password, check);

          verifyCaptcha(check).then((res) => {
            if (res.data.state) {
              loginApi(username, password).then((res) => {
                // console.log(res);
                if (res.data.state) {
                  loading.close();

                  localStorage.setItem("DX", res.data.token);
                  localStorage.setItem(
                    "userInfo",
                    JSON.stringify(res.data.userInfo)
                  );
                  this.SET_INFO(res.data.userInfo);

                  this.$router.push("/");
                } else {
                  loading.close();
                  this.refresh();
                  this.ruleForm.check = "";
                  this.$message({
                    showClose: true,
                    message: "请输入正确用户名或密码",
                    type: "error",
                  });
                }
              });
            } else {
              loading.close();
              this.refresh();
              this.$message({
                showClose: true,
                message: "错了哦，请输入正确的验证码",
                type: "error",
              });
              this.ruleForm.check = "";
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(200px);
}
.v-enter-to,
.v-leave {
  transform: translateX(0);
  opacity: 1;
}
.v-enter-active,
.v-leave-active {
  transition: all .1s;
}
.login {
  height: 100%;
  .captcha {
    display: inline-block;
  }
  video {
    position: fixed;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -100;
    -ms-transform: translateX(-50%) translateY(-50%);
    -moz-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    background-size: cover;
  }
}
.loginBox {
  .iconEW {
    width: 50px;
    height: 50px;
    position: absolute;
    right: 4px;
    top: 4px;
  }
  .Ewm {
    .img {
      display: flex;
      justify-content: center;
      position: relative;
      img {
        width: 200px;
        height: 200px;
        display: block;
      }
    }
    .mask {
      width: 200px;
      height: 200px;
      background: rgba(255, 255, 255, 0.5);
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      .iconY {
        width: 38px;
        height: 38px;
      }
    }
    p {
      text-align: center;
      margin-top: 25px;
      font-size: 17px;
    }
  }

  /deep/ .el-button--primary {
    background: linear-gradient(to left, blue 10%, deepskyblue 77%);
  }
  /deep/.el-input {
    .el-input__inner {
      background: rgba(255, 255, 255, 0);
    }
  }
  /deep/.el-form-item__label {
    color: #fff;
  }
  position: fixed;
  right: 200px;
  bottom: 120px;
  border-radius: 20px;
  h1 {
    color: red;
    text-align: center;
    margin: 60px 0;
  }
  width: 400px;
  height: 480px;
  background: rgba(0, 0, 0, 0.1);
  /deep/ .el-input {
    width: 250px;
  }
  /deep/ .el-button--primary {
    width: 250px !important;
    margin-top: 7px;
  }
  .captcha {
    display: inline-block;
    height: 38px;

    /deep/ svg {
      width: 100px;
      height: 38px;
      position: absolute;
      right: 50px;
      top: 15px;
    }
  }
  /deep/.zero {
    .el-form-item__label {
      padding: 12px;
    }
    .el-input__suffix {
      right: 117px;
    }
  }
}
</style>