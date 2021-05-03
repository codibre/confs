import { createConfigFiles } from './create-config-files';
import { addScripts } from './add-scripts';

export async function setupProject(params: Record<string, unknown>) {
  if (params.force) {
    console.warn(
      "Have you used the force option? Heh, champs, I hope you know what you're doing",
    );
  }
  await createConfigFiles(params);
  addScripts(params);
}
