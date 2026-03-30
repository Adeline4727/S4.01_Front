import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BouttonAjtAnnonce from '@/components/BouttonAjtAnnonce.vue' 

describe('BouttonAjtAnnonce.vue', () => {

  it('affiche correctement le contenu passé dans le slot', () => {
    const wrapper = mount(BouttonAjtAnnonce, {
      slots: {
        default: 'Ajouter une annonce'
      }
    })

    expect(wrapper.text()).toContain('Ajouter une annonce')
  })

  it('émet un événement de clic lorsqu\'on appuie sur le bouton', async () => {
    const wrapper = mount(BouttonAjtAnnonce, {
      slots: {
        default: 'Cliquez-moi'
      }
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('est bien rendu sous forme de balise HTML button', () => {
    const wrapper = mount(BouttonAjtAnnonce)
    expect(wrapper.find('button').exists()).toBe(true)
  })

})