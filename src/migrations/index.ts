import * as migration_20260924_105125 from './20260924_105125';

export const migrations = [
  {
    up: migration_20260924_105125.up,
    down: migration_20260924_105125.down,
    name: '20260924_105125'
  },
];
