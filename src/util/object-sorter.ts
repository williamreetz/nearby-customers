export module ObjectSorter {      
    /**
     * Sorts the objects of the array by the given key.    
     * refference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort  
     * SPECIAL CODING TEST REQUIREMENT :)
     * @param unsortetArray 
     * @param key 
     * @param ascending 
     */
    export function sort(unsortetArray: any[], key: string, ascending: boolean = true): any[] {
        return unsortetArray.sort((o1, o2) => {
            const value = ascending ? 1 : -1
            if (o1[key] > o2[key]) {
                return -value;
            }
            if (o1[key] < o2[key]) {
                return value;
            }
            return 0;
        })
    }
}