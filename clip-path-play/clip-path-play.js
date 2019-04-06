const div = () => document.createElement('div');

const start = [[0, 0], [100, 0], [100, 100], [0, 100]];
const end = [];
const points1 = start.reduce((acc, cur) => `${acc ? acc + ',' : ''}${cur[0]}% ${cur[1]}%`, '').toString(); //const points2 = end.reduce((acc, cur) => `${acc ? acc + ',' : ''}${cur[0]}% ${cur[1]}%`,'').toString();

const points2 = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
const holder = document.getElementById('square-holder');
const squares = Array.from({
  length: 3000
}).map(el => {
  const d = div();
  d.className = 'square';
  return d;
});

const over = ({
  target
}) => {
  console.log(points2);
  target.style.clipPath = points2;
  target.style.backgroundColor = 'red';
  target.addEventListener('mouseout', out);
};

const out = ({
  target
}) => {
  target.style.clipPath = points1;
  target.style.backgroundColor = 'black';
  target.removeEventListener('mouseout', out);
};

squares.forEach(s => {
  // s.addEventListener('mouseover', over)
  holder.appendChild(s);
}); // Array.from(document.querySelectorAll('.square')).forEach((el, index) => {
// 	el.animate([
// 		{"clip-path": points1},
// 		{"clip-path": points2}
// 	], {
// 		duration: 1000,
// 		iterations: Infinity,
// 		direction: 'alternate',
// 		easing: 'ease-in-out',
// 		delay: index*75,
// 		fill: "both"
// 	});	
// });
// .shapeHolder .shape {
//     background-color: #222;
//     width: 100%;
//     height: 100%;
//     clip-path: polygon(
//             0 0,
//             0% 20%,
//             0 50%,
//             0% 80%,
//             0 100%,
//             50% 100%,
//             100% 100%,
//             100% 80%,
//             100% 50%,
//             100% 20%,
//             100% 0,
//             50% 0);
//     transition:all 0.25s ease-in
// }