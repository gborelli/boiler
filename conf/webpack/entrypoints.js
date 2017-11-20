import path from 'path';
import PATH from './paths';

// for multiple output directories,
// see: https://stackoverflow.com/a/33086806
export default {
  main: [
    path.resolve(PATH.src),
  ],
};
