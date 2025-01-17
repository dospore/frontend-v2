import { merge } from 'lodash';

const defaultArgs = {
  first: 1000,
  where: {
    swapVolume_gt: 0
  }
};

const defaultAttrs = {
  swapFee: true,
  swapVolume: true,
  pair: {
    token0: {
      address: true,
      symbol: true
    },
    token1: {
      address: true,
      symbol: true
    }
  }
};

export default (args = {}, attrs = {}) => ({
  tradePairSnapshots: {
    __args: merge({}, defaultArgs, args),
    ...merge({}, defaultAttrs, attrs)
  }
});
