const chalk = require('chalk');

export module Logger {
    /**
     * orange console log
     * @export
     * @param {string} str
     */
    export function warn(str: string): void {
        console.log(chalk.keyword('orange')(str));
    }

    /**
     * red console log
     * @export
     * @param {string} str
     */
    export function error(str: string): void {
        console.log(chalk.red(str));
    }

    /**
     * green console output
     * @export
     * @param {string} str
     */
    export function sucess(str: string): void {
        console.log(chalk.green(str));
    }
}