import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavItem from '@/components/NavItem.vue'

describe('NavItem.vue', () => {
  const props = {
    target: '/mon-profil',
    label: 'Profil',
    icon: 'person-outline'
  }

  const global = {
    stubs: {
      RouterLink: {
        template: '<div class="router-link-mock" :to="to"><slot /></div>',
        props: ['to']
      },
      'ion-icon': {
        template: '<div class="icon-mock" :name="name"></div>',
        props: ['name']
      }
    }
  }

  it('affiche le label correctement dans le span', () => {
    const wrapper = mount(NavItem, { props, global })
    expect(wrapper.find('span').text()).toBe('Profil')
  })

  it('transmet la bonne cible (target) au RouterLink', () => {
    const wrapper = mount(NavItem, { props, global })
    const stub = wrapper.find('.router-link-mock')
    expect(stub.attributes('to')).toBe('/mon-profil')
  })

  it('transmet le bon nom d\'icône au composant ion-icon', () => {
    const wrapper = mount(NavItem, { props, global })
    const stub = wrapper.find('.icon-mock')
    expect(stub.attributes('name')).toBe('person-outline')
  })

  it('possède la classe CSS nav-item sur l\'élément racine', () => {
    const wrapper = mount(NavItem, { props, global })
    expect(wrapper.classes()).toContain('nav-item')
  })
})