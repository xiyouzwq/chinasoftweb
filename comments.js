var $formComment = $('.panel .form-comment');
var comText = $formComment.find('.f-textarea');
var comBtn = $formComment.find('.f-btn');
var $commentList = $('.panel .section-comment .comment-list');
var comData = [{time: '2018-3-5 12:00',nick:'子墨',comment:'这个酒店不错！'}];

window.onload = function (){
    comData.forEach(function(item) {
        $commentList.prepend(addComment(item));
    });
};

comBtn.on('click',function(event) {
    var str = comText.val();
    if(str) {
        var myCom = {};
        myCom.nick = 'Venki';
        myCom.time = '2019-03-22';
        myCom.comment = str;
        var htmlText = addComment(myCom);
        $commentList.prepend(htmlText);
    }
});

$commentList.on('click','.ft-oper',function(event) {
    $(this).parents('.comment-item').remove();
});

function addComment(cmt) {
    if(cmt) {
        var htmlText = [];
        htmlText.push('<div class="comment-item">');
        htmlText.push('<div class="comment-hd"><span class="item-time">');
        htmlText.push(cmt.time.toString());
        htmlText.push('</span><a class="item-user" href="#">');
        htmlText.push(cmt.nick.toString());
        htmlText.push('</a></div>');
        htmlText.push('<div class="comment-bd"><p>');
        htmlText.push(cmt.comment);
        htmlText.push('</p></div>');
        htmlText.push('<div class="comment-ft"><span class="ft-oper">删除评价</span></div>');
        htmlText.push('</div>');
        return htmlText.join('');
    }
}

