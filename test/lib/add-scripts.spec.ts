import { stub, match } from 'sinon';
import * as cmd from '../../src/lib/npm-add-script';
import { addScripts } from '../../src/lib';
import { expect } from 'chai';

describe('addScripts()', () => {
  beforeEach(() => {
    stub(cmd, 'npmAddScript');
  });

  it('should add scripts to package.json but not forcing anything when force is falsy', () => {
    addScripts({ force: false });

    expect(cmd.npmAddScript).to.have.callCount(19);
    expect(cmd.npmAddScript).to.have.been.calledWithExactly(
      match.has('force', false),
    );
  });

  it('should add scripts to package.json forcing overwriting when force is truthy', () => {
    addScripts({ force: true });

    expect(cmd.npmAddScript).to.have.callCount(19);
    expect(cmd.npmAddScript).to.have.been.calledWithExactly(
      match.has('force', true),
    );
  });
});
