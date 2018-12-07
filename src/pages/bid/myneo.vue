<template>
  <div class="myneo-box">
    <div class="title">
      <span>{{$t('myneoname.myIncome')}}</span>
    </div>
    <div class="form-box">
      <div class="nnc-wrap">
        <strong>
          {{$t('myneoname.unclaimed')}}：
          <span>{{myNNCBalance}}</span>
        </strong>
        <p>{{$t('myneoname.note')}}</p>
      </div>
      <div class="btn-right">
        <button
          class="btn btn-nel btn-bid btn-disable"
          v-if="isCanGetNNC == 2"
        >{{$t('btn.claiming')}}</button>
        <button
          class="btn btn-nel btn-bid"
          @click="toGetMyNNC"
          v-else
          :class="{'btn-disable':isCanGetNNC==0}"
          :disabled="isCanGetNNC==0"
        >{{$t('btn.claim')}}</button>
      </div>
    </div>
    <!-- 域名列表 -->
    <div class="title">
      <span>{{$t('myneoname.title')}}</span>
      <div class="search-domain">
        <div class="seach-box">
          <input
            type="search"
            name
            id
            :placeholder="$t('auction.searchmsg')"
            autocomplete="off"
            v-model="InputDomainName"
            @input="toSearchDomain"
          >
          <img src="../../../static/img/seach.png" alt>
        </div>
        <div class="select-box">
          <label>{{$t('myneoname.status')}}：</label>
          <select class="form-control" @change="selectSellDomain()" v-model="sellStatus">
            <option value="all">{{$t('myneoname.all')}}</option>
            <option value="0901">{{$t('myneoname.selling')}}</option>
            <option value>{{$t('myneoname.unsell')}}</option>
          </select>
        </div>
        <!-- <img src="" alt=""> -->
      </div>
    </div>
    <div class="mydomain-tips">{{$t('myneoname.note2')}}</div>
    <div class="form-box" v-if="neonameList" v-for="(item,index) in showMydomainList" :key="index">
      <div class="neoname">{{item.domain}}</div>
      <div
        class="addr-resolver"
      >( {{$t('myneoname.resolver')}}: {{item.resolver ? item.resolver : $t('myneoname.notconfigure')}} )</div>
      <div
        class="addr-mapping"
        v-if="!item.expired && item.state!='0901'"
      >( {{$t('myneoname.mapping')}}: {{item.resolverAddress ? item.resolverAddress : $t('myneoname.notconfigure')}} )</div>
      <div
        class="addr-mapping"
        v-if="!item.expired && item.state == '0901'"
      >( {{$t('auction.saleprice')}}: {{item.price ? item.price : "0"}} NNC)</div>
      <div class="time-msg" v-if="!item.expired">
        ( {{$t('myneoname.time')}}: {{item.ttl}}
        <span
          class="ff6"
          v-if="!item.expiring"
        >{{$t('myneoname.expiring')}}</span> )
      </div>
      <div class="time-msg" v-if="item.expired">
        ( {{$t('myneoname.time')}}:
        <span class="ff6">{{$t('myneoname.expired')}}</span> )
      </div>
      <div class="btn-right" v-if="!item.expired && item.state!='0901'">
        <button class="btn btn-nel btn-bid" @click="onShowEdit(item)">{{$t('btn.edit')}}</button>
        <!-- <button
          v-if="ownerState===2"
          class="btn btn-nel btn-bid"
          disabled="true"
        >{{$t('myneoname.transferring')}}</button>-->
        <button
          class="btn btn-nel btn-bid"
          @click="showTranferDomain(item)"
        >{{$t('myneoname.transfer')}}</button>
        <button
          class="btn btn-nel btn-bid"
          data-toggle="tooltip"
          data-placement="bottom"
          :title="$t('myneoname.btntip')"
          :class="{'btn-disable':item.resolverAddress}"
          :disabled="!!item.resolverAddress"
          @click="onShowSaleDialog(item)"
        >{{$t('btn.sell')}}</button>
      </div>
      <div class="btn-right" v-if="!item.expired && item.state == '0901'">
        <div class="status-text">{{$t('btn.selling')}}</div>
        <button
          v-if="onUnSaleState == 0"
          class="btn btn-nel btn-bid"
          @click="onShowUnSaleDialog(item)"
        >{{$t('btn.delist')}}</button>
        <button
          v-if="onUnSaleState == 1"
          class="btn btn-nel btn-bid btn-disable"
          disabled
        >{{$t('btn.delisting')}}</button>
      </div>
    </div>
    <div class="mydomain-page">
      <div
        class="page-msg"
        v-if="myDomainListPage"
      >{{$t('page.page')}}{{myDomainListPage.currentPage}}{{$t('page.total1')}}{{myDomainListPage.totalPage}}{{$t('page.total2')}}</div>
      <div
        class="page"
        v-if="myDomainListPage && myDomainListPage.totalCount>myDomainListPage.pageSize"
      >
        <div
          class="page-previous"
          @click="myDomainPrevious"
          :class="{'notallow':(myDomainListPage.currentPage == 1)}"
        >
          <img src="../../../static/img/lefttrangle.svg" alt>
        </div>
        <div style="width:1px;"></div>
        <div
          class="page-next"
          @click="myDomainNext"
          :class="{'notallow':(myDomainListPage.currentPage == myDomainListPage.totalPage)}"
        >
          <img src="../../../static/img/righttrangle.svg" alt>
        </div>
        <input
          type="text"
          v-model="inputMyneoPage"
          class="input-wrapper"
          @input="onInputMyneoPageChange"
          @keydown="onInputMyneoKeyDown"
        >
        <div class="gopage" @click="goMyneoPage">Go</div>
      </div>
    </div>
    <!-- 域名列表 end -->
    <!-- 出售记录 -->
    <div class="title">
      <span>{{$t('myneoname.mysellrecord')}}</span>
      <div class="search-domain">
        <div class="select-box">
          <label>{{$t('myneoname.type')}}：</label>
          <select class="form-control" @change="selectSellOrBuy()" v-model="showListType">
            <option value="sale">{{$t('myneoname.salelist')}}</option>
            <option value="buy">{{$t('myneoname.buylist')}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="form-box">
      <div
        class="sale-list-wraper"
        v-if="saleOutDomainList"
        v-for="(item,index) in saleOutDomainList"
        :key="index"
      >
        <div class="sale-content">
          <div class="sale-domainname">{{item.fullDomain}}</div>
          <p>
            <span class="sale-time">{{$t('myneoname.selltime')}}{{item.blocktime}}</span>
            <span class="sale-price">{{$t('myneoname.sellprice')}}{{item.price}} NNC</span>
          </p>
        </div>
      </div>
      <div
        class="page-msg"
        v-if="salePage"
      >{{$t('page.page')}}{{salePage.currentPage}}{{$t('page.total1')}}{{salePage.totalPage}}{{$t('page.total2')}}</div>
      <div class="page" v-if="salePage && salePage.totalCount>salePage.pageSize">
        <div
          class="page-previous"
          @click="mySaleDomainPrevious"
          :class="{'notallow':(salePage.currentPage == 1)}"
        >
          <img src="../../../static/img/lefttrangle.svg" alt>
        </div>
        <div style="width:1px;"></div>
        <div
          class="page-next"
          @click="mySaleDomainNext"
          :class="{'notallow':(salePage.currentPage == salePage.totalPage)}"
        >
          <img src="../../../static/img/righttrangle.svg" alt>
        </div>
        <input
          type="number"
          class="input-wrapper"
          v-model="inputSalePage"
          @input="onInputSalePageChange"
          @keydown="onInputSaleKeyDown"
        >
        <div class="gopage" @click="goSalePage">Go</div>
      </div>
    </div>
    <!-- 出售记录 end -->
    <!-- 提示弹筐 -->
    <v-toast ref="toast"></v-toast>
    <!-- 域名映射弹筐 -->
    <div class="edit-wrap" v-if="isShowEdit">
      <div class="edit-box">
        <div class="edit-title">{{$t('myneoname.edittitle')}}</div>
        <div class="edit-tips">{{$t('myneoname.tips')}}</div>
        <div class="edit-content">
          <div class="edit-name">{{$t('myneoname.neoname')}}: {{domainInfo.domain}}</div>
          <div class="edit-input">
            <div class="input-msg">
              {{$t('myneoname.resolver')}}:
              <button
                v-if="resolverState==1"
                class="btn btn-nel btn-input-reset"
                @click="resetresolve"
              >{{$t('btn.reset')}}</button>
            </div>
            <div class="input-box">
              <input
                type="text"
                class="readonly-input"
                readonly="readonly"
                v-model="set_contract"
                autocomplete="off"
              >
              <button
                v-if="resolverState==0"
                class="btn btn-nel btn-big"
                @click="setresolve"
              >{{$t('btn.confirm')}}</button>
              <!-- <button v-if="resolverState==1" class="btn btn-nel btn-big " @click="setresolve">{{$t('btn.reset')}}</button> -->
              <button
                v-if="resolverState==2"
                class="btn btn-nel btn-big btn-disable"
                disabled
              >{{$t('btn.confirming')}}</button>
              <!-- <spinner-wrap v-if="resolverState==2"  style="margin-left:20px"></spinner-wrap> -->
              <div class="ok-img" v-if="resolverState==1">
                <img src="../../../static/img/correct.svg" alt>
              </div>
            </div>
          </div>
          <div class="edit-input">
            <div class="input-msg">
              {{$t('myneoname.mapping')}}:
              <button
                v-if="mappingState==1"
                @click="resetmappingData"
                class="btn btn-nel btn-input-reset"
              >{{$t('btn.reset')}}</button>
            </div>
            <div class="input-box">
              <input
                type="text"
                v-model="resolverAddress"
                @input="verifyMapping"
                class
                autocomplete="off"
              >
              <button
                v-if="mappingState==0"
                class="btn btn-nel btn-big"
                @click="mappingData"
                :disabled="resolverState!=1 || !mappingistrue"
                :class="{'btn-disable':resolverState!=1 || !mappingistrue}"
              >{{$t('btn.confirm')}}</button>
              <!-- <button v-if="mappingState==1" class="btn btn-nel btn-big" @click="mappingData">{{$t('btn.reset')}}</button> -->
              <button
                v-if="mappingState==2"
                class="btn btn-nel btn-big btn-disable"
                disabled
              >{{$t('btn.confirming')}}</button>
              <!-- <spinner-wrap v-if="mappingState==2"  style="margin-left:20px"></spinner-wrap> -->
              <!-- 地址格式验证 -->
              <div v-if="mappingState==1" class="ok-img">
                <img src="../../../static/img/correct.svg" alt>
              </div>
            </div>
          </div>
          <!-- <div class="edit-input">
                    <div class="input-msg">
                        {{$t('myneoname.owner')}}:
                    </div>
                    <div class="input-box">
                        <input type="text" v-model="ownerAddress" @input="verifySetOwner" class="" autocomplete="off">
                        <button v-if="ownerState==1" class="btn btn-nel btn-big" @click="setowner">{{$t('btn.setOwner')}}</button>
                        <button v-else-if="ownerState==2"  class="btn btn-nel btn-big btn-disable" disabled>{{$t('btn.settingOwner')}}</button>
                        <button v-else-if="ownerState==3"  class="btn btn-nel btn-big btn-disable" disabled>{{$t('btn.setOwner')}}</button>
          <button  v-if="renewalWatting" class="btn btn-nel btn-big btn-disable" disabled>{{$t('btn.setOwner')}}</button-->
          <!-- <spinner-wrap v-if="renewalWatting"  style="margin-left:20px"></spinner-wrap>
                    </div>
          </div>-->
          <div class="edit-input">
            <div class="input-msg">{{$t('myneoname.time')}}:</div>
            <div class="input-box">
              <input
                type="text"
                class="readonly-input"
                readonly="readonly"
                :value="domainInfo.expired?$t('myneoname.expired'):domainInfo.ttl"
              >
              <button
                v-if="!domainInfo.expired&&!domainInfo.expiring &&!renewalWatting"
                class="btn btn-nel btn-big"
                @click="renewalDomain"
              >{{$t('btn.renewal')}}</button>
              <button
                v-if="(domainInfo.expired||domainInfo.expiring) &&!renewalWatting"
                class="btn btn-nel btn-big btn-disable"
                disabled
              >{{$t('btn.renewal')}}</button>
              <button
                v-if="renewalWatting"
                class="btn btn-nel btn-big btn-disable"
                disabled
              >{{$t('btn.renewaling')}}</button>
              <!-- <spinner-wrap v-if="renewalWatting"  style="margin-left:20px"></spinner-wrap> -->
            </div>
          </div>
        </div>
        <div class="edit-close">
          <span aria-hidden="true" @click="isShowEdit=!isShowEdit">&times;</span>
        </div>
      </div>
    </div>
    <!-- 转让弹筐 -->
    <div class="alert-wrap" id="alertview-domaintranfer" v-if="alertShow">
      <div class="alert-box">
        <div class="alert-title" id="alert-title">{{$t('myneoname.domaintransfer')}}</div>
        <div class="line-wrap">
          <div class="line-msg">{{$t('auction.domain')+" : "+domainInfo.domain}}</div>
          <div class="line-msg">{{$t('myneoname.transferto')+" :"}}</div>
          <div class="line-box" id="alert-box">
            <input
              id="alert-input"
              type="text"
              v-model="ownerAddress"
              @input="verifySetOwner"
              class
              autocomplete="off"
            >
            <p class="alert-address" v-if="domainAddress!=''">
              <img class="transfer-icon" src="../../../static/img/transfer.png" alt>
              <span class="map-address">{{domainAddress}} &nbsp;{{domainExpire}}</span>
            </p>
            <div class="btn-box">
              <button
                v-if="ownerState==1"
                @click="setowner"
                id="alert-confirm"
                class="btn btn-nel btn-big"
              >{{$t('myneoname.transfer')}}</button>
              <button
                v-else-if="ownerState==2"
                id="alert-confirm"
                disabled="true"
                class="btn btn-nel btn-big"
              >{{$t('myneoname.transferring')}}</button>
              <button
                v-else-if="ownerState==3"
                id="alert-confirm"
                disabled="true"
                class="btn btn-nel btn-big btn-disable"
              >{{$t('myneoname.transfer')}}</button>
            </div>
          </div>
          <div class="err-msg" id="alert-error"></div>
        </div>
        <div class="alert-tips"></div>
        <div class="alert-close" id="alert-close" @click="alertShow=false">
          <span aria-hidden="true">&times;</span>
        </div>
      </div>
    </div>
    <!-- 出售弹筐 -->
    <div class="sale-wrapper" v-if="isShowSaleBox">
      <div class="sale-box">
        <div class="sale-title">
          <h4>{{$t('myneoname.domainsell')}}</h4>
          <p>{{$t('myneoname.selltips')}}</p>
        </div>
        <div class="sale-domain">
          <span>{{$t('myneoname.domainname')}}: {{domainInfo.domain}}</span>
        </div>
        <div class="sale-smallbox">
          <div class="smallbox-label">{{$t('myneoname.time')}}:</div>
          <div class="smallbox-div">{{domainInfo.ttl}}</div>
        </div>
        <div class="sale-smallbox">
          <div class="smallbox-label">{{$t('myneoname.setprice')}}（NNC） :</div>
          <div class="smallbox-input">
            <input
              type="number"
              class="sale-input"
              v-model="domainSalePrice"
              @input="verifySalePrice"
            >
            <button
              v-if="onSaleState==0"
              class="btn btn-nel btn-big"
              :class="{'btn-disable':!isOKSale}"
              :disabled="!isOKSale"
              @click="toSaleDomain"
            >{{$t('btn.sell')}}</button>
            <button
              v-if="onSaleState==1"
              class="btn btn-nel btn-big btn-disable"
              disabled
            >{{$t('btn.selling')}}</button>
          </div>
        </div>
        <div class="sale-close">
          <span aria-hidden="true" @click="isShowSaleBox=!isShowSaleBox">&times;</span>
        </div>
      </div>
    </div>
    <!-- 下架弹筐 -->
    <div class="sale-wrapper" v-if="isUnSaleBox">
      <div class="sale-box">
        <div class="unsale-tips">
          <span>{{$t('myneoname.surecheck1')}}{{domainInfo.domain}}{{$t('myneoname.surecheck2')}}</span>
        </div>
        <div class="unsale-btn">
          <button class="btn btn-nel btn-big" @click="toUnSellDomain">{{$t('btn.check')}}</button>
        </div>
        <div class="sale-close">
          <span aria-hidden="true" @click="isUnSaleBox=!isUnSaleBox">&times;</span>
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
  .line-wrap {
    margin-bottom: 0;
    .line-box {
      .alert-address {
        width: 100%;
        display: inline-block;
        .transfer-icon {
          width: 13px;
          height: 13px;
          margin-left: 10px;
          margin-right: 8px;
          vertical-align: middle;
        }
      }
      input {
        width: 100% !important;
      }
      .btn-box {
        text-align: center;
        margin-top: 10px;
      }
    }
  }

  .title {
    .search-domain {
      display: inline-block;
      .seach-box {
        background: none;
        border: 1px solid #ffffff;
        border-radius: 5px;
        display: inline-block;
        width: 230px;
        height: 38px;
        margin-left: 20px;
        position: relative;
        input {
          background: none;
          text-align: left;
          width: 210px;
          &::-webkit-input-placeholder {
            font-size: 14px;
            color: #b2b2b2;
            line-height: 14px;
          }
        }
        img {
          width: 24px;
          height: 24px;
          position: absolute;
          top: 6px;
          right: 6px;
        }
      }
      .select-box {
        margin-left: 20px;
        display: inline-block;
        label {
          margin-right: 10px;
        }
        select {
          width: 80px;
          display: inline-block;
        }
      }
    }
  }
  .btn {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    &.btn-disable {
      background: #77bcf6;
      opacity: 1;
    }
  }
  .btn-bid {
    display: block;
    padding: 0;
    font-size: 18px;
    width: 110px;
    height: 38px;
    // &.btn-disable {
    //   // font-size: 14px;
    //   background: #77bcf6;
    //   opacity: 1;
    // }
  }
  .mydomain-tips {
    font-size: 14px;
    color: #c5c5c5;
    padding: 0 20px 20px 20px;
  }
  .form-box {
    background: #454f60;
    border-radius: 5px;
    padding: 20px 50px 10px 50px;
    font-size: 14px;
    margin-bottom: 20px;
    position: relative;
    .nnc-wrap {
      padding: 15px 0;
      strong {
        font-size: 20px;
        font-weight: 500;
        span {
          font-size: 30px;
        }
      }
      p {
        font-size: 14px;
        color: #c5c5c5;
        margin-top: 20px;
      }
    }
    .neoname {
      font-size: 16px;
      margin-top: 25px;
    }
    .neoname,
    .addr-resolver,
    .addr-mapping {
      margin-bottom: 10px;
    }
    .time-msg {
      margin-bottom: 45px;
    }
    .btn-right {
      position: absolute;
      top: 50%;
      right: 30px;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);
      .status-text {
        font-size: 18px;
        color: #ffffff;
        text-align: center;
        margin-bottom: 30px;
      }
    }
    .sale-list-wraper {
      padding: 10px;
      .sale-content {
        border: 1px solid #b2b2b2;
        border-radius: 5px;
        padding: 15px 15px 10px 15px;
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
        .sale-domainname {
          font-size: 20px;
          font-weight: 500;
          border-bottom: 1px solid #f2f2f2;
          padding-bottom: 15px;
        }
        p {
          font-size: 12px;
          margin-top: 10px;
          color: #fff;
          margin-bottom: 0;
          .sale-time {
            margin-right: 30px;
          }
        }
      }
    }
  }
  .page {
    .page-previous,
    .page-next {
      background: #55637b;
      cursor: pointer;
      &.notallow {
        background: #33393d;
        cursor: not-allowed;
      }
    }
    .input-wrapper {
      width: 50px;
      background: #ffffff;
      border-radius: 5px;
      margin-left: 10px;
      margin-right: 10px;
      padding: 5px;
      height: 38px;
      color: #333;
      font-size: 16px;
    }
    .gopage {
      width: 50px;
      height: 38px;
      line-height: 38px;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
      background: #55637b;
      border-radius: 5px;
      cursor: pointer;
      &.donot {
        background: #33393d;
        cursor: not-allowed;
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
      .edit-tips {
        font-size: 14px;
        color: #c5c5c5;
        margin-top: 20px;
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
  .sale-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    z-index: 1030;
    .sale-box {
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
      .sale-title {
        h4 {
          font-size: 20px;
        }
      }
      .sale-domain {
        font-size: 16px;
        color: #ffffff;
        margin-top: 50px;
      }
      .sale-smallbox {
        margin-top: 50px;
        .smallbox-label {
          margin-bottom: 20px;
          font-size: 16px;
        }
        .smallbox-div {
          width: 68%;
          height: 56px;
          line-height: 56px;
          background: #6d7480;
          border: 1px solid #b2b2b2;
          border-radius: 5px;
          font-size: 16px;
          color: #c5c5c5;
          padding-left: 20px;
        }
        .smallbox-input {
          width: 100%;
          .sale-input {
            width: 68%;
            height: 56px;
            line-height: 56px;
            padding: 10px 15px;
            background: none;
            border: 1px solid #b2b2b2;
            border-radius: 5px;
            font-size: 16px;
            color: #fff;
            display: inline-block;
          }
        }
      }
      .sale-close {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 30px;
        height: 30px;
        font-size: 30px;
      }
      .unsale-tips {
        text-align: center;
        margin-top: 80px;
        margin-bottom: 50px;
        font-size: 16px;
        color: #ffffff;
      }
      .unsale-btn {
        text-align: center;
      }
    }
  }
}
</style>
