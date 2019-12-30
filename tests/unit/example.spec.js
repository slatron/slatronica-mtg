import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import HeaderBar from '@/components/common/HeaderBar'

describe('Header Bar Mounts', () => {
  it('Mounts Header Bar', () => {
    const wrapper = shallowMount(HeaderBar)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
