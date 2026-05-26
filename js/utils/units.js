export const METRIC = 'metric';
export const IMPERIAL = 'imperial';

export const WIND_SPEED_AUTO = 'auto';
export const WIND_SPEED_MS = 'ms';

export const UNIT_LABELS = {
    [METRIC]:   { dist: 'km', elev: 'm', speed: 'km/h', temp: '\u00b0C', precip: 'mm', pressure: 'hPa' },
    [IMPERIAL]: { dist: 'mi', elev: 'ft', speed: 'mph', temp: '\u00b0F', precip: 'in', pressure: 'inHg' },
};

export const UNIT_CONVERTERS = {
    dist:     v => v / 1.609344,
    elev:     v => v * 3.28084,
    precip:   v => v / 25.4,
    pressure: v => v / 33.8639,
};

export function unitLabel(unitSystem, type) {
    return UNIT_LABELS[unitSystem][type];
}

export function convertUnit(value, type, unitSystem) {
    if (unitSystem === METRIC || !UNIT_CONVERTERS[type]) return value;
    return UNIT_CONVERTERS[type](value);
}

// Wind-speed unit is independent of the metric/imperial toggle so that users
// can keep distances/pace in km/mi while displaying wind in m/s.
export function windSpeedLabel(state) {
    if (state.windSpeedUnit === WIND_SPEED_MS) return 'm/s';
    return unitLabel(state.unitSystem, 'speed');
}

// Open-Meteo's `wind_speed_unit` query parameter value.
export function windSpeedApiUnit(state) {
    if (state.windSpeedUnit === WIND_SPEED_MS) return 'ms';
    return state.unitSystem === IMPERIAL ? 'mph' : 'kmh';
}

// Convert a wind speed (in whatever unit it was fetched in) back to km/h
// so the Beaufort scale lookup works consistently.
export function windSpeedToKmh(value, state) {
    if (state.windSpeedUnit === WIND_SPEED_MS) return value * 3.6;
    if (state.unitSystem === IMPERIAL) return value * 1.609344;
    return value;
}
