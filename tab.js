function Tab(containerId) {
    var container = document.getElementById(containerId);
    this.container = container;
    this.tabItems = container.querySelectorAll('.tab-item');
    this.panels = container.querySelectorAll('.panel');
    this.activeIndex = 0;

    this.active(0);
    this.listenEvents();
}

Tab.prototype.active = function (index) {
    this.tabItems.forEach(function(tabItem, i) {
        var targetId = tabItem.getAttribute('href');
        var targetPanel = this.container.querySelector('#' + targetId);
        if(!targetPanel) return;
        if(index === i) {
            targetPanel.style.display = 'block';
            tabItem.classList.add('active');
            this.activeIndex = i;
        } else {
            targetPanel.style.display = 'none';
            tabItem.classList.remove('active');
        }
    }, this);
}
Tab.prototype.listenEvents = function() {
    var self = this;
    this.container.addEventListener('click', function(e) {
        var target = e.target;
        if(target.className && target.className === 'tab-item') {
            var children = target.parentNode.children;
            var index = -1;
            for(var i = 0; i < children.length; i++) {
                if(children[i] === target) {
                    index = i; break;
                }
            }
            if(index >= 0) {
                self.active(index);
            }
        }     
    }, false);
}
