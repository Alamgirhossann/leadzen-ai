(function ($) {
  "use strict";

 /*  Preloader */
$(window).on('load',function(){
  var preLoder = $(".preloader");
  preLoder.fadeOut(1000);
   
}); 
/*  Fixed Header*/
 $(window).scroll(function() {
        if ($(this).scrollTop() > 90) {
            $(".header-area").addClass("sticky");
        } else {
            $(".header-area").removeClass("sticky");
        }
});
/*  Slider*/
$("form").on("change", ".file-upload-field", function(){ 
  $(this).parent(".file-upload-wrapper").attr("data-text",$(this).val().replace(/.*(\/|\\)/, '') );
});
/*  Slider*/
 $('.feature-slider').slick({
  slidesToShow: 4,
  arrows: true,
  dots: false,
  responsive: [ 
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3
      }
     },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 567,
      settings: {
        slidesToShow: 1
      }
    }
  ]
});
$('.related-slider').slick({
  slidesToShow: 4,
  arrows: true,
  dots: false,
  responsive: [ 
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2
      }
     },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 567,
      settings: {
        slidesToShow: 1
      }
    }
  ]
});
$('.user-promote-slider').slick({
  slidesToShow: 5,
  arrows: true,
  dots: false, 
  responsive: [ 
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 4 
      }
     },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3
      }
     },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2
      }
     },
    {
      breakpoint: 540, 
      settings: {
        slidesToShow: 1 
      }
    }
  ]
});
/*  Mean Menu */
  $('.overview-mega-menu').meanmenu({     
    meanScreenWidth: "991",
    meanMenuContainer: '.overview-mega-container',  
    meanMenuOpen: "<span></span><span></span><span></span>",
    meanMenuClose: "<span></span><span></span><span></span>",
    siteLogo: "<span class='mean-logo'>Overview</span>", 
  });
/*  Aos  */ 
AOS.init({
  offset: 120,
  delay: 10, 
  duration: 1000,
  easing: 'ease', 
  once: true, 
  mirror: false, 
  anchorPlacement: 'top-bottom', 
}); 

/*  Select Option  */
$('.location-select').select2({ 
  placeholder: "Search for the city, state, country",  
  allowClear: false, 
  minimumResultsForSearch: -1,  
}); 
$('.select-option').select2({
  allowClear: true,    
}); 
$('.select-multiple').select2({
  placeholder: "Search Company name or website", 
  allowClear: true, 
});
$('#jobs-select').bsMultiSelect({
    placeholder: 'Search Your Job', 
  });       
  /*  Shorten more  */  
  $('.news-view-more').shorten(
    {
      showChars: 1000,    
      more: 'View More',  
      ellipses:'',  
      less: 'Less More',    
    }
);  
  $('.view-more').shorten(
    {
      showChars: 100,     
      more: 'View More',
      ellipses:'', 
      less: 'Less More',   
    }
); 
  /*  infiniteScroll scroll  */
  $('.infiniteScroll-container').infiniteScroll({
    // options
    path: function() {
      // no value returned after 4th loaded page
      if ( this.loadCount < 4 ) { 
        let nextIndex = this.loadCount + 2;
        return `news/blog-p${nextIndex}.html`;
      }
    }, 
    append: '.post',
    checkLastPage: false, 
    scrollThreshold: 100, 
    history: false,
  });
// Dropzone Js
var dropzone = new Dropzone('#mydrop', {
  parallelUploads: 2,
  thumbnailHeight: 120,
  thumbnailWidth: 120,
  maxFilesize: 3,
  filesizeBase: 1000,
  thumbnail: function(file, dataUrl) { 
    if (file.previewElement) {
      file.previewElement.classList.remove("dz-file-preview");
      var images = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
      for (var i = 0; i < images.length; i++) {
        var thumbnailElement = images[i];
        thumbnailElement.alt = file.name;
        thumbnailElement.src = dataUrl;
      }
      setTimeout(function() { file.previewElement.classList.add("dz-image-preview"); }, 1);
    }
  }
});

  /*  Checkbox Selection  */
$(".selection-all").on("click",function(){
  $("input[type='checkbox']").prop("checked",$(this).prop("checked"));
});
  /*  Hide Element  */
$(".hide-user-button").on("click",function(){
  $( ".hide-user-element" ).hide();
});
  /*  Range Slider 1  */
     if($("#slider-snap").length > 0){
var snapSlider = document.getElementById('slider-snap');
noUiSlider.create(snapSlider, {
    start: [0, 100000], 
    connect: true,
    range: {
        'min': [0],
        'max': [100000]
    },
       format: {
        to: (v) => parseFloat(v).toFixed(0),
        from: (v) => parseFloat(v).toFixed(0)
    }
});
  snapSlider.noUiSlider.on('update', function(values, handle) {
    document.getElementById('range-min').innerHTML = values[0];
    document.getElementById('range-max').innerHTML = values[1];
  });
}
  /*  Range Slider 2  */
       if($("#slider-snap2").length > 0){
var snapSlider = document.getElementById('slider-snap2');
noUiSlider.create(snapSlider, {
    start: [0, 100000], 
    connect: true,
    range: {
        'min': [0],
        'max': [100000]
    },
       format: {
        to: (v) => parseFloat(v).toFixed(0),
        from: (v) => parseFloat(v).toFixed(0)
    }
});
  snapSlider.noUiSlider.on('update', function(values, handle) {
    document.getElementById('range-min2').innerHTML = values[0];
    document.getElementById('range-max2').innerHTML = values[1];
  });
}
  /*  Range Slider 3  */
       if($("#slider-snap3").length > 0){
var snapSlider = document.getElementById('slider-snap3');
noUiSlider.create(snapSlider, {
    start: [0, 100000], 
    connect: true,
    range: {
        'min': [0],
        'max': [100000]
    },
       format: {
        to: (v) => parseFloat(v).toFixed(0),
        from: (v) => parseFloat(v).toFixed(0)
    }
});
  snapSlider.noUiSlider.on('update', function(values, handle) {
    document.getElementById('range-min3').innerHTML = values[0];
    document.getElementById('range-max3').innerHTML = values[1];
  });
}
  /*  Range Slider 4  */
       if($("#slider-snap4").length > 0){
var snapSlider = document.getElementById('slider-snap4');
noUiSlider.create(snapSlider, {
    start: [0, 100000], 
    connect: true,
    range: {
        'min': [0],
        'max': [100000]
    },
       format: {
        to: (v) => parseFloat(v).toFixed(0),
        from: (v) => parseFloat(v).toFixed(0)
    }
});
  snapSlider.noUiSlider.on('update', function(values, handle) {
    document.getElementById('range-min4').innerHTML = values[0];
    document.getElementById('range-max4').innerHTML = values[1];
  });
}
  /*  Range Slider 5  */
       if($("#slider-snap5").length > 0){
var snapSlider = document.getElementById('slider-snap5');
noUiSlider.create(snapSlider, {
    start: [-100, 100], 
    connect: true,
    range: {
        'min': [-100],
        'max': [100]
    },
   format: {
        to: (v) => parseFloat(v).toFixed(0),
        from: (v) => parseFloat(v).toFixed(0)
    }
});
  snapSlider.noUiSlider.on('update', function(values, handle) {
    document.getElementById('range-min5').innerHTML = values[-0];
    document.getElementById('range-max5').innerHTML = values[1];
  });
}
  /*  Range Slider 6  */
       if($("#slider-snap6").length > 0){
var snapSlider = document.getElementById('slider-snap6');
noUiSlider.create(snapSlider, {
    start: [-100, 100], 
    connect: true,
    range: {
        'min': [-100],
        'max': [100]
    },   
    format: {
        to: (v) => parseFloat(v).toFixed(0),
        from: (v) => parseFloat(v).toFixed(0)
    }
});
  snapSlider.noUiSlider.on('update', function(values, handle) {
    document.getElementById('range-min6').innerHTML = values[-0];
    document.getElementById('range-max6').innerHTML = values[1];
  });
}
  /*  Range Slider 7  */
       if($("#slider-snap7").length > 0){
var snapSlider = document.getElementById('slider-snap7');
noUiSlider.create(snapSlider, {
    start: [-100, 100], 
    connect: true,
    range: {
        'min': [-100],
        'max': [100]
    },
       format: {
        to: (v) => parseFloat(v).toFixed(0),
        from: (v) => parseFloat(v).toFixed(0)
    }
});
  snapSlider.noUiSlider.on('update', function(values, handle) {
    document.getElementById('range-min7').innerHTML = values[-0];
    document.getElementById('range-max7').innerHTML = values[1];
  });
}
  /*  Range Slider 8  */
       if($("#slider-snap8").length > 0){
var snapSlider = document.getElementById('slider-snap8');
noUiSlider.create(snapSlider, {
    start: [-100, 100], 
    connect: true,
    range: {
        'min': [-100],
        'max': [100]
    },
   format: {
        to: (v) => parseFloat(v).toFixed(0),
        from: (v) => parseFloat(v).toFixed(0)
    }
});
  snapSlider.noUiSlider.on('update', function(values, handle) {
    document.getElementById('range-min8').innerHTML = values[-0];
    document.getElementById('range-max8').innerHTML = values[1];
  });
}
  /*  Range Slider 9  */
       if($("#slider-snap9").length > 0){
var snapSlider = document.getElementById('slider-snap9');
noUiSlider.create(snapSlider, {
    start: [-100, 100], 
    connect: true,
    range: {
        'min': [-100],
        'max': [100]
    },   
    format: {
        to: (v) => parseFloat(v).toFixed(0),
        from: (v) => parseFloat(v).toFixed(0)
    }
});
  snapSlider.noUiSlider.on('update', function(values, handle) {
    document.getElementById('range-min9').innerHTML = values[-0];
    document.getElementById('range-max9').innerHTML = values[1];
  });
}
  /*  Range Slider 10  */
       if($("#slider-snap10").length > 0){
var snapSlider = document.getElementById('slider-snap10');
noUiSlider.create(snapSlider, {
    start: [-100, 100], 
    connect: true,
    range: {
        'min': [-100],
        'max': [100]
    },
       format: {
        to: (v) => parseFloat(v).toFixed(0),
        from: (v) => parseFloat(v).toFixed(0)
    }
});
  snapSlider.noUiSlider.on('update', function(values, handle) {
    document.getElementById('range-min10').innerHTML = values[-0];
    document.getElementById('range-max10').innerHTML = values[1];
  });
}
  /*  Range Slider 11  */
       if($("#slider-snap11").length > 0){
var snapSlider = document.getElementById('slider-snap11');
noUiSlider.create(snapSlider, {
    start: [-100, 100], 
    connect: true,
    range: {
        'min': [-100],
        'max': [100]
    },
       format: {
        to: (v) => parseFloat(v).toFixed(0),
        from: (v) => parseFloat(v).toFixed(0)
    }
});
  snapSlider.noUiSlider.on('update', function(values, handle) {
    document.getElementById('range-min11').innerHTML = values[-0];
    document.getElementById('range-max11').innerHTML = values[1];
  });
}
  /*  Range Slider 12  */
       if($("#slider-snap12").length > 0){
var snapSlider = document.getElementById('slider-snap12');
noUiSlider.create(snapSlider, {
    start: [-100, 100], 
    connect: true,
    range: {
        'min': [-100],
        'max': [100]
    },
       format: {
        to: (v) => parseFloat(v).toFixed(0),
        from: (v) => parseFloat(v).toFixed(0)
    }
});
  snapSlider.noUiSlider.on('update', function(values, handle) {
    document.getElementById('range-min12').innerHTML = values[-0];
    document.getElementById('range-max12').innerHTML = values[1];
  }); 
}

  /*  Range Slider 13  */
       if($("#slider-snap13").length > 0){
var snapSlider = document.getElementById('slider-snap13');
noUiSlider.create(snapSlider, {
    start: [0, 365], 
    connect: true,
    range: {
        'min': [0],
        'max': [365]
    },
       format: {
        to: (v) => parseFloat(v).toFixed(0),
        from: (v) => parseFloat(v).toFixed(0)
    }
});
  snapSlider.noUiSlider.on('update', function(values, handle) {
    document.getElementById('range-min13').innerHTML = values[-0];
    document.getElementById('range-max13').innerHTML = values[1];
  }); 
}

  /*  Range Slider 14  */
  if($("#slider-snap14").length > 0){ 
    var snapSlider = document.getElementById('slider-snap14'); 
    noUiSlider.create(snapSlider, {
        start: [0, 1000], 
        connect: true,
        range: {
            'min': [0],
            'max': [1000] 
        },
           format: {
            to: (v) => parseFloat(v).toFixed(0), 
            from: (v) => parseFloat(v).toFixed(0)
        }
    });
      snapSlider.noUiSlider.on('update', function(values, handle) {
        document.getElementById('range-min14').innerHTML = values[-0];
        document.getElementById('range-max14').innerHTML = values[1];
      }); 
    }
    

  /*  Range Slider 15  */
  if($("#slider-snap15").length > 0){ 
    var snapSlider = document.getElementById('slider-snap15'); 
    noUiSlider.create(snapSlider, {
        start: [1950, 2021], 
        connect: true,
        range: {
            'min': [1850],
            'max': [2021] 
        },
           format: {
            to: (v) => parseFloat(v).toFixed(0), 
            from: (v) => parseFloat(v).toFixed(0)
        }
    });
      snapSlider.noUiSlider.on('update', function(values, handle) {
        document.getElementById('range-min15').innerHTML = values[-0];
        document.getElementById('range-max15').innerHTML = values[1];
      }); 
    }
    
  /*  Range Slider 16  */
  if($("#slider-snap16").length > 0){ 
    var snapSlider = document.getElementById('slider-snap16'); 
    noUiSlider.create(snapSlider, {
        start: [0, 10], 
        connect: true,
        range: {
            'min': [0],
            'max': [10] 
        },
           format: {
            to: (v) => parseFloat(v).toFixed(0), 
            from: (v) => parseFloat(v).toFixed(0)
        }
    });
      snapSlider.noUiSlider.on('update', function(values, handle) {
        document.getElementById('range-min16').innerHTML = values[-0];
        document.getElementById('range-max16').innerHTML = values[1];
      }); 
    }
    
  /*  Range Slider 17  */
  if($("#slider-snap17").length > 0){ 
    var snapSlider = document.getElementById('slider-snap17'); 
    noUiSlider.create(snapSlider, {
        start: [0, 10000000], 
        connect: true,
        range: {
            'min': [0],
            'max': [10000000] 
        },
           format: {
            to: (v) => parseFloat(v).toFixed(0), 
            from: (v) => parseFloat(v).toFixed(0)
        }
    });
      snapSlider.noUiSlider.on('update', function(values, handle) {
        document.getElementById('range-min17').innerHTML = values[-0];
        document.getElementById('range-max17').innerHTML = values[1];
      }); 
    }
    
  /*  Range Slider 18  */
  if($("#slider-snap18").length > 0){ 
    var snapSlider = document.getElementById('slider-snap18'); 
    noUiSlider.create(snapSlider, {
        start: [0, 10000000], 
        connect: true,
        range: {
            'min': [0],
            'max': [10000000] 
        },
           format: {
            to: (v) => parseFloat(v).toFixed(0), 
            from: (v) => parseFloat(v).toFixed(0)
        }
    });
      snapSlider.noUiSlider.on('update', function(values, handle) {
        document.getElementById('range-min18').innerHTML = values[-0];
        document.getElementById('range-max18').innerHTML = values[1];
      }); 
    }
    
  /*  Range Slider 19  */
  if($("#slider-snap19").length > 0){ 
    var snapSlider = document.getElementById('slider-snap19'); 
    noUiSlider.create(snapSlider, {
        start: [0, 10000000], 
        connect: true,
        range: {
            'min': [0],
            'max': [10000000] 
        },
           format: {
            to: (v) => parseFloat(v).toFixed(0), 
            from: (v) => parseFloat(v).toFixed(0)
        }
    });
      snapSlider.noUiSlider.on('update', function(values, handle) {
        document.getElementById('range-min19').innerHTML = values[-0];
        document.getElementById('range-max19').innerHTML = values[1];
      }); 
    }
    
    
  /*  Range Slider 20  */
  if($("#slider-snap20").length > 0){ 
    var snapSlider = document.getElementById('slider-snap20'); 
    noUiSlider.create(snapSlider, {
        start: [0, 10000000], 
        connect: true,
        range: {
            'min': [0],
            'max': [10000000] 
        },
           format: {
            to: (v) => parseFloat(v).toFixed(0), 
            from: (v) => parseFloat(v).toFixed(0)
        }
    });
      snapSlider.noUiSlider.on('update', function(values, handle) {
        document.getElementById('range-min20').innerHTML = values[-0];
        document.getElementById('range-max20').innerHTML = values[1];
      }); 
    }
    
    
  /*  Range Slider 21  */
  if($("#slider-snap21").length > 0){ 
    var snapSlider = document.getElementById('slider-snap21'); 
    noUiSlider.create(snapSlider, {
        start: [0, 365],  
        connect: true,
        range: {
            'min': [0],
            'max': [365] 
        },
           format: {
            to: (v) => parseFloat(v).toFixed(0), 
            from: (v) => parseFloat(v).toFixed(0)
        }
    });
      snapSlider.noUiSlider.on('update', function(values, handle) {
        document.getElementById('range-min21').innerHTML = values[-0];
        document.getElementById('range-max21').innerHTML = values[1];
      }); 
    }
    
    
  /*  Range Slider 22  */
  if($("#slider-snap22").length > 0){ 
    var snapSlider = document.getElementById('slider-snap22'); 
    noUiSlider.create(snapSlider, {
        start: [0, 10000000], 
        connect: true,
        range: {
            'min': [0],
            'max': [10000000] 
        },
           format: {
            to: (v) => parseFloat(v).toFixed(0), 
            from: (v) => parseFloat(v).toFixed(0)
        }
    });
      snapSlider.noUiSlider.on('update', function(values, handle) {
        document.getElementById('range-min22').innerHTML = values[-0];
        document.getElementById('range-max22').innerHTML = values[1];
      }); 
    }
    
    
  /*  Range Slider 23  */
  if($("#slider-snap23").length > 0){ 
    var snapSlider = document.getElementById('slider-snap23'); 
    noUiSlider.create(snapSlider, {
        start: [0, 10000000], 
        connect: true,
        range: {
            'min': [0],
            'max': [10000000] 
        },
           format: {
            to: (v) => parseFloat(v).toFixed(0), 
            from: (v) => parseFloat(v).toFixed(0)
        }
    });
      snapSlider.noUiSlider.on('update', function(values, handle) {
        document.getElementById('range-min23').innerHTML = values[-0];
        document.getElementById('range-max23').innerHTML = values[1];
      }); 
    }
    
    
  /*  Range Slider 24  */
  if($("#slider-snap24").length > 0){ 
    var snapSlider = document.getElementById('slider-snap24'); 
    noUiSlider.create(snapSlider, {
        start: [0, 365], 
        connect: true,
        range: {
            'min': [0],
            'max': [365] 
        },
           format: {
            to: (v) => parseFloat(v).toFixed(0), 
            from: (v) => parseFloat(v).toFixed(0)
        }
    });
      snapSlider.noUiSlider.on('update', function(values, handle) {
        document.getElementById('range-min24').innerHTML = values[-0];
        document.getElementById('range-max24').innerHTML = values[1];
      }); 
    }
    


}(jQuery));