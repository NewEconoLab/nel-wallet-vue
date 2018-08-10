<template>
  <main-layout>
    <nav class="navbar navbar-wallet">
      <div class="blockheight">
        <div class="container">
          <span>{{$t('operation.welcome')}}</span>
          <span class="fright">{{$t('navbar.blockheight')}}：{{blockheight}}</span>
        </div>
      </div>
      <div class="container">        
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-left">
            <li>
              <v-link ref="balance" href="#balance">
                <span class="icon-png">
                  <img src="../../static/img/balance-s.png" alt="" v-if="balance">
                  <img src="../../static/img/balance-u.png" alt="" v-else>
                </span> 
                {{$t('balance.balance')}}
              </v-link>
            </li>
            <li>
              <v-link ref="transfer" href="#transfer">
                <span class="icon-png">
                  <img src="../../static/img/transfer-s.png" alt="" v-if="transfer">
                  <img src="../../static/img/transfer-u.png" alt="" v-else>
                </span> 
                {{$t('transfer.transfer')}}
              </v-link>
            </li>
            <li>
              <v-link ref="exchange" href="#exchange">
                <span class="icon-png">
                  <img src="../../static/img/exchange-s.png" alt="" v-if="exchange">
                  <img src="../../static/img/exchange-u.png" alt="" v-else>
                </span> 
                {{$t('exchange.title')}}
              </v-link>
            </li>
            <li>
              <v-link ref="nnsneo" href="#nnsneo">
                <span class="icon-png">
                  <img src="../../static/img/nns-s.png" alt="" v-if="nnsneo">
                  <img src="../../static/img/nns-u.png" alt="" v-else>
                </span> 
                {{$t('nns.nns')}}(.neo)
              </v-link>
            </li>
            <li>
              <v-link ref="nns" href="#nns">
                <span class="icon-png">
                  <img src="../../static/img/nns-s.png" alt="" v-if="nns">
                  <img src="../../static/img/nns-u.png" alt="" v-else>
                </span> 
                {{$t('nns.nns')}}(.test)
              </v-link>
            </li>
            <li>
              <v-link ref="setting" href="#settings">
                <span class="icon-png">
                  <img src="../../static/img/settings-s.png" alt="" v-if="setting">
                  <img src="../../static/img/settings-u.png" alt="" v-else>
                </span> 
                {{$t('setting.settings')}}
              </v-link>
            </li>
          </ul>
          <div class="tranhistory-box">
            <div class="tranhistory-img">
              <img src="../../static/img/history.png" alt="" @click="onshowHistory">
            </div>
            <div class="tranhistory-wrap" v-if="showHistory">
              <div class="tranhistory-listbox">
                <div class="tranhistory-title">
                  <div class="tranhistory-close" @click="showHistory=!showHistory">
                    <img src="../../static/img/close.png" alt="">
                  </div>
                  <span>Operation record</span>
                  <div class="tranhistory-tips">Tips : These records will be emptied when you logout or close the page.</div>
                </div>
                <div class="tranhistory-list" v-if="taskList.length != 0">
                  <div v-for="item in taskList" :key="item.tasktype">
                    <div class="th-onelist" v-if="item.tasktype == 0">
                      <div class="th-type">
                        <div class="th-typename">Transfer to</div>
                        <div class="th-other">
                        <div class="th-number">
                          <a class="green-text" :href="item.addrhref" target="_blank">{{item.message.toaddress}}</a>
                          <span>{{item.message.amount}} {{item.message.assetname}}</span>
                        </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="red-text" v-if="item.state==0">Confirmation pending...</span>
                        <span class="th-txid" v-else>Txid: <a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a></span>
                      </div>
                    </div>
                    <div class="th-onelist" v-if="item.tasktype == 1">
                      <div class="th-type">
                        <div class="th-typename">Open auction</div>
                        <div class="th-other">
                          <div class="th-number">
                            <a class="green-text" target="_blank" :href="item.domainhref">{{item.message.domain}}</a>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="red-text" v-if="item.state==0">Confirmation pending...</span>
                        <span class="th-txid" v-else>Txid: <a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a></span>
                      </div>
                    </div>
                    <div class="th-onelist" v-if="item.tasktype == 2">
                      <div class="th-type">
                        <div class="th-typename">Raise bid</div>
                        <div class="th-other">
                          <div class="th-number">
                            <a class="green-text" target="_blank" :href="item.domainhref">{{item.message.domain}}</a>
                            <span>{{item.message.amount}} SGas</span>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="red-text" v-if="item.state==0">Confirmation pending...</span>
                        <span class="th-txid" v-else>Txid: <a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a></span>
                      </div>
                    </div>
                    <div class="th-onelist" v-if="item.tasktype == 3">
                      <div class="th-type">
                        <div class="th-typename">SGas exchange</div>
                        <div class="th-other">
                          <div class="th-number">
                            <span>{{item.message.count}} Gas</span>
                            <img src="../../static/img/arrow.png" alt="">
                            <span>{{item.message.count}} SGas</span>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="red-text" v-if="item.state==0">Confirmation pending...</span>
                        <span class="th-txid" v-else>Txid: <a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a></span>
                      </div>
                    </div>
                    <div class="th-onelist" v-if="item.tasktype == 4">
                      <div class="th-type">
                        <div class="th-typename">SGas exchange</div>
                        <div class="th-other">
                          <div class="th-number">
                            <span>{{item.message.count}} SGas</span>
                            <img src="../../static/img/arrow.png" alt="">
                            <span>{{item.message.count}} Gas</span>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="red-text" v-if="item.state==0">Confirmation pending...</span>
                        <span class="th-txid" v-else>Txid: <a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a></span>
                      </div>
                    </div>
                    <div class="th-onelist" v-if="item.tasktype == 5">
                      <div class="th-type">
                        <div class="th-typename">Top up</div>
                        <div class="th-other">
                          <div class="th-number">
                            <span>{{item.message.amount}} SGas</span>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="red-text" v-if="item.state==0">Confirmation pending...</span>
                        <span class="th-txid" v-else>Txid: <a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a></span>
                      </div>
                    </div>
                    <div class="th-onelist" v-if="item.tasktype == 6">
                      <div class="th-type">
                        <div class="th-typename">Withdraw</div>
                        <div class="th-other">
                          <div class="th-number">
                            <span>{{item.message.amount}}Gas</span>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="red-text" v-if="item.state==0">Confirmation pending...</span>
                        <span class="th-txid" v-else>Txid: <a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a></span>
                      </div>
                    </div>
                    <div class="th-onelist" v-if="item.tasktype == 7">
                      <div class="th-type">
                        <div class="th-typename">Request Gas</div>
                        <div class="th-other">
                          <div class="th-number">
                            <span>{{item.message.amount}} Gas</span>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="red-text" v-if="item.state==0">Confirmation pending...</span>
                        <!-- <span class="th-txid" v-else>Txid: <a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a></span> -->
                      </div>
                    </div>
                    <div class="th-onelist" v-if="item.tasktype == 8">
                      <div class="th-type">
                        <div class="th-typename">Edit domain</div>
                        <div class="th-other">
                          <div class="th-number">
                            <a class="green-text" :href="item.domainhref" target="_blank">{{item.message.domain}}</a>
                            <span>Address mapping: <a class="green-text" :href="item.addrhref" target="_blank">{{item.message.addrmapping}}</a></span>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="red-text" v-if="item.state==0">Confirmation pending...</span>
                        <span class="th-txid" v-else>Txid: <a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a></span>
                      </div>
                    </div>
                    <div class="th-onelist" v-if="item.tasktype == 9">
                      <div class="th-type">
                        <div class="th-typename">Edit domain</div>
                        <div class="th-other">
                          <div class="th-number">
                            <a class="green-text" :href="item.domainhref" target="_blank">{{item.message.domain}}</a>
                            <span>Address resolver: {{item.message.addrresolver}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="red-text" v-if="item.state==0">Confirmation pending...</span>
                        <span class="th-txid" v-else>Txid: <a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a></span>
                      </div>
                    </div>
                    <div class="th-onelist" v-if="item.tasktype == 10">
                      <div class="th-type">
                        <div class="th-typename">Edit domain</div>
                        <div class="th-other">
                          <div class="th-number">
                            <a class="green-text" :href="item.domainhref" target="_blank">{{item.message.domain}}</a>
                            <span>Renewal expiration time</span>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="red-text" v-if="item.state==0">Confirmation pending...</span>
                        <span class="th-txid" v-else>Txid: <a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a></span>
                      </div>
                    </div>
                    <div class="th-onelist" v-if="item.tasktype == 11">
                      <div class="th-type">
                        <div class="th-typename">Get domain</div>
                        <div class="th-other">
                          <div class="th-number">
                            <a class="green-text" :href="item.domainhref" target="_blank">{{item.message.domain}}</a>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="red-text" v-if="item.state==0">Confirmation pending...</span>
                        <span class="th-txid" v-else>Txid: <a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a></span>
                      </div>
                    </div>
                    <div class="th-onelist" v-if="item.tasktype == 12">
                      <div class="th-type">
                        <div class="th-typename">Recover SGas</div>
                        <div class="th-other">
                          <div class="th-number">
                            <a class="green-text" :href="item.domainhref" target="_blank">{{item.message.domain}}</a>
                            <span>{{item.message.amount}} SGas</span>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="red-text" v-if="item.state==0">Confirmation pending...</span>
                        <span class="th-txid" v-else>Txid: <a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a></span>
                      </div>
                    </div>
                    <div class="th-onelist" v-if="item.tasktype == 13">
                        <div class="th-type">
                        <div class="th-typename">Gas claim</div>
                        <div class="th-other">
                          <div class="th-number">
                            <span>{{item.message.amount}} Gas</span>
                          </div>
                        </div>
                      </div>
                      <div class="th-block-txid">
                        <span class="red-text" v-if="item.state==0">Confirmation pending...</span>
                        <span class="th-txid" v-else>Txid: <a class="green-text" :href="item.txidhref" target="_blank">{{item.txid}}</a></span>
                      </div>
                    </div>
                    <!-- <div v-if="item.tasktype == taskNumber"></div> -->
                  </div>
                </div>
                <div class="notask" v-if="taskList.length == 0">There is no data</div>
              </div>
            </div>
            
          </div>
        </div>
        <!--/.nav-collapse -->
      </div>
      <!--/.container -->
    </nav>

    <slot></slot>
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
  padding-top: 51px;
  background-color: #454f60;
}
.navbar-wallet .navbar-collapse {
  padding-top: 30px;
}
.navbar-wallet a {
  font-size: 16px;
  color: #b2b2b2;
  line-height: 16px;
}
.navbar-wallet .active {
  background: #151a1e;
  border-radius: 5px 5px 0px 0px;
}
.navbar-wallet li {
  width: 175px;
  text-align: center;
}
.icon-png img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.tranhistory-box {
  /* border: 1px solid red; */
  width: 16px;
  float: right;
}
.tranhistory-box .tranhistory-img {
  text-align: right;
  margin-top: 15px;
}
.tranhistory-box .tranhistory-img img {
  width: 16px;
  height: 20px;
  cursor: pointer;
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
  max-height: 800px;
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
  font-size: 20px;
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
.red-text {
  font-size: 12px;
  color: #ff6a6a;
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

