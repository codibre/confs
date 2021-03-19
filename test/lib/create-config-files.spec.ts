import { stub, match } from 'sinon';
import { createConfigFiles, basePath } from '../../src/lib';
import { expect } from 'chai';
import fs = require('../../src/lib/fs');
import 'sinon-chai-calls-assertion';

describe('createConfigFile()', () => {
  const expectedError = new Error('my error');

  beforeEach(() => {
    stub(process, 'cwd').returns('base-path');
    stub(fs, 'readDir').resolves([
      `base-path${basePath}/path1`,
      `base-path${basePath}/path2`,
      `base-path${basePath}/path3`,
      `base-path${basePath}/path4`,
    ]);
    stub(fs, 'exists').callsFake(async (x) => x.toString().endsWith('path3'));
    stub(fs, 'copyFile').callsFake(async (x) => {
      if (x.toString().endsWith('path2')) {
        throw expectedError;
      }
      return Promise.resolve();
    });
    stub(console, 'warn');
    stub(console, 'info');
    stub(console, 'error');
  });

  it('should copy all files from templates folder', async () => {
    const params = { info: 'params' };

    const result = await createConfigFiles(params);

    expect(console.warn).to.have.callsLike();
    expect(process.cwd).to.have.callsLike([]);
    expect(fs.readDir).to.have.callsLike([`base-path${basePath}`]);
    expect(fs.exists).to.have.callsLike(
      ['base-path/path1'],
      ['base-path/path2'],
      ['base-path/path3'],
      ['base-path/path4'],
    );
    expect(console.info).to.have.callsLike(
      [`Copying base-path${basePath}/path1 to base-path/path1...`],
      [`Copying base-path${basePath}/path2 to base-path/path2...`],
      [`Copying base-path${basePath}/path4 to base-path/path4...`],
      ['create-config-files has finished!'],
    );
    expect(fs.copyFile).to.have.callsLike(
      [`base-path${basePath}/path1`, 'base-path/path1'],
      [`base-path${basePath}/path2`, 'base-path/path2'],
      [`base-path${basePath}/path4`, 'base-path/path4'],
    );
    expect(console.error).to.have.callsLike(
      ['my error'],
      [match(/base\-path\/path3.+/)],
    );
  });

  it('should copy all files from templates folder and forcing overwriting, if force is true', async () => {
    const params = { info: 'params', force: true };

    const result = await createConfigFiles(params);

    expect(console.warn).to.have.callsLike([match.string]);
    expect(process.cwd).to.have.callsLike([]);
    expect(fs.readDir).to.have.callsLike([`base-path${basePath}`]);
    expect(fs.exists).to.have.callsLike();
    expect(console.info).to.have.callsLike(
      [`Copying base-path${basePath}/path1 to base-path/path1...`],
      [`Copying base-path${basePath}/path2 to base-path/path2...`],
      [`Copying base-path${basePath}/path3 to base-path/path3...`],
      [`Copying base-path${basePath}/path4 to base-path/path4...`],
      ['create-config-files has finished!'],
    );
    expect(fs.copyFile).to.have.callsLike(
      [`base-path${basePath}/path1`, 'base-path/path1'],
      [`base-path${basePath}/path2`, 'base-path/path2'],
      [`base-path${basePath}/path3`, 'base-path/path3'],
      [`base-path${basePath}/path4`, 'base-path/path4'],
    );
    expect(console.error).to.have.callsLike(['my error']);
  });
});
