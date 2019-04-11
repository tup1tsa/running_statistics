import GeoLib from "geolib";
import { GetDistance, GetPath, GetSpeed } from "running_app_core";

// GeoLib library is decent, but typings are god awful
// and the project itself is outdated (npm vs github) and almost abandoned

// @ts-ignore
export const getPath: GetPath = GeoLib.getPathLength;

// @ts-ignore
export const getSpeed: GetSpeed = GeoLib.getSpeed;

export const getDistance: GetDistance = GeoLib.getDistance;
