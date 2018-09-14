<template>
    <div class="tutorial-page">
        <!-- 中文版本 -->
        <div v-if="pageNumber==0">            
            <div class="model-wrap">
                <h3>一、登录</h3>
                <p><strong>竞拍域名测试请先登录测试网（请使用PC端登录进行测试，手机端适配完善中。）</strong></p>
                <p>测试网地址：<a href="https://testwallet.nel.group" target="_blank">https://testwallet.nel.group</a></p>
                <p>已有NEO钱包地址可以选择下列3种方式登录：</p>
                <p>1.json文件登录</p>
                <p>2.WIF 登录</p>
                <p>3.NEP2 登录</p>
                <img src="../../../static/img/step1.png" alt="">
                <p>如果没有注册过NEO钱包地址可以选择新建钱包登录</p>
                <img src="../../../static/img/step2.png" alt="">
                <p><span class="ff6-text strong-text">注意：</span>登录之后如果刷新页面需要重新输入钱包密码，所以为保证测试体验，请在域名竞拍测试中减少刷新操作。</p>
            </div>
            <div class="model-wrap">
                <h3>二、竞拍开始之前准备工作</h3>
                <p>1.索取测试网GAS</p>
                <p>点击“索取”按钮，“索取GAS”按钮每天只能点击一次，获取测试GAS数量为10个</p>
                <img src="../../../static/img/step3.png" alt="">
                <p>2.兑换CGas</p>
                <p>在“CGas兑换”页面中使用Gas 1:1 兑换获得CGas</p>
                <p>CGAS是为了方便将GAS用于应用合约中而引入的与GAS 1:1 绑定的NEP5资产。</p>
                <img src="../../../static/img/step4.png" alt="">
                <img src="../../../static/img/step5.png" alt="">
                <p>注意：点击兑换按钮之后，页面反应速度比较慢，这是因为，兑换根据区块高度决定，需要一个区块的出块时间，所以需要一定的等待时间，请耐心等待！可点击右上角小沙漏查看实时操作进度。</p>
                <p>3.充值CGas</p>
                <p>在“竞拍账户”中使用“充值”功能，将您账户中的CGas充值进您的“竞拍账户”用于竞拍。</p>
                <img src="../../../static/img/step6.png" alt="">
                <img src="../../../static/img/step7.png" alt="">
                <img src="../../../static/img/step8.png" alt="">
                <img src="../../../static/img/step9.png" alt="">
            </div>
            <div class="model-wrap">
                <h3>三、开始竞拍</h3>
                <p>目前分为两种竞拍测试方式，.neo测试和.test测试</p>
                <p>.neo模拟真实竞拍，整个流程需要3-5天，用于体验真实竞拍。</p>
                <p>.test测试模拟快速竞拍，整个流程需要15-25分钟，用于快速了解竞拍流程。</p>
                <p>.test竞拍账户和.neo竞拍账户的测试资产是分开的，不可以通用，用户需要根据自己的测试需求选择把测试CGAS充值进.test或.neo账户在进行测试。</p>
                <p>1.开标</p>
                <p>在域名竞拍栏输入您想要竞拍的域名。域名填写规则：6-32个字符，可以是英文小写字母或加数字。不支持中文和大写字母和标点符号。</p>
                <p>系统会自动检测该域名当前的状态，<span class="strong-text">当该域名没有被竞拍或者处于竞拍期间并未结束，</span>那么您可以进行“开标”或者“竞价”来参与该域名的竞拍。</p>
                <img src="../../../static/img/step10.png" alt="">
                <p>2.竞标</p>
                <p>待我的竞拍中出现已开标的域名后点击“竞标”按钮，并填写加价CGAS数量，最小加价数额为0.1CGAS，竞拍至少加价1次</p>
                <img src="../../../static/img/step11.png" alt="">
                <p><strong>竞拍一共分为两个阶段：</strong></p>
                <p>确定期第一阶段为确定期，时长为3天（模拟测试时间共15分钟），这一期间所有的出价都有效。如果确定期最后一天（即第三天）有人出价，则进入两天的随机期，否则竞拍即在确定期结束。</p>
                <p>随机期第二个阶段是竞拍的随机期，最大结束时间为2天（模拟测试时间共10分钟），但此期间任意一个出价都有可能触发该域名竞拍的结束</p>
                <p>因此<strong>越靠后出价越可能触发竞拍结束从而导致该次出价无效</strong>，所以您应当尽早给出您的心理价位。</p>
                <p>这种竞拍方式的最终结果是，如果您觉得没人和您抢拍域名，那么您只需要在开标前两天出价，第三天确定期结束即可获得域名。</p>
                <img src="../../../static/img/step12.png" alt="">
            </div>
            <div class="model-wrap">
                <h3>四、竞拍结束</h3>
                <p>在一个域名的竞拍结束之后，竞拍成功的用户可以在该域名的详情页领取域名</p>
                <img src="../../../static/img/step13.png" alt="">
                <p>而竞拍失败的用户也可以在该域名的详情页领回自己竞拍所花费的SGas（系统会扣除10%的SGas作为手续费）。</p>
                <img src="../../../static/img/step14.png" alt="">
                <img src="../../../static/img/step15.png" alt="">
            </div>    
            <div class="model-wrap">
                <h3>五、域名管理</h3>
                <p>竞拍成功的用户在成功领取域名之后，可以在“我的域名管理”页面对域名进行编辑。</p>
                <img src="../../../static/img/step16.png" alt="">
                <p>首先需要设置地址解析器，在点击“提交”按钮之后等待区块更新即可。</p>
                <img src="../../../static/img/step17.png" alt="">
                <p>成功设置解析器之后，用户便可以对该域名进行地址映射，在地址映射栏输入想要映射的地址，点击“提交”，等待区块更新即可。</p>
                <img src="../../../static/img/step18.png" alt="">
                <img src="../../../static/img/step19.png" alt="">
                <p>好了，可以用域名直接进行转账了！</p>
                <img src="../../../static/img/step19.png" alt="">
            </div> 
            <div class="model-wrap">
                <h3>六、域名有效期及续约</h3>
                <p><strong>域名有效期：</strong>竞拍成功的域名有效期为一年。</p>
                <p><strong>域名续约：</strong>在距离失效的还剩3个月时，域名管理页会有一个即将过期的提示，您可以点击新出现的“续约”按钮来对域名进行一个免费的为期一年的有效期延长。</p>
            </div>  
            <div class="end-model">------结束------</div>
        </div>
        <!-- 英文版本 -->
        <div v-if="pageNumber==1">
            <div class="model-wrap">
                <p>After much development, testing, and preparation, the NEO Name Service TestNet is now ready to accept registrants.</p>
                <h3>Bidding preparation and CGAS</h3>
                <p>To bid on a .neo or .test domain name, first go to <a href="https://testwallet.nel.group" target="_blank">https://testwallet.nel.group</a> and log in by creating a new wallet file, or using an existing wallet. (Please note, the application is running on TestNet. Do not send any MainNet assets to your wallet.)</p>
                <img src="../../../static/img/step-en1.png" alt="">
                <img src="../../../static/img/step-en2.png" alt="">
                <p>You will require CGAS, a NEP-5 token bound to GAS at a ratio of 1:1, to bid on TestNet “.neo” or “.test” domain names. You will be able to request TestNet GAS on the landing page, and are able to claim 10 TestNet GAS at a rate of once per day.</p>
                <img src="../../../static/img/step-en3.png" alt="">
                <p>Once you have collected your 10 TestNet GAS, you will need to convert the GAS to CGAS on the “CGAS Exchange” page.</p>
                <img src="../../../static/img/step-en4.png" alt="">
                <p>Note: After clicking the “Exchange” button, the page might take a while to respond as the exchange is dependent on block height and time. Once the “Exchanging” changes back to “Exchange” on the button in the red box, the CGAS conversion is complete.</p>
                <img src="../../../static/img/step-en5.png" alt="">
                <p>Once the GAS to CGAS conversion has taken place, you must select the “Top Up” function on the “NNS (.test)” page(In this article, we take .test auction as an example, as it takes much shorter time to experience the whole auction process compared with .neo domain auction.) to deposit your newly converted CGAS into “Your Auction Account”. Once this step has been completed, the CGAS can now be used for bidding on domain names.</p>
                <img src="../../../static/img/step-en5-1.png" alt="">
                <img src="../../../static/img/step-en6.png" alt="">
            </div> 
            <div class="model-wrap">
                <h3>Bidding for Domains</h3>
                <p>Currently there are two kinds of domains you can bid for on the TestNet: .neo domains and .test domains.</p>
                <p>The TestNet .neo domain auction simulates the MainNet .neo domain auction, and the entire auction process takes 3–5 days.</p>
                <p>The TestNet .test domain auction is a fast auction. Please note: 5 minutes on the .test domain auction represents 1 day, and the entire process takes 15–25 minutes, so users can quickly experience and understand the whole auction process in a short time.</p>
                <p>The .test auction domain account and the .neo domain auction account are separate and assets in one account cannot be used in another. Users need to deposit the TestNet CGAS into the .test or .neo domain account seperately for testing according to their own testing needs.</p>
                <p>To bid on a domain name, go to the “Neo Name Auction” link and enter the desired domain name. Domain names must be English characters or numbers, and can only be 6 to 32 characters in length. Chinese characters and punctuation are NOT permitted in .neo and .test domain names.</p>
                <p>The NEO Name Service platform will automatically track available domain names. If the requested domain name is available or currently under auction, you can participate in the bidding process through an “Start Auction” or “Join auction.</p>
                <img src="../../../static/img/step-en7.png" alt="">
                <img src="../../../static/img/step-en7-1.png" alt="">
                <p>The participant with the highest bid at the conclusion of an auction will win the domain name. If you need to increase your bid for a domain name during the auction process, you can do so with a minimum of 0.1 CGAS increase at each bid interval.</p>
                <img src="../../../static/img/step-en8.png" alt="">
                <img src="../../../static/img/step-en9.png" alt="">
                <p>There are two rounds of bidding on the NEO Name Service: auction period and overtime bidding.</p>
                <p>The auction period is the first stage of bidding, which is scheduled to take place over three days. If, on the third and final day of bidding, no new bids are made on the .neo domain name, then the auction period ends. This means the participant who places the highest bid during the first two days will receive rights to the domain name.</p>
                <img src="../../../static/img/step-en10.png" alt="">
                <p>However, if a participant places a new high bid on a domain name on the third day, the auction period will go to the second stage: Overtime bidding. The overtime bidding stage has been designed to last for two days, in which case any bid may trigger the end of overtime bidding and render any new bids invalid. The later an individual bids, the more likely it is they will trigger the end of the bidding process. Whoever has the highest bid at the conclusion of the overtime bidding period will receive rights to the domain. (The bid that triggers the end of the overtime bidding period will not count.)</p>
                <p>NEO Name Service advises users to place a bid on their chosen .neo domain name as early as possible, to avoid missing out on rights to the domain.</p>
                <img src="../../../static/img/step-en11.png" alt="">
            </div>
            <div class="model-wrap">
                <h3>Post Auction</h3>
                <p>After an auction has concluded, the winner of the bidding process can claim their domain name on the “My Auction” page.</p>
                <img src="../../../static/img/step-en12.png" alt="">
                <img src="../../../static/img/step-en13.png" alt="">
                <p>If you were not successful in your bid you will be able to reclaim the CGAS used during the auction process, however the NEO Name Service system will collect a 10% service fee.</p>
                <img src="../../../static/img/step-en14.png" alt="">
                <img src="../../../static/img/step-en15.png" alt="">
                <img src="../../../static/img/step-en16.png" alt="">
                <p>Once your domain is claimed, you will be afforded the opportunity to edit your domain name on the “Domain Management” page. However, you will first need to set up an address resolver, and wait for the block update to take place once you’ve clicked the “Confirm” button. Simply put, the address resolver translates your .test domain into a wallet address or public key.</p>
                <img src="../../../static/img/step-en17.png" alt="">
                <p>After the resolver address has been successfully set up, you will be able to perform address mapping of the domain name. Once again, you must wait for the block update after clicking the “Confirm” button.</p>
                <img src="../../../static/img/step-en18.png" alt="">
                <img src="../../../static/img/step-en19.png" alt="">
                <img src="../../../static/img/step-en20.png" alt="">
                <p>Now people can send TestNet GAS to that .neo domain you registered in the our wallet ( Currently only NEL wallet supports NNS, but in future, we will work with most NEO wallets to make NNS integrated into most NEO wallets). </p>
                <img src="../../../static/img/step-en21.png" alt="">
                <img src="../../../static/img/step-en22.png" alt="">
            </div>
            <div class="model-wrap">
                <h3>Domain Validity and Renewal</h3>
                <p>A domain will be valid for one year after the bid has successfully concluded.</p>
                <p>Additionally, domain names will need to be renewed on an annual basis. You will be prompted to renew the domain name three months prior to its expiry date. Additionally, domain names can be renewed under the “Domain Management” page by selecting the “Renew” button for a one-year extension.</p>
            </div>
            <div class="end-model">------End------</div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Tutorial extends Vue {
  pageNumber: number = localStorage.getItem("language") == "cn" ? 0 : 1;
  @Watch("$i18n.locale")
  valueChange(val, oldval) {
    if (val == "cn") {
      this.pageNumber = 0;
    } else {
      this.pageNumber = 1;
    }
  }
}
</script>

<style lang="less" scoped>
.tutorial-page {
  .model-wrap {
    h3 {
      display: block;
      font-size: 20px;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    p {
      margin: 10px 10px;
      text-indent: 2em;
    }
    img {
      display: block;
      width: 900px;
      margin: 0 auto;
      margin-top: 30px;
      margin-bottom: 30px;
    }
    .ff6-text {
      font-size: 14px;
      color: #ff6a6a;
    }
    .strong-text {
      font-weight: 600;
    }
  }
  .end-model {
    text-align: center;
    color: #8f8f94;
    margin-top: 50px;
  }
}
</style>
