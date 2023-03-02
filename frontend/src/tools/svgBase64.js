//removes any characters outside the Latin1 range and uses btoa to convert the svg to base64

function getImageDataURL(svgXml) {
	return (
		"data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgXml)))
	);
}

export default getImageDataURL;
