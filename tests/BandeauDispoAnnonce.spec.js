import { describe, it, expect, vi } from 'vitest' // Ajoute 'vi' ici
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import BandeauDispoAnnonce from '@/components/BandeauDispoAnnonce.vue'

describe('BandeauDispoAnnonce.vue', () => {

  const fakeAnnonce = {
    titreAnnonce: 'Magnifique Villa',
    minmumNuite: 3,
    prix: 120
  }

  it('affiche correctement le titre, le prix et le minimum de nuits', () => {
    const wrapper = mount(BandeauDispoAnnonce, {
      props: { annonce: fakeAnnonce },
      global: {
        plugins: [
          createTestingPinia({ 
            stubActions: true,
            createSpy: vi.fn // <--- AJOUTE CETTE LIGNE ICI
          }) 
        ],
        stubs: ['ButtonVerifDispo', 'LikeButton']
      }
    })

    expect(wrapper.find('.titreAnnonce').text()).toBe('Magnifique Villa')
    expect(wrapper.text()).toContain('Min. 3 nuits')
    expect(wrapper.text()).toContain('120€ / nuit')
  })

  it('rend bien les composants enfants (boutons)', () => {
    const wrapper = mount(BandeauDispoAnnonce, {
      props: { annonce: fakeAnnonce },
      global: {
        plugins: [
          createTestingPinia({ createSpy: vi.fn }) // <--- AUSSI ICI
        ],
        stubs: ['ButtonVerifDispo', 'LikeButton']
      }
    })

    expect(wrapper.find('button-verif-dispo-stub').exists()).toBe(true)
    expect(wrapper.find('like-button-stub').exists()).toBe(true)
  })
})