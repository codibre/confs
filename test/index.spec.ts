import { program } from 'commander';
import { stub } from 'sinon';
import { expect } from 'chai';

describe('index.ts', () => {
  it('should parse process.argv', () => {
    stub(program, 'parse');

    require('../src/index');

    expect(program.parse).to.have.callsLike([process.argv]);
  });
});
