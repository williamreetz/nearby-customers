import { CustomerManager } from '../manager/customer-manager';
import * as path from 'path'
import { Customer } from '../model/customer';

const customerManager: CustomerManager = new CustomerManager();

describe('CustomerManager', () => {

    it('should return two nearby customers', () => {
        const customers: Customer[] = customerManager.getNearbyCustomers(path.join(__dirname, 'dummies/two-nearby-customers.txt'));
        expect(customers.length).toBe(2);
    });

    it('should return all customers', () => {
        const customers: Customer[] = customerManager.getAllCustomers(path.join(__dirname, 'dummies/customers.txt'));
        expect(customers.length).toBe(399);
    });

    it('should return no customer on broken file', () => {
        const customers: Customer[] = customerManager.getNearbyCustomers(path.join(__dirname, 'dummies/customers-broken.txt'));
        expect(customers.length).toBe(0);
    });

});
