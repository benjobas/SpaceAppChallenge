let totalWidth = window.innerWidth;
let totalHeight = window.innerHeight;

let canvas = document.getElementById("canvas");
canvas.width = totalWidth;
canvas.height = totalHeight;

const c = canvas.getContext("2d");
let stars = [];

const draw = (star) => {
  if (star.alpha <= 0 || star.x <= 0 || star.x > totalWidth || star.y <= 0 || star.y > totalHeight) {
    createStar(star);
  }
  star.y -= star.velocity;
  star.alpha -= 5e-4;
  c.beginPath();
  c.arc(star.x, star.y, star.scale * 5, 0, 2 * Math.PI, false);
  if (parseInt(Math.random()) * 100 % 3 == 0)
      c.fillStyle = "rgba(255,255,255," + star.alpha + ")";
  else
      c.fillStyle = "rgba(237,194,123," + star.alpha + ")";
  c.fill()
}

function createStar(existingStar) {
  const star = existingStar || {};
  star.x = Math.random() * totalWidth;
  star.y = Math.random() * totalHeight;
  star.alpha = .2 + Math.random();
  star.scale = .1 + Math.random() / 10;
  star.velocity = Math.random() * .04;

  return star;
}

function animate() {
  c.clearRect(0, 0, totalWidth, totalHeight);
  for (var n in stars) {
      draw(stars[n]);
  }

  requestAnimationFrame(animate);
}

for (let i = 0; i < totalWidth * .2; i++) {
    let a = createStar();
    stars.push(a);
}

animate();