import { LatLng, LatLngLiteral } from "leaflet";

export const getRandomColorRGB = () => {
        const randomRed = Math.floor(Math.random() * 256);
        const randomGreen = Math.floor(Math.random() * 256);
        const randomBlue = Math.floor(Math.random() * 256);
        return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
    };

export const parseCoordinates = (coordinatesString: string) => {
    // Divide la cadena en pares de coordenadas
    const pairs = coordinatesString.trim().split(' ');

    // Crea un array para almacenar las coordenadas convertidas
    const latLngArray: LatLngLiteral[] = [];

    // Itera sobre cada par de coordenadas
    for (const pair of pairs) {
        const [lat, lng] = pair.split(',').map(Number);
        // Agrega las coordenadas como objetos LatLng al array
        latLngArray.push({ lat: lng, lng: lat });
    }

    return latLngArray;
}