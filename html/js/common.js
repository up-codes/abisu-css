// JavaScript Document

//trimming
$(window).load(function () {
  $(".trimming").trimming({
    height: "100",
  });
  $(".trimming50").trimming({
    height: "50",
  });
});

//alt自動挿入
$(window).load(function () {
  $(".altlist").each(function () {
    var alt = $(this).find(".alt").text();
    $(this).find("img").attr("alt", alt);
  });
});

//alt01
$(window).load(function () {
  $(".altlist01").each(function () {
    var alt = $(this).find(".alt01").text();
    $(this).find("img").attr("alt", alt);
    $(".alt01").hide();
  });
});

//fead-mv
$(window).on('load scroll', function () {
  $(".fead-mv, .fead-up").each(function () {
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

//電話番号リンク自動追加
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
  var w = window.innerWidth;
  var obj = $('#gnav').offset().top;
  var h = $('#gnav').outerHeight();
  $(window).on('load scroll resize', function () {
    if ($(this).scrollTop() > obj && (w > 1024)) {
      $("#gnav").addClass("fixed");
      $("#wrapper").css('padding-top', h);
    } else {
      $("#gnav").removeClass("fixed");
      $("#wrapper").css('padding-top', 0);
    }
  });
});

//ハンバーガーメニュー
$(function () {
  $('.toggle').click(function () {
    $(this).toggleClass('active');
    $("#gnav").toggleClass('action');
    $("body").toggleClass('overlay');
  });

  $('#gnav a').click(function () {
    $(this).toggleClass('active');
    $("#gnav").toggleClass('action');
    $("body").toggleClass('overlay');
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

//hoverで要素差し替え
$(function () {
  $('.subblock').click(function () {
    var img = $("img", this).attr('src').replace(/^(.+)_thumb(\.gif|\.jpg|\.png+)$/, "$1" + "$2");
    var head = $(".head", this).text();
    var txt = $(".txt", this).text();
    $('.mainblock').stop().fadeOut(200,
      function () {
        $('.mainblock img').attr('src', img);
        $(".mainblock .head").stop().text(head);
        $(".mainblock .txt").text(txt);
        $('.mainblock').stop().fadeIn(200);
      }
    );
  });
});

//自動で要素切り替え
$(function () {
  var items = []
  var i = -1;
  $(".subblock").each(function () {
    i++;
    items[i] = {
      imgsrc: "",
      head: "",
      txt: ""
    };
    items[i].imgsrc = $("img", this).attr('src').replace(/^(.+)_thumb(\.gif|\.jpg|\.png+)$/, "$1" + "$2");
    items[i].head = $(".head", this).text();
    items[i].txt = $(".txt", this).text();
  })

  var itemsIndex = 0;
  setInterval(function () {
    itemsIndex++;
    if (itemsIndex == items.length) itemsIndex = 0;
    selectitem = items[itemsIndex];
    $('.mainblock').stop().fadeOut(200,
      function () {
        $('.mainblock img').attr('src', selectitem.imgsrc);
        $(".mainblock .head").stop().text(selectitem.head);
        $(".mainblock .txt").text(selectitem.txt);
        $('.mainblock').stop().fadeIn(200);
      }
    );
  }, 5000);
});

//カテゴリー分割
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

//トグルメニュー
$(function () {
  $(".p-accod").on("click", function () {
    $(this).next().slideToggle();
    $(this).toggleClass("is-parent");
    $(this).next().toggleClass("is-active");
  });

  var w = $(window).width();
  $(".js-toggle").on("click", function () {
    if (w > 599) {
      $(this).toggleClass("is-parent");
      $(this).next().toggleClass("is-active");
    }
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
      var gnav = $('#gnav').outerHeight();
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

//object-fit　IE対応
$(function () {
  objectFitImages();
});

//ヘッダー読み込み
$(function () {
  $(".load-header").load("./_header.html");
});
//フッター読み込み
$(function () {
  $(".load-footer").load("./_footer.html");
});
