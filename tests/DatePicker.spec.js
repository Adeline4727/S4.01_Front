import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DatePicker from '@/components/DatePicker.vue'

describe('DatePicker.vue', () => {

  // Fausse annonce avec un prix et une réservation bloquée du 15 au 18 avril 2026
  const fausseAnnonce = {
    prix: 85,
    minmumNuite: 2,
    reservations: [
      {
        debutReservation: '2026-04-15',
        finReservation: '2026-04-18'
      }
    ]
  }

  // Avant CHAQUE test, on bloque l'horloge système au 1er Avril 2026
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-04-01T10:00:00Z'))
  })

  // Après CHAQUE test, on remet l'horloge normale
  afterEach(() => {
    vi.useRealTimers()
  })

  it('affiche le prix correct provenant de la prop annonce', () => {
    const wrapper = mount(DatePicker, {
      props: { annonce: fausseAnnonce },
      global: { stubs: ['BouttonAjtAnnonce'] }
    })

    expect(wrapper.find('.price').text()).toContain('85€')
  })

  it('affiche les mois actuels et suivants (Avril et Mai 2026)', () => {
    const wrapper = mount(DatePicker, {
      props: { annonce: fausseAnnonce },
      global: { stubs: ['BouttonAjtAnnonce'] }
    })

    const titres = wrapper.findAll('.month-title')
    expect(titres[0].text()).toContain('Avril 2026')
    expect(titres[1].text()).toContain('Mai 2026')
  })

  it('grise les dates réservées pour empêcher la sélection', () => {
    const wrapper = mount(DatePicker, {
      props: { annonce: fausseAnnonce },
      global: { stubs: ['BouttonAjtAnnonce'] }
    })

    // On cherche tous les jours inaccessibles
    const joursIndisponibles = wrapper.findAll('.day.unavailable')
    
    // Au minimum, les 15, 16, 17 et 18 avril doivent être grisés
    expect(joursIndisponibles.length).toBeGreaterThanOrEqual(4)
  })

  it('permet de naviguer au mois suivant', async () => {
    const wrapper = mount(DatePicker, {
      props: { annonce: fausseAnnonce },
      global: { stubs: ['BouttonAjtAnnonce'] }
    })

    // On clique sur le bouton "Mois suivant" (le 2ème bouton nav-btn)
    const btnsNav = wrapper.findAll('.nav-btn')
    await btnsNav[1].trigger('click')

    // Les titres doivent avoir changé pour Mai et Juin
    const titres = wrapper.findAll('.month-title')
    expect(titres[0].text()).toContain('Mai 2026')
    expect(titres[1].text()).toContain('Juin 2026')
  })

  it('désactive le bouton précédent si on est sur le mois actuel', () => {
    const wrapper = mount(DatePicker, {
      props: { annonce: fausseAnnonce },
      global: { stubs: ['BouttonAjtAnnonce'] }
    })

    const btnPrecedent = wrapper.findAll('.nav-btn')[0]
    // Le bouton doit avoir l'attribut disabled
    expect(btnPrecedent.element.disabled).toBe(true)
  })

  it('émet l\'événement "dates-validees" avec les bonnes dates lors de la sélection', async () => {
    const wrapper = mount(DatePicker, {
      props: { annonce: fausseAnnonce },
      global: { stubs: ['BouttonAjtAnnonce'] }
    })

    // 1. On trouve les jours cliquables (qui ne sont ni vides ni indisponibles)
    const joursDispos = wrapper.findAll('.day:not(.unavailable):not(.empty)')
    
    // On clique sur le premier jour dispo (le 1er avril)
    await joursDispos[0].trigger('click')
    
    // On clique sur un jour plus loin (le 4 avril par exemple, index 3)
    await joursDispos[3].trigger('click')

    // On vérifie que les jours ont bien reçu la classe 'selected'
    expect(joursDispos[0].classes()).toContain('selected')
    expect(joursDispos[3].classes()).toContain('selected')

    // 2. On valide la sélection (appel manuel de la fonction car le bouton est stubbé)
    wrapper.vm.validerSelection()

    // 3. On vérifie que l'événement a bien été émis vers le parent
    expect(wrapper.emitted()).toHaveProperty('dates-validees')
    
    // On vérifie le contenu de l'événement (les dates envoyées)
    const eventPayload = wrapper.emitted('dates-validees')[0][0]
    expect(eventPayload).toHaveProperty('debut', '2026-04-01')
    expect(eventPayload).toHaveProperty('fin', '2026-04-04')
    
    // On vérifie que l'événement fermer a aussi été envoyé
    expect(wrapper.emitted()).toHaveProperty('fermer')
  })

})