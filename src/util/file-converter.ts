import * as fs from 'fs';
import * as  path from 'path';

/**
 * An instance of this class converts a file to an array of objects
 * @author William Reetz
 * @export
 * @class FileConverter
 */
export class FileConverter {

    /**
     * Creates an instance of FileConverter.
     * @memberof FileConverter
     */
    constructor() { }

    /**
     * Converts a file to an array of objects.  
     * The file should have the following syntax:  
     * key1: value11, key12: value12, key12: value13,  
     * key1: value21, key22: value22, key22: value23,
     * @param {string} pathToFile
     * @returns {any[]} any[]
     * @memberof FileConverter
     */
    public convertToObjects(pathToFile: string): any[] {
        const file: string = fs.readFileSync(path.join(pathToFile), 'utf-8');
        return this.processing(file);
    }

    /**
     * This is a helper function to iterate over the file-data.
     * @private
     * @param {string} data
     * @returns {any[]} any[]
     * @memberof FileConverter
     */
    private processing(data: string): any[] {
        const objList: any[] = [];
        let lines = data.split('\n');
        for (let line of lines) {
            // remove spaces
            line = line.replace(/\s+/g, '');
            const obj: any = {};
            const params = line.split(',')
            for (let param of params) {
                // ignore emty params
                if (param !== '') {
                    const keyValuePair = param.split(':');
                    const key = keyValuePair[0];
                    const value = keyValuePair[1];
                    // parse to number if string is a number
                    obj[key] = +value ? +value : value;
                }
            }
            objList.push(obj);
        }
        return objList;
    }

}
