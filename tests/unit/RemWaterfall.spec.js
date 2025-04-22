import { mount } from '@vue/test-utils'
import RemWaterfall from '@/components/RemWaterfall.vue'

describe('RemWaterfall.vue', () => {
  it('renders empty state when list is empty', () => {
    const wrapper = mount(RemWaterfall, {
      propsData: {
        list: []
      }
    })
    expect(wrapper.find('.no-data').exists()).toBe(true)
  })

  it('renders items when list is not empty', () => {
    const items = [
      {
        id: 1,
        cover: 'test.jpg',
        width: 800,
        height: 600
      }
    ]
    const wrapper = mount(RemWaterfall, {
      propsData: {
        list: items
      }
    })
    expect(wrapper.find('.waterfall-list').exists()).toBe(true)
    expect(wrapper.findAll('.waterfall-item')).toHaveLength(1)
  })

  it('computes correct item dimensions', () => {
    const items = [
      {
        id: 1,
        cover: 'test.jpg',
        width: 800,
        height: 600
      }
    ]
    const wrapper = mount(RemWaterfall, {
      propsData: {
        list: items,
        itemWidth: 10
      }
    })
    const item = wrapper.find('.waterfall-item')
    expect(item.attributes('style')).toContain('width: 10rem')
  })

  it('handles image load event', async () => {
    const items = [
      {
        id: 1,
        cover: 'test.jpg',
        width: 800,
        height: 600
      }
    ]
    const wrapper = mount(RemWaterfall, {
      propsData: {
        list: items
      }
    })
    const img = wrapper.find('img')
    await img.trigger('load')
    expect(wrapper.vm.waterfallList[0].height).toBeDefined()
  })

  it('handles image error event', async () => {
    const items = [
      {
        id: 1,
        cover: 'test.jpg',
        width: 800,
        height: 600
      }
    ]
    const wrapper = mount(RemWaterfall, {
      propsData: {
        list: items
      }
    })
    const img = wrapper.find('img')
    await img.trigger('error')
    expect(wrapper.vm.errorImages.has('test.jpg')).toBe(true)
  })

  it('updates layout when column changes', async () => {
    const items = [
      {
        id: 1,
        cover: 'test.jpg',
        width: 800,
        height: 600
      }
    ]
    const wrapper = mount(RemWaterfall, {
      propsData: {
        list: items,
        column: 2
      }
    })
    
    await wrapper.setProps({ column: 4 })
    expect(wrapper.vm.colHeights).toHaveLength(4)
  })

  it('handles custom slot content', () => {
    const items = [
      {
        id: 1,
        cover: 'test.jpg',
        width: 800,
        height: 600
      }
    ]
    const wrapper = mount(RemWaterfall, {
      propsData: {
        list: items
      },
      scopedSlots: {
        default: '<div class="custom-content">{{ props.item.id }}</div>'
      }
    })
    expect(wrapper.find('.custom-content').exists()).toBe(true)
    expect(wrapper.find('.custom-content').text()).toBe('1')
  })

  it('handles empty slot content', () => {
    const wrapper = mount(RemWaterfall, {
      propsData: {
        list: []
      },
      slots: {
        empty: '<div class="custom-empty">No items</div>'
      }
    })
    expect(wrapper.find('.custom-empty').exists()).toBe(true)
    expect(wrapper.find('.custom-empty').text()).toBe('No items')
  })
}) 