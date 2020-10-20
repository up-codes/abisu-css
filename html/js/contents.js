// JavaScript Document

$(function () {
  $('.js-play').click(function () {
    targetArea = $(this).prev();

    if (targetArea.attr("class").match("fead-mv|fead-up|fead-left|fead-right")) {
      targetArea.removeClass("mv");
      setTimeout(function () {
        targetArea.addClass("mv");
      }, 1000);
    } else if (targetArea.find(".anime-cmp01")) {
      targetClass = targetArea.find(".anime-cmp01");
      targetClass.each(function() {
        targetElemnt = $(this);
        targetElemnt.removeClass("active01");
        targetElemnt.removeClass("active02");
      })
      setTimeout(function () {
        targetClass.each(function() {
          targetElemnt = $(this);
          targetElemnt.addClass("active01");
        })
      }, 500);
      setTimeout(function () {
        targetClass.each(function() {
          targetElemnt = $(this);
          targetElemnt.addClass("active02");
        })
      }, 500 + 800);
    }
  });
});
