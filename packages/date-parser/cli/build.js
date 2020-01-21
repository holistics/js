const { exec } = require('pkg');
const pjson = require('../package.json');

const cliVersion = pjson.version.replace(/\./g, '_');
exec(['./cli/index.js', '--targets=node12-linux-x64', `--output=./dist/date_parser_${cliVersion}`]);
