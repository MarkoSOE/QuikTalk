import base64 from "react-native-base64";

export default function ConvertToImageFormat(base64ImageFormat, appTitle) {
	let url = base64ImageFormat;
	if (base64ImageFormat.indexOf("data:image/svg+xml;base64,") > -1) {
		let decodeSvg = base64.decode(
			base64ImageFormat.replace("data:image/svg+xml;base64,", "")
		);
		let blob = new Blob([decodeSvg], { type: "image/svg+xml" });
		url = URL.createObjectURL(blob);
	}
	return url;
}
