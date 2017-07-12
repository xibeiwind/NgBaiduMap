import { transformPoints } from '../../helper/transformer';


export function createPolygonBorderOverlay(options) {
    return new Promise((resolve, reject) => {
        resolve();
    }).then(() => {
        const points = transformPoints(options.points, '<border> point');
        //console.log('createPolygonBorderOverlay');
        return new BMap.Polygon(points, options.polygonOptions);
    });
}
