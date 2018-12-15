<template>
  <div></div>
</template>
<style lang="less" scoped>
.alert-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  z-index: 1030;
  .alert-warp {
    background: #fff;
    padding: 30px 50px 0 50px;
    width: 80%;
    color: #333;
    position: absolute;
    top: 50%;
    left: 50%;
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border-radius: 5px;
    .alert-title {
      font-family: PingFangSC-Medium;
      font-size: 20px;
      margin-bottom: 50px;
    }
    .alert-content {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      line-height: 16px;
      .content {
        margin-bottom: 50px;
        .warning-msg {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #ff6a6a;
          line-height: 16px;
        }
        .input-warp {
          margin-top: 20px;
          position: relative;
          .input-ico {
            padding: 20px;
            height: 56px;
            width: 60%;
            margin-bottom: 0;
            vertical-align: middle;
            margin-right: 25px;
          }
          .input-disabled {
            cursor: not-allowed;
            background: #ddd;
          }
          .icon-verify {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #2dde4f;
            display: inline-block;
            vertical-align: middle;
            margin-left: 20px;
          }
          .btn-verify-warp {
            margin-left: 20px;
            display: inline-block;
            vertical-align: middle;
            .btn-verify {
              padding: 19px 25px;
              width: 140px;
            }
            .btn-disabled {
              background: #77bcf6;
              cursor: not-allowed;
            }
          }
        }
      }
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
