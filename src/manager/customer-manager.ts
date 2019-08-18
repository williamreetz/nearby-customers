import { Customer } from '../model/customer';
import { Location } from '../model/location';
import { FileConverter } from '../util/file-converter';
import { config } from '../config/default-config';
import { Logger } from '../util/logger';
import { ObjectSorter } from '../util/object-sorter';

/**
 * This class provides methods to find nearby customers.
 * @author William Reetz
 * @export
 * @class CustomerManager
 */
export class CustomerManager {

    /**
     * Creates an instance of CustomerManager.
     * @memberof CustomerManager
     */
    constructor() { }

    /**
     * returns an Array of the nearby customers.  
     * @param {string} pathToFile
     * @returns {Customer[]}
     * @memberof CustomerManager
     */
    public getNearbyCustomers(pathToFile: string): Customer[] {
        const nearCustomers: Customer[] = []
        const customers: Customer[] = this.getAllCustomers(pathToFile);
        const fovLocation: Location = new Location(config.defaultLocation.lat, config.defaultLocation.lon);
        for (let customer of customers) {
            if (this.checkCustomer(customer)) {
                const customerLocation: Location = new Location(customer.lat, customer.long);
                if (customerLocation.greateCircleDistanceTo(fovLocation) <= config.defaultDistance) {
                    nearCustomers.push(customer);
                }
            }
        }
        return ObjectSorter.sort(nearCustomers, 'id');
    }

    /**
     * Returns an array of all customers
     * @param {string} pathToFile
     * @returns {Customer[]}
     * @memberof CustomerManager
     */
    public getAllCustomers(pathToFile: string): Customer[] {
        const converter: FileConverter = new FileConverter();
        const customers: Customer[] = converter.convertToObjects(pathToFile);
        return customers;
    }

    /**
     * Returns true if the customer is valid.
     * @private
     * @param {Customer} customer
     * @returns {boolean}
     * @memberof CustomerManager
     */
    private checkCustomer(customer: Customer): boolean {
        let customerStr = JSON.stringify(customer);
        if (!this.checkCustomerType(customer)) {
            Logger.warn('Warning: Invalid Customer detected!\n => ' + customerStr);
            return false;
        }
        if (!this.checkCustomerID(customer.id)) {
            Logger.warn('Warning: Invalid CustomerID detected!\n => ' + customerStr);
            return false;
        }
        if (!this.checkCustomerLocation(customer.lat, customer.long)) {
            Logger.warn('Warning: Invalid geographic coordinates detected!\n => ' + customerStr);
            return false;
        }
        return true
    }

    /**
     * Returns true if the given Object has the type customer.
     * @private
     * @param {*} customer
     * @returns {customer is Customer}
     * @memberof CustomerManager
     */
    private checkCustomerType(customer: any): customer is Customer {
        return !!(customer as Customer).id;
    }

    /**
     * Returns true if the customerID is valid.
     * @private
     * @param {string} id
     * @returns {boolean}
     * @memberof CustomerManager
     */
    private checkCustomerID(customerID: string): boolean {
        const re = /^[\w]{8}-(?:[\w]{4}-){3}[\w]{12}$/
        return re.test(customerID);
    }

    /**
     * Returns true if the given params are numeric.
     * @private
     * @param {*} lon
     * @param {*} lat
     * @returns {boolean}
     * @memberof CustomerManager
     */
    private checkCustomerLocation(lon: any, lat: any): boolean {
        return !!(+lon) && !!(+lat);
    }
}
