import { pasteCode, showLineNumbers, hideLineNumbers } from './code.js';
import { takeSnapshot } from './snapshot.js';

(() => {
	const snapshotContainerNode = document.querySelector('.snapshot-container');
	const snapshotContainerBackgroundNode = document.querySelector('.snapshot-container__background');
	const terminalNode = document.querySelector('.terminal');
	const sizeNode = document.querySelector('.header__size');
	const shootNode = document.querySelector('.shoot');
	const showLineNumbersNode = document.querySelector('#show-line-numbers');
	const showTitle = document.getElementById('show-title');
	const title = document.querySelector('.terminal__title');

	window.addEventListener('message', ({ data: { type, name } }) => {
		switch (type) {
			case 'updateCode':
				document.execCommand('paste');
				title.innerText = name;
				break;
		}
	});

	document.addEventListener('paste', (event) => {
		pasteCode(event.clipboardData);
	});

	shootNode.addEventListener('click', (event) => {
		takeSnapshot();
	});

	showLineNumbersNode.addEventListener('change', (event) => {
		const checkbox = event.target;

		if (checkbox.checked) {
			showLineNumbers();
		} else {
			hideLineNumbers();
		}
	});

	showTitle.addEventListener('change', (event) => {
		if (event.target.checked) {
			title.style.display = 'inline';
		} else {
			title.style.display = 'none';
		}
	});

	window.addEventListener('colorPickerChange', function(data) {
		const color = data.detail.el.value;
		snapshotContainerBackgroundNode.style.backgroundColor = color;
	});

	colorPicker.initAll();

	if (ResizeObserver) {
		const resizeObserver = new ResizeObserver(() => {
			let width = Math.round(snapshotContainerNode.offsetWidth) * 2;
			let height = Math.round(snapshotContainerNode.offsetHeight) * 2;

			sizeNode.textContent = width + 'x' + height;
		});

		resizeObserver.observe(snapshotContainerNode);
		resizeObserver.observe(terminalNode);
	}
})();
