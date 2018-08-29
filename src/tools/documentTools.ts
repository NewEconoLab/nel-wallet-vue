export class ScrollTools
{
    //获取窗口可视范围的高度
    getClientHeight()
    {
        var clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight)
        {
            var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        } else
        {
            var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        return clientHeight;
    }

    //获得窗口滚动条
    getScrollTop()
    {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop)
        {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body)
        {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }

    //获取文档内容实际高度
    getScrollHeight()
    {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }

    //窗口监听 得到当前滚动条距离底部的高度 
    onScroll(call)
    {
        window.onscroll = () =>
        {
            // 窗口可视范围的高度
            let height = this.getClientHeight(),
                // 窗口滚动条高度
                theight = this.getScrollTop(),
                // 窗口可视范围的高度
                rheight = this.getScrollHeight(),
                // 滚动条距离底部的高度
                bheight = rheight - theight - height;
            call(bheight);
        }
    }

}