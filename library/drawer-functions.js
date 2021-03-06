(function () {

  // C.js basic functions 
  C.prototype.line = function (x1, y1, x2, y2) {
    var c = this.ctx;
    if (!this._toStroke) return;
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.stroke();
    c.closePath();
  }

  C.prototype.background = function (col) {
    var c = this.ctx;
    c.save();
    this.rest();
    c.fillStyle = col;
    c.fillRect(0, 0, W, H);
    c.restore();
  }

  C.prototype.noFill = function () { this._toFill = false; }
  C.prototype.noStroke = function () { this._toStroke = false; }
  C.prototype.translate = function (x, y = 0) { this.ctx.translate(x, y); }
  C.prototype.enableSmoothing = function () { this.ctx.imageSmoothingEnabled = true; }
  C.prototype.disableSmoothing = function () { this.ctx.imageSmoothingEnabled = false; }
  C.prototype.strokeWidth = function (w) { this.ctx.lineWidth = Number(w); }
  C.prototype.scale = function (x, y = x) { this.ctx.scale(x, y) }
  C.prototype.save = function () { this.ctx.save(); }
  C.prototype.restore = function () { this.ctx.restore(); }
  C.prototype.getFill = function () { return this.ctx.fillStyle; }
  C.prototype.getStroke = function () { return this.ctx.strokeStyle; }

  C.prototype.rest = function () {
    var c = this.ctx;
    c.setTransform(1, 0, 0, 1, 0, 0);
    var d = this.dpr;
    c.scale(d, d);
  }

  C.prototype.stroke = function (col) {
    if (col != undefined) {
      this.ctx.strokeStyle = col;
      this._toStroke = true;
    } else {
      this.ctx.stroke();
    }
  }

  C.prototype.fill = function (col) {
    if (col != undefined) {
      this.ctx.fillStyle = col;
      this._toFill = true;
    } else {
      this.ctx.fill();
    }
  }

  C.prototype.getDrawConfigs = function () {
    var c = this.ctx;
    return {
      stroke: c.strokeStyle,
      fill: c.fillStyle,
      strokeWidth: c.lineWidth,
      toStroke: this._toStroke,
      toFill: this._toFill,
    }
  }

  C.prototype.arc = function (x, y, r, sa = 0, ea = Math.PI / 2) {
    var c = this.ctx;
    c.beginPath();
    c.arc(
      x,
      y,
      r,
      sa || 0,
      int(ea, Math.PI * 2),
    );
    if (this._toFill) c.fill();
    if (this._toStroke) c.stroke();
    c.closePath();
  }

  C.prototype.sector = function (x, y, r, sa, ea) {
    this.ctx.moveTo(x, y);
    this.arc(x, y, r, sa, ea);
  }

  C.prototype.circle = function (x, y, r) { this.arc(x, y, r, 0, Math.PI * 2); }

  C.prototype.triangle = function (x1, y1, x2, y2, x3, y3) {
    var c = this.ctx;
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.lineTo(x3, y3);
    if (this._toFill) c.fill();
    if (this._toStroke) {
      c.lineTo(x1, y1);
      c.stroke();
    }
  }

  C.prototype.equiTriangle = function (x, y, len, rotation = 0) {
    var i = 0;
    var e = Math.PI * 2 / 3;
    var c = this.ctx;
    c.beginPath();
    c.moveTo(Math.cos(rotation) * len + x, Math.sin(rotation) * len + y);
    c.lineTo(Math.cos(e + rotation) * len + x, Math.sin(e + rotation) * len + y);
    c.lineTo(Math.cos(2 * e + rotation) * len + x, Math.sin(2 * e + rotation) * len + y);
    if (this._toFill) c.fill();
    if (this._toStroke) {
      c.lineTo(Math.cos(rotation) * len + x, Math.sin(rotation) * len + y);
      c.stroke();
    }
  }

  C.prototype.poly = function () {
    var args = arguments;
    if (args.length % 2 == 0) {
      var c = this.ctx;
      c.beginPath();
      c.moveTo(args[0], args[1]);
      for (var i = 2; i < args.length; i += 2) {
        c.lineTo(args[i], args[i + 1]);
      }
      if (this._toFill) c.fill();
      if (this._toStroke) {
        c.lineTo(args[0], args[1]);
        c.stroke();
      }
      c.closePath();
    }
  }

  C.prototype.ellipse = function (x, y, xDis, yDis) {
    var c = this.ctx;
    var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
    ox = xDis * kappa,  // control point offset horizontal
      oy = yDis * kappa,  // control point offset vertical
      xe = x + xDis,      // x-end
      ye = y + yDis;      // y-end
    c.beginPath();
    c.moveTo(x - xDis, y);
    c.bezierCurveTo(x - xDis, y - oy, x - ox, y - yDis, x, y - yDis);
    c.bezierCurveTo(x + ox, y - yDis, xe, y - oy, xe, y);
    c.bezierCurveTo(xe, y + oy, x + ox, ye, x, ye);
    c.bezierCurveTo(x - ox, ye, x - xDis, y + oy, x - xDis, y);
    if (this._toFill) c.fill();
    if (this._toStroke) {
      c.stroke();
    }
    c.closePath();
  }


  C.prototype.bezierCurve = function (x1, y1, x2, y2, x3, y3) {
    var c = this.ctx;
    if (!this._pathStart) c.beginPath();

    c.bezierCurveTo(x1, y1, x2, y2, x3, y3);

    if (!this._pathStart) {
      if (this._toFill) c.fill();
      if (this._toStroke) {
        c.stroke();
      }
      c.closePath();
    };
  }

  C.prototype.quad = function (x1, y1, x2, y2, x3, y3, x4, y4) {
    var c = this.ctx, args = arguments;
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.lineTo(x3, y3);
    c.lineTo(x4, y4);
    c.lineTo(x1, y1);
    if (this._toFill) c.fill();
    if (this._toStroke) {
      c.lineTo(args[0], args[1]);
      c.stroke();
    }
    c.closePath();
  }


  /**
   * Draws a regular polygon with centre position number of sides length of a side and rotation
   * @param {number} x        x position
   * @param {number} y        y position
   * @param {number} sides    number of sides
   * @param {number} len      length of a side
   * @param {number} rotation rotation
   */

  C.prototype.regularPoly = function (x, y, sides, len, rotation = 0) {
    var i = 0;
    var e = Math.PI * 2 / sides;
    var c = this.ctx;
    rotation += e / 2;
    var initial = [
      Math.cos(rotation) * len + x,
      Math.sin(rotation) * len + y
    ]
    c.beginPath();
    c.moveTo(initial[0], initial[1]);
    while (i++ < sides) {
      c.lineTo(
        Math.cos(i * e + rotation) * len + x,
        Math.sin(i * e + rotation) * len + y
      );
    }
    if (this._toFill) c.fill();
    if (this._toStroke) {
      c.lineTo(initial[0], initial[1]);
      c.stroke();
    }
    c.closePath();
  }

  C.prototype.loop = function (fx, dx, th) {
    var binded = fx.bind(C.prototype);
    this.ctx.animating = true;
    if (dx) {
      C.currentConfigs.currentLoop = setInterval(function () {
        C.setcurrentConfigs(th);
        binded();
      }, dx);
    } else {
      function a(dx) {
        C.currentConfigs.currentLoop = window.requestAnimationFrame(a);
        C.setcurrentConfigs(th);
        binded(dx);
      }
      a();
    }
  }

  C.prototype.noLoop = function () {
    clearInterval(C.currentConfigs.currentLoop);
    window.cancelAnimationFrame(C.currentConfigs.currentLoop);
    this.ctx.animating = false;
  }

  C.prototype.startPath = function () {
    this.ctx.beginPath();
    this._pathStart = true;
  }
  C.prototype.endPath = function () {
    this.ctx.closePath();
    this._pathStart = false;
  }

  assignPropsToWind(C.prototype);
})();