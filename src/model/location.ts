/**
 * @author William Reetz
 * @export
 * @class Location
 */
export class Location {

    /**
     * The latitude.
     * @type {number}
     * @memberof Location
     */
    public latitude: number;

    /**
     * The longitude.
     * @type {number}
     * @memberof Location
     */
    public longitude: number;

    /**
     * The earth radius in km.
     * @private
     * @memberof Location
     */
    private readonly RAD = 6371;

    /**
     * Creates an instance of Location.
     * @param {number} latitude
     * @param {number} longitude
     * @memberof Location
     */
    constructor(latitude: number, longitude: number) {
        // The valid range of latitude is -90 to 90
        this.latitude = latitude%90;
        // The valid range of longitude is -180 to 180
        this.longitude = longitude%180;
    }

    /**
     * Calculates the distance to the given location in km.  
     * https://en.wikipedia.org/wiki/Great-circle_distance
     * @param {Location} location
     * @returns {number} distance in km
     * @memberof Location
     */
    public greateCircleDistanceTo(location: Location): number {

        const lonA = this.toRadians(this.longitude);
        const latA = this.toRadians(this.latitude);
        const lonB = this.toRadians(location.longitude);
        const latB = this.toRadians(location.latitude);

        return this.RAD * Math.acos(
            Math.sin(latA) * Math.sin(latB) +
            Math.cos(latA) * Math.cos(latB) *
            Math.cos(lonA - lonB)
        );
    }

    /**
     * Transforms degrees to rad
     * @private
     * @param {number} degrees
     * @returns {number} rad
     * @memberof Location
     */
    private toRadians(degrees: number): number {
        return degrees * Math.PI / 180;
    }
}