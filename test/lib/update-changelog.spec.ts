import { stub, SinonStub, match } from 'sinon';
import fs = require('../../src/lib/fs');
import { updateChangelog } from '../../src/lib';
import { expect } from 'chai';
import 'chai-callslike';

describe('updateChangelog()', () => {
  let exists: SinonStub;

  beforeEach(() => {
    stub(console, 'log');
    stub(fs, 'readFile').callsFake(async (x) =>
      x.toString() === 'package.json'
        ? '{"version":"9.9.9"}'
        : `# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Next Release


U-MA MAO MAO BABA U-MA MAO MAO`,
    );
    exists = stub(fs, 'exists').resolves(true);
    stub(fs, 'writeFile').resolves();
  });

  it('should insert new version just after Next Release when there is an existing CHANGELOG.md', async () => {
    const result = await updateChangelog();

    const logContent = `# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Next Release



-v9.9.9

U-MA MAO MAO BABA U-MA MAO MAO`;
    expect(console.log).to.have.callsLike([match.string], [logContent]);
    expect(exists).to.have.callsLike(['CHANGELOG.md']);
    expect(fs.readFile).to.have.callsLike(['package.json'], ['CHANGELOG.md']);
    expect(fs.writeFile).to.have.callsLike(['CHANGELOG.md', logContent]);
    expect(result).to.be.undefined;
  });

  it('should create CHANGELOG.md with current version when there is no existing CHANGELOG.md', async () => {
    exists.resolves(false);

    const result = await updateChangelog();

    const logContent = `# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Next Release



-v9.9.9
`;
    expect(console.log).to.have.callsLike([match.string], [logContent]);
    expect(fs.readFile).to.have.callsLike(['package.json']);
    expect(fs.writeFile).to.have.callsLike(['CHANGELOG.md', logContent]);
    expect(result).to.be.undefined;
  });
});
