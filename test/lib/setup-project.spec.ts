import { setupProject } from '../../src/lib';
import lib1 = require('../../src/lib/add-scripts');
import lib2 = require('../../src/lib/create-config-files');
import { stub, match } from 'sinon';
import { expect } from 'chai';

describe('setupProject()', () => {
  beforeEach(() => {
    stub(lib1, 'addScripts');
    stub(lib2, 'createConfigFiles').resolves();
    stub(console, 'warn');
  });

  it('should call createConfigFiles and addScripts', async () => {
    const params = { info: 'params' };
    const result = await setupProject(params);

    expect(console.warn).to.have.not.been.called;
    expect(lib2.createConfigFiles).to.have.been.calledOnceWithExactly(params);
    expect(lib1.addScripts).to.have.been.calledOnceWithExactly(params);
    expect(result).to.be.undefined;
  });

  it('should call createConfigFiles and addScripts and warn user if it uses force', async () => {
    const params = { info: 'params', force: true };
    const result = await setupProject(params);

    expect(console.warn).to.have.callsLike([match.string]);
    expect(lib2.createConfigFiles).to.have.callsLikeExactly([params]);
    expect(lib1.addScripts).to.have.callsLike([params]);
    expect(result).to.be.undefined;
  });
});
