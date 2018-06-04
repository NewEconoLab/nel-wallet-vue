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
        <div>
          <div class="title">
              <span>Get my domain</span>
          </div>
          <div class="form-box">
              <div class="neoname"> BunnyRepublic.neo</div>
              <div class="neoname-tips">Tips : When you successfully get your domain,You can edit it in My Neo Name.</div>
              <div class="btn-center">
                <button class="btn btn-nel btn-bid" >Get domain</button>
                <button class="btn btn-nel btn-bid btn-disable" disabled>Getting domain...</button>
              </div>  
          </div>
        </div>
        <div>
          <div class="title">
            <span>Recover SGas</span>
        </div>
        <div class="form-box">
            <div class="cumulative-msg">My cumulative bid  : 10 SGas</div>
            <div class="fee-msg">Fee : 0.5 SGas</div>
            <div class="remain-msg">Remaining SGas : 9.5 SGas</div>
            <div class="btn-center">
              <button class="btn btn-nel btn-bid" >Recover SGas</button>
              <button class="btn btn-nel btn-bid btn-disable" disabled>Recovering SGas...</button>
            </div> 
        </div>
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
          <!-- process-wrapper start -->
          <div class="process-wrapper">
            <label>Status</label>
            <div class="process-box">
              <div class="process long" style="width:70%">
                <div class="process-tips">Random period </div>
                <!-- <div class="process-fff">
                  <img src="../../../static/img/going.png" alt="">
                </div> -->
              </div>
              <div class="starts">2018/05/24
                <br/>16:00:00</div>

              <div class="days">
                <em>Bid start time</em>
                <span>2018/05/24
                  <br/>16:00:00</span>
              </div>
              <div class="days">
                <span>2018/05/24
                  <br/>16:00:00</span>
              </div>
              <div class="days">
                <em>Fixed period end time</em>
                <span>2018/05/24
                  <br/>16:00:00</span>
              </div>
              <div class="days">
                <span>2018/05/24
                  <br/>16:00:00</span>
              </div>
              <div class="days">
                <em>Maximum end time of random period</em>
                <span>2018/05/24
                  <br/>16:00:00</span>
              </div>
            </div>
          </div>
          <!-- process-wrapper end  -->
          <div class="auction-tips">Tips : The auction is about going to random period, and it may end at any point during the random period.</div>
          <!-- timeling-wrapper start -->
          <div class="timeling-wrapper">
            <div class="first"></div>
            <div class="list">
              <div class="line"></div>
              <div class="infos">
                <span>2018/05/24 10:30:21</span>
                <p>Other people（AYMa...tquh）</p>
                <em>Price：9 SGas</em>
              </div>
            </div>

            <div class="list">
              <div class="line"></div>
              <div class="infos">
                <span>2018/05/24 10:30:21</span>
                <p>Other people（AYMa...tquh）</p>
                <em>Price：9 SGas</em>
              </div>
            </div>

            <div class="list">
              <div class="line"></div>
              <div class="infos">
                <span>2018/05/24 10:30:21</span>
                <p>Other people（AYMa...tquh）</p>
                <em>Price：9 SGas</em>
              </div>
            </div>

            <div class="list">
              <div class="line"></div>
              <div class="infos">
                <span>2018/05/24 10:30:21</span>
                <p>Other people（AYMa...tquh）</p>
                <em>Price：9 SGas</em>
              </div>
            </div>


            <div class="list">
              <div class="line"></div>
              <div class="infos">
                <span>2018/05/24 10:30:21</span>
                <p>Other people（AYMa...tquh）</p>
                <em>Price：9 SGas</em>
              </div>
            </div>


            <div class="list">
              <div class="line"></div>
              <div class="infos">
                <span>2018/05/24 10:30:21</span>
                <p>Other people（AYMa...tquh）</p>
                <em>Price：9 SGas</em>
              </div>
            </div>
          </div>
          <!-- timeling-wrapper end -->
          <div class="viewmore">
            <button class="btn btn-nel">View more</button>
          </div>
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
      margin-bottom: 30px;
    }
    .tips-msg {
      font-size: 14px;
      color: #c5c5c5;
      margin-bottom: 50px;
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
    .neoname {
      text-align: center;
      font-size: 24px;
    }
    .neoname-tips {
      margin-top: 20px;
      margin-bottom: 30px;
      text-align: center;
      font-size: 14px;
      color: #c5c5c5;
    }
    .btn-center {
      text-align: center;
    }
    .cumulative-msg {
      font-size: 20px;
      margin-bottom: 20px;
    }
    .fee-msg,
    .remain-msg {
      margin-top: 20px;
      font-size: 16px;
    }
    .remain-msg {
      margin-bottom: 50px;
    }
    .auction-tips {
      font-size: 14px;
      color: #c5c5c5;
      text-align: left;
      margin-top: 30px;
      margin-left: 34px;
    }
    // process-wrapper
    .process-wrapper {
      padding-top: 26px;
      margin-left: 34px;
      height: 88px;
      display: inline-block;
      position: relative;
      label {
        font-size: 16px;
        color: #ffffff;
        line-height: 16px;
        vertical-align: middle;
        margin-right: 15px;
      }
      .process-box {
        display: inline-block;
        vertical-align: middle;
        height: 20px;
        background: #404754;
        box-shadow: inset 0 3px 3px 0 rgba(0, 0, 0, 0.5);
        border-radius: 3px;
        position: relative;

        .days {
          width: 150px;
          height: 100%;
          border-right: 1px solid rgba(255, 255, 255, 0.5);
          display: inline-block;
          position: relative;

          font-size: 12px;
          color: #ffffff;
          line-height: 14px;

          &:last-child {
            border: none;
          }

          em {
            font-style: normal;
            position: absolute;
            top: -26px;
            white-space: nowrap;
            right: -70px;
          }

          span {
            position: absolute;
            top: 35px;
            right: -34px;
          }
        }

        div:nth-of-type(3) {
          em {
            left: -35px;
          }
        }

        .starts {
          font-size: 12px;
          color: #ffffff;
          line-height: 14px;

          position: absolute;
          top: 35px;
          left: -34px;
        }
      }

      .process {
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: #2dde4f;
        //background-image: linear-gradient(90deg, #2dde4f 0%, #2dde4f 100%);
        box-shadow: inset 0 3px 3px 0 rgba(255, 255, 255, 0.3);
        border-radius: 3px;
        z-index: 1;

        &.long {
          background-image: linear-gradient(90deg, #2dde4f 0%, #dfa757 100%);
          box-shadow: inset 0 3px 3px 0 rgba(255, 255, 255, 0.3);
        }
        &:hover {
          .process-tips {
            display: block;
          }
        }

        .process-tips {
          display: none;
          padding: 9px 5px;
          height: 30px;
          box-sizing: border-box;
          font-size: 12px;
          color: #fff;
          white-space: nowrap;
          background: #151a1e;
          border-radius: 5px;
          position: absolute;
          top: -40px;
          right: -46px;
          line-height: 12px;
          &:before {
            content: "";
            display: block;
            width: 0;
            height: 0;
            border: 5px solid transparent;
            border-top-color: #151a1e;
            position: absolute;
            bottom: -10px;
            left: 50%;
            margin-left: -5px;
          }
        }
        .process-fff {
          width: 20px;
          height: 20px;
          position: absolute;
          right: -2px;
          top: 1px;
          img {
            width: 100%;
          }
        }
      }
    }
    // timeling-wrapper
    .timeling-wrapper {
      overflow: hidden;
      height: auto;
      margin-top: 100px;
      .first {
        width: 1px;
        height: 100px;
        background: #fff;
        margin: 0 auto;
      }

      .list {
        margin: 0 auto;
        width: 1px;
        position: relative;
        .line {
          height: 100px;
          width: 1px;
          background: #fff;
          position: relative;

          &:after {
            content: "";
            display: block;
            width: 11px;
            height: 11px;
            border-radius: 50%;
            background: #198cee;
            position: absolute;
            left: -5px;
          }
        }

        .infos {
          width: 305px;
          background: #151a1e;
          color: #fff;
          padding: 15px 20px;
          position: absolute;
          left: -331px;
          top: -50%;
          margin-top: 10px;
          box-sizing: border-box;

          &:after {
            width: 0;
            height: 0;
            border: 14px solid transparent;
            border-left-color: #151a1e;
            position: absolute;
            content: "";
            display: block;
            right: -28px;
            top: 50%;
            margin-top: -14px;
          }

          span {
            font-size: 12px;
            color: #ffffff;
          }

          p {
            font-size: 14px;
            color: #ffffff;
          }

          em {
            font-style: normal;
            font-size: 14px;
            color: #ffffff;
          }
        }

        &:nth-of-type(2n-1) {
          .infos {
            right: -331px;
            left: initial;

            &:after {
              border: 14px solid transparent;
              border-right-color: #151a1e;
              left: -28px;
              right: initial;
            }
          }
        }
      }
    }
    .viewmore {
      text-align: center;
      margin-top: 50px;
    }
  }
}
</style>
