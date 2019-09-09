import api from '@/api/api'

export const tools = () => {
  return {
    sortBy: function _sortBy (field, reverse, primer) {
      var key = function (x) {
        return primer ? primer(x[field]) : x[field]
      }
      return function (a, b) {
        var A = key(a); var B = key(b)
        return ((A < B) ? -1 : ((A > B) ? 1 : 0)) * [-1, 1][+!!reverse]
      }
    },

    pluck: function (array, key) {
      return array.map(o => o[key])
    },

    keyBy: (array, key) => (array || []).reduce((r, x) => ({ ...r, [key ? x[key] : x]: x }), {}),

    fastPush: (array, item) => array[array.length] = item,

    intersection: (...arrays) => {
      return arrays.reduce((a, b) => a.filter(c => b.includes(c)))
    }

  }
}
