import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
// ✅ Import aligné sur le nom du fichier de test
import SearchFieldWithIcon from '@/components/SearchFieldWithIcon.vue'

describe('SearchFieldWithIcon.vue', () => {

  it('affiche le bon placeholder dans l\'input', () => {
    const placeholderText = 'Où allez-vous ?'
    const wrapper = mount(SearchFieldWithIcon, {
      props: { placeholder: placeholderText },
      global: { stubs: { 'ion-icon': true } }
    })

    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe(placeholderText)
  })

  it('transmet le nom de l\'icône principale au composant ion-icon', () => {
    const wrapper = mount(SearchFieldWithIcon, {
      props: { icon: 'location-outline' },
      global: { stubs: { 'ion-icon': true } }
    })

    const icon = wrapper.find('.icon')
    expect(icon.attributes('name')).toBe('location-outline')
  })

  it('n\'affiche pas le chevron par défaut', () => {
    const wrapper = mount(SearchFieldWithIcon, {
      props: { icon: 'search' },
      global: { stubs: { 'ion-icon': true } }
    })

    expect(wrapper.find('.cv').exists()).toBe(false)
  })

  it('affiche le chevron quand hasChevron est à true', () => {
    const wrapper = mount(SearchFieldWithIcon, {
      props: { 
        icon: 'search',
        hasChevron: true 
      },
      global: { stubs: { 'ion-icon': true } }
    })

    const chevron = wrapper.find('.cv')
    expect(chevron.exists()).toBe(true)
    expect(chevron.attributes('name')).toBe('chevron-down')
  })

})