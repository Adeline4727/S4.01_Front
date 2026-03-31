import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import VerifDispoAnnonce from '@/components/VerifDispoAnnonce.vue' // ✅ Import corrigé
import { useAnnoncesStore } from '@/stores/annonces'

// Mock de Vue Router
const pushMock = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: pushMock
  })
}))

describe('VerifDispoAnnonce.vue', () => {
  const mockAnnonce = {
    id: 1,
    proprietaireBien: {
      particulierAssocie: { prenom: 'Jean' }
    }
  }

  const globalConfig = (initialState = {}) => ({
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          initialState: { annonces: initialState }
        })
      ],
      stubs: {
        DatePickerButton: { template: '<button class="dp-btn"><slot /></button>' },
        ButtonVerifDispo: { template: '<button class="verif-btn">Vérifier</button>' },
        DatePicker: { template: '<div class="datepicker-stub"></div>' }
      }
    }
  })

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(window, 'alert').mockImplementation(() => {})
  })

  it('affiche le prénom du propriétaire correctement', () => {
    const wrapper = mount(VerifDispoAnnonce, {
      props: { annonce: mockAnnonce },
      ...globalConfig()
    })
    expect(wrapper.find('.nomProprio').text()).toBe('Jean')
  })

  it('affiche un avatar par défaut si aucun propriétaire n\'est défini', () => {
    const wrapper = mount(VerifDispoAnnonce, {
      props: { annonce: {} },
      ...globalConfig()
    })
    expect(wrapper.find('.nomProprio').text()).toBe('Anonyme')
    expect(wrapper.find('.avatarLettre').text()).toBe('A')
  })

  it('ouvre la modale du calendrier au clic sur un bouton de date', async () => {
    const wrapper = mount(VerifDispoAnnonce, {
      props: { annonce: mockAnnonce },
      ...globalConfig({ annonce: mockAnnonce })
    })

    expect(wrapper.find('.modal-overlay').exists()).toBe(false)

    
    await wrapper.findAll('.dp-btn')[0].trigger('click')
    
    expect(wrapper.find('.modal-overlay').exists()).toBe(true)
  })

  it('affiche une alerte si on tente de valider sans dates', async () => {
    const wrapper = mount(VerifDispoAnnonce, {
      props: { annonce: mockAnnonce },
      ...globalConfig()
    })

    await wrapper.find('.verif-btn').trigger('click')
    
    expect(window.alert).toHaveBeenCalledWith("Veuillez sélectionner vos dates d'arrivée et de départ.")
  })

  it('redirige vers la réservation avec les bons paramètres', async () => {
    const wrapper = mount(VerifDispoAnnonce, {
      props: { annonce: mockAnnonce },
      ...globalConfig()
    })

   
    await wrapper.vm.handleDatesSelected({ 
      debut: '2026-06-01', 
      fin: '2026-06-10' 
    })

    await wrapper.find('.verif-btn').trigger('click')

    expect(pushMock).toHaveBeenCalledWith({
      name: 'reservation-annonce',
      params: { id: 1 },
      query: {
        arrivee: '2026-06-01',
        depart: '2026-06-10'
      }
    })
  })
})