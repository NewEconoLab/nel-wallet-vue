<template>
    <div class="tutorial-page">
        <div class="model-wrap">
            <h3>一、登录</h3>
            <p><strong>竞拍域名测试请先登录测试网（请使用PC端登录进行测试，手机端适配完善中。）</strong></p>
            <p>测试网地址：<a href="https://testwallet.nel.group">https://testwallet.nel.group</a></p>
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
    </div>
</template>
<style lang="less" scoped>
.tutorial-page {
  .model-wrap {
    p {
      margin: 10px 10px;
    }
    img {
      display: block;
      width: 900px;
      margin: 0 auto;
    }
    .ff6-text {
      font-size: 14px;
      color: #ff6a6a;
    }
    .strong-text {
      font-weight: 600;
    }
  }
}
</style>
