import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
// On importe le BON fichier composant : Button.vue
import Button from '@/components/Button.vue' 

describe('Button.vue', () => {

  it('affiche le contenu passé dans le slot', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Valider' },
      global: { stubs: ['ion-icon'] }
    })

    expect(wrapper.text()).toContain('Valider')
  })

  it('applique la largeur par défaut (220px) si aucune n\'est précisée', () => {
    const wrapper = mount(Button, {
      global: { stubs: ['ion-icon'] }
    })

    // On vérifie que l'attribut style contient bien 220px
    expect(wrapper.find('.pclasse').attributes('style')).toContain('width: 220px')
  })

  it('applique une largeur personnalisée via la prop buttonWidth', () => {
    const wrapper = mount(Button, {
      props: { buttonWidth: 150 },
      global: { stubs: ['ion-icon'] }
    })

    expect(wrapper.find('.pclasse').attributes('style')).toContain('width: 150px')
  })

  it('affiche l\'icône si la prop icon est fournie', () => {
    const wrapper = mount(Button, {
      props: { icon: 'settings-outline' },
      global: { stubs: ['ion-icon'] }
    })

    const icon = wrapper.find('ion-icon-stub')
    expect(icon.exists()).toBe(true)
    expect(icon.attributes('name')).toBe('settings-outline')
  })

  it('n\'affiche pas d\'icône si la prop icon est vide', () => {
    const wrapper = mount(Button, {
      global: { stubs: ['ion-icon'] }
    })

    expect(wrapper.find('ion-icon-stub').exists()).toBe(false)
  })

  it('désactive le bouton si la prop isDisabled contient du texte', () => {
    const wrapper = mount(Button, {
      props: { isDisabled: 'oui' },
      global: { stubs: ['ion-icon'] }
    })

    // On s'assure que le bouton HTML a bien l'attribut disabled à true
    expect(wrapper.find('.pclasse').element.disabled).toBe(true)
  })

  it('laisse le bouton actif si la prop isDisabled est vide', () => {
    const wrapper = mount(Button, {
      props: { isDisabled: '' }, // vide
      global: { stubs: ['ion-icon'] }
    })

    expect(wrapper.find('.pclasse').element.disabled).toBe(false)
  })

})