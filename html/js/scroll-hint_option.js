$(window).on("load", function () {
  if ($(".scrollable").length) {
    if (location.href.indexOf("/admin") == -1) {
      new ScrollHint(".scrollable", {
        scrollHintIconAppendClass: "scroll-hint-icon-black",
        applyToParents: false,
        i18n: {
          scrollable: "スクロールできます",
        },
      });
    }
  }
});