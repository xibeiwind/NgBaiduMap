import { transformPoints } from '../../helper/transformer';

import Promise from 'promise-polyfill';

export function createPolygon(options) {
    return new Promise((resolve, reject) => {
        const points = transformPoints(options.points, '<border> point');

        resolve(new BMap.Polygon(points, options.polygonOptions));
    });
}