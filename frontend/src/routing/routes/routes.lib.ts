import { routesIndoor } from './routes-indoor';
import { routesOutdoor } from './routes-outdoor';
import { RoutesIndoorType, RoutesOutdoorType } from './routes.type';

/**
 * @function getIndoorRouteByField
 *
 * @description Finds an indoor route by a specific field and value.
 *
 * @param {keyof RoutesIndoorType} field The field to search by.
 * @param {string} value The value to search for.
 * @returns {RoutesIndoorType | undefined} The found route or undefined if no route matches.
 */
export const getIndoorRouteByField = (field: keyof RoutesIndoorType, value: string): RoutesIndoorType | undefined => {
  return routesIndoor.find((route) => route[field] === value);
};

/**
 * @function getOutdoorRouteByField
 *
 * @description Finds an outdoor route by a specific field and value.
 *
 * @param {keyof RoutesOutdoorType} field The field to search by.
 * @param {string} value The value to search for.
 * @returns {RoutesOutdoorType | undefined} The found route or undefined if no route matches.
 */
export const getOutdoorRouteByField = (field: keyof RoutesOutdoorType, value: string): RoutesOutdoorType | undefined => {
  return routesOutdoor.find((route) => route[field] === value);
};
