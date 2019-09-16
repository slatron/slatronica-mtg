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
    },

    /**
     *  Safely access data from nested objects with tools().get(fn)
     *  - Replicates _.get
     *  - Pass accesor as function to use
     *  - Pass defaultVal param to return in place of undefined
     *
     *  Example:
     *  - const obj = {foo: bar: { fizz: 'buzz' }}
     *
     *  - tools().get(() => obj.foo.bar.fizz)      // returns 'buzz'
     *  - tools().get(() => obj.foo.yes.no)        // returns undefined
     *  - tools().get(() => obj.foo.yes.no, 'boo') // returns 'boo'
     **/
    get: (fn, defaultVal) => {
           try {
             return fn();
           } catch (e) {
             return defaultVal;
           }
         }

  }
}
