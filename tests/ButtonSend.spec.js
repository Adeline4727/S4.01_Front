import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
// On importe le VRAI nom de votre composant : ButtonSend.vue
import ButtonSend from '@/components/ButtonSend.vue' 

describe('ButtonSend.vue', () => {

  it('affiche correctement le conteneur du bouton', () => {
    const wrapper = mount(ButtonSend, {
      global: { stubs: ['ion-icon'] }
    })

    // On vérifie que le span (ou le lien) principal est bien là avec sa classe
    expect(wrapper.find('.button-with-icon').exists()).toBe(true)
  })

  it('affiche l\'icône "send"', () => {
    const wrapper = mount(ButtonSend, {
      global: { stubs: ['ion-icon'] }
    })

    // On cherche le faux composant ion-icon
    const icon = wrapper.find('ion-icon-stub')
    
    expect(icon.exists()).toBe(true)
    // On vérifie qu'il a bien reçu le nom "send"
    expect(icon.attributes('name')).toBe('send')
  })

})