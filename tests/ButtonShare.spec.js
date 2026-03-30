import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
// ON IMPORTE LE VRAI NOM DU FICHIER : ButtonShare.vue
import ButtonShare from '@/components/ButtonShare.vue' 

describe('ButtonShare.vue', () => {

  it('affiche correctement le conteneur principal du bouton', () => {
    const wrapper = mount(ButtonShare, {
      global: { stubs: ['ion-icon'] }
    })

    // On vérifie que la div principale est bien présente
    expect(wrapper.find('.share-button').exists()).toBe(true)
  })

  it('affiche l\'icône de partage "share-social-outline"', () => {
    const wrapper = mount(ButtonShare, {
      global: { stubs: ['ion-icon'] }
    })

    // On cherche le faux composant ion-icon
    const icon = wrapper.find('ion-icon-stub')
    
    expect(icon.exists()).toBe(true)
    // On vérifie qu'il a bien reçu le nom attendu
    expect(icon.attributes('name')).toBe('share-social-outline')
  })

})