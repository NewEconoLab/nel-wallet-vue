<template>
    <div class="myneo-box">
        <div class="title">
            <span>My Neo Name</span>
        </div>
        <div class="form-box">
            <div class="neoname">
                Bennyrepublic.neo
            </div>
            <div class="addr-resolver">( Address resolver : d80ed0bd889b503739a8cf783a8ddcb37a5a9979bde1c00701e894f519c36964 )</div>
            <div class="addr-mapping">( Address mapping : AQxtGCx8PEhLUAQ3cfztRq5ykTXraBcohZ )</div>
            <div class="time-msg">( Expiration time : 2018/07/09 10:43:41 <span class="ff6">Expiring soon</span> )</div>
            <div class="addr-resolver">( Address resolver : not configured )</div>
            <div class="addr-mapping">( Address resolver : not configured )</div>
            <div class="time-msg">( Expiration time : 2019/07/06 10:43:41 )</div>
            <div class="btn-right">
                <button class="btn btn-nel btn-bid" @click="isShowEdit=!isShowEdit">Edit</button>
            </div>
        </div>
        <div class="edit-wrap" v-if="isShowEdit">
          <div class="edit-box">
            <div class="edit-title">Edit information</div>
            <div class="edit-content">
                <div class="edit-name">Neo Name : Bennyrepublic1234.neo</div>
                <div class="edit-input">
                    <div class="input-msg">
                        Address Resolver :
                        <button class="btn btn-nel btn-input-reset">Reset</button>
                    </div>
                    <div class="input-box">
                        <input type="text" class="readonly-input" readonly="readonly">
                        <button class="btn btn-nel btn-big">Confirm</button>
                        <div class="ok-img">
                            <img src="../../../static/img/correct.svg" alt="">
                        </div>
                    </div>
                </div>
                <div class="edit-input">
                    <div class="input-msg">
                        Address Mapping :
                        <button class="btn btn-nel btn-input-reset">Reset</button>
                    </div>
                    <div class="input-box">
                        <input type="text">
                        <button class="btn btn-nel btn-big btn-disable" disabled>Confirm</button>
                        <div class="ok-img">
                            <img src="../../../static/img/correct.svg" alt="">
                        </div>
                    </div>
                </div>
                <div class="edit-input">
                    <div class="input-msg">
                        Expiration Time :
                    </div>
                    <div class="input-box">
                        <input type="text" class="readonly-input" readonly="readonly">
                        <button class="btn btn-nel btn-big">Renewal</button>
                    </div>
                </div>
            </div>
            <div class="edit-close">
              <span aria-hidden="true" @click="isShowEdit=!isShowEdit">&times;</span>
            </div>
          </div>
        </div>
    </div>
</template>
<script lang="ts" src="./myneo.ts">
</script>

<style lang="less" scoped>
.myneo-box {
  .ff6 {
    color: #ff6a6a;
  }
  .form-box {
    background: #454f60;
    border-radius: 5px;
    padding: 20px 50px 10px 50px;
    font-size: 14px;
    margin-bottom: 20px;
    position: relative;
    .neoname {
      font-size: 16px;
    }
    .neoname,
    .addr-resolver,
    .addr-mapping,
    .time-msg {
      margin-bottom: 10px;
    }
    .btn-right {
      position: absolute;
      top: 50%;
      right: 30px;
      margin-top: -19px;
      .btn-bid {
        padding: 0;
        font-size: 18px;
        width: 110px;
        height: 38px;
        &.btn-disable {
          font-size: 14px;
        }
      }
    }
  }
  .edit-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    z-index: 1030;
    .edit-box {
      background: #454f60;
      padding: 30px 50px 50px 50px;
      width: 80%;
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
      .edit-title {
        font-size: 20px;
      }
      .edit-content {
        .edit-name {
          margin-top: 50px;
        }
        .edit-input {
          margin-top: 50px;
          .input-msg {
            .btn-input-reset {
              width: 80px;
              height: 30px;
              font-size: 14px;
              padding: 0;
              line-height: 30px;
              text-align: center;
              margin-left: 15px;
            }
          }
          .input-box {
            margin-top: 20px;
            input {
              width: 68%;
              height: 56px;
              background: none;
              border: 1px solid #b2b2b2;
              border-radius: 5px;
              vertical-align: middle;
              margin-bottom: 0;
              color: #c5c5c5;
              &.readonly-input {
                background: #6d7480;
              }
            }
            button {
              vertical-align: middle;
              &.btn-disable {
                background: #77bcf6;
                opacity: 1;
              }
            }
            .ok-img {
              display: inline-block;
              vertical-align: middle;
              margin-left: 20px;
              img {
                width: 24px;
                height: 24px;
              }
            }
          }
        }
      }
      .edit-close {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 30px;
        height: 30px;
        font-size: 30px;
      }
    }
  }
}
</style>
