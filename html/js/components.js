$(function() {
  $('.btn-6 a')
    .on('mouseenter', function(e) {
			var parentOffset = $(this).offset(),
      		relX = e.pageX - parentOffset.left,
      		relY = e.pageY - parentOffset.top;
			$(this).find('span').css({top:relY, left:relX})
    })
    .on('mouseout', function(e) {
			var parentOffset = $(this).offset(),
      		relX = e.pageX - parentOffset.left,
      		relY = e.pageY - parentOffset.top;
    	$(this).find('span').css({top:relY, left:relX})
    });
  $('[href=#]').click(function(){return false});
});


// For the spin button
$(document).ready(spinButton);
$(window).resize(spinButton);

// This is just for the Spin Button
// Couldn't find a way with CSS! :-/
function spinButton(){
	$('.spinButton a').each(function(){
        // Find dimensions of button
		var buttonWidth = $(this).width(),
        buttonHeight = $(this).height(),
        // Get value for gradient size
        gradSize = buttonWidth + 100,
        // Get values to vertically center the gradient
				topOffest = (gradSize / 2) - (buttonHeight * 2);
    // Set the size and position of the gradient
    $(this).children('.gradient').width(gradSize).height(gradSize).css({'top': - topOffest});
	});
}


$(window).on('load scroll', function () {
  $(".anime-cmp01").each(function () {
    var ele = $(this);
    var pos = ele.offset().top;
    var scroll = $(window).scrollTop();

    if (scroll > pos) {
      ele.addClass("active01");
      setTimeout(function () {
        ele.addClass("active02");
      }, 800);
    } else if (scroll > pos - window.innerHeight) {
      setTimeout(function () {
        ele.addClass("active01");
      }, 400);
      setTimeout(function () {
        ele.addClass("active02");
      }, 400 + 800);
    }
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
