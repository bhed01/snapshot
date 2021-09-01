const snapshotContainerNode = document.querySelector('.snapshot-container');
const snapshotContainerBackgroundNode = document.querySelector('.snapshot-container__background');
const terminalNode = document.querySelector('.terminal');

export const takeSnapshot = () => {
	let fileName = document.querySelector('.terminal__title').innerHTML.split('.');
	if (fileName.length > 1) {
		fileName = 'code_snapshot';
	} else {
		fileName = fileName[0];
	}

	snapshotContainerNode.style.resize = 'none';
	terminalNode.style.resize = 'none';

	domtoimage
		.toBlob(snapshotContainerBackgroundNode, {
			width: snapshotContainerBackgroundNode.offsetWidth,
			height: snapshotContainerBackgroundNode.offsetHeight
		})
		.then(function(blob) {
			snapshotContainerNode.style.resize = '';
			terminalNode.style.resize = '';
			window.saveAs(blob, `${fileName}.png`);
		});
};
