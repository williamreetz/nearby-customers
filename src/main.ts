#!/usr/bin/env node

import { CliManager } from './manager/cli-manager';

/**
 * Main class.
 * @author William Reetz
 * @class Main
 */
class Main {
    public main(): void {
        CliManager.init();
    }
}

const main: Main = new Main();
main.main();