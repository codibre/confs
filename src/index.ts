#!/usr/bin/env node
import { program } from 'commander';
import {
  setupProject,
  addScripts,
  createConfigFiles,
  getHelp,
  updateChangelog,
} from './lib';

program
  .command('setup-project')
  .description(
    'It will create basic config files and update your package scripts',
  )
  .option('-f, --force', 'force overwriting')
  .action(setupProject);
program
  .command('add-scripts')
  .description('It will update your package scripts')
  .option('-f, --force', 'force overwriting')
  .action(addScripts);
program
  .command('create-config-files')
  .description('It will create config files')
  .option('-f, --force', 'force overwriting')
  .action(createConfigFiles);
program
  .command('update-changelog')
  .description(
    'Create a new entry in the changelog with the current package version',
  )
  .action(updateChangelog);
program
  .command('help', { isDefault: true })
  .description('show help information')
  .action(getHelp);

program.version(process.env.NPM_PACKAGE_VERSION!);

program.parse(process.argv);
