$(function() {

    var url = window.location.pathname.toLowerCase();

    if ((url.indexOf("/docs/v6/sdk/") === 0) || (url.indexOf("/docs/v6/tools/") === 0)) {

        //通过js移动文档导行到右边索引边栏
        //first level
        $(".api-content ul :first").attr("class", "panel-list  level-two nav");
        $('.api-content ul :first').children().each(function() {
            //li
            //second level
            $(this).children("ul").each(function() {
                //ul
                $(this).attr("class", "panel-list level-three nav");
            });
        });
        var href = url;
        var shref = href.split("/");
        var sdk = shref[shref.length - 1];
        sdk = sdk.substring(0, sdk.length - 5);
        $("#" + sdk).html($('.api-content ul :first'));


        addIndex = function(ul, idx) {
            $(ul).children("li").each(function(i) {
                i = i + 1;
                var ii;
                if (idx) {
                    ii = idx + "." + i++;
                } else {
                    ii = i++;
                }
                var a = $(this).children("a");
                var nhref = a.attr("href");
                nhref = nhref.substring(1);
                var nhtml = $('a[name="' + nhref + '"]').parent().next();
                nhtml.html(ii + "." + a.html());
                a.html(ii + ". " + a.html());
                $(this).children("ul").each(function(o, oo) {
                    addIndex(oo, ii);
                });
            });
        };

        addIndex($("#" + sdk + " ul :first"), "");

        //API具体页标志当前锚点功能
        if ($('body').scrollspy) {
            $('body').scrollspy({
                target: '#' + sdk
            });
        }

    }

    //顶部栏样式
    $('.nav-home a').each(function() {
        var path = url.split('/')[1];
        var href = $(this).attr('href').toLowerCase();
        var pathname = href.split('/')[1];
        if (pathname === path) {
            $(this).addClass('active').siblings().removeClass('active');
        }
    });

    //顶部搜索框
    $('#search').on('focus', function() {
        $(this).attr('placeholder', '');
        $(this).next().removeClass('global_search_default_sprited').addClass('global_search_active_sprited');
    }).on('blur', function() {
        $(this).attr('placeholder', '全站搜索');
        $(this).next().addClass('global_search_default_sprited').removeClass('global_search_active_sprited');
    });

    // 技术支持 模态窗口
    $('.js-initFeedBack').on('click', function() {
        QiniuFeedBack.show();
        return false;
    });


    //给API页面所有图片的父元素添加一个居中类
    $('.api-content img').each(function() {
        $(this).parent().addClass('center');
    })

    // API页固定侧边栏
    $('.container.api .side-bar').hcSticky({
        bottomEnd: -1,
        top: 0,
        followScroll: false
    });

    // API页侧边栏点击a后添加active样式
    $('.nav a').on('click', function() {
        $(this).parents('.nav').find('a').removeClass('active');
        $(this).addClass('active');
    });

    //调整API页面容器高度，若侧边栏超高，则调整.
    function adjustApiBoxHeight() {
        var sidebarHeight = $('.side-bar.pull-left').height();
        var contentHeight = $('.api-content').height();
        if (sidebarHeight > contentHeight) {
            var height = sidebarHeight - 1;
            $('.api-content').height(height);
        }
    }
    adjustApiBoxHeight();

    //API页面侧边栏操作 --  一级导航点击
    $('.panel-default > .panel-heading').on('click', function() {
        var $next = $(this).next('.panel-body');
        var $siblings = $(this).parents('.panel').siblings('.panel');
        if ($next.is(':visible')) {
            $next.hide('fast', adjustApiBoxHeight);
            $(this).find('span.api_down').removeClass('api_down').addClass('api_default');
            $(this).find('a').removeClass('active');
        } else {
            $next.show('fast', function() {
                var scrollTop = $(window).scrollTop() - 70;
                var height = $('.panel-box').height();
                var mainHeight = $('.main').height();
                var dHeight = scrollTop + height - mainHeight;
                if (dHeight > 0) {
                    window.scrollTo($(window).scrollLeft(), $(window).scrollTop() - 1);
                    window.scrollTo($(window).scrollLeft(), $(window).scrollTop() + 1);
                }
                adjustApiBoxHeight();
            });
            $(this).find('span.api_default').removeClass('api_default').addClass('api_down');
            $(this).find('a').addClass('active');
            $siblings.children('.panel-heading').find('.icon').removeClass('api_down').addClass('api_default');
            $siblings.children('.panel-heading').find('a').removeClass('active');
            $siblings.children('.panel-body').hide('fast', adjustApiBoxHeight);
        }
        return false;
    });

    $('.panel-status').each(function() {
        if (!$(this).children().length > 0) {
            $(this).siblings('.panel-heading').find('.off_2').removeClass('off_2').addClass('off_1');
        }
    });

    $('.panel-body .link').on('click', function() {
        var params = url.split('/');
        var path = params[2];
        var fileName = params[params.length - 1];
        var href = $(this).attr('href').toLowerCase();
        if (url !== '/docs/v6/') {
            //api index page jump direct
            if (href.indexOf(path) >= 0 && href.indexOf(fileName) >= 0) {
                var $panelBody = $(this).parents('.panel-heading').siblings('.panel-body');
                if ($panelBody.is(':visible')) {
                    $panelBody.hide('fast', adjustApiBoxHeight);
                    $(this).removeClass('active');
                    if ($(this).siblings('.on_2').length > 0) {
                        $(this).siblings('.on_2').removeClass('on_2').addClass('off_2');
                    } else {
                        $(this).siblings('.on_1').removeClass('on_1').addClass('off_1');
                    }
                } else {
                    $(this).parents('.panel-heading').siblings('.panel-body').show('fast', adjustApiBoxHeight);
                    $(this).addClass('active');
                    $(this).siblings('.off_2').removeClass('off_2').addClass('on_2');
                    if ($(this).siblings('.off_2').length > 0) {
                        $(this).siblings('.off_2').removeClass('off_2').addClass('on_2');
                    } else {
                        $(this).siblings('.off_1').removeClass('off_1').addClass('on_1');
                    }
                }
            }
        }
    });

    //API页面侧边栏---显示当前页的导航
    $('.panel-body a').each(function() {
        var href = $(this).attr('href').toLowerCase();
        if (url === href) {
            $(this).parents('.panel-body').siblings('.panel-heading').click();
            $(this).addClass('active');
            if ($(this).parents('.panel-heading').length > 0) {
                $(this).parents('.panel-heading').siblings('.panel-body').show('fast', adjustApiBoxHeight);
                $(this).siblings('.off_2').removeClass('off_2').addClass('on_2');
                $(this).siblings('.off_1').removeClass('off_1').addClass('on_1');
            } else {
                $(this).parents('.panel-body').show('fast', adjustApiBoxHeight);
                $(this).parents('.panel-body').siblings('.panel-heading').find('.off_2').removeClass('off_2').addClass('on_2');
                $(this).parents('.panel-body').siblings('.panel-heading').find('span:last').addClass('api_down2_sprited');
                $(this).parents('.panel-body').siblings('.panel-heading').find('a').addClass('active');
            }
        }
    });


    // API页高亮代码
    $('pre code').each(function(i, e) {
        hljs.highlightBlock(e);
    });

    // 资源下载页提交社区SDK/插件
    $('.js-add-resource').on('click', function() {
        var title = $.trim($(this).text());
        var type = title === '提交我的插件' ? 'Plugin' : 'SDK';
        DocsAddResource.show(type);
        return false;
    });

    // 资源下载页，社区插件/社区SDK分页插件，暂时未用到 
    // $('.bxslider').bxSlider({
    //     controls: false
    // });
    Q.getTemplate = function(selector) {
        return Q.template.find(selector).clone(true, true);
    };
    Q.modalBinding = function() {
        //自动绑定页面上所有的data-toggle=modal
        $('body').on('click', '[data-toggle="modal"]', function() {
            var self = $(this),
                target = self.attr('data-target') || self.attr('href'),
                content = target ? Q.getTemplate(target).contents() : self.attr('data-content'),
                title = self.attr('data-title'),
                type = self.attr('data-type'),
                style = self.attr('data-style');

            if (content) {
                Q.modal(title, content, type, style).show();
            }

            return false;
        });
    };
    Q.modal = function(content, title, type, remove) {
        var $random = String(Math.random()).substring(2);
        var $id = 'js-modal-' + $random;
        var $jqObject = Q.getTemplate('.js-modal').find('.modal-background').addClass($id).appendTo('body');
        var $modal = {
            0: $jqObject,
            selector: $id,
            beforeOnFuns: [],
            afterOnFuns: [],
            beforeOffFuns: [],
            afterOffFuns: [],
            setTitle: function(title) {
                var originTitle = this[0].find('.box-head').html();
                if (typeof(title) !== 'string') {
                    switch (type) {
                        case 'prompt':
                            title = '请输入';
                            break;
                        case 'confirm':
                            title = '请确认';
                            break;
                        default:
                            title = '提示';
                            break;
                    }
                }
                this[0].find('.box-head').html(title);
                return originTitle;
            },
            setContent: function(content) {
                var originContent = this[0].find('.box-body').children();
                this[0].find('.box-body').html(content);
                return originContent;
            },
            setType: function(type) {
                if (type !== 'base' && type !== 'prompt' && type !== 'alert' && type !== 'confirm') {
                    type = 'standard';
                }
                switch (type) {
                    case 'base':
                        this[0].addClass('base');
                        this[0].find('.box-head, .box-foot').remove();
                        this[0].find('.modal-box').css('padding', '0px');
                        break;
                    case 'prompt':
                        var promptContent = '<p class="js-prompt-modal-tips"></p>' +
                            '<input class="js-prompt-modal-input" type="text" value="' + content + '">' +
                            '<p class="js-prompt-modal-error"></p>';
                        this[0].addClass('prompt');
                        this.setContent(promptContent);
                        this.done = function(func) {
                            if ($.isFunction(func)) {
                                this.beforeOff(function(obj) {
                                    if (obj && obj.hasClass('js-modal-ok')) {
                                        func(this.find('.js-prompt-modal-input').val());
                                    }
                                });
                            }
                            return this;
                        };
                        this.fail = function(func) {
                            if ($.isFunction(func)) {
                                this.beforeOff(function(obj) {
                                    if (!obj || !obj.hasClass('js-modal-ok')) {
                                        func(content);
                                    }
                                });
                            }
                            return this;
                        };
                        break;
                    case 'alert':
                        this[0].addClass('alert');
                        this[0].find('.box-foot .js-modal-cancel').remove();
                        this[0].find('.box-foot .js-modal-ok').addClass('js-modal-close');
                        break;
                    case 'confirm':
                        this[0].addClass('confirm');
                        this.done = function(func) {
                            if ($.isFunction(func)) {
                                this.beforeOff(function(obj) {
                                    if (obj && obj.hasClass('js-modal-ok')) {
                                        func();
                                    }
                                });
                            }
                            return this;
                        };
                        this.fail = function(func) {
                            if ($.isFunction(func)) {
                                this.beforeOff(function(obj) {
                                    if (!obj || !obj.hasClass('js-modal-ok')) {
                                        func();
                                    }
                                });
                            }
                            return this;
                        };
                        break;
                }
                return this;
            },
            setStyle: function(style) {
                if (style !== 'normal' && style !== 'warning' && style !== 'small') {
                    style = 'normal';
                }
                this[0].addClass(style);
                return this;
            },
            setCallBack: function(type, callback, once) {
                if ($.isFunction(callback)) {
                    var callbackObj = {
                        callback: callback,
                        once: once === true ? true : false
                    };
                    this[type + 'Funs'].push(callbackObj);
                }
                return this;
            },
            beforeOn: function(callback, once) {
                return this.setCallBack('beforeOn', callback, once);
            },
            afterOn: function(callback, once) {
                return this.setCallBack('afterOn', callback, once);
            },
            beforeOff: function(callback, once) {
                return this.setCallBack('beforeOff', callback, once);
            },
            afterOff: function(callback, once) {
                return this.setCallBack('afterOff', callback, once);
            },
            find: function(selector) {
                return this[0].find(selector);
            },
            hide: function(obj, remove) {
                var self = this;
                var ret;
                if (remove !== true && remove !== false) {
                    remove = undefined;
                }
                if (obj === true) {
                    remove = obj;
                    obj = undefined;
                }
                for (var f in self.beforeOffFuns) {
                    if (self.beforeOffFuns.hasOwnProperty(f)) {
                        ret = self.beforeOffFuns[f].callback(obj);
                        if (self.beforeOffFuns[f].once) {
                            self.beforeOffFuns.splice(f, 1);
                        }
                    }
                }
                if (ret !== false) {
                    self[0].animate({
                        opacity: 0
                    }, 'fast', function() {
                        self[0].hide();
                        for (var f in self.afterOffFuns) {
                            if (self.afterOffFuns.hasOwnProperty(f)) {
                                ret = self.afterOffFuns[f].callback(obj);
                                if (self.afterOffFuns[f].once) {
                                    self.afterOffFuns.splice(f, 1);
                                }
                            }
                        }
                        if (remove) {
                            self[0].remove();
                            $('body').off('.' + $id);
                            $(window).off('.' + $id);
                        }
                    });
                }
                return self;
            },
            show: function(obj) {
                var self = this;
                var ret;
                for (var f in self.beforeOnFuns) {
                    if (self.beforeOnFuns.hasOwnProperty(f)) {
                        ret = self.beforeOnFuns[f].callback(obj);
                        if (self.beforeOnFuns[f].once) {
                            self.beforeOnFuns.splice(f, 1);
                        }
                    }
                }
                if (ret !== false) {
                    $(window).on('scroll.' + $id + ' resize.' + $id, function() {
                        if ($('body').height() < $(window).height()) {
                            self[0].height($(window).height());
                        } else {
                            self[0].height($('body').height());
                        }
                    });
                    if ($('body').height() < $(window).height()) {
                        self[0].show().height($(window).height());
                    } else {
                        self[0].show().height($('body').height());
                    }
                    self[0].children().css('marginTop', ($(window).height() - self[0].children().outerHeight()) / 2 + $(document).scrollTop() + 'px');
                    self[0].animate({
                        opacity: 1
                    }, 'fast', function() {
                        for (var f in self.afterOnFuns) {
                            if (self.afterOnFuns.hasOwnProperty(f)) {
                                ret = self.afterOnFuns[f].callback(obj);
                                if (self.afterOnFuns[f].once) {
                                    self.afterOnFuns.splice(f, 1);
                                }
                            }
                        }
                    });
                }
                return self;
            },
            init: function() {
                var self = this;
                if (type === true || type === false) {
                    remove = type;
                    type = undefined;
                }
                if (title === true || title === false) {
                    remove = title;
                    title = undefined;
                }
                if (title === 'base' || title === 'alert' || title === 'prompt' || title === 'confirm') {
                    type = title;
                    title = undefined;
                }
                if ((type === 'alert' || type === 'prompt' || type === 'confirm') && remove !== false) {
                    remove = true;
                }

                self.setTitle(title);
                self.setContent(content);
                self.setType(type);
                $('body').on('click.' + $id, '.' + $id + ' .js-modal-close', function() {
                    self.hide($(this), remove);
                });
                $(window).on('keydown.' + $id, function(e) {
                    if (e.keyCode === 27 && self[0].is(':visible')) {
                        self.hide(remove);
                    }
                });
                return self;
            }
        };
        return $modal.init();
    };

    Q.modalBinding();
});
