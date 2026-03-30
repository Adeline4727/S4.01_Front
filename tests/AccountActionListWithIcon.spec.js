import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
// Remplacez par le vrai nom de votre fichier s'il est différent !
import AccountActionListWithIcon from '@/components/AccountActionListWithIcon.vue' 

describe('AccountActionListWithIcon.vue', () => {

  it('affiche correctement le label passé en prop', () => {
    const wrapper = mount(AccountActionListWithIcon, {
      props: { label: 'Sécurité', icon: 'lock-closed' },
      global: { stubs: ['ion-icon'] }
    })

    expect(wrapper.find('.label-title').text()).toBe('Sécurité')
  })

  it('transmet correctement le nom de l\'icône à la balise ion-icon', () => {
    const wrapper = mount(AccountActionListWithIcon, {
      props: { label: 'Sécurité', icon: 'lock-closed' },
      global: { stubs: ['ion-icon'] }
    })

    // CORRECTION ICI : On cherche la balise simulée (avec -stub à la fin)
    expect(wrapper.find('ion-icon-stub').attributes('name')).toBe('lock-closed')
  })

  it('affiche la description si elle est fournie', () => {
    const wrapper = mount(AccountActionListWithIcon, {
      props: { 
        label: 'Sécurité', 
        icon: 'lock',
        description: 'Mot de passe et double authentification' 
      },
      global: { stubs: ['ion-icon'] }
    })

    expect(wrapper.find('.label-desc').exists()).toBe(true)
    expect(wrapper.find('.label-desc').text()).toBe('Mot de passe et double authentification')
  })

  it('n\'affiche pas la zone de description si elle est vide', () => {
    const wrapper = mount(AccountActionListWithIcon, {
      props: { 
        label: 'Sécurité', 
        icon: 'lock',
        description: '' // Description vide
      },
      global: { stubs: ['ion-icon'] }
    })

    expect(wrapper.find('.label-desc').exists()).toBe(false)
  })

  // --- LE NOUVEAU TEST POUR LE SLOT ---
  it('affiche le contenu HTML passé à l\'intérieur du slot', () => {
    const wrapper = mount(AccountActionListWithIcon, {
      props: { label: 'Sécurité', icon: 'lock' },
      global: { stubs: ['ion-icon'] },
      
      // C'EST ICI QU'ON TESTE LE SLOT !
      // On simule un autre composant ou du HTML qu'on viendrait glisser dedans
      slots: {
        default: '<button class="mon-bouton-test">Changer le mot de passe</button>'
      }
    })

    // On vérifie que notre bouton de test apparaît bien à l'intérieur de la div ".list"
    expect(wrapper.find('.list .mon-bouton-test').exists()).toBe(true)
    expect(wrapper.find('.list').text()).toContain('Changer le mot de passe')
  })

})