import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PanneauReservationAnnonce from '@/components/PanneauReservationAnnonce.vue'
import Button from '@/components/Button.vue'

describe('PanneauReservationAnnonce.vue', () => {
  const mockAnnonce = {
    annonceId: 42,
    adresseBien: { villeAdresse: { nomVille: 'Annecy' } },
    proprietaireBien: { particulierAssocie: { nom: 'Dupont' } }
  }

  const defaultProps = {
    annonce: mockAnnonce,
    dateArrivee: '2026-04-10',
    dateDepart: '2026-04-15'
  }

  const globalConfig = {
    stubs: {
      // ✅ Ajout du name et d'une classe pour faciliter la recherche
      Button: { 
        name: 'Button',
        template: '<button class="btn-stub"><slot /></button>', 
        props: ['to'] 
      },
      BouttonPlusMinus: { template: '<div class="plus-minus-stub"></div>' },
      RouterLink: true
    }
  }

  it('calcule correctement le nombre de nuits entre deux dates', () => {
    const wrapper = mount(PanneauReservationAnnonce, {
      props: defaultProps,
      global: globalConfig
    })
    expect(wrapper.text()).toContain('5 nuits')
  })

  it('formate les dates en français long', () => {
    const wrapper = mount(PanneauReservationAnnonce, {
      props: defaultProps,
      global: globalConfig
    })
    expect(wrapper.text()).toContain('vendredi 10 avril 2026')
    expect(wrapper.text()).toContain('mercredi 15 avril 2026')
  })

  it('affiche et masque le popover des animaux au clic', async () => {
    const wrapper = mount(PanneauReservationAnnonce, {
      props: defaultProps,
      global: globalConfig
    })
    const btn = wrapper.find('.icon-button')
    await btn.trigger('click')
    expect(wrapper.find('.popover-card').exists()).toBe(true)
    await wrapper.find('.close-btn').trigger('click')
    expect(wrapper.find('.popover-card').exists()).toBe(false)
  })

  it('met à jour le compteur de caractères du message', async () => {
    const wrapper = mount(PanneauReservationAnnonce, {
      props: defaultProps,
      global: globalConfig
    })
    const textarea = wrapper.find('textarea')
    await textarea.setValue('Bonjour')
    expect(wrapper.find('.compteur-caracteres').text()).toContain('7/2500')
  })

  it('gère l\'état de la checkbox des conditions', async () => {
    const wrapper = mount(PanneauReservationAnnonce, {
      props: defaultProps,
      global: globalConfig
    })
    const checkbox = wrapper.find('#cgu-checkbox')
    await checkbox.setValue(true)
    expect(wrapper.find('.checkbox-custom svg').exists()).toBe(true)
  })

  it('passe les bons paramètres de navigation au bouton final', () => {
    const wrapper = mount(PanneauReservationAnnonce, {
      props: defaultProps,
      global: globalConfig
    })

    // ✅ Recherche par le composant importé ou par la classe du stub
    const finishButton = wrapper.findComponent({ name: 'Button' })
    
    expect(finishButton.exists()).toBe(true)
    expect(finishButton.props('to')).toEqual({
      name: 'panneau-finalisation-paiement',
      params: { id: 42 }
    })
  })
})




