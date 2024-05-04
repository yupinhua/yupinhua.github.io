

$(".responsive").slick({
    dots: true,// 預設 false 指示點
    infinite: false,
    speed: 300,
    slidesToShow: 4,//預設  幻燈片顯示幾張
    slidesToScroll: 4,//預設 幻燈片每次滑動幾張
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true// 預設 false 指示點
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
