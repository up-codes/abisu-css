/* version 1.1 */
// JavaScript Document

// 見たまま編集画面判定用
var pathname = location.pathname;
var edit_design_check = pathname.search(/\/admin\/pages\/.*\/edit_design/);


// IE11判別
$(function () {
  if (edit_design_check == -1) {
    var ua = window.navigator.userAgent.toLowerCase();
    var isIE = (ua.indexOf('msie') >= 0 || ua.indexOf('trident') >= 0);
    if (isIE) {
      var array = /(msie|rv:?)\s?([\d\.]+)/.exec(ua);
      var version = (array) ? array[2] : '';
      version = version.split('.')[0];
      if (version === '11') {
        $('body').addClass('ie11');
      }
    }
  }
});

// match height
$(function () {
  if (edit_design_check == -1) {
    $(window).on('load', function () {
      $('.match_01').matchHeight();
      $('.match_02').matchHeight();
      $('.match_03').matchHeight();
    });
  }
});

// fead系
$(function () {
  if (edit_design_check == -1) {

    $("[class*='fead-']").each(function () {

      var scroll = $(window).scrollTop();
      var wh = window.innerHeight;
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
          setTimeout(function () {
            ele.addClass("mv");
          }, 400);
          if (ele.hasClass("fead-text")) {
            feadText(ele);
          }
          if (ele.hasClass("fead-order")) {
            feadOrder(ele);
          }
          flag = false;
        }
      }

      $(window).scroll(function () {
        if (flag) {
          scroll = $(window).scrollTop();
          if (scroll > pos - wh) {
            setTimeout(function () {
              ele.addClass("mv");
            }, 400);
            if (ele.hasClass("fead-text")) {
              feadText(ele);
            }
            if (ele.hasClass("fead-order")) {
              feadOrder(ele);
            }
            flag = false;
          }
        }
      });

      function feadText(ele) {
        var ele = ele;
        ele.find(".str").each(function (e) {
          $(this).delay(e * 100).queue(function () {
            $(this).addClass("textin");
          });
        });
      };

      function feadOrder(ele) {
        ele.children().each(function (e) {
          $(this).delay(200 * e).queue(function () {
            $(this).addClass('mv');
          });
        });
      }

    });
  }
});

//alt自動挿入(altlist)
$(window).load(function () {
  $(".altlist").each(function () {
    var alt = $(this).find(".alt").text();
    $(this).find("img").attr("alt", alt);
  });
});
//altの引用元は非表示にする場合
$(window).load(function () {
  $(".altlist01").each(function () {
    var alt = $(this).find(".alt01").text();
    $(this).find("img").attr("alt", alt);
    $(".alt01").hide();
  });
});


//電話番号リンク自動追加(tel)
$(function () {
  $('.tel').each(function () {
    var tel = $(this);
    var html = tel.html();
    var teltext = tel.text();
    var telnum = teltext.replace(/[^0-9]/g, '');
    tel.html($('<a>').attr('href', 'tel:' + telnum).append(html));
  });
});


//グローバルナビ固定
$(window).on("load", function () {
  if (edit_design_check == -1) {
    if ($(".gnav").length) {
      var w = window.innerWidth;
      var obj = $(".gnav").offset().top;
      var h = $(".gnav").outerHeight();
      $(window).on("load scroll resize", function () {
        if ($(this).scrollTop() > obj && w > 1024) {
          $(".gnav").addClass("fixed");
          $(".wrapper").css("padding-top", h);
        } else {
          $(".gnav").removeClass("fixed");
          $(".wrapper").css("padding-top", 0);
        }
      });
    }
  }
});


//ハンバーガーメニュー
$(function () {
  if (edit_design_check == -1) {
    $('.toggle').click(function () {
      $(this).toggleClass('active');
      $(".gnav").toggleClass('action');
      $("body").toggleClass('overlay');
    });

    $('.gnav a').click(function () {
      $(this).toggleClass('active');
      $(".gnav").toggleClass('action');
      $("body").toggleClass('overlay');
    });
  }
});


//トップへ戻る
$(function () {
  var topBtn = $('.totop');
  topBtn.hide();
  //スクロールが100に達したらボタン表示
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });
  //スクロールしてトップ
  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });
});


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


//hoverで画像差し替え
const ua = navigator.userAgent;
if (ua.indexOf("Trident") !== -1) {
  $(window).load(function () {
    $(".js-thumb img").mouseover(function () {
      var selectedSrc = $(this)
        .attr("src")
        .replace(/^(.+)_thumb(\.gif|\.jpg|\.png+)$/, "$1" + "$2");
      $(".js-mainimg img")
        .stop()
        .fadeOut(50, function () {
          $(".js-mainimg img").css(
            "background-image",
            'url("' + selectedSrc + '")'
          );
          $(".js-mainimg img").stop().fadeIn(200);
        });
    });
    $(".js-thumb li").each(function () {
      var imgsrc = $("img", this).attr("data-ofi-src");
      var result = imgsrc.match("jpg|png|gif");
      if (result != null) {} else {
        $(this).remove();
      }
    });
  });
} else {
  $(window).load(function () {
    $(".js-thumb img").mouseover(function () {
      var selectedSrc = $(this)
        .attr("src")
        .replace(/^(.+)_thumb(\.gif|\.jpg|\.png+)$/, "$1" + "$2");
      $(".js-mainimg img")
        .stop()
        .fadeOut(50, function () {
          $(".js-mainimg img").attr("src", selectedSrc);
          $(".js-mainimg img").stop().fadeIn(200);
        });
    });
  });
}


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


//トグルメニュー
$(function () {
  if (edit_design_check == -1) {
    $(".js-toggle").on("click", function () {
      $(this).next().slideToggle();
      $(this).toggleClass("is-parent");
      $(this).next().toggleClass("is-active");
    });
  }
});



//スクロール・ページ内リンク
$(function () {
  $(".uk-dotnav a").attr("href", "");
  var urlHash = location.hash;
  if (urlHash) {
    $('body,html').css('opacity', '0');
    setTimeout(function () {
      scrollToAnker(urlHash);
    }, 200);
  }

  $('a[href*="#"]').on('click', function () {
    var href = $(this).attr("href");
    if (href.indexOf("#") === 0) { //ただのハッシュ
      var hash = href == "#" || href == "" ? 'html' : href;
      scrollToAnker(hash);
      return false;
    } else if (href.indexOf("/") == 0 && href.indexOf("#") !== 1) { //ページ内ハッシュ
      var hrefsplit = href.split("#");
      var hash = "#" + hrefsplit[1];
      scrollToAnker(hash);
      return false;
    } else { //トップハッシュ
      var hrefsplit = href.split("/");
      var hash = hrefsplit[1];
      scrollToAnker(hash);
      return false;
    }
  });

  function scrollToAnker(hash) {
    var target = $(hash);
    if (!(target.length)) {
      $('body,html').css('opacity', '1');
    } else if (target.length) {
      var position = target.offset().top;
      var w = window.innerWidth;
      var gnav = $('.gnav').outerHeight();
      var header = $('#header').outerHeight();
      if (w > 1024) {
        $('body,html').animate({
          scrollTop: position - gnav - 10,
          opacity: 1
        }, 600);
      } else if (w < 1025) {
        $('body,html').animate({
          scrollTop: position - 10,
          opacity: 1
        }, 600);
      } else {
        $('body,html').animate({
          scrollTop: position - 10,
          opacity: 1
        }, 600);
      }
    }
  };
});


//見たまま編集バリデーション
$(window).load(function () {
  $("[data-element-id]").each(function () {
    var txt = $(this).text();
    if (txt.indexOf("準備中です") !== -1) {
      alert("準備中の箇所があります。");
      return false;
    }
  });
  $("[data-element-id]").each(function () {
    var href = $(this).attr("data-href");
    if (href == '#') {
      alert("リンク未設定箇所があります。");
      return false;
    }
  });
  $("[data-element-id] img").each(function () {
    var alt = $(this).attr("alt");
    if (alt == undefined) {
      $(this).before('<div class="imgalt">Alt：<span class="altcolor">Altタグがありません</span></div>');
    } else if (alt == false) {
      $(this).before('<div class="imgalt">Alt：<span class="altcolor">設定されていません</span></div>');
    } else if (alt) {
      $(this).before('<div class="imgalt">Alt：' + alt + '</div>');
    }
  });
});