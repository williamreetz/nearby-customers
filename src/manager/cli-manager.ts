import * as commander from 'commander';
import { CustomerManager } from './customer-manager';
import { config } from '../config/default-config';
import { Logger } from '../util/logger';

/**
 * This class setups everything for cli usage.
 * @author William Reetz
 * @export
 * @class CliManager
 */
export class CliManager {

    /**
     * The instance of this CliManager
     * @private
     * @static
     * @type {CliManager}
     * @memberof CliManager
     */
    private static instance: CliManager;

    /**
     * Creates an instance of CliManager.
     * @memberof CliManager
     */
    private constructor() { }

    /**
     * Initialised the CliManager
     * @static
     * @returns {CliManager} instance of CliManager
     * @memberof CliManager
     */
    static init(): CliManager {
        if (!CliManager.instance) {
            CliManager.instance = new CliManager();
            this.instance.setupCommander();
        }
        return CliManager.instance;
    }

    /**
     * Setups commander for simple cli using
     * https://github.com/tj/commander.js#readme
     * @private
     * @memberof CliManager
     */
    private setupCommander(): void {
        const customerManager = new CustomerManager();

        const cli = new commander.Command()
            .version('1.0')
            .option('-f, --file <path>', 'set the path to the customer.txt file')
            .option('-d, --distance <distance>', 'set distance to nearby customers')
            .option('-l, --location <location>', 'set default location', (value) => { return value.split(',') })
            .parse(process.argv);
        if (cli.distance) {
            if(+cli.distance){
                config.defaultDistance = cli.distance;
            }else{
                Logger.error('error: Distance must be numeric!');
                process.exit(9);
            }
        }
        if (cli.location) {
            if(cli.location.length === 2){
            config.defaultLocation.lat = cli.location[0];
            config.defaultLocation.lon = cli.location[1];
            }else{
                Logger.error('error: Define location like this: -l 11.11,22.22');
                process.exit(9);
            }
        }
        if (cli.file) {
            const customers = customerManager.getNearbyCustomers(cli.file);
            for (let customer of customers) {
                Logger.sucess(customer.id);
            }
        } else {
            Logger.error(
                'error: You have to specify the path to the customer.txt file\n' +
                'See --help for a list of available commands.'
            );
            process.exit(1);
        }
    }
}
