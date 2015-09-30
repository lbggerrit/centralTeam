function prettyText(text) {
	var i;
	text = text.split('_');
	for (var i = 0;i < text.length; ++i) {
		text[i] = text[i].substr(0,1).toUpperCase() + text[i].substr(1).toLowerCase();
	}
	text = text.join(' ');
	return text;
}

module.exports = {
	prettyText
};
