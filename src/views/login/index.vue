<template>
  <div id="login" class="center">
    <div class="login-othen-box">
      <div class="login-othen-top">
        <el-radio-group v-model="labelPosition" size="mini">
          <el-radio-button label="登录">登录</el-radio-button>
          <el-radio-button disabled label="注册">注册</el-radio-button>
        </el-radio-group>
      </div>
      <!-- 登录 -->
      <div class="login-box" v-show="labelPosition=='登录'">
        <el-form
          :model="loginForm"
          status-icon
          :rules="loginRules"
          ref="loginForm"
          label-width="80px"
          class="demo-ruleForm"
          size="mini"
        >
          <el-form-item label="用户名" prop="loginName">
            <el-input v-model="loginForm.loginName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 注册 -->
      <div class="sign-box" v-show="labelPosition=='注册'">
        <el-form
          :model="signForm"
          status-icon
          :rules="signRules"
          ref="signForm"
          label-width="80px"
          class="demo-ruleForm"
          size="mini"
        >
          <el-form-item label="用户名" prop="signName">
            <el-input v-model="signForm.signName"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="signEmail">
            <el-input v-model="signForm.signEmail"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="signPassword">
            <el-input type="password" v-model="signForm.signPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input type="password" v-model="signForm.checkPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSignUser('signForm')">提交</el-button>
            <el-button @click="resetForm('signForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { userLogin, signUser, verifyUser } from "../../ults/http";
export default {
  data() {
    let emailRule = /^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
    // let emailRule = /a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$/;
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error("长度在 6 到 20 位之间"));
      } else {
        if (this.signForm.checkPassword !== "") {
          this.$refs.signForm.validateField("checkPassword");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.signForm.signPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    let validateUserName = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (value.length >= 4 && value.length <= 20) {
        if (await verifyUserName(value)) {
          callback(new Error("该用户已存在"));
        } else {
          callback();
        }
      } else {
        callback(new Error("长度在 4 到 20 个字符"));
      }
    };
    let validateUserEmail = async (rule, value, callback) => {
      if (emailRule.test(value)) {
        if (await verifyUserName(value)) {
          callback(new Error("该邮箱已注册"));
        }
        callback();
      } else {
        callback(new Error("请输入正确的邮箱"));
      }
    };
    let verifyUserName = async value => {
      let res = await verifyUser(value);
      return res.data.code === 200;
    };
    return {
      loginForm: {
        password: "",
        loginName: ""
      },
      signForm: {
        signName: "",
        signEmail: "",
        signPassword: "",
        checkPassword: ""
      },
      loginRules: {
        loginName: [
          { required: true, message: "请输入用户名或邮箱", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 4 到 20 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ]
      },
      signRules: {
        signName: [{ validator: validateUserName, trigger: "blur" }],
        signEmail: [{ validator: validateUserEmail, trigger: "blur" }],
        signPassword: [{ validator: validatePass, trigger: "blur" }],
        checkPassword: [{ validator: validatePass2, trigger: "blur" }]
      },
      labelPosition: "登录"
    };
  },
  methods: {
    //   登录
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await userLogin(this.loginForm);
          console.log(res);
          this.$message({
            message: res.data.msg,
            type: res.data.code === 200 ? "success" : "error"
          });
          if (res.data.code === 200) {
            window.localStorage.setItem("token", res.data.token);
            this.$router.push("/");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 注册
    onSignUser(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await signUser(this.signForm);
          console.log(res);
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          this.labelPosition = "登录";
          this.loginForm = {
            loginName: res.data.notes.Username,
            password: res.data.notes.Password
          };
          this.resetForm(formName);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100%;
  background-color: #a6f9ec;

  .login-othen-box {
    width: 340px;
    height: 280px;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 15px;
    padding: 40px 40px 0 0;
    position: relative;

    .login-othen-top {
      width: 100%;
      height: 25px;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>