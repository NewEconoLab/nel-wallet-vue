<template>
    <div class="page-two">
        <div class="title">
            <span>Auction Information</span>
            <div class="goback" @click="onBack">&lt;&lt;&lt;Go back</div>
        </div>
        <div class="form-box">
            <div class="filename">Domain : Bennyrepublic1234.test</div>
            <div class="status">Status : <span class="status-being">Fixed period </span> </div>
            <div class="highest-price">Highest bid price : 9 SGas</div>   
            <div class="bidder">Current bidder  : <span>Other people（ AYMa5TcgVfvPxBxzzfYswUHAvXLyaptquh ）</span> </div>
            <div class="bidder">Current bidder  : <span class="bidder-me">Me（ AYMa5TcgVfvPxBxzzfYswUHAvXLyaptquh ）</span> </div>
            <div class="my-bid-sgas">My cumulative bid  : <span class="status-ended">8</span>  SGas</div>     
        </div>
        <div class="title">
            <span>Raise my bid</span>
        </div>
        <div class="form-box">
            <div>
                <div class="input-msg">Raise my bid : </div>
                <div class="input-box" >
                    <input type="text" placeholder="Enter a raise">
                    <span>SGas</span>
                </div>
                <div class="err-msg status-ended">Only 90 SGas is available.</div>
            </div>
            <div class="my-sgas">My cumulative bid will be : <span class="status-ended">8</span> SGas</div>
            <div class="tips-msg">
                Tips : The minimum value for your raise is 0.1 SGas. When your cumulative bid is less than the  highest bid price, The raise will be unsuccessful. 
            </div>
            <div class="btn-bid-box">
              <button class="btn btn-bid btn-disable" disabled="disabled" >Bid</button>
            </div>
        </div>
        <div class="title">
            <span>Timeline</span>
        </div>
        <div class="form-box">
            <div class="time-box">sdfasf</div>
        </div>
    </div>
</template>
<script lang="ts" src="./auctioninfo.ts">
</script>

<style lang="less" scoped>
.page-two {
  .status-being {
    color: #2dde4f;
  }
  .status-random {
    color: #f5a158;
  }
  .status-ended {
    color: #ff6a6a;
  }
  .bidder-me {
    color: #198cee;
  }
  button {
    &.btn-disable {
      background: #77bcf6;
      opacity: 1;
    }
  }
  .title {
    position: relative;
    .goback {
      font-size: 16px;
      color: #4dadff;
      position: absolute;
      top: 42px;
      right: 0;
      cursor: pointer;
    }
  }
  .form-box {
    background: #454f60;
    border-radius: 5px;
    padding: 50px;
    margin-bottom: 20px;
    .filename {
      font-size: 20px;
    }
    .filename,
    .status,
    .highest-price,
    .bidder {
      margin-bottom: 10px;
    }
    .input-msg {
      display: inline-block;
      font-size: 16px;
      margin-right: 15px;
    }
    .err-msg {
      display: inline-block;
      font-size: 12px;
    }
    .input-box {
      display: inline-block;
      background: #454f60;
      border: 1px solid #b2b2b2;
      border-radius: 5px;
      width: 560px;
      margin-bottom: 0px;
      height: 56px;
      position: relative;
      vertical-align: middle;
      font-size: 16px;
      margin-right: 10px;
      input {
        display: inline-block;
        background: none;
        border: 0;
        width: 500px;
        height: 56px;
        line-height: 16px;
        font-size: 16px;
        margin: 0 auto;
        &::-webkit-input-placeholder {
          font-size: 14px;
          color: #c5c5c5;
          line-height: 14px;
        }
      }
    }
    .my-sgas {
      margin-top: 20px;
      margin-bottom: 50px;
    }
    .tips-msg {
      font-size: 14px;
      color: #c5c5c5;
      margin-bottom: 30px;
    }
    .btn-bid-box {
      text-align: center;
      .btn-bid {
        padding: 0;
        font-size: 18px;
        width: 150px;
        height: 38px;
      }
    }
    .time-box {
    }
  }
}
</style>
