import { readDir, copyFile, exists } from './fs';

export const basePath = '/node_modules/@codibre/confs/templates';

export async function createConfigFiles({ force }: Record<string, unknown>) {
  if (force) {
    console.warn(
      "Have you used the force option so we can overwrite all your existing configuration files? Heh, champs, I hope you know what you're doing",
    );
  }
  const path = process.cwd();
  const packagePrefix = `${path}${basePath}`;
  const files = await readDir(packagePrefix);

  for (const source of files) {
    const dest = source.replace(packagePrefix, path);
    if (force || !(await exists(dest))) {
      console.info(`Copying ${source} to ${dest}...`);
      try {
        await copyFile(`${source}`, dest);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      console.error(
        `${dest} already exists! If you want to overwrite it, use the --force option`,
      );
    }
  }
  console.info('create-config-files has finished!');
}
