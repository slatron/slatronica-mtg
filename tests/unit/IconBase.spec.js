import { mount } from '@vue/test-utils'
import IconBase from '@/components/common/IconBase'

describe('IconBase', () => {
  test('IconBase is a Vue instance', () => {
    const wrapper = mount(IconBase)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
