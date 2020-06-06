import { program } from 'commander';
import { getHelp } from '../../src/lib';
import { expect } from 'chai';
import { stub } from 'sinon';

describe('getHelp()', () => {
  it('should run program.help', () => {
    stub(program, 'help');

    const result = getHelp();

    expect(program.help);
    expect(result).to.be.undefined;
  });
});
