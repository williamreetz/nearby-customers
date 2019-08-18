import { ObjectSorter } from "../util/object-sorter";

describe('ObjectSorter', () => {

    const testList = [
        { letter: 'C', number: 1 },
        { letter: 'A', number: 4 },
        { letter: 'E', number: 0 },
        { letter: 'B', number: 3 },
        { letter: 'D', number: 2 },
    ];

    it('should sort testList by letter!', () => {
        const sorted = ObjectSorter.sort(testList, 'letter');
        expect(sorted[0].letter).toBe('E');
        expect(sorted[1].letter).toBe('D');
        expect(sorted[2].letter).toBe('C');
        expect(sorted[3].letter).toBe('B');
        expect(sorted[4].letter).toBe('A');
    });

    it('should sort testList by number!', () => {
        const sorted = ObjectSorter.sort(testList, 'number');
        expect(sorted[0].number).toBe(4);
        expect(sorted[1].number).toBe(3);
        expect(sorted[2].number).toBe(2);
        expect(sorted[3].number).toBe(1);
        expect(sorted[4].number).toBe(0);
    });

    it('should sort testList by number descending!', () => {
        const sorted = ObjectSorter.sort(testList, 'number', false);
        expect(sorted[0].number).toBe(0);
        expect(sorted[1].number).toBe(1);
        expect(sorted[2].number).toBe(2);
        expect(sorted[3].number).toBe(3);
        expect(sorted[4].number).toBe(4);
    });

    it('should sort testList by number and letter should be unsorted!', () => {
        const sorted = ObjectSorter.sort(testList, 'number');
        expect(sorted[0].letter).toBe('A');
        expect(sorted[1].letter).toBe('B');
        expect(sorted[2].letter).toBe('D');
        expect(sorted[3].letter).toBe('C');
        expect(sorted[4].letter).toBe('E');
    });
    
});
