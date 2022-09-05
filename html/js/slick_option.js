$(function () {
  $("#footer-slider").slick({
    autoplay: true,
    autoplaySpeed: 0,
    speed: 3000,
    cssEase: "linear",
    slidesToShow: 6,
    swipe: false,
    arrows: false,
    pauseOnFocus: false,
    pauseOnHover: false,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 599,
        settings: {
          slidesToShow: 3,
        }
      }
    ]
  });

  $("#info-slider").slick({
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: "120px",
    prevArrow: '<div class="btn-slick btn-back"></div>',
    nextArrow: '<div class="btn-slick btn-next"></div>',
    responsive: [{
        breakpoint: 1024,
        settings: {
          centerPadding: "100px",
        }
      },
      {
        breakpoint: 599,
        settings: {
          centerPadding: "0",
        }
      }
    ]
  });
})