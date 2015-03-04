
rom.load();

var spriteTable;
var test = function() {
  rom.spriteArrString = sprite.toBinaryStringArray(rom.chrData);
  rom.spriteTable = sprite.buildSpriteTable(rom.spriteArrString);
};



var setup = function () {
  var hero = document.getElementsByClassName('hero-unit')[0];
  var spCount = 1;
  var n = 10;

  for (var i = 0; i < rom.spriteTable.length; i++) {
    if (i % 8 === 0) {
      var canvas = document.createElement('canvas');
      canvas.id = 'ctx' + spCount;
      canvas.setAttribute('width', 8 * n);
      canvas.setAttribute('height', 8 * n);
      spCount++;
      hero.appendChild(canvas);
      ctx = document.getElementById(canvas.id).getContext('2d');
      console.log(ctx);
      render(ctx, i);
    }
  }
};

var render = function(ctx, spNum) {
  var n = 10;
  var stop = spNum + 8;

  for (var i = spNum; i < stop; i++) {
    for (var j = 0; j < 8; j++) {
        var x = j,
            y = i % 8,
            s = rom.spriteTable[i][j];
        switch(Number(s)) {
          case 0:
            ctx.fillStyle = "rgb(255, 255, 255)";
            break;
          case 1:
            ctx.fillStyle = "rgb(170, 170, 170)";
            break;
          case 2:
            ctx.fillStyle = "rgb(85, 85, 85)";
            break;
          case 3:
            ctx.fillStyle = "rgb(0, 0, 0)";
            break;
        }

        ctx.fillRect(x * n, y * n, n, n);
    }
  }
};



var search = function() {
  var canidates = [];
  var canidate = [];
  var tmp = 0;

  for (var i = 0; i < rom.prgData.length; i++) {
    if (rom.prgData[i] <= 0x40) {
      canidate.push(rom.prgData[i]);
    } else {
      if (canidate.length < 32) {// || canidate.length % 4 !== 0) {
        canidate = [];
      } else {
        canidates.push(canidate);
        canidate = [];
      }
    }
  }

  return canidates;
};


var renderPalette = function() {
  var n = 20;
  var palettes = search();

  var hero = document.getElementsByClassName('hero-unit')[0];


  for (var i = 0; i < palettes.length; i++) {
    var ctx = document.createElement('canvas');
    ctx.id = 'ctx' + i;
    ctx.setAttribute('width', (n * 4));
    ctx.setAttribute('height', (Math.ceil(palettes[i].length / 4)) * n);

    hero.appendChild(ctx);
    ctx = ctx.getContext('2d');

    for (var j = 0; j < palettes[i].length; j++) {
      var colorIdx =  palettes[i][j];
      var color = sprite.PALETTE[colorIdx];
      var x = (j * n) % (4 * n);
      var y = ((j / 4) >> 0) * n;
      ctx.fillStyle = color;

      ctx.fillRect(x, y, n, n);
      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.font = "14px monospace";
      var hex = colorIdx.toString(16);
      if (hex.length === 1) { hex = '0' + hex; }
      ['0d', '0e', '0f',
       '1d', '1e', '1f',
       '2d', '2e', '2f',
       '3d', '3e', '3f'].forEach( function(h) {
          if (h == hex) { ctx.fillStyle = "rgb(255,255,255)"; }
       });
      ctx.fillText(hex, x + 2, y + 15);
    }
  }

};



var download = function(typedArray) {
  var blob = new Blob([typedArray], {type: "octet/stream"});
  var url = window.URL.createObjectURL(blob);
  window.location.assign(url);
};
