import { program } from 'commander';
import { setupProject, addScripts, createConfigFiles } from './lib';
import { updateChangelog } from './lib/update-changelog';

program
  .command(
    'setup-project',
    'It will create basic config files and update your package scripts',
  )
  .option('-f, --force', 'force overwriting')
  .action(setupProject);
program
  .command('add-scripts', 'It will update your package scripts')
  .option('-f, --force', 'force overwriting')
  .action(addScripts);
program
  .command('create-config-files', 'It will create config files')
  .option('-f, --force', 'force overwriting')
  .action(createConfigFiles);
program.command('update-changelog').action(updateChangelog);

program.parse(process.argv);
