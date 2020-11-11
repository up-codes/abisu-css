$(function () {
  $(".slick01-a").slick({
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
})
