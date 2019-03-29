var $room = $('#panel-room');
var $roomContent = $room.find('.room-wrapper .room-list');
var $addRoomBtn = $room.find('.seek-box .add-order');
var $addRoomMenu = $room.find('.pop-menu.room-add');
var $roomSearchBtn = $room.find('.seek-box .search-order');
var showRoomMenu = false;
var $selectedRoom = null;

function addRoomHTML (ele) {
    var textHtml = [];
    if(ele) {
        textHtml.push('<span class=\"room-item state'+ele.roomStatus+'\"');
        textHtml.push('roomId=\"'+ele.roomId+'\"' +'roomStatus=\"'+ele.roomStatus+'\"'+'roomPrice=\"'+ele.roomPrice+'\"' +'>');
        textHtml.push('<h4 class="item-room-id">'+ele.roomId+'</h4>');
        textHtml.push('</span>');
        return textHtml.join('');
    }
}
function selectRoomType (s) {
    if(s===1) return '普通间';
    else if(s===2) return '豪华间';
    else return '其他';
}
function selectRoomStatus (s) {
    if(s===0) return '空闲';
    else if(s===1) return '预定';
    else if(s===2) return '入住';
    else return '维修';
}
function roomMessageHtml (ele) {
    var textHtml = [];
    if(ele) {
        textHtml.push('<div class="pop-menu room-message">');
        textHtml.push('<div class="menu-item"><span>房间号：</span><span>'+ele.roomId+'</span></div>');
        textHtml.push('<div class="menu-item"><span>房间楼层：</span><span>'+ele.roomFloor+'</span></div>');
        textHtml.push('<div class="menu-item"><span>房间类型：</span><span>'+selectRoomType(ele.roomType)+'</span></div>');
        textHtml.push('<div class="menu-item"><span>房间价格：</span><span>'+ele.roomPrice+'</span></div>');
        textHtml.push('<div class="menu-item"><span>房间状态：</span><span>'+selectRoomStatus(ele.roomStatus)+'</span></div>');
        textHtml.push('<div class="menu-item room-time"><span>当前时间段：</span><input class="first-input" value="'+ $room.find(".seek-box .first-input").val() +'\" /><input class="last-input" value="'+$room.find(".seek-box .last-input").val()+'\"/"></div>');
        // textHtml.push('<div class="menu-item"><span>用户账号：</span><input class="user-account" value="'+ Cookie.get('userAccount') +'"/></div>');
        textHtml.push('<div class="menu-item"><span>用户账号：</span><input class="user-account" /></div>');
        textHtml.push('<div class="menu-btn"><span class="submit">订房</span><span class="cancle">取消</span><span class="delete-room">删除房间</span><span>维修房间</span></div>')
        textHtml.push('</div>');
        return textHtml.join("");
    }
}
//渲染空闲房间
function addRoomHTMLNull (ele) {
    var textHtml = [];
    if(ele) {
        textHtml.push('<span class=\"room-item state0\"');
        textHtml.push('roomId=\"'+ele.roomId+'\"' +'roomStatus=\"'+ele.roomStatus+'\"'+'roomPrice=\"'+ele.roomPrice+'\"' +'>');
        textHtml.push('<h4 class="item-room-id">'+ele.roomId+'</h4>');
        textHtml.push('</span>');
        // textHtml.push('<span class=\"room-item state0">');
        // textHtml.push('<h4 class="item-room-id">'+ele.roomId+'</h4>');
        // textHtml.push('</span>');
        return textHtml.join('');
    }
}
$roomContent.on('click','.room-item',function(event) {
    var id = $(this).find('.item-room-id').html();
    $selectedRoom = $(this);
    console.log("room-message");
    if(id) {
        $.get(
            baseURL + '/hotel/room/findById',
            {"roomId":id,"token":token},
            function(result) {
                result = JSON.parse(result);
                if(result.code) {
                    $room.append(roomMessageHtml(result.data));
                    $room.find('.pop-menu.room-message').show();
                }
            }
        )
    }
});
$room.on('click','.pop-menu.room-message .cancle',function(){
    $room.find('.pop-menu.room-message').hide();
});
$room.on('click','.pop-menu.room-message .delete-room',function(){
    var id = $selectedRoom.find('.item-room-id').html();
    console.log(3333333333);
    // var that = this; 
    if(id) {
        $.get(
            baseURL + '/hotel/staff/room/delete',
            {"roomId":id,"token":token},
            function(result) {
                result = JSON.parse(result);
                if(result.code) {
                    $selectedRoom.remove();
                }
            }
        )
    }
    $room.find('.pop-menu.room-message').hide();
});
$room.on('click','.pop-menu.room-message .submit',function(){
    var id = $selectedRoom.attr('roomid');
    var status = $selectedRoom.attr('roomstatus');
    var price = $selectedRoom.attr('roomprice');
    var firstInput = $room.find(".pop-menu.room-message .room-time .first-input").val();
    var lastInput = $room.find(".pop-menu.room-message .room-time .last-input").val();
    var userAccount = $room.find(".pop-menu.room-message .user-account").val();
    console.log('id:'+id+';first:'+firstInput+';last:'+lastInput+'userAccount:'+userAccount);
    if(id&&firstInput&&lastInput&&userAccount) {
        // $.get()
        console.log(444444444);
        console.log(status);
        if(status == 0) {
            $.get(
                baseURL + '/hotel/roomOrder/add',
                {'roomId':id,'start':firstInput,'end':lastInput,'userAccount':userAccount,'orderPrice':price,"token":token},
                function(result) {
                    result = JSON.parse(result);
                    if(result.code == 1) {
                        var item = {};
                        item.roomId = result.data.roomId;
                        item.start = result.data.start;
                        item.end = result.data.end;
                        item.orderPrice = result.data.orderPrice;
                        item.userAccount = result.data.userAccount;
                        item.orderId = result.data.orderId;
                        //这里用到了roomOrder。js
                        $roomOrderContent.prepend(addRoomOderHTML(item));
                    }
                }
            )
            $room.find('.pop-menu.room-message').remove();
            alert('房间订购成功');
        } else {
            alert('房间已占用，不能预定');
        }

    } else {
        alert('预定信息不完善');
    }
});
$addRoomBtn.on('click',function(ele) {
    if(showRoomMenu) {
        $addRoomMenu.hide();
        showRoomMenu = false;
    } else {
        $addRoomMenu.show();
        showRoomMenu = true;
    }
});

$roomSearchBtn.on('click',function(event) {
    var orderVal1 = $room.find(".seek-box .first-input").val();
    var orderVal2 = $room.find(".seek-box .last-input").val();
    console.log(orderVal1&&orderVal2);
    if(orderVal1&&orderVal2) {
        $.get(
            baseURL + '/hotel/room/findByDate',
            {'start': orderVal1,'end': orderVal2,"token":token},
            function(result) {
                var rooms1 = ['<div class="simple-room"><h3>普通房间</h3>'];
                var rooms2 = ['<div class="luxury-room"><h3>豪华房间</h3>'];
                result = JSON.parse(result);
                if(result.code) {
                    result.data.forEach(element => {
                        if(element.roomType === 1) {
                            rooms1.push(addRoomHTMLNull(element));
                        } 
                        if(element.roomType === 2) {
                            rooms2.push(addRoomHTMLNull(element));
                        }
                        roomdata.push(element);
                    });
                    rooms1.push('</div>');
                    rooms2.push('</div>');
                    $roomContent.html(rooms1.join("") + rooms2.join(""));
                }
            }
        );
    } else {
        $.get(
            baseURL + '/hotel/staff/room/findAll',
            {"token":token},
            function(result) {
                var rooms1 = ['<div class="simple-room"><h3>普通房间</h3>'];
                var rooms2 = ['<div class="luxury-room"><h3>豪华房间</h3>'];
                result = JSON.parse(result);
                if(result.code) {
                    result.data.forEach(element => {
                        if(element.roomType === 1) {
                            rooms1.push(addRoomHTML(element));
                        } 
                        if(element.roomType === 2) {
                            rooms2.push(addRoomHTML(element));
                        }
                        roomdata.push(element);
                    });
                    rooms1.push('</div>');
                    rooms2.push('</div>');
                    $roomContent.html(rooms1.join("") + rooms2.join(""));
                }
            }
        );
    }
});

$addRoomMenu.find('.submit').on('click',function(event) {
    var roomId = $addRoomMenu.find('#Croom-id').val();
    var roomFloor = $addRoomMenu.find('#Croom-floor').val();
    var roomType = $addRoomMenu.find('#Croom-type').val();
    var roomPrice = $addRoomMenu.find('#Croom-price').val();
    var roomStatus = $addRoomMenu.find('#Croom-status').val();
    if(roomId&&roomFloor&&roomType&&roomStatus&&roomPrice) {
        var data = {'roomId':roomId,'roomFloor':roomFloor,'roomType':roomType,'roomPrice':roomPrice,'roomStatus':roomStatus,"token":token};
        $.get(
            baseURL + '/hotel/staff/room/add',
            data,
            function(result) {
                result = JSON.parse(result);
                console.log(result);
                if(result.code) {
                    // var item = {};
                    // item.roomId = result.data.roomId;
                    // item.roomFloor = result.data.roomFloor;
                    // item.roomType = result.data.roomType;
                    // item.roomPrice = result.data.roomPrice;
                    // item.roomStatus = result.data.roomStatus;
                    if(data.roomType == 1) {
                        // $roomContent.find('.simple-room').append(addRoomHTML(item));
                        $roomContent.find('.simple-room').append(addRoomHTML(data));
                    } else if(data.roomType == 2) {
                        // $roomContent.find('.luxury-room').append(addRoomHTML(item));
                        $roomContent.find('.luxury-room').append(addRoomHTML(data));
                    } else {
                        // $roomContent.find('.other-room').append(addRoomHTML(item));
                        $roomContent.find('.other-room').append(addRoomHTML(data));
                    }
                }
            }
        )
    }
    $addRoomMenu.hide();
    showRoomMenu = false;
});

$addRoomMenu.find('.cancle').on('click',function(event){
        $addRoomMenu.hide();
        showRoomMenu = false;
});

