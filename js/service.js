var $serviceOrder = $('#panel-service');
var $serviceOrderContent = $serviceOrder.find('table tbody');
var $addServiceBtn = $serviceOrder.find('.seek-box .add-order');
var $addServiceMenu = $serviceOrder.find('.pop-menu.service-add');
var $serviceSearchBtn = $serviceOrder.find('.seek-box .search-order');
var showServiceMenu = false;

$serviceOrderContent.on('click','.delete',function(event) {
    var id = $(this).siblings('.service-id').html();
    var that = this;
    $.get(
        baseURL + '/hotel/serviceOrder/delete',
        {"serviceId":id,"token":token},
        function (result) {
            result = JSON.parse(result);
            if(result.code) {
                $(that).parents('.service-item').remove();
            }
        }
    );
});

$serviceSearchBtn.on('click',function() {
    var orderVal = $serviceOrder.find(".seek-box input").val();
    if(orderVal) {
        $.get(
            baseURL + '/hotel/staff/serviceOrder/findByOrderId',
            {"serviceId":orderVal,"token":token},
            function (result) {
                var allHtml = [];
                result = JSON.parse(result);
                if(result.code) {
                    var temp = [];
                    temp.push(result.data);
                    temp.forEach(element => {
                        allHtml.push(addServiceHTML(element));
                    });
                    $serviceOrderContent.html(allHtml.join(''));
                } else {
                    alert("未找到该订单号的订单");
                }
            }
        );
    }
});

$addServiceBtn.on('click',function() {
    if(showServiceMenu) {
        $addServiceMenu.hide();
        showServiceMenu = false;
    } else {
        $addServiceMenu.show();
        showServiceMenu = true;
    }
});

$addServiceMenu.find('.submit').on('click', function() {
    var user = $addServiceMenu.find('#user-account').val();
    var roomId = $addServiceMenu.find('#service-room-id').val();
    var serviceType = $addServiceMenu.find('#service-type').val();
    var serviceInfo = $addServiceMenu.find('#service-info').val();
    var servicePrice = $addServiceMenu.find('#service-price').val();

    if(user&&roomId&&serviceType&&serviceInfo&&servicePrice) {
        $.get(
            baseURL + '/hotel/serviceOrder/add',
            {'userAccount':user,'roomId':roomId,'serviceType':serviceType,'serviceInfo':serviceInfo,'servicePrice':servicePrice,"token":token},
            function(result) {
                result = JSON.parse(result);
                console.log(result)
                if(result.code) {
                    var item = {};
                    item.serviceId = result.data.serviceId;
                    item.userAccount = result.data.userAccount;
                    item.roomId = result.data.roomId;
                    item.serviceType = result.data.serviceType;
                    item.serviceInfo = result.data.serviceInfo;
                    item.servicePrice = result.data.servicePrice;
                    $serviceOrderContent.prepend(addServiceHTML(item));
                }
            }
        );
    } else {
        alert("用户或房间不存在！");
    }
    $addServiceMenu.hide();
    showServiceMenu = false;
});
$addServiceMenu.find('.cancle').on('click', function() {
    if(showServiceMenu) {
        $addServiceMenu.hide();
        showServiceMenu = false;
    } else {
        $addServiceMenu.show();
        showServiceMenu = true;
    }
});

function addServiceHTML(ele) {
    var textHtml = [];
    if(ele) {
        textHtml.push('<tr class="service-item">');
        textHtml.push('<th class="service-id">' + ele.serviceId + '</th>');
        textHtml.push('<th>' + ele.userAccount + '</th>');
        textHtml.push('<th>' + ele.roomId + '</th>');
        textHtml.push('<th>' + ele.serviceType + '</th>');
        textHtml.push('<th>' + ele.serviceInfo + '</th>');
        textHtml.push('<th>' + ele.servicePrice + '</th>');
        textHtml.push('<th class="delete">删除</th>');
        textHtml.push('</tr>');
        return textHtml.join('');
    }
}