import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AnnonceLite from '@/components/AnnonceLite.vue'

describe('AnnonceLite.vue', () => {
  const defaultProps = {
    title: 'Bel appartement centre-ville',
    category: 'Appartement',
    price: 150,
    capacity: 4,
    city: 'Annecy',
    publishDate: 'Publié hier',
    isNew: true,
    isPro: true
  }

  const globalConfig = {
    stubs: {
      LikeButton: {
        template: '<div class="like-stub"></div>',
        props: ['liked']
      },
      'ion-icon': true
    }
  }

  it('affiche les informations textuelles de l\'annonce', () => {
    const wrapper = mount(AnnonceLite, {
      props: defaultProps,
      global: globalConfig
    })

    expect(wrapper.find('.annonce-title').text()).toBe(defaultProps.title)
    expect(wrapper.find('.annonce-city').text()).toBe(defaultProps.city)
    expect(wrapper.text()).toContain('150 €')
  })

  it('affiche le badge "À la une" uniquement si isNew est true', async () => {
    const wrapper = mount(AnnonceLite, {
      props: { ...defaultProps, isNew: true },
      global: globalConfig
    })
    expect(wrapper.find('.a-la-une').exists()).toBe(true)

    await wrapper.setProps({ isNew: false })
    expect(wrapper.find('.a-la-une').exists()).toBe(false)
  })

  it('affiche le badge "Pro" uniquement si isPro est true', async () => {
    const wrapper = mount(AnnonceLite, {
      props: { ...defaultProps, isPro: true },
      global: globalConfig
    })
    expect(wrapper.find('.annonce-pro').exists()).toBe(true)

    await wrapper.setProps({ isPro: false })
    expect(wrapper.find('.annonce-pro').exists()).toBe(false)
  })

  it('rend le composant LikeButton avec l\'état initial', () => {
    const wrapper = mount(AnnonceLite, {
      props: defaultProps,
      global: globalConfig
    })
    
    // Le composant LikeButton est bien présent
    expect(wrapper.find('.like-stub').exists()).toBe(true)
  })

  it('affiche la capacité et la catégorie', () => {
    const wrapper = mount(AnnonceLite, {
      props: defaultProps,
      global: globalConfig
    })
    
    expect(wrapper.find('.annonce-capacity').text()).toContain('4 pers.')
    expect(wrapper.find('.annonce-category').text()).toBe('Appartement')
  })
})