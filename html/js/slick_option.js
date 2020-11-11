$(function () {
  $(".slick01").slick({
    slidesToShow: 5,
    dots: true,
    prevArrow: '<i class="btn-slick btn-back fas fa-chevron-left"></i>',
    nextArrow: '<i class="btn-slick btn-next fas fa-chevron-right"></i>',
    responsive: [
      {
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
  $(".slick02").slick({
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    speed: 8000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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
  $(".slick03").slick({
    centerMode: true,
    centerPadding: '20%',
    slidesToShow: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: '40px',
        }
      },
      {
        breakpoint: 599,
        settings: {
          centerPadding: '40px',
        }
      }
    ]
  });
})
