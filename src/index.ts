import { program } from 'commander';
import { setupProject, addScripts } from './lib';
import { updateChangelog } from './lib/update-changelog';

program
  .command('setup-project')
  .option(
    '-f, --force',
    'force overwriting of config files and package scripts',
  )
  .action(setupProject);
program
  .command('add-scripts')
  .option('-f, --force', 'force overwriting of package scripts')
  .action(addScripts);
program.command('update-changelog').action(updateChangelog);
