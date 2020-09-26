//橋本トリミング 2018

(function ($) {

    $.fn.trimming = function (options) {

        var opts = $.extend({}, $.fn.trimming.defaults, options);
        var element = $(this);
        var photo = element.find("img");
        element.wrapInner('<span class="trimmingInner"></span>');
        var child = element.children(".trimmingInner");　　　　
        child.css({
            'padding-top': opts.height + "%",
            'width': '100%',
            'display': 'block',
            'position': 'relative',
            'overflow': 'hidden',
            '-webkit-box-sizing': 'border-box',
            'box-sizing': 'border-box'
        });

        photo.each(function () {
            var img = new Image();
            img.src = $(this).attr('src');
            var w = img.width;
            var h = img.height;

            if (w > h) {
                $(this).css('cssText', 'height: 105% !important; max-width: none !important; width: auto !important; transform: translateX(-50%); -webkit-transform: translateX(-50%); -ms-transform: translateX(-50%)')
                    .css({
                        'position': 'absolute',
                        'top': '0',
                        'left': '50%'
                    });
            } else if (w == h && opts.height < 100) {
                $(this).css('cssText', 'height: auto !important; max-width: none !important; width: 105% !important; transform: translateX(-50%); -webkit-transform: translateX(-50%); -ms-transform: translateX(-50%)')
                    .css({
                        'position': 'absolute',
                        'top': '0',
                        'left': '50%'
                    });
            } else if (w == h && opts.height > 100) {
                $(this).css('cssText', 'height: 105% !important; max-width: none !important; width: auto !important; transform: translateX(-50%); -webkit-transform: translateX(-50%); -ms-transform: translateX(-50%)')
                    .css({
                        'position': 'absolute',
                        'top': '0',
                        'left': '50%'
                    });
            } else {
                $(this).css('cssText', 'height: auto !important; max-width: none !important; width: 105% !important; transform: translateX(-50%); -webkit-transform: translateX(-50%); -ms-transform: translateX(-50%)')
                    .css({
                        'position': 'absolute',
                        'top': '0',
                        'left': '50%'
                    });
            }
        });
    };

    $.fn.trimming.defaults = {
        height: "100",
    };

}(jQuery));