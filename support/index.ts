import {setDefaultTimeout, setWorldConstructor} from 'cucumber';
import {CustomWorld} from './CustomWorld';

setWorldConstructor(CustomWorld);
setDefaultTimeout(10000);
