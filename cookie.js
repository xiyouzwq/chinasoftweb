Cookie = {

    /**
    * cookie 设置方法
    * @param {String} name 属性名
    * @param {String} value 属性值
    */
    set: function(name, value, domain) {
        var dom = domain || '';
        document.cookie = encodeURIComponent(name) + '='
                          + encodeURIComponent(value)
                          + '; domain=' + dom
                          + '; path=/';
    },

    /**
    * cookie 获取方法
    * @param {String} name 属性名
    * @return {String} 返回对应的属性值
    */
    get: function(name) {
        var nameStr = name + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(nameStr) == 0) {
                return c.substring(nameStr.length, c.length);
            }
        }
        return "";
    },

    /**
    * cookie 删除方法
    * @param {String} name 属性名
    */
    remove: function(name) {
        document.cookie = encodeURIComponent(name) + '='
        + '' + ';Expires=' + new Date(0);
    }

}