import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import GalleryCard from '@/components/GalleryCard.vue'

describe('GalleryCard.vue', () => {
  it('Calls API with id passed on cardData', () => {
    let cardData = { id: '3c02b8ee-84cb-44cb-ba14-9e725a9d03ee' }
    const wrapper = shallowMount(GalleryCard, {
      propsData: { cardData }
    })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.title).to.equal('Ponder')
      done()
    })
  })
})
