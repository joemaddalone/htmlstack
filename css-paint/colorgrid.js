class ColorGridPainter {
  paint(ctx, geom, properties) {
    const random_color = () => {
      let rint = Math.round(0xffffff * Math.random());
      return `rgb(${rint >> 16}, ${rint >> 8 & 255}, ${rint & 255})`;
    };

    const size = 50;

    for (let y = 0; y < geom.height / size; y++) {
      for (let x = 0; x < geom.width / size; x++) {
        ctx.beginPath();
        ctx.fillStyle = random_color();
        ctx.rect(x * size, y * size, size, size);
        ctx.fill();
      }
    }
  }

}

registerPaint('colorgrid', ColorGridPainter);