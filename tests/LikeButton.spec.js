import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
// ⚠️ MODIFIEZ CETTE LIGNE SI LE NOM DE VOTRE FICHIER EST DIFFÉRENT :
import LikeButton from '@/components/LikeButton.vue'

describe('LikeButton.vue', () => {

  it('affiche le coeur vide par défaut (liked: false)', () => {
    const wrapper = mount(LikeButton, {
      props: { liked: false },
      global: { stubs: ['ion-icon'] }
    })

    // On vérifie que l'icône heart-outline est là
    const icon = wrapper.find('ion-icon-stub')
    expect(icon.attributes('name')).toBe('heart-outline')
    expect(icon.classes()).not.toContain('liked')
  })

  it('affiche le coeur plein et rouge quand liked est true', () => {
    const wrapper = mount(LikeButton, {
      props: { liked: true },
      global: { stubs: ['ion-icon'] }
    })

    const icon = wrapper.find('ion-icon-stub')
    expect(icon.attributes('name')).toBe('heart')
    // On vérifie la classe CSS pour la couleur
    expect(icon.classes()).toContain('liked')
  })

  it('émet l\'événement "update:liked" avec la valeur inverse au clic', async () => {
    const wrapper = mount(LikeButton, {
      props: { liked: false },
      global: { stubs: ['ion-icon'] }
    })

    // On simule le clic sur le bouton
    await wrapper.find('.like-button').trigger('click')

    // On vérifie que l'événement a été émis
    expect(wrapper.emitted()).toHaveProperty('update:liked')
    // On vérifie que la valeur envoyée est "true" (l'inverse de false)
    expect(wrapper.emitted('update:liked')[0]).toEqual([true])
  })

  it('affiche le contenu passé dans le slot', () => {
    const wrapper = mount(LikeButton, {
      slots: {
        default: 'Ajouter aux favoris'
      },
      global: { stubs: ['ion-icon'] }
    })

    expect(wrapper.text()).toContain('Ajouter aux favoris')
  })

})