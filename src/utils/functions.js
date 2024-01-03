export const stringToColor = (string) => {
    let hash = 0;
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}
export const stringAvatar = (name) => {
    return {
        sx: {
            bgcolor: stringToColor(name),
        }, children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}
export const searchAddress = async (latlng) => {

    const {lat, lng} = latlng;

    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);

    return await response.json();
}
export const hexToRGBA = (hex, opacity) => {
    let rgb = hexToRGB(hex);
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
}
const hexToRGB = (hex) => {
    let r = parseInt(hex.slice(1, 3),16),
        g = parseInt(hex.slice(3, 5),16),
        b = parseInt(hex.slice(5, 7),16);

    return {r, g, b};
}