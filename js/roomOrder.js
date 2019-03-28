var $roomOrder = $('#panel-roomOrder');
var $roomOrderContent = $roomOrder.find('table tbody');
var $searchBtn = $roomOrder.find('.seek-box .search-order');
var $addBtn = $roomOrder.find('.seek-box .add-order');
var $addMenu = $roomOrder.find('.pop-menu.room-add');
var $modifyMenu = $roomOrder.find('.pop-menu.room-modify');
var showMenu = false;
var showModifyMenu = false;

$searchBtn.on('click',function(event) {
    var orderVal = $roomOrder.find(".seek-box input").val();
    if(orderVal) {
        $.get(
            baseURL + '/hotel/roomOrder/findById',
            {"orderId":orderVal,"token":token},
            function (result) {
                var allHtml = [];
                result = JSON.parse(result);
                if(result.code) {
                    var temp = [];
                    temp.push(result.data);
                    temp.forEach(element => {
                        allHtml.push(addRoomOderHTML(element));
                    });
                    $roomOrderContent.html(allHtml.join(''));
                } else {
                    alert("未找到该订单号的订单");
                }
            }
        );
    }
});
$roomOrderContent.on('click','.delete',function(event){
    var id = $(this).siblings('.service-id').html();
    console.log(id);
    var that = this;
    $.get(
        baseURL + '/hotel/roomOrder/delete',
        {"orderId":id,"token":token},
        function (result) {
            result = JSON.parse(result);
            if(result.code) {
                $(that).parents('.order-item').remove();
            }
        }
    );
});
$addMenu.find('.submit').on('click',function(event) {
    var roomNum = $addMenu.find('#room-num').val();
    var roomPrice = $addMenu.find('#room-price').val();
    var roomStart = $addMenu.find('#room-start').val();
    var roomEnd = $addMenu.find('#room-end').val();
    var roomPerson = $addMenu.find('#room-person').val();
    if(roomNum&&roomStart&&roomEnd&&roomPerson&&roomPrice) {
        $.get(
            baseURL + '/hotel/roomOrder/add',
            {'roomId':roomNum,'start':roomStart,'end':roomEnd,'userAccount':roomPerson,'orderPrice':roomPrice,"token":token},
            function(result) {
                result = JSON.parse(result);
                console.log(result);
                if(result.code) {
                    var item = {};
                    item.roomId = result.data.roomId;
                    item.start = result.data.start;
                    item.end = result.data.end;
                    item.orderPrice = result.data.orderPrice;
                    item.userAccount = result.data.userAccount;
                    item.orderId = result.data.orderId;
                    $roomOrderContent.prepend(addRoomOderHTML(item));
                }
            }
        )
    }
    $addMenu.hide();
    showMenu = false;
});

$addMenu.find('.cancle').on('click',function(event){
    if(showMenu) {
        $addMenu.hide();
        showMenu = false;
    } else {
        $addMenu.show();
        showMenu = true;
    }
});

$addBtn.on('click',function(event) {
    if(showMenu) {
        $addMenu.hide();
        showMenu = false;
    } else {
        $addMenu.show();
        showMenu = true;
    }
});

function addRoomOderHTML(ele) {
    var textHtml = [];
    if(ele) {
        textHtml.push('<tr class="order-item">');
        textHtml.push('<th class="service-id">' + ele.orderId + '</th>');
        textHtml.push('<th>' + ele.roomId + '</th>');
        textHtml.push('<th>' + ele.orderPrice + '</th>');
        textHtml.push('<th>' + ele.userAccount + '</th>');
        textHtml.push('<th>' + ele.start + '</th>');
        textHtml.push('<th>' + ele.end + '</th>');
        textHtml.push('<th class="delete">删除</th>');
        textHtml.push('</tr>');
        return textHtml.join('');
    }
}
