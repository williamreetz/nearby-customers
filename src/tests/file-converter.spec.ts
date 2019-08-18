import * as path from 'path'
import { FileConverter } from '../util/file-converter';

const fileConverter: FileConverter = new FileConverter();

describe('FileConverter', () => {

    it('should convert a file with correct syntax', () => {
        const moderators: any = fileConverter.convertToObjects(path.join(__dirname, 'dummies/moderators.txt'));
        expect(moderators.length).toBe(4);
        expect(moderators[0].firstname).toBe('Hans');
        expect(moderators[3].lastname).toBe('Integer-Veen');
    });

})