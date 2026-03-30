import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ButtonVerifDispo from '@/components/ButtonVerifDispo.vue' 

describe('ButtonVerifDispo.vue', () => {

  it('affiche le bon texte dans le bouton', () => {
    const wrapper = mount(ButtonVerifDispo, {
      global: { 
        // CORRECTION : On demande à la simulation d'afficher son contenu (<slot/>)
        stubs: {
          BouttonAjtAnnonce: { template: '<button class="button"><slot /></button>' }
        }
      }
    })

    expect(wrapper.text()).toContain('Vérifier la disponibilité')
  })

  it('émet un événement "click" lorsqu\'on clique dessus', async () => {
    const wrapper = mount(ButtonVerifDispo, {
      global: { 
        stubs: {
          BouttonAjtAnnonce: { template: '<button class="button"><slot /></button>' }
        }
      }
    })

    const boutonEnfant = wrapper.find('.button')
    await boutonEnfant.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
  })

})