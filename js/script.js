;(function(exports) {
  var canvas = new Cabbage('canvas'),
      canny = new Canny(canvas),
      filters = new Filters(canvas);

  var grayBtn = document.getElementById('gray'),
      blurBtn = document.getElementById('blur'),
      gradBtn = document.getElementById('gradient'),
      nmsBtn = document.getElementById('nms'),
      hysBtn = document.getElementById('hys'),
      dirBtn = document.getElementById('dirmap'),
      intenBtn = document.getElementById('gradmap'),
      invertBtn = document.getElementById('invert'),
      resetBtn = document.getElementById('reset');

  function checkForImg() {
    var params = window.location.search;
    var imgFile;
    if (params !== '' && params.indexOf("img=") > -1) {
      imgFile = params.substring(params.indexOf("img=") + 4);
      canvas.loadImg('uploads/' + imgFile);
    }
  }

  grayBtn.onclick = function() {
    filters.grayscale();
  };

  blurBtn.onclick = function() {
    var size = Number(document.getElementById('size').value),
        sigma = Number(document.getElementById('sigma').value);
    size = (size <= 1 || size > 21) ? 3 : (size % 2 === 0) ? size - 1 : size;
    sigma = (sigma < 1 || sigma > 10) ? 1.5 : sigma;
    filters.gaussianBlur(sigma, size);
  };

  gradBtn.onclick = function() {
    var operator = document.querySelector('input[name=operator]:checked').value;
    canny.gradient(operator);
    nmsBtn.disabled = false;
  };

  nmsBtn.onclick = function() {
    canny.nonMaximumSuppress();
    dirBtn.disabled = false;
    intenBtn.disabled = false;
    hysBtn.disabled = false;
  };

  hysBtn.onclick = function() {
    canny.hysteresis();
  };

  dirBtn.onclick = function() {
    canny.showDirMap();
  };

  intenBtn.onclick = function() {
    canny.showGradMap();
  };

  invertBtn.onclick = function() {
    filters.invertColors();
  };

  resetBtn.onclick = function() {
    canvas.resetImageData();
  };

  checkForImg();
}(this));
