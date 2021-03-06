(function () {
  function int(a, b) { return isNaN(a) ? b : a; }
  function bool(a, b) { return a == undefined ? b : a; }

  function gW() {
    var cs = window.getComputedStyle(document.body);
    return window.innerWidth - parseInt(cs.marginLeft) * 2;
  }

  function addAddons(extObj) {
    window.C.addons = Object.assign(window.C.addons, extObj);
    for (var addon of Object.keys(C.addons)) {
      C.prototype[addon] = window[addon] = C.addons[addon]
    }
  }
  function getCanvas(width, height, dpr) {
    var cvs = document.createElement("canvas");
    cvs.style.width = width + "px";
    cvs.style.height = height + "px";
    cvs.width = dpr * width;
    cvs.height = dpr * height;
    cvs.style.position = "relative";
    return cvs;
  }
  // addding to window
  assignPropsToWind({
    int: int,
    bool: bool,
    getWidth: gW,
    getCanvas: getCanvas,
    addAddons: addAddons,
    // functions
    E: Math.E,
    LN2: Math.LN2,
    LN10: Math.LN10,
    PI: Math.PI,
    TAU: Math.PI * 2,
    SQRT2: Math.SQRT2,
    abs: Math.abs,
    acos: Math.acos,
    asin: Math.asin,
    atan: Math.atan,
    atan2: Math.atan2,
    cbrt: Math.cbrt,
    ceil: Math.ceil,
    cos: Math.cos,
    cosh: Math.cosh,
    exp: Math.exp,
    floor: Math.floor,
    log: Math.log,
    log2: Math.log2,
    log10: Math.log10,
    max: Math.max,
    min: Math.min,
    pow: Math.pow,
    random: Math.random,
    round: Math.round,
    sgn: Math.sign,
    sin: Math.sin,
    sqrt: Math.sqrt,
    tan: Math.tan,
    tanh: Math.tanh,
    dist: function (p1, p2) {
      if (p1 instanceof Array && p2 instanceof Array) {
        return sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
      }
    }
  });
})();
