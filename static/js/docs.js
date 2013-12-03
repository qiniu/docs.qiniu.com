$(function() {

    var url = window.location.pathname.toLowerCase();

    if ((url.indexOf("/docs/sdk/") === 0) || (url.indexOf("/docs/tools/") === 0)) {

        //通过js移动文档导行到右边索引边栏
        //first level
        $(".api-content ul :first").attr("class", "panel-list  level-two nav");
        $('.api-content ul :first').children().each(function() {
            //li
            //second level
            $(this).children("ul").each(function() {
                //ul
                $(this).attr("class", "panel-list level-three nav");
                $(this).children("ul").each(function() {
                    $(this).attr("class", "panel-list level-four nav");
                });
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
                    addIndex(oo, ii)
                });
            });
        }

        addIndex($("#" + sdk + " ul :first"), "")
    }

    //顶部栏样式
    $('.nav-home a').each(function() {
        if ($('.nav-home a').index($(this)) !== 1) {
            //若新手上路链接改为站内链接，此判断可清除
            var path = url.split('/')[1];
            var href = $(this).attr('href').toLowerCase();
            var pathname = href.split('/')[1];
            if (pathname === path) {
                $(this).addClass('active').siblings().removeClass('active');
            }
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


    //调整API页面容器高度，若侧边栏超高，则调整
    function adjustApiBoxHeight() {
        var sidebarHeight = $('.side-bar.pull-left').height();
        var contentHeight = $('.main.pull-right').height();
        var height = sidebarHeight > contentHeight ? sidebarHeight - 1 : contentHeight;
        $('.main.pull-right').height(height);
    };
    adjustApiBoxHeight();
    //API页面侧边栏操作 --  一级导航点击
    $('.panel-default > .panel-heading').on('click', function() {
        var $next = $(this).next('.panel-body');
        var $siblings = $(this).parents('.panel').siblings('.panel');
        if ($next.is(':visible')) {
            $next.slideUp('fast', adjustApiBoxHeight);
            $(this).find('span.api_down_sprited').removeClass('api_down_sprited').addClass('api_default_sprited');
            $(this).find('a').removeClass('active');
        } else {
            $next.slideDown('fast', function() {
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
            $(this).find('span.api_default_sprited').removeClass('api_default_sprited').addClass('api_down_sprited');
            $(this).find('a').addClass('active');
            $siblings.children('.panel-heading').find('.icon').removeClass('api_down_sprited').addClass('api_default_sprited');
            $siblings.children('.panel-heading').find('a').removeClass('active');
            $siblings.children('.panel-body').slideUp(adjustApiBoxHeight);
        }
        return false;
    });

    $('.panel-body .api_down2_sprited').on('click', function() {
        var params = url.split('/');
        var path = params[2];
        var fileName = params[params.length - 1];
        var $link = $(this).siblings('a');
        var href = $link.attr('href').toLowerCase();
        if (href.indexOf(path) >= 0 && href.indexOf(fileName) >= 0) {
            $(this).parents('.panel-heading').siblings('.panel-body').slideUp(adjustApiBoxHeight);
            $link.removeClass('active');
            $link.siblings('.api_selected_sprited').removeClass('api_selected_sprited').addClass('api_unselect_sprited');
            $link.next('.icon').removeClass('api_down2_sprited');
        }
    });

    $('.panel-body .link').on('click', function() {
        var params = url.split('/');
        var path = params[2];
        var fileName = params[params.length - 1];
        var href = $(this).attr('href').toLowerCase();
        if (href.indexOf(path) >= 0 && href.indexOf(fileName) >= 0) {
            var $panelBody = $(this).parents('.panel-heading').siblings('.panel-body');
            if ($panelBody.is(':visible')) {
                $panelBody.slideUp(adjustApiBoxHeight);
                $(this).removeClass('active');
                $(this).siblings('.api_selected_sprited').removeClass('api_selected_sprited').addClass('api_unselect_sprited');
                $(this).next('.icon').removeClass('api_down2_sprited');
            } else {
                $(this).parents('.panel-heading').siblings('.panel-body').slideDown(adjustApiBoxHeight);
                $(this).addClass('active');
                $(this).siblings('.api_unselect_sprited').removeClass('api_unselect_sprited').addClass('api_selected_sprited');
                $(this).next('.icon').addClass('api_down2_sprited');
            }
            return false;
        }
    });
    //API页面侧边栏---显示当前页的导航
    $('.panel-body a').each(function() {
        var href = $(this).attr('href').toLowerCase();
        if (url === href) {
            $(this).parents('.panel-body').siblings('.panel-heading').click();
            $(this).addClass('active');
            if ($(this).parents('.panel-heading').length > 0) {
                $(this).parents('.panel-heading').siblings('.panel-body').slideDown(adjustApiBoxHeight);
                $(this).siblings('.api_unselect_sprited').removeClass('api_unselect_sprited').addClass('api_selected_sprited');
                $(this).next('.icon').addClass('api_down2_sprited');
            } else {
                $(this).parents('.panel-body').show(adjustApiBoxHeight);
                $(this).parents('.panel-body').siblings('.panel-heading').find('.api_unselect_sprited').removeClass('api_unselect_sprited').addClass('api_selected_sprited');
                $(this).parents('.panel-body').siblings('.panel-heading').find('span:last').addClass('api_down2_sprited');
                $(this).parents('.panel-body').siblings('.panel-heading').find('a').addClass('active');
            }
        }
    });

    // API页固定侧边栏
    $('.container.api .side-bar').hcSticky({
        bottomEnd: -1,
        top: 0
    });

    // API页高亮代码
    $('pre code').each(function(i, e) {
        hljs.highlightBlock(e);
    });

    //API具体页标志当前锚点功能
    var targetArr = ['ios-sdk', 'android-sdk', 'java-sdk', 'php-sdk', 'python-sdk', 'ruby-sdk', 'nodejs-sdk', 'csharp-sdk', 'c-sdk', 'go-sdk',
        'qrsync', 'qboxrsctl', 'qrsbox'
    ];
    var target, regx;
    var urlArr = url.split('/');
    for (var i = 0, len = targetArr.length; i < len; i++) {
        regx = new RegExp(targetArr[i]);
        if (regx.test(urlArr[1]) || regx.test(urlArr[urlArr.length - 1])) {
            target = targetArr[i];
            break;
        }
    }
    if ($('body').scrollspy) {
        $('body').scrollspy({
            target: '#' + target
        });
    }

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
});
