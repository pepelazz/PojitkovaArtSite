(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/javascript/app.coffee":[function(require,module,exports){
require('./util');

require('./pictures-grid');

require('./gallery');

require('./scroll-to');

require('./loader');



},{"./gallery":"/Users/Trikster/static_sites/PojitkovaArt/_PojitkovaArt/src/javascript/gallery.coffee","./loader":"/Users/Trikster/static_sites/PojitkovaArt/_PojitkovaArt/src/javascript/loader.coffee","./pictures-grid":"/Users/Trikster/static_sites/PojitkovaArt/_PojitkovaArt/src/javascript/pictures-grid.coffee","./scroll-to":"/Users/Trikster/static_sites/PojitkovaArt/_PojitkovaArt/src/javascript/scroll-to.coffee","./util":"/Users/Trikster/static_sites/PojitkovaArt/_PojitkovaArt/src/javascript/util.coffee"}],"/Users/Trikster/static_sites/PojitkovaArt/_PojitkovaArt/src/javascript/gallery.coffee":[function(require,module,exports){
var module;

module = angular.module('app', []);

module.controller('main', ['$rootScope', '$scope', '$http', '$location', '$timeout', '$log', (function($rootScope, $scope, $http, $location, $timeout, $log) {})]);

module.controller('gallery', [
  '$rootScope', '$scope', (function($rootScope, $scope) {
    var openPhotoSwipe, pictures;
    pictures = [];
    window.picturesArray.forEach(function(item) {
      return pictures.push({
        src: './images/pictures/' + item.fileName + ".jpg",
        w: item.size[0],
        h: item.size[1],
        title: item.title
      });
    });
    openPhotoSwipe = (function(index) {
      var gallery, options, pswpElement;
      pswpElement = document.querySelectorAll('.pswp')[0];
      options = {
        index: index,
        history: false,
        focus: false,
        showAnimationDuration: 0,
        hideAnimationDuration: 0
      };
      gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, pictures, options);
      gallery.init();
    });
    $scope.openPic = (function(index) {
      openPhotoSwipe(index);
    });
  })
]);



},{}],"/Users/Trikster/static_sites/PojitkovaArt/_PojitkovaArt/src/javascript/loader.coffee":[function(require,module,exports){
$(function() {
  $('#hideAll .loader').css({
    marginTop: window.innerHeight * 0.4
  });
  return $(window).load(function() {
    return $('#hideAll').css({
      display: 'none'
    });
  });
});



},{}],"/Users/Trikster/static_sites/PojitkovaArt/_PojitkovaArt/src/javascript/pictures-grid.coffee":[function(require,module,exports){
$(function() {
  var arrangePictures, imgLoad;
  arrangePictures = (function() {
    var areaWidth, areaWidthFunc, columnNums, maxY;
    areaWidthFunc = (function() {
      if ($(window).width() > 800) {
        return $(window).width() - window.innerHeight * 264 / 420;
      } else {
        return $(window).width();
      }
    });
    areaWidth = areaWidthFunc();
    columnNums = (function() {
      switch (false) {
        case !(areaWidth >= 750 && areaWidth < 1000):
          return 3;
        case !(areaWidth >= 500 && areaWidth < 750):
          return 2;
        case !(areaWidth < 500):
          return 1;
        default:
          return 4;
      }
    })();
    maxY = 0;
    $('.gallery-grid > li').each(function(index, el) {
      var col, picWidth, row, upperEl, upperElBottom;
      picWidth = areaWidth / columnNums - columnNums * 10;
      row = Math.floor(index / columnNums);
      col = index - row * columnNums;
      if (index > columnNums - 1) {
        upperEl = $('.gallery-grid > li').eq(index - columnNums);
        upperElBottom = upperEl.position().top + upperEl.height();
      } else {
        upperElBottom = -20;
      }
      $(el).width(picWidth).css('left', (picWidth + 20) * col).css('top', upperElBottom + 20);
      maxY = Math.max(maxY, $(el).position().top + $(el).height());
    });
    $('.gallery-grid').css('height', maxY);
  });
  imgLoad = imagesLoaded($('.gallery-grid'));
  imgLoad.on('always', function() {
    return arrangePictures();
  });
  return $(window).on('resize', (function() {
    arrangePictures();
  }));
});



},{}],"/Users/Trikster/static_sites/PojitkovaArt/_PojitkovaArt/src/javascript/scroll-to.coffee":[function(require,module,exports){
$(function() {
  $('.nav-about-author').on('click', function() {
    return $.scrollTo('.about-author', 800);
  });
  $('.nav-gallery').on('click', function() {
    return $.scrollTo('.gallery', 1000);
  });
  return $('.nav-process').on('click', function() {
    return $.scrollTo('.process', 1000);
  });
});



},{}],"/Users/Trikster/static_sites/PojitkovaArt/_PojitkovaArt/src/javascript/util.coffee":[function(require,module,exports){
var calcWidthOrHeight, fixSize;

$(function() {
  fixSize();
  return $(window).on('resize', (function() {
    fixSize();
  }));
});

fixSize = (function() {
  var sidebarWidth, wh;
  if (window.innerWidth > 800) {
    wh = window.innerHeight;
    sidebarWidth = wh * 264 / 420;
    $('.img-interior').css({
      height: wh
    }).css({
      display: 'block'
    });
    $('.main-area').css({
      'margin-left': sidebarWidth + 'px'
    });
    $('.nav').css({
      left: sidebarWidth
    });
  } else {
    $('.img-interior').css({
      display: 'none'
    });
    $('.main-area').css({
      'margin-left': 'auto'
    });
    $('.nav').css({
      left: 'auto'
    });
  }
  calcWidthOrHeight();
});

calcWidthOrHeight = (function() {
  var height, heightFunc, width, widthFunc;
  heightFunc = function() {
    return window.innerHeight;
  };
  widthFunc = function() {
    if (window.innerWidth > 800) {
      return window.innerWidth - height * 264 / 420;
    } else {
      return window.innerWidth;
    }
  };
  height = heightFunc();
  width = widthFunc();
  if (height >= width) {
    $('.img-painter').css({
      width: width
    }).css({
      height: 'auto'
    }).css({
      marginTop: height - width
    });
  } else {
    $('.img-painter').css({
      height: height
    }).css({
      width: 'auto'
    });
  }
});



},{}]},{},["./src/javascript/app.coffee"]);
