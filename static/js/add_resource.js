var _IE = (function() {
    var v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');
    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );
    return v > 4 ? v : false;
}());

var DocsAddResource = {
    show: function(type) {
        var l = location.href.split('#')[0];
        this.iframe.attr('src', 'https://portal.qiniu.com/zendesk/docs#' + l);
        this.iframeHide.attr('src', 'https://portal.qiniu.com/zendesk/docs#' + l);
        //this.iframe.attr('src', 'http://192.168.19.63:8000/zendesk/docs?type=' + type + '#' + l);
        //this.iframeHide.attr('src', 'http://192.168.19.63:8000/zendesk/docs?type=' + type + '#' + l);
        //本地测试
        this.obj.fadeIn().removeClass('hide').show();
        return false;
    },
    hide: function() {
        var self = this;
        self.obj.fadeOut().addClass('hide');
    },
    init: function() {
        var self = this;
        self.obj = self.obj || $('<div></div>');
        self.iframe = self.iframe || $('<iframe></iframe>');
        self.iframeHide = self.iframeHide || $('<iframe></iframe>');
        console.log('init');
        self.obj.css({
            'position': 'fixed',
            'left': '0px',
            'top': '0px',
            'width': $(window).width(),
            'height': $(window).height(),
            'z-index': 10000,
            'background': 'rgba(0, 0, 0, 0.2)'
        }).hide().appendTo('body');

        if (_IE) {
            if (_IE <= 8) {
                self.obj.css({
                    'background': 'url(transparent)',
                    'filter': 'progid:DXImageTransform.Microsoft.gradient(enabled=true,startColorstr=#000000,endColorstr=#00000000)'
                });
            }
        }

        self.iframe.attr({
            'allowTransparency': 'true',
            'frameBorder': '0',
            'scrolling': 'no'
        }).css({
            'position': 'absolute',
            'left': '50%',
            'top': '50%',
            'background': 'none',
            'width': '740px',
            'height': '664px',
            'margin-top': '-332px',
            'margin-left': '-370px'
        }).appendTo(self.obj);

        self.iframeHide.attr({
            'id': 'AddDocsResourceHide',
            'name': 'AddDocsResourceHide'
        }).css({
            'width': '10px',
            'height': '10px',
            'opacity': '0'
        }).appendTo(self.obj);

        $(window).on('resize', function() {
            self.obj.width($(window).width());
            self.obj.height($(window).height());
        });
        self.obj.on('click', function() {
            self.hide();
        });
    }
};

if (window.location.hash === '#hide_docs') {
    window.parent.DocsAddResource.hide();
} else {
    DocsAddResource.init();
}
