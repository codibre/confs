import { restore } from 'sinon';
import sinonChai = require('sinon-chai');
import { use } from 'chai';
import { callsLike } from 'chai-callslike';
use(sinonChai);
use(callsLike);

beforeEach(() => {
  restore();
});
