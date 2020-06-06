import { readFile, writeFile, exists } from './fs';

interface NpmPackage {
  version: string;
}

export async function updateChangelog() {
  console.log('Reading package.json');
  const v = (JSON.parse(
    (await readFile('package.json')).toString(),
  ) as NpmPackage).version;
  const changeLogFile = 'CHANGELOG.md';
  let content = (await exists(changeLogFile))
    ? (await readFile(changeLogFile)).toString()
    : '';

  if (content.replace(/[\r\n]/g, '') === '') {
    content = `# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Next Release

`;
  }
  const c = content.replace(
    /(Next Release\n-*)/i,
    '$1\n\n\n-'.padStart(v.length, '-') + `v${v}`,
  );
  await writeFile(changeLogFile, c);
  console.log(c);
}
