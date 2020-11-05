// JavaScript Document

//object-fit　IE対応
$(function () {
  objectFitImages();
});


//fead系
$(window).on('load scroll', function () {
  $(".fead-mv, .fead-up, .fead-left, .fead-right").each(function () {
    var ele = $(this);
    var pos = ele.offset().top;
    var scroll = $(window).scrollTop();

    if (scroll > pos) {
      ele.addClass("mv");
    } else if (scroll > pos - window.innerHeight) {
      setTimeout(function () {
        ele.addClass("mv");
      }, 400);
    }
  });
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
$(window).on('load resize', function () {
  if ($('.gnav').length) {
    var w = window.innerWidth;
    var obj = $('.gnav').offset().top;
    var h = $('.gnav').outerHeight();
    $(window).on('load scroll resize', function () {
      if ($(this).scrollTop() > obj && (w > 1024)) {
        $(".gnav").addClass("fixed");
        $("#wrapper").css('padding-top', h);
      } else {
        $(".gnav").removeClass("fixed");
        $("#wrapper").css('padding-top', 0);
      }
    });
  }
});


//ハンバーガーメニュー
$(function () {
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
  $(".txtc:empty").parents('.txtp').addClass('hidden');
  $(".txtp.hidden").remove();
  if ($(".txtc").children("span").length) {
    $(".txtc").children("span:empty").parents('.txtp').addClass('hidden');
    $(".txtp.hidden").remove();
  }
});


//hoverで画像差し替え
$(function () {
  $('.subimg img').mouseover(function () {
    var selectedSrc = $(this).attr('src').replace(/^(.+)_thumb(\.gif|\.jpg|\.png+)$/, "$1" + "$2");
    $('.image01 img').stop().fadeOut(200,
      function () {
        $('.image01 img').attr('src', selectedSrc);
        $('.image01 img').stop().fadeIn(200);
      }
    );
  });
});


//カテゴリーを分割し、クラスを付与
$(function () {
  $('.split-tag').html(function () {
    return $(this).html().replace(/\n/g, '').split(",").filter(function (x) {
      return x.match(/\S/);
    }).map(function (x) {
      return "<span>" + x + "</span>";
    }).join("");
  });
  $('.split-tag span').each(function () {
    var tagtext = $(this).text();
    $(this).addClass(tagtext);
  });
});


//トグルメニュー
$(function () {
  $(".p-accod").on("click", function () {
    $(this).next().slideToggle();
    $(this).toggleClass("is-parent");
    $(this).next().toggleClass("is-active");
  });
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
      scrollToAnker(hash);
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
