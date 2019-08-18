import { Location } from '../model/location'

const london = new Location(51.31, -0.7);
const berlin = new Location(52.31, 13.24);
const paris = new Location(48.51, 2.21);
const tokio = new Location(35.41, 139.46);

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeNear(value: number, tolerance: number): CustomMatcherResult;
        }
    }
}

expect.extend({
    toBeNear(received, expected, tolerance) {
        tolerance = tolerance;
        const pass = received < expected + tolerance && received > expected - tolerance;
        const message = pass ? () => '' : () => `Expected: ${received} should be between ${expected + tolerance} and ${expected - tolerance}`;
        return { actual: received, pass, message };
    },
});

describe('Berlin to Berlin', () => {

    it('should have the same distance as Berlin to Berlin', () => {
        expect(berlin.greateCircleDistanceTo(berlin))
            .toBe(berlin.greateCircleDistanceTo(berlin))
    });
    
    it('should be a distance about 0km', () => {
        expect(berlin.greateCircleDistanceTo(berlin)).toBe(0);
    });

});

describe('London to Berlin', () => {

    it('should have the same distance as Berlin to London', () => {
        expect(london.greateCircleDistanceTo(berlin))
            .toBe(berlin.greateCircleDistanceTo(london));
    });

    it('should be a distance about 932km', () => {
        expect(london.greateCircleDistanceTo(berlin)).toBeNear(932, 100);
    });

});

describe('Paris to Tokio', () => {

    it('should have the same distance as Tokio to Paris', () => {
        expect(paris.greateCircleDistanceTo(tokio))
            .toBe(tokio.greateCircleDistanceTo(paris));
    });

    it('should be a distance about 9710km', () => {
        expect(paris.greateCircleDistanceTo(tokio)).toBeNear(9710, 100);
    });

})

describe('Berlin to Paris', () => {

    it('should have the same distance as Paris to Berlin', () => {
        expect(berlin.greateCircleDistanceTo(paris))
            .toBe(paris.greateCircleDistanceTo(berlin));
    });

    it('should be a distance about 878km', () => {
        expect(berlin.greateCircleDistanceTo(paris)).toBeNear(878, 100);
    });

});