const container = document.querySelector('.container');

Array.from(Array(25), (_, i) => {
	const d = document.createElement('div');
	const colorClass =
		i % 2 === 0
			? 'blue'
			: i % 3 === 0
				? 'rebecca'
				:'green'
	d.classList.add('ball', colorClass);
	container.appendChild(d);
});

Array.from(document.querySelectorAll('.ball')).forEach((el, index) => {
	el.animate([
		{transform: 'translateY(-150px)'},
		{transform: 'translateY(2em)'}
	], {
		duration: 1000,
		iterations: Infinity,
		direction: 'alternate',
		easing: 'ease-in-out',
		delay: index*75,
		fill: "both"
	});	
});