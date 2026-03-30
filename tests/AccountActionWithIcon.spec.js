import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AccountActionWithIcon from '@/components/AccountActionWithIcon.vue'

describe('AccountActionWithIcon.vue', () => {

  it('affiche le label et la description correctement', () => {
    const wrapper = mount(AccountActionWithIcon, {
      props: { 
        label: 'Mes Commandes', 
        target: '/orders',
        description: 'Historique de vos achats' 
      },
      global: { 
        stubs: {
          RouterLink: { template: '<a><slot /></a>' },
          'ion-icon': true 
        }
      }
    })

    expect(wrapper.find('.label-title').text()).toBe('Mes Commandes')
    expect(wrapper.find('.label-desc').text()).toBe('Historique de vos achats')
  })

  it('transmet le bon nom d\'icône à ion-icon', () => {
    const wrapper = mount(AccountActionWithIcon, {
      props: { label: 'Test', icon: 'cart-outline', target: '/' },
      global: { 
        stubs: {
          RouterLink: { template: '<a><slot /></a>' },
          'ion-icon': true 
        }
      }
    })

    // Rappel : on utilise -stub car ion-icon est stubbé
    expect(wrapper.find('ion-icon-stub').attributes('name')).toBe('cart-outline')
  })

  it('le lien pointe vers la bonne destination (target)', () => {
    const wrapper = mount(AccountActionWithIcon, {
      props: { label: 'Test', target: '/settings' },
      global: { 
        stubs: {
          // On passe la prop "to" au href du <a>
          RouterLink: { 
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          },
          'ion-icon': true 
        }
      }
    })

    expect(wrapper.find('a').attributes('href')).toBe('/settings')
  })

  it('ne rend pas le span de description si elle est vide', () => {
    const wrapper = mount(AccountActionWithIcon, {
      props: { label: 'Test', target: '/', description: '' },
      global: { 
        stubs: {
          RouterLink: { template: '<a><slot /></a>' },
          'ion-icon': true 
        }
      }
    })

    expect(wrapper.find('.label-desc').exists()).toBe(false)
  })

})