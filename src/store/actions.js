export default {
  reset({
    commit
  }) {
    commit('netStatus', {});
    commit('msg', '');
    commit('error', '');
  }
}