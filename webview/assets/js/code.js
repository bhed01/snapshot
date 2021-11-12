import { setProperty } from './utils.js';

const codeSnippetNode = document.querySelector('.terminal__code-snippet');
let lineNumberWidth;
let minHeight;
const PADDING_LEFT_EXTRA_PX = 15;

const getHtml = (clip) => clip.getData('text/html');

export const showLineNumbers = () => {
	codeSnippetNode.innerHTML = replaceBrByDiv(codeSnippetNode.innerHTML);

	const showLineNumbersNode = document.getElementById('show-line-numbers');
	if (showLineNumbersNode.checked) {
		const lines = codeSnippetNode.querySelectorAll('div > div');

		lines.forEach((row, index) => {
			row.classList.add('editorLine');
			const lineNumber = document.createElement('div');
			lineNumber.classList.add('editorLineNumber');
			lineNumber.textContent = index + 1;
			row.insertBefore(lineNumber, row.firstChild);
		});
		lineNumberWidth = computeEditorLineNumberWidth(lines.length);
		minHeight = computeMinLineHeight(codeSnippetNode);

		setProperty('editor-line-number-width', lineNumberWidth + 'px');
		setProperty('editor-line-min-height', minHeight + 'px');
		setProperty('editor-line-padding-left', lineNumberWidth + PADDING_LEFT_EXTRA_PX + 'px');
	}
};

const computeMinLineHeight = (node) => {
	const elementStyle = window.getComputedStyle(node.querySelector('div'));
	return parseInt(elementStyle.getPropertyValue('line-height'));
};

const computeEditorLineNumberWidth = (text) => {
	const div = document.body.appendChild(document.createElement('div'));
	div.classList.add('editorLineNumber__test');
	div.textContent = text;
	const width = div.clientWidth;
	div.remove();
	return width;
};

const replaceBrByDiv = (str) => {
	// webview ignores empty <div> elements. So, do not change '<div> </div>' to '<div></div>'
	return str.replace(/<br>/gi, '<div> </div>');
};

export const pasteCode = (clip) => {
	const code = getHtml(clip);
	codeSnippetNode.innerHTML = code;
	if (document.getElementById('show-line-numbers').checked) 
		showLineNumbers();
		
};


export const hideLineNumbers = () => {
	const editorLineNumbers = document.querySelectorAll('.editorLineNumber');
	editorLineNumbers.forEach((element) => (element.style.display = 'none'));
	setProperty('editor-line-padding-left', '0px');
};
