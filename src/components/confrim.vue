<template>
  <div class="alert-wrap" v-show="show">
    <div class="alert-box">
      <div class="alert-title">{{title}}</div>
      <div class="line-wrap" v-for="msg in messageList" :key="msg.title">
        <div class="line-box">
          <div class="line-title">{{msg.title}}</div>
          <div class="line-content">{{msg.value}}</div>
        </div>
      </div>
      <div class="line-wrap" v-if="deblocking">
        <div class="line-box">
          <div class="line-title">输入密码</div>
          <div class="line-content">
            <input type="password" v-model="password" @input="passwordError=false">
            <div class="err-msg">{{passwordError?"密码错误，请重新输入":""}}</div>
          </div>
        </div>
      </div>
      <div class="confrim-msg">
        <label for :class="payFee?'checked-input':''">
          <span>
            <span class="select-img" @click="payFee=!payFee">
              <img src="../assets/selected.png" alt>
            </span>
            <span class="select-msg">优先处理此笔交易（ 支付0.001 GAS ）</span>
          </span>
        </label>
      </div>
      <div class="confrim-msg">
        <button class="btn btn-nel btn-big" id="tranfer-confirm">确认</button>
      </div>
      <div class="alert-tips"></div>
      <div class="alert-close" @click="closemudloe">
        <span aria-hidden="true">&times;</span>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.alert-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  z-index: 1030;
  .alert-box {
    background: #454f60;
    padding: 30px 50px 50px 50px;
    width: 50%;
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border-radius: 5px;
    font-size: 16px;
    .alert-title {
      font-size: 20px;
      color: #ffffff;
      margin-bottom: 50px;
    }
    .line-wrap {
      margin-bottom: 0px;
      margin-top: 0px;
      .line-box {
        display: flex;
        .line-title {
          width: 160px;
          line-height: 56px;
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #ffffff;
        }
        .line-content {
          line-height: 56px;
          width: 400px;
          input {
            width: 100%;
            height: 56px;
            background: none;
            border: 1px solid #b2b2b2;
            border-radius: 5px;
            vertical-align: middle;
            margin-bottom: 0;
            margin-right: 10px;
            color: #c5c5c5;
          }
        }
        input.readonly-input {
          background: #6d7480;
        }
        input::-webkit-input-placeholder {
          font-size: 14px;
          color: #c5c5c5;
          line-height: 14px;
        }
        .input-getall {
          width: 70%;
          height: 56px;
          display: inline-block;
          margin-right: 10px;
          position: relative;
        }
        .input-getall {
          input {
            width: 100%;
          }
          .getall-msg {
            display: inline-block;
            height: 24px;
            line-height: 24px;
            position: absolute;
            top: 16px;
            right: 20px;
            padding-left: 20px;
            border-left: 1px solid #fff;
            cursor: pointer;
          }
        }
        button {
          vertical-align: middle;
          margin-left: 0;
        }
        button.btn-disable {
          background: #77bcf6;
          opacity: 1;
        }
      }
      .err-msg {
        height: 20px;
        font-size: 12px;
        margin-top: 10px;
        color: #ff5053;
      }
    }
    .confrim-msg {
      margin: 0 auto;
      text-align: center;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #b2b2b2;
      line-height: 14px;

      label {
        box-sizing: border-box;
        display: inline-block;
        padding: 0 10px;
        margin-bottom: 10px;
        text-align: center;
        margin-right: 15px;
        font-size: 14px;
        color: #ffffff;
        font-weight: 400;
        border-radius: 3px;
        position: relative;
        .select-img {
          display: inline-block;
          width: 22px;
          height: 22px;
          margin-right: 6px;
          vertical-align: middle;
          border: 1px solid #fff;
          border-radius: 50%;
          img {
            display: none;
            width: 22px;
            height: 22px;
          }
        }

        span {
          vertical-align: middle;
        }
        input {
          visibility: hidden;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        .select-msg {
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #b2b2b2;
          line-height: 14px;
        }
        &:last-child {
          margin-right: 0;
        }
        &.checked-input {
          .select-img {
            border: none;
            img {
              display: block;
            }
          }
          .select-msg {
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #ffffff;
            line-height: 14px;
          }
        }
      }
    }
    .alert-tips {
      font-size: 14px;
      color: #c5c5c5;
    }
    .alert-close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 30px;
      height: 30px;
      font-size: 30px;
    }
  }
}
</style>
<script lang="ts" src="./confrim.ts">
</script>
