import { createConfigFiles } from './create-config-files';
import { addScripts } from './add-scripts';
import { updateChangelog } from './update-changelog';

export async function setupProject(params: any) {
  if (params.force) {
    console.warn(
      "Have you used the force option? Heh, champs, I hope you know what you're doing",
    );
  }
  await createConfigFiles(params);
  addScripts(params);
}
