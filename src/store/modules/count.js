import { interval } from 'rxjs';
import { tap, take } from 'rxjs/operators';

const state = {
  count: 0,
};

// getters
const getters = {
  count: state => state.count,
};

// actions
const actions = {
  asyncIncrement: ({ commit }) =>
    interval(1000).pipe(take(1), tap(() => commit('increment'))),
};

// mutations
const mutations = {
  increment(state) {
    state.count += 1;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
