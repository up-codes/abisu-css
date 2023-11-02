/* version 1.2.0 */

// 見たまま編集画面判定用
var pathname = location.pathname;
var edit_design_check = pathname.search(/\/admin\/pages\/.*\/edit_design/);


//　alt自動挿入(altに入れたいテキストがある時)
$(window).load(function () {
    $(".altlist").each(function () {
        var alt = $(this).find(".alt").text();
        $(this).find("img").attr("alt", alt);
    });
});


// alt自動挿入(altに入れたいテキストがない時)
$(function () {
    $(window).load(function () {
        $(".altlist2").each(function () {
            var alt2 = $(this).find(".alt2").text().trim();
            $(this).find("img").attr("alt", alt2);
        });
    });
});


// 電話番号リンク自動追加
$(function () {
    // ##### 通常版 #####
    // 使い方：<div class="tel">00-0000-0000</div>
    $(".tel").each(function () {
        var tel = $(this),
            html = tel.html(),
            teltext = tel.text(),
            telhalf = halfsize(teltext),
            telnum = telhalf.replace(/[^0-9]/g, "");
        tel.html($("<a>").attr("href", "tel:" + telnum).append(html));
    });

    // ##### 公開ページで電話番号を非表示版 #####
    // 使い方 <div class="tel2"><a href="#"><span class="tel2-num">00-0000-0000</span><img src="./images/hoge.webp" alt=""></a></div>
    if (edit_design_check == -1) {
        $(".tel2").each(function () {
            var teltext = $('.tel2-num', this).text(),
                telhalf = halfsize(teltext),
                telnum = telhalf.replace(/[^0-9]/g, "");
            $('a', this).attr('href', "tel:" + telnum);
            $('.tel2-num', this).remove();
        });
    }

    // 全角を半角にする関数なので触らない
    function halfsize(str) {
        return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
    }
});


// メールリンク自動設定
// 使い方 <div class="mailto">sample@sample.com</div>
$(function () {
    $(".mailto").each(function () {
        var mail = $(this),
            html = mail.html(),
            mailtext = mail.text(),
            mailhalf = halfsize(mailtext),
            mailperse = mailhalf.replace(/[Ａ-Ｚａ-ｚ０-９]/g, "");
        mail.html($("<a>").attr("href", "mailto:" + mailperse).append(html));
    });

    function halfsize(str) {
        return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
    }
});


// URLテキストリンク自動設定
// 使い方 <div class="urlToLink">https://sample.com</div>
$(function () {
    $(".urlToLink").each(function () {
        var link = $(this),
            html = link.html(),
            linktext = link.text(),
            linkhalf = halfsize(linktext),
            linkperse = linkhalf.replace(/[Ａ-Ｚａ-ｚ０-９]/g, "");
        mail.html($("<a>").attr("href", linkperse).append(html));
    });

    function halfsize(str) {
        return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
    }
});


// ヘッダーやナビの固定
if (edit_design_check == -1) {
    $(function () {
        var timer = false;
        $(window).on('load resize', function () {
            if (timer !== false) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                var w = window.innerWidth;

                // ##### 固定する要素などを設定 #####
                var fix_ele = $('header'); // 固定する要素

                var add_ele = $('main'); // 固定時にmarginやpaddingを追加したい要素
                var property = 'padding'; // ↑ に追加するのはmarginかpaddingなのでどっちかを入れる
                var direction = 'top'; // ↑ で追加するmarginやpaddingの向き（上=top 下=bottom）

                var subject = $('body'); // クラス名を追加する要素
                var cls = 'fixed'; // 追加・削除するクラス名

                // 1025px以上の場合にsubjcetにvar clsで指定したクラス名を追加します。
                // 1024px以下の場合はsubjectについてる固定用のクラスを削除します（画面のリサイズ対応です）

                // ここから下は触らなくて大丈夫です
                if (w <= 1024) {
                    subject.removeClass(cls);
                } else if (w >= 1024) {
                    if (fix_ele.length) {
                        var oftop = fix_ele.offset().top;
                        var h = fix_ele.outerHeight();

                        $(window).on('scroll', function () {
                            if ($(this).scrollTop() > oftop) {
                                var h = fix_ele.outerHeight();
                                subject.addClass(cls);
                                add_ele.css(property + '-' + direction, h);
                            } else {
                                subject.removeClass(cls);
                                add_ele.css(property + '-' + direction, 0);
                            }
                        });
                    }
                }
            }, 300);
        });
    });
}


// ハンバーガーボタン
if (edit_design_check == -1) {
    $(function () {
        var target = $('body'); // ハンバーガーボタンをクリック時にクラス名をつけたい要素
        var cls = 'drawer-active'; // ハンバーガーボタンをクリックした時 ↑ につけたいクラス名

        var clk = $('.hamburger, .nav-list li a'); // ハンバーガーボタンとナビ内のリンク（半角カンマで区切る）
        var drawer = $('header'); // ハンバーガーボタンをクリックしたら出てくるドロワーナビの要素

        var overlay = '<div class="overlay"></div>'; // ↑ の兄弟要素として追加するオーバーレイ（触らなくて大丈夫）

        // ここから下は触らなくて大丈夫です
        $(document).ready(function () {
            $(clk).on('click', function () {
                target.toggleClass(cls);
                $('.overlay').remove();
                drawer.after(overlay);
            });
            $(document).on('click', '.overlay', function () {
                target.toggleClass(cls);
            });
        });
    });
}


// スクロールでbodyにクラス名追加と上下判定
if (edit_design_check == -1) {
    $(function () {
        var add_class_target = $('body'); // スクロールした判定になったらクラス名をつけたい要素
        var mv_ele = $('.hero-section-img'); // この要素をスクロール判定の基準にする
        var btn = $('.totop'); // トップに戻るボタンなど固定ボタンをスクロールしたら表示したい時はクラス名を指定する
        var ratio = '2'; // mv_ele に対する割合。例えば 2 なら mv_eleを半分通過したら、という意味。1 ならmv_eleを全部通過したら、になります。

        var startPos = 0;
        var winScrollTop = 0;

        btn.hide(); // スクロールで表示・非表示するボタンがなければコメントアウトする

        $(window).on('load resize', function () {
            var top = $(mv_ele).offset().top;
            var hgt = $(mv_ele).height();
            var btm = (top + hgt) / ratio;

            $(this).scroll(function () {
                // メインビジュアルを半分スクロールしたらbodyにクラス名追加
                scrl = $(this).scrollTop();
                if (btm < scrl) {
                    add_class_target.addClass('scrolled');
                    btn.fadeIn(); // スクロールで表示・非表示するボタンがなければコメントアウトする
                } else {
                    add_class_target.removeClass('scrolled');
                    btn.fadeOut(); // スクロールで表示・非表示するボタンがなければコメントアウトする
                }

                // 上下判定
                winScrollTop = $(this).scrollTop();
                if (winScrollTop >= startPos) {
                    add_class_target.removeClass('rising').addClass('drop');
                } else {
                    add_class_target.removeClass('drop').addClass('rising');
                }
                startPos = winScrollTop;
            });
        });
    });
}


// トップに戻るボタン
if (edit_design_check == -1) {
    $(function () {
        $('.totop').click(function () {
            $("html,body").animate({
                scrollTop: 0
            });
        });
    });
}


//子要素が空なら親要素消す
$(function () {
    if (edit_design_check == -1) {
        $(".js-contp").each(function () {
            var contC = $('.js-contc', this);
            var cont = contC.html();
            var src = $("img", contC).attr("src");
            if (cont == false) {
                $(this).remove();
            } else if ($('img', contC).length && !src) {
                $(this).remove();
            }
        });
    }
});


// コンテンツがなければ見出しごと非表示（rm-childの有無で判定）
if (edit_design_check == -1) {
    $(function () {
        var trgt = $('.rm-parent');
        trgt.each(function () {
            if (!$(this).find('.rm-child').length) {
                $(this).remove();
            }
        });
    });
}


// コンテンツがなければ見出しごと非表示（rm-childの子要素の有無で判定）
if (edit_design_check == -1) {
    $(function () {
        var trgt = $('.rm-parent01');
        trgt.each(function () {
            if (!$(this).find('.rm-child01').html().length) {
                $(this).remove();
            }
        });
    });
}


//hoverで画像差し替え
$(function () {
    $('.js-thumb img').mouseover(function () {
        var selectedSrc = $(this).attr('src').replace(/^(.+)_thumb(\.gif|\.jpg|\.png+)$/, "$1" + "$2");
        $('.js-mainimg img').stop().fadeOut(200,
            function () {
                $('.js-mainimg img').attr('src', selectedSrc);
                $('.js-mainimg img').stop().fadeIn(200);
            }
        );
    });
});


//カテゴリーを分割し、クラスを付与
$(function () {
    $('.js-split-tag').html(function () {
        return $(this).html().replace(/\n/g, '').split(",").filter(function (x) {
            return x.match(/\S/);
        }).map(function (x) {
            return "<span>" + x + "</span>";
        }).join("");
    });
    $('.js-split-tag span').each(function () {
        var tagtext = $(this).text();
        $(this).addClass(tagtext);
    });
});


// アコーディオン
$(function () {
    if (edit_design_check == -1) {
        $(".js-toggle").on("click", function () {
            $(this).next().slideToggle();
            $(this).toggleClass("is-parent");
            $(this).next().toggleClass("is-active");
        });
    }
});


// lightbox
if (edit_design_check == -1) {
    $(function () {
        $(".uk-lb").each(function () {
            var lightBox = $(this).find("img").attr("src");
            var cap = $(this).attr('alt');
            $(this).find("img").attr({
                'data-lightbox-type': 'image',
                'data-uk-lightbox': '{}',
                href: lightBox,
                title: cap
            });
        });
    });
}


// スクロール・ページ内リンク
if (edit_design_check == -1) {
    $(function () {
        var urlHash = location.hash;
        $(".uk-dotnav a").attr("href", "");

        if (urlHash) {
            setTimeout(function () {
                scrollToAnker(urlHash);
            }, 200);
        }

        $('a[href*="#"]').on('click', function () {
            var href = $(this).attr("href");

            if (href.indexOf("#") === 0) {
                if (href === "#" || href === "") {
                    var hash = "html";
                    scrollToAnker(hash);
                    return false;
                } else {
                    var hash = href;
                    scrollToAnker(hash);
                    return false;
                }
            } else if (href.indexOf("/") === 0 && href.indexOf("#") !== 1) {
                var hrefsplit = href.split("#");
                var pagepath = hrefsplit[0];
                var hash = "#" + hrefsplit[1];

                if (pathname.indexOf(pagepath) !== -1) {
                    scrollToAnker(hash);
                    return false;
                }
            }

            // /#hashvalue
            else if (href.indexOf("/") === 0 && href.indexOf("#") === 1) {
                var hrefsplit = href.split("/");
                var hash = hrefsplit[1];

                if (pathname === "/") {
                    scrollToAnker(hash);
                    return false;
                }
            }
        });

        function scrollToAnker(hash) {
            var target = $(hash);
            if (target.length === 0) {
                $('body,html').animate({
                    scrollTop: 0,
                }, 600);
            } else if (target.length) {
                var position = target.offset().top;
                var w = window.innerWidth;
                var header = $('header').outerHeight();

                if (w > 1024) {
                    $('body,html').animate({
                        scrollTop: position - header,
                    }, 600);
                } else if (w <= 1024) {
                    $('body,html').animate({
                        scrollTop: position,
                    }, 600);
                } else {
                    $('body,html').animate({
                        scrollTop: position,
                    }, 600);
                }
            }
        };
    });
}


// fead
if (edit_design_check == -1) {
    $(function () {
        var scroll = $(window).scrollTop();
        var wh = window.innerHeight;
        var delay_time = 300;
        var delay_time_fead_text = 100;
        var delay_time_fead_order = 200;

        setTimeout(function () {

            $("[class*='fead-']").each(function () {
                var ele = $(this);
                var pos = ele.offset().top;
                var flag = true;

                if (ele.hasClass("fead-text")) {
                    var str = ele.text();
                    ele.text("");
                    var ary = [];

                    for (var i = 0; i < str.length; i++) {
                        var create = $("<span></span>", {
                            class: "str",
                            text: str[i],
                        });
                        ary.push(create);
                        ele.append(ary[i]);
                    }
                }

                if (flag) {
                    if (scroll > pos - wh) {

                        if (ele.hasClass("fead-text")) {
                            feadText(ele);
                        } else if (ele.hasClass("fead-order")) {
                            feadOrder(ele);
                        } else {
                            ele.addClass("mv");
                        }

                        flag = false;
                    }
                }

                $(window).scroll(function () {
                    if (flag) {

                        scroll = $(window).scrollTop();

                        if (scroll > pos - wh) {

                            if (ele.hasClass("fead-text")) {
                                feadText(ele);
                            } else if (ele.hasClass("fead-order")) {
                                feadOrder(ele);
                            } else {
                                ele.addClass("mv");
                            }

                            flag = false;
                        }
                    }
                });

                function feadText(ele) {
                    ele.children().each(function (e) {
                        $(this).delay(e * delay_time_fead_text).queue(function () {
                            $(this).addClass("mv");
                        });
                    });
                };

                function feadOrder(ele) {
                    ele.children().each(function (e) {
                        $(this).delay(e * delay_time_fead_order).queue(function () {
                            $(this).addClass('mv');
                        });
                    });
                }

            });

        }, delay_time);
    });

    function feadText(ele) {
        var ele = ele;
        ele.find(".str").each(function (e) {
            $(this).delay(e * 100).queue(function () {
                $(this).addClass("textin");
            });
        });
    };
}