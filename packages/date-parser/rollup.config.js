import pkg from './package.json';
import configBuilder from '../../rollup.config';

const configs = configBuilder(pkg.name.replace('@holistics/', ''));

export default configs;
