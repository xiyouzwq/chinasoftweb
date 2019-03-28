var $panelIn = $('#incomeExp #panel-in');
var $panelOut = $('#incomeExp #panel-out');
var $incomeContent = $panelIn.find('table tbody');
var $expcomeContent = $panelOut.find('table tbody');
var baseURL = "https://toycarhotel.duckdns.org:10000";

function addIncomeHTML(income) {
    var textHTML = [];
    if(income) {
        textHTML.push('<tr>');
        textHTML.push('<th>' + income.orderId + '</th>');
        textHTML.push('<th>' + income.orderType + '</th>');
        textHTML.push('<th>' + income.incomePrice + '</th>');
        textHTML.push('<th>' + income.incomeDate + '</th>');
        textHTML.push('</tr>');
        return textHTML.join('');
    }
}
function addExpHTML(exp) {
    var textHTML = [];
    if(exp) {
        textHTML.push('<tr>');
        textHTML.push('<th>' + exp.expId + '</th>');
        textHTML.push('<th>' + exp.expType + '</th>');
        textHTML.push('<th>' + exp.expPrice + '</th>');
        textHTML.push('<th>' + exp.expDate + '</th>');
        textHTML.push('</tr>');
        return textHTML.join('');
    }
}

