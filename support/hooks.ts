import {Before, After} from 'cucumber';
import {CustomWorld} from './CustomWorld';

Before(async function(this: CustomWorld) {
    await this.init();
});

After(async function(this: CustomWorld) {
    await this.destroy();
});
