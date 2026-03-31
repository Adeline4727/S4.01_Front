import { describe, it, expect, vi } from 'vitest' // ✅ Import de 'vi' ajouté
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import InfosPrincipalesAnnonce from '@/components/InfosPrincipalesAnnonce.vue'

describe('InfosPrincipalesAnnonce.vue', () => {
  const fausseAnnonce = {
    titreAnnonce: 'Bel appartement centre-ville',
    typeHebergementBien: { libelleTypeHebergement: 'Appartement' },
    capacitePersonne: 4,
    nbChambre: 2,
    minmumNuite: 3,
    prix: 75,
    adresseBien: {
      villeAdresse: { nomVille: 'Annecy' }
    },
    typesPaiement: [
      { nom: 'Carte Bancaire' },
      { nom: 'Espèces' }
    ]
  }

  // Helper pour monter le composant avec la config Pinia correcte
  const mountComponent = () => {
    return mount(InfosPrincipalesAnnonce, {
      props: { annonce: fausseAnnonce },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn, // ✅ On indique à Pinia d'utiliser Vitest pour les espions
          }),
        ],
      },
    })
  }

  it('affiche le titre et les informations principales de l\'annonce', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('.titreAnnonce').text()).toBe('Bel appartement centre-ville')
    expect(wrapper.find('h2').text()).toContain('Appartement')
    expect(wrapper.find('h2').text()).toContain('Annecy')
  })

  it('affiche correctement le prix et le minimum de nuits', () => {
    const wrapper = mountComponent()
    expect(wrapper.text()).toContain('Min. 3 nuits')
    expect(wrapper.find('.prix').text()).toContain('75€')
  })

  it('affiche la liste des types de paiement acceptés', () => {
    const wrapper = mountComponent()
    const paiements = wrapper.findAll('li')
    expect(paiements.length).toBe(2)
    expect(paiements[0].text()).toBe('Carte Bancaire')
  })
})