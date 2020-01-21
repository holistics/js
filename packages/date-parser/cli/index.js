const parse = require('./commands/parse');

const wrapHandler = (callback) => {
  return (argv) => {
    let res = {};
    let exitCode = 0;
    try {
      res = callback(argv);
    } catch (err) {
      res = {
        error: err.message,
      };
      if (argv.debug) res.errorStack = err.stack;
      exitCode = 1;
    }
    console.log(JSON.stringify(res));
    process.exit(exitCode);
  };
};

require('yargs')
  .command({
    command: 'parse <text> <ref>',
    desc: 'parse date text into a date range',
    handler: wrapHandler(parse),
  })
  .help()
  .demandCommand()
  .parse();
