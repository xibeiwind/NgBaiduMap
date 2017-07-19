import {isNull} from './validate';

const DEFAULT_COORDINATION = {
    lng: 121.506191,
    lat: 31.245554
};

const DEFAULT_ZOOM = 10;

export function create(element, mapOptions) {
    const map = new BMap.Map(element, mapOptions);

    refresh(map, mapOptions);

    return map;
}

export function refresh(map, mapOptions) {
    if (!isNull(mapOptions) && !isNull(mapOptions.disableDragging)) {
        map[(mapOptions.disableDragging ? 'disable' : 'enable') + 'Dragging']();
    }
    if (!isNull(mapOptions) && !isNull(mapOptions.enableScrollWheelZoom)) {
        map[(mapOptions.enableScrollWheelZoom ? 'enable' : 'disable') + 'ScrollWheelZoom']();
    }
    if (!isNull(mapOptions) && !isNull(mapOptions.disableDoubleClickZoom)) {
        map[(mapOptions.disableDoubleClickZoom ? 'disable' : 'enable') + 'DoubleClickZoom']();
    }
    if (!isNull(mapOptions) && !isNull(mapOptions.enableKeyboard)) {
        map[(mapOptions.enableKeyboard ? 'enable' : 'disable') + 'Keyboard']();
    }
    if (!isNull(mapOptions) && !isNull(mapOptions.enableInertialDragging)) {
        map[(mapOptions.enableInertialDragging ? 'enable' : 'disable') + 'InertialDragging']();
    }
    if (!isNull(mapOptions) && !isNull(mapOptions.enableContinuousZoom)) {
        map[(mapOptions.enableContinuousZoom ? 'enable' : 'disable') + 'ContinuousZoom']();
    }
    if (!isNull(mapOptions) && !isNull(mapOptions.disablePinchToZoom)) {
        map[(mapOptions.disablePinchToZoom ? 'disable' : 'enable') + 'PinchToZoom']();
    }
    !isNull(mapOptions) && !isNull(mapOptions.cursor) && map.setDefaultCursor(mapOptions.cursor);
    !isNull(mapOptions) && !isNull(mapOptions.draggingCursor) && map.setDraggingCursor(mapOptions.draggingCursor);
    !isNull(mapOptions) && !isNull(mapOptions.currentCity) && map.setCurrentCity(mapOptions.currentCity);
    !isNull(mapOptions) && !isNull(mapOptions.centerAndZoom) && map.centerAndZoom(new BMap.Point(mapOptions.centerAndZoom.lng || DEFAULT_COORDINATION.lng, mapOptions.centerAndZoom.lat || DEFAULT_COORDINATION.lat), mapOptions.centerAndZoom.zoom || DEFAULT_ZOOM);
}
