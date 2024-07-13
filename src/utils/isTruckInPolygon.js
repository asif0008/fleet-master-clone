function isTruckInPolygon(point, polygon) {
    const [x, y] = point;
    let isInside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) isInside = !isInside;
    }

    return isInside;
}

export { isTruckInPolygon };
