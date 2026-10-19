import * as migration_20260924_105125 from './20260924_105125';
import * as migration_20261019_132110_dokumendi_keel from './20261019_132110_dokumendi_keel';

export const migrations = [
  {
    up: migration_20260924_105125.up,
    down: migration_20260924_105125.down,
    name: '20260924_105125',
  },
  {
    up: migration_20261019_132110_dokumendi_keel.up,
    down: migration_20261019_132110_dokumendi_keel.down,
    name: '20261019_132110_dokumendi_keel'
  },
];
