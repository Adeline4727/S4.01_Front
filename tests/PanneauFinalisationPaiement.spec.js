import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PanneauFinalisationPaiement from '@/components/PanneauFinalisationPaiement.vue'

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    params: { id: '123' },
    query: {}
  }))
}))

describe('PanneauFinalisationPaiement.vue', () => {
  
  it('affiche le titre principal et la section Carte Bancaire', () => {
    const wrapper = mount(PanneauFinalisationPaiement)
    expect(wrapper.find('h1').text()).toBe('Finaliser votre paiement')
    expect(wrapper.find('h2').text()).toBe('Carte Bancaire')
  })

  it('contient les 4 champs de saisie nécessaires', () => {
    const wrapper = mount(PanneauFinalisationPaiement)
    const inputs = wrapper.findAll('input')
    expect(inputs.length).toBe(4)
  })

  it('affiche le récapitulatif des frais', () => {
    const wrapper = mount(PanneauFinalisationPaiement)
    expect(wrapper.text()).toContain('Frais de service')
    expect(wrapper.text()).toContain('Taxe de séjour')
  })

  it('possède la classe de contour orange pour le formulaire', () => {
    const wrapper = mount(PanneauFinalisationPaiement)
    expect(wrapper.find('.contour').exists()).toBe(true)
  })
})