function getImageDataURL(svgXml) {
	return (
		"data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgXml)))
	);
}

export default getImageDataURL;
