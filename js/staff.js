var $staffOrder = $('#panel-staff');
var $staffOrderContent = $staffOrder.find('table tbody');
var $addStaffBtn = $staffOrder.find('.seek-box .add-order');
var $addStaffMenu = $staffOrder.find('.pop-menu.staff-add');
var $staffSearchBtn = $staffOrder.find('.seek-box .search-order');
var showStaffMenu = false;

$staffOrderContent.on('click','.delete',function(event) {
    var id = $(this).siblings('.service-id').html();
    console.log(id);
    var that = this;
    $.get(
        baseURL + '/hotel/staff/delete',
        {"staffAccount":id,"token":token},
        function (result) {
            result = JSON.parse(result);
            if(result.code) {
                $(that).parents('.staff-item').remove();
            }
        }
    );
});

$staffSearchBtn.on('click',function() {
    var orderVal = $staffOrder.find(".seek-box input").val();
    console.log(orderVal);
    // if(orderVal) {
        $.get(
            baseURL + '/hotel/staff/findByStaffAccount',
            {"staffAccount":orderVal,"token":token},
            function (result) {
                var allHtml = [];
                result = JSON.parse(result);
                if(result.code) {
                    var temp = [];
                    temp.push(result.data);
                    temp.forEach(element => {
                        allHtml.push(addStaffHTML(element));
                    });
                    $staffOrderContent.html(allHtml.join(''));
                } else {
                    // alert("未找到该订单号的订单");
                }
            }
        );
    // }
});

$addStaffBtn.on('click',function() {
    if(showStaffMenu) {
        $addStaffMenu.hide();
        showStaffMenu = false;
    } else {
        $addStaffMenu.show();
        showStaffMenu = true;
    }
});

$addStaffMenu.find('.submit').on('click', function() {
    var account = $addStaffMenu.find('#staff-account').val();
    var name = $addStaffMenu.find('#staff-name').val();
    var phone = $addStaffMenu.find('#staff-phone').val();
    var salary = $addStaffMenu.find('#staff-salary').val();
    var permission = $addStaffMenu.find('#staff-permission').val();
    var dept = $addStaffMenu.find('#staff-dept').val();
    var pass = $addStaffMenu.find('#staff-pass').val();

    if(account&&name&&phone&&salary&&permission&&dept&&pass) {
        $.get(
            baseURL + '/hotel/staff/add',
            {'staffAccount':account,'staffName':name,'staffPhone':phone,
                'staffSalary':salary,'staffPermission':permission,
                'staffDept':dept,'staffPass':pass,"token":token},
            function(result) {
                result = JSON.parse(result);
                console.log(result)
                if(result.code) {
                    // var item = {};
                    
                    $staffOrderContent.prepend(addStaffHTML(result.data));
                }
            }
        );
    } else {
        alert("用户或房间不存在！");
    }
    $addStaffMenu.hide();
    showStaffMenu = false;
});
$addStaffMenu.find('.cancle').on('click', function() {
        $addStaffMenu.hide();
        showStaffMenu = false;
});

function addStaffHTML(ele) {
    var textHtml = [];
    if(ele) {
        textHtml.push('<tr class="staff-item">');
        textHtml.push('<th class="service-id">' + ele.staffAccount + '</th>');
        textHtml.push('<th>' + ele.staffName + '</th>');
        textHtml.push('<th>' + ele.staffPhone + '</th>');
        textHtml.push('<th>' + ele.staffDept + '</th>');
        textHtml.push('<th>' + ele.staffSalary + '</th>');
        textHtml.push('<th class="delete">删除</th>');
        textHtml.push('</tr>');
        return textHtml.join('');
    }
}