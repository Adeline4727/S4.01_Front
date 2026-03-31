import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from '@/components/SearchBar.vue'

describe('SearchBar.vue', () => {
  
  beforeEach(() => {
    // On active les faux timers pour contrôler le setTimeout (debounce)
    vi.useFakeTimers()
    
    // On mock le fetch global
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('ne déclenche pas de recherche si moins de 2 caractères sont saisis', async () => {
    const wrapper = mount(SearchBar, {
      global: { stubs: { RouterLink: true, 'ion-icon': true } }
    })

    const input = wrapper.find('input')
    await input.setValue('A')
    
    // On avance le temps de 300ms
    vi.advanceTimersByTime(300)

    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('appelle l\'API Gouv après 300ms si au moins 2 caractères sont saisis', async () => {
    // Mock de la réponse API
    const mockCities = [{ nom: 'Paris', code: '75056', codesPostaux: ['75000'] }]
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockCities)
    })

    const wrapper = mount(SearchBar, {
      global: { stubs: { RouterLink: true, 'ion-icon': true } }
    })

    const input = wrapper.find('input')
    await input.setValue('Par')

    // Avant 300ms, rien ne se passe
    vi.advanceTimersByTime(100)
    expect(global.fetch).not.toHaveBeenCalled()

    // Après 300ms, l'appel est lancé
    await vi.runAllTimersAsync()
    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('nom=Par')
    )
    
    // On attend le rendu de la liste
    await wrapper.vm.$nextTick()
    const list = wrapper.find('.suggestions-list')
    expect(list.exists()).toBe(true)
    expect(list.text()).toContain('Paris')
  })

  it('met à jour l\'input et vide la liste lors de la sélection d\'une ville', async () => {
    // On "pré-remplit" les données réactives pour simuler une liste déjà ouverte
    // Note: Dans un test unitaire, on peut aussi simuler le flux complet
    const wrapper = mount(SearchBar, {
      global: { stubs: { RouterLink: true, 'ion-icon': true } }
    })

    // On force l'état des villes (on pourrait aussi passer par l'input + timers)
    wrapper.vm.cities = [{ nom: 'Lyon', code: '69123', codesPostaux: ['69000'] }]
    await wrapper.vm.$nextTick()

    const suggestion = wrapper.find('.suggestions-list li')
    await suggestion.trigger('click')

    // L'input doit avoir le nom de la ville
    expect(wrapper.find('input').element.value).toBe('Lyon')
    // La liste doit avoir disparu
    expect(wrapper.find('.suggestions-list').exists()).toBe(false)
  })

  it('génère le bon lien de redirection dans la loupe', async () => {
    const wrapper = mount(SearchBar, {
      global: {
        stubs: {
          RouterLink: {
            template: '<a :href="to" class="btn-loupe-link"><slot /></a>',
            props: ['to']
          },
          'ion-icon': true
        }
      }
    })

    const input = wrapper.find('input')
    await input.setValue('Annecy')

    const link = wrapper.find('.btn-loupe-link')
    expect(link.attributes('href')).toBe('/recherche/Annecy')
  })
})