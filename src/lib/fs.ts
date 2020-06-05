import recursiveReadDir = require('recursive-readdir');
import fs = require('fs');
import { promisify } from 'util';

export const readDir = recursiveReadDir as (
  path: string,
) => PromiseLike<string[]>;

export const copyFile = promisify(fs.copyFile);
export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);
export const exists = promisify(fs.exists);
