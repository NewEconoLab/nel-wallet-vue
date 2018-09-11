<template>
  <main-layout id="wallet">
    <nav class="navbar navbar-wallet">
      <div class="blockheight">
        <div class="container">
          <span>{{$t('navbar.blockheight')}}：{{blockheight}}</span>
          <div class="tranhistory-img fright">
            <img src="../../static/img/history.png" alt="" @click="onshowHistory">
            <div class="add-task" v-if="taskNumber">{{taskNumber>99?99:taskNumber}}<span v-if="taskNumber>99">+</span></div>
          </div>
        </div>
      </div>
      <div class="container">        
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-left">
            <li>
              <router-link :to="{name:'balance'}" :class="{active:isActive('balance')}">
                <span class="icon-png">
                  <img src="../../static/img/balance-s.png" alt="" v-if="isActive('balance')">
                  <img src="../../static/img/balance-u.png" alt="" v-else>
                </span> 
                {{$t('balance.balance')}}
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'transfer'}" :class="{active:isActive('transfer')}">
                <span class="icon-png">
                  <img src="../../static/img/transfer-s.png" alt="" v-if="isActive('transfer')">
                  <img src="../../static/img/transfer-u.png" alt="" v-else>
                </span> 
                {{$t('transfer.transfer')}}
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'exchange'}" :class="{active:isActive('exchange')}">
                <span class="icon-png">
                  <img src="../../static/img/exchange-s.png" alt="" v-if="isActive('exchange')">
                  <img src="../../static/img/exchange-u.png" alt="" v-else>
                </span> 
                {{$t('exchange.title')}}
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'auction'}" :class="{active:isActive('nnsneo')}" >
                <span class="icon-png">
                  <img src="../../static/img/nns-s.png" alt="" v-if="isActive('nnsneo')">
                  <img src="../../static/img/nns-u.png" alt="" v-else>
                </span> 
                {{$t('nns.nns')}}(.neo)
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'auctiontest'}" :class="{active:isActive('nnstest')}">
                <span class="icon-png">
                  <img src="../../static/img/nns-s.png" alt="" v-if="isActive('nnstest')">
                  <img src="../../static/img/nns-u.png" alt="" v-else>
                </span> 
                {{$t('nns.nns')}}(.test)
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'setting'}" :class="{active:isActive('setting')}">
                <span class="icon-png">
                  <img src="../../static/img/settings-s.png" alt="" v-if="isActive('setting')">
                  <img src="../../static/img/settings-u.png" alt="" v-else>
                </span> 
                {{$t('setting.settings')}}
              </router-link>
            </li>
          </ul>
          <div class="tranhistory-box">
            <div class="tranhistory-wrap" v-if="showHistory">
              <div class="tranhistory-listbox">
                <div class="tranhistory-title">
                  <div class="tranhistory-close" @click="showHistory=!showHistory">
                    <img src="../../static/img/close.png" alt="">
                  </div>
                  <span>{{$t('operation.title')}}</span>
                  <div class="tranhistory-tips">{{$t('operation.tips')}}</div>
                </div>
                <div class="tranhistory-list" v-if="taskList.length != 0">
                  <div class="th-onelist" v-for="item in taskList" :key="item.tasktype">
                    <div v-if="item.tasktype == 0">
                      <div class="th-type">
                        <div class="th-typename">{{$t('operation.transfer')}}</div>
                        <div class="th-other">
                          <div class="th-number">
                            <a class="green-text" :href="item.addrhref" target="_blank">{{item.message.toaddress}}</a>
                            <span>{{item.message.amount}} {{item.message.assetname}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="th-txid" style="padding-right:10px"> 
                        {{$t('operation.txid')}}<a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a>
                        </span>
                          <span class="red-text" v-if="item.state==0">{{$t('operation.waiting')}} {{item.pendingText}}</span>
                          <span class="th-txid" v-if="item.state==1"></span>
                          <span class="red-text" v-if="item.state==2">{{$t('operation.fail')}}</span>
                        </div>
                      </div>
                    <div v-if="item.tasktype == 1">
                      <div class="th-type">
                        <div class="th-typename">{{$t('operation.openauction')}}</div>
                        <div class="th-other">
                          <div class="th-number">
                            <a class="green-text" target="_blank" :href="item.domainhref">{{item.message.domain}}</a>
                          </div> 
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="th-txid" style="padding-right:10px"> 
                        {{$t('operation.txid')}}<a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a>
                        </span>
                        <span class="red-text" v-if="item.state==0">{{$t('operation.waiting')}} {{item.pendingText}} </span>
                        <span class="th-txid" v-if="item.state==1"></span>
                        <span class="red-text" v-if="item.state==2">{{$t('operation.fail')}}</span>
                      </div>
                    </div>
                    <div v-if="item.tasktype == 2">
                      <div class="th-type">
                        <div class="th-typename">{{$t('operation.raisebid')}}</div>
                        <div class="th-other">
                          <div class="th-number">
                            <a class="green-text" target="_blank" :href="item.domainhref">{{item.message.domain}}</a>
                            <span>{{item.message.amount}} CGAS</span>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="th-txid" style="padding-right:10px"> 
                        {{$t('operation.txid')}}<a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a>
                        </span>
                        <span class="red-text" v-if="item.state==0">{{$t('operation.waiting')}} {{item.pendingText}} </span>
                        <span class="th-txid" v-if="item.state==1"></span>
                        <span class="red-text" v-if="item.state==2">{{$t('operation.fail')}}</span>
                      </div>
                    </div>
                    <div v-if="item.tasktype == 3">
                      <div class="th-type">
                        <div class="th-typename">{{$t('operation.exchange')}}</div>
                        <div class="th-other">
                          <div class="th-number">
                            <span>{{item.message.count}} Gas</span>
                            <img src="../../static/img/arrow.png" alt="">
                            <span>{{item.message.count}} CGAS</span>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="th-txid" style="padding-right:10px"> 
                        {{$t('operation.txid')}}<a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a>
                        </span>
                        <span class="red-text" v-if="item.state==0">{{$t('operation.waiting')}} {{item.pendingText}} </span>
                        <span class="th-txid" v-if="item.state==1"></span>
                        <span class="red-text" v-if="item.state==2">{{$t('operation.fail')}}</span>
                      </div>
                    </div>
                    <div v-if="item.tasktype == 4">
                      <div class="th-type">
                        <div class="th-typename">{{$t('operation.exchange')}}</div>
                        <div class="th-other">
                          <div class="th-number">
                            <span>{{item.message.count}} CGAS</span>
                            <img src="../../static/img/arrow.png" alt="">
                            <span>{{item.message.count}} Gas</span>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="th-txid" style="padding-right:10px"> 
                        {{$t('operation.txid')}}<a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a>
                        </span>
                        <span class="red-text" v-if="item.state==0">{{$t('operation.waiting')}} {{item.pendingText}} </span>
                        <span class="th-txid" v-if="item.state==1"></span>
                        <span class="red-text" v-if="item.state==2">{{$t('operation.fail')}}</span>
                      </div>
                    </div>
                    <div v-if="item.tasktype == 5">
                      <div class="th-type">
                        <div class="th-typename">{{$t('operation.topup')}}</div>
                        <div class="th-other">
                          <div class="th-number">
                            <span>{{item.message.amount}} CGAS</span>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="th-txid" style="padding-right:10px"> 
                        {{$t('operation.txid')}}<a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a>
                        </span>
                        <span class="red-text" v-if="item.state==0">{{$t('operation.waiting')}} {{item.pendingText}} </span>
                        <span class="th-txid" v-if="item.state==1"></span>
                        <span class="red-text" v-if="item.state==2">{{$t('operation.fail')}}</span>
                      </div>
                    </div>
                    <div v-if="item.tasktype == 6">
                      <div class="th-type">
                        <div class="th-typename">{{$t('operation.withdraw')}}</div>
                        <div class="th-other">
                          <div class="th-number">
                            <span>{{item.message.amount}}Gas</span>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="th-txid" style="padding-right:10px"> 
                        {{$t('operation.txid')}}<a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a>
                        </span>
                        <span class="red-text" v-if="item.state==0">{{$t('operation.waiting')}} {{item.pendingText}} </span>
                        <span class="th-txid" v-if="item.state==1"></span>
                        <span class="red-text" v-if="item.state==2">{{$t('operation.fail')}}</span>
                      </div>
                    </div>
                    <div v-if="item.tasktype == 7">
                      <div class="th-type">
                        <div class="th-typename">{{$t('operation.requestgas')}}</div>
                        <div class="th-other">
                          <div class="th-number">
                            <span>{{item.message.amount}} Gas</span>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="red-text" v-if="item.state==0">{{$t('operation.waitinggas')}} {{item.pendingText}} </span>
                        <span class="green-text" v-if="item.state==1">{{$t('operation.sentok')}}</span>
                        <span class="red-text" v-if="item.state==2">{{$t('operation.fail')}}</span>
                      </div>
                    </div>
                    <div v-if="item.tasktype == 8">
                      <div class="th-type">
                        <div class="th-typename">{{$t('operation.editdomain')}}</div>
                        <div class="th-other">
                          <div class="th-number">
                            <a class="green-text" :href="item.domainhref" target="_blank">{{item.message.domain}}</a>
                            <span>{{$t('operation.addrmapping')}} <a class="green-text" :href="item.addrhref" target="_blank">{{item.message.address}}</a></span>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="th-txid" style="padding-right:10px"> 
                        {{$t('operation.txid')}}<a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a>
                        </span>
                        <span class="red-text" v-if="item.state==0">{{$t('operation.waiting')}} {{item.pendingText}} </span>
                        <span class="th-txid" v-if="item.state==1"></span>
                        <span class="red-text" v-if="item.state==2">{{$t('operation.fail')}}</span>
                      </div>
                    </div>
                    <div v-if="item.tasktype == 9">
                      <div class="th-type">
                        <div class="th-typename">{{$t('operation.editdomain')}}</div>
                        <div class="th-other">
                          <div class="th-number">
                            <a class="green-text" :href="item.domainhref" target="_blank">{{item.message.domain}}</a>
                            <span>{{$t('operation.addrresolver')}} {{item.resolver}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="th-txid" style="padding-right:10px"> 
                        {{$t('operation.txid')}}<a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a>
                        </span>
                        <span class="red-text" v-if="item.state==0">{{$t('operation.waiting')}} {{item.pendingText}} </span>
                        <span class="th-txid" v-if="item.state==1"></span>
                        <span class="red-text" v-if="item.state==2">{{$t('operation.fail')}}</span>
                      </div>
                    </div>
                    <div v-if="item.tasktype == 10">
                      <div class="th-type">
                        <div class="th-typename">{{$t('operation.editdomain')}}</div>
                        <div class="th-other">
                          <div class="th-number">
                            <a class="green-text" :href="item.domainhref" target="_blank">{{item.message.domain}}</a>
                            <span>{{$t('operation.renew')}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="th-txid" style="padding-right:10px"> 
                        {{$t('operation.txid')}}<a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a>
                        </span>
                        <span class="red-text" v-if="item.state==0">{{$t('operation.waiting')}} {{item.pendingText}} </span>
                        <span class="th-txid" v-if="item.state==1"></span>
                        <span class="red-text" v-if="item.state==2">{{$t('operation.fail')}}</span>
                      </div>
                    </div>
                    <div v-if="item.tasktype == 11">
                      <div class="th-type">
                        <div class="th-typename">{{$t('operation.getdomain')}}</div>
                        <div class="th-other">
                          <div class="th-number">
                            <a class="green-text" :href="item.domainhref" target="_blank">{{item.message.domain}}</a>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="th-txid" style="padding-right:10px"> 
                        {{$t('operation.txid')}}<a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a>
                        </span>
                        <span class="red-text" v-if="item.state==0">{{$t('operation.waiting')}} {{item.pendingText}} </span>
                        <span class="th-txid" v-if="item.state==1"></span>
                        <span class="red-text" v-if="item.state==2">{{$t('operation.fail')}}</span>
                      </div>
                    </div>
                    <div v-if="item.tasktype == 12">
                      <div class="th-type">
                        <div class="th-typename">{{$t('operation.recover')}}</div>
                        <div class="th-other">
                          <div class="th-number">
                            <a class="green-text" :href="item.domainhref" target="_blank">{{item.message.domain}}</a>
                            <span>{{item.message.amount}} CGAS</span>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="th-txid" style="padding-right:10px"> 
                        {{$t('operation.txid')}}<a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a>
                        </span>
                        <span class="red-text" v-if="item.state==0">{{$t('operation.waiting')}} {{item.pendingText}} </span>
                        <span class="th-txid" v-if="item.state==1"></span>
                        <span class="red-text" v-if="item.state==2">{{$t('operation.fail')}}</span>
                      </div>
                    </div>
                    <div v-if="item.tasktype == 13">
                        <div class="th-type">
                        <div class="th-typename">{{$t('operation.gasclaim')}}</div>
                        <div class="th-other">
                          <div class="th-number">
                            <span>{{item.message.amount}} Gas</span>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="th-txid" style="padding-right:10px"> 
                        {{$t('operation.txid')}}<a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a>
                        </span>
                        <span class="red-text" v-if="item.state==0">{{$t('operation.waiting')}} {{item.pendingText}} </span>
                        <span class="th-txid" v-if="item.state==1"></span>
                        <span class="red-text" v-if="item.state==2">{{$t('operation.fail')}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="notask" v-if="taskList.length == 0">{{$t('operation.nodata')}}</div>
              </div>
            </div>            
          </div>
        </div>
        <!--/.nav-collapse -->
      </div>
      <!--/.container -->
    </nav>
    <div class="wallet-content">
      <router-view></router-view>
    </div>    
  </main-layout>
</template>

<script lang="ts" src="./wallet.ts">
</script>
<style>
.container {
  padding-left: 0px;
  padding-right: 0px;
}
.container #navbar {
  padding-left: 0px;
  padding-right: 0px;
}
.navbar {
  border: none;
}
.navbar-wallet {
  position: fixed;
  z-index: 10;
  width: 100%;
  padding-top: 51px;
  background-color: #454f60;
}
.navbar-wallet .navbar-collapse {
  padding-top: 5px;
}
.navbar-wallet a {
  font-size: 16px;
  color: #b2b2b2;
  line-height: 16px;
}
.navbar-wallet .active {
  color: #fff;
  background: #151a1e;
  border-radius: 5px 5px 0px 0px;
}
.navbar-wallet li {
  width: 180px;
  text-align: center;
}
.icon-png img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.wallet-content {
  padding-top: 185px;
}
@media screen and (max-width: 1024px) {
  .wallet-content {
    padding-top: 235px;
  }
}
.tranhistory-img {
  text-align: right;
  position: relative;
}
.tranhistory-img img {
  width: 16px;
  height: 20px;
  cursor: pointer;
}
.tranhistory-box {
  width: 16px;
  float: right;
}

.add-task {
  position: absolute;
  top: -10px;
  left: 10px;
  width: auto;
  padding: 0 5px 0 5px;
  height: 16px;
  border-radius: 33px;
  background: #fe5656;
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 16px;
}

.tranhistory-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.tranhistory-listbox {
  background: #151a1e;
  /* padding: 25px 70px 25px 40px; */
  box-shadow: -2px 2px 10px 0 #1f1f1f;
  color: #fff;
  position: absolute;
  right: 0;
  top: 124px;
  z-index: 2;
  opacity: 1;
  width: 640px;
  max-height: 500px;
  overflow-y: auto;
}
.tranhistory-title {
  position: fixed;
  top: 124px;
  right: 0;
  width: 640px;
  padding: 25px 40px;
  border-bottom: 1px solid #454f60;
  background: #151a1e;
  box-shadow: -2px 2px 10px 0 #1f1f1f;
}
.tranhistory-tips {
  font-size: 14px;
  color: #c5c5c5;
  margin-top: 10px;
}
.tranhistory-close {
  position: absolute;
  top: 20px;
  right: 60px;
  width: 16px;
  height: 16px;
  cursor: pointer;
  z-index: 2;
}
.tranhistory-close img {
  width: 100%;
}
.tranhistory-list {
  padding-top: 100px;
}
.notask {
  padding: 118px 0 20px;
  text-align: center;
  font-size: 16px;
}
.th-onelist {
  padding: 30px;
  border-bottom: 1px solid #454f60;
}
.th-onelist:last-child {
  border-bottom: none;
}
.th-type {
  margin-bottom: 15px;
}
.th-typename {
  display: inline-block;
  width: 140px;
  padding: 5px 0;
  border-radius: 68px;
  background: #454f60;
  text-align: center;
  font-size: 14px;
  margin-right: 40px;
}
.th-other {
  display: inline-block;
  font-size: 14px;
  vertical-align: middle;
}
a.green-text {
  color: #19e045;
}
.green-text {
  color: #19e045;
}
.red-text {
  font-size: 12px;
  color: #ff6a6a;
  position: relative;
  left: 46px;
}
.th-number a {
  display: block;
  font-size: 14px;
}
.th-number img {
  width: 15px;
  margin-left: 10px;
  margin-right: 10px;
}
.th-block-txid {
  font-size: 12px;
}
.th-block-txid .th-block {
  border-right: 1px solid #fff;
  padding-right: 10px;
  margin-right: 10px;
}
.th-txid a {
  font-size: 12px;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #f5f5f5;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #bdbdbd;
}
/*滑块效果*/
::-webkit-scrollbar-thumb:hover {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.4);
}
/*IE滚动条颜色*/
html {
  scrollbar-face-color: #bfbfbf; /*滚动条颜色*/
  scrollbar-highlight-color: #000;
  scrollbar-3dlight-color: #000;
  scrollbar-darkshadow-color: #000;
  scrollbar-shadow-color: #adadad; /*滑块边色*/
  scrollbar-arrow-color: rgba(0, 0, 0, 0.4); /*箭头颜色*/
  scrollbar-track-color: #eeeeee; /*背景颜色*/
}
</style>

