export class PolylineDecoder {
    decode(encoded, precision = 5) {
        const factor = Math.pow(10, precision);
        const points = [];
        let index = 0, lat = 0, lon = 0, delta;

        while (index < encoded.length) {
            [delta, index] = this.#readValue(encoded, index);
            lat += delta;
            [delta, index] = this.#readValue(encoded, index);
            lon += delta;
            points.push({ lat: lat / factor, lon: lon / factor, ele: null });
        }

        return points;
    }

    #readValue(encoded, index) {
        let result = 0, shift = 0, byte;

        do {
            if (index >= encoded.length) throw new Error('Invalid polyline');
            byte = encoded.charCodeAt(index++) - 63;
            if (byte < 0 || byte > 63) throw new Error('Invalid polyline');
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        return [result & 1 ? ~(result >> 1) : result >> 1, index];
    }
}
