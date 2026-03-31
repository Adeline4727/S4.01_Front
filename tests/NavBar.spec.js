import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useAuthStore } from '@/stores/auth'
import { nextTick } from 'vue' 
import NavBar from '@/components/NavBar.vue'

describe('NavBar.vue', () => {
  
  const mountComponent = (initialState = { isConnected: false }) => {
    return mount(NavBar, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            
            initialState: {
              auth: initialState 
            }
          })
        ],
        stubs: {
          RouterLink: { template: '<a><slot /></a>' }, 
          Button: { template: '<button><slot /></button>' },
          SearchBar: { template: '<div class="search-stub"></div>' },
          NavItem: { 
            props: ['label'],
            template: '<div class="nav-item-stub">{{ label }}</div>' 
          },
          ProfilePicture: { template: '<div class="pfp-stub"></div>' },
          'ion-icon': { template: '<span></span>' }
        }
      }
    })
  }

  it('affiche le logo et le lien de dépôt d\'annonce', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('.logo').exists()).toBe(true)
    expect(wrapper.text()).toContain('Déposer une annonce')
  })

  it('affiche les éléments de navigation de base', () => {
    const wrapper = mountComponent()
    expect(wrapper.text()).toContain('Mes recherches')
    expect(wrapper.text()).toContain('Favoris')
  })

  it('affiche le bouton "Se connecter" quand l\'utilisateur n\'est pas connecté', async () => {
    const wrapper = mountComponent({ isConnected: false })
    await nextTick() // ✅ On attend que Vue traite le v-if/v-else
    
    expect(wrapper.text()).toContain('Se connecter')
    expect(wrapper.find('.pfp-stub').exists()).toBe(false)
  })

  it('affiche le composant ProfilePicture quand l\'utilisateur est connecté', async () => {
    const wrapper = mountComponent()
    const authStore = useAuthStore() 
    
    authStore.isConnected = true 
    await nextTick() 

  
    expect(wrapper.text()).not.toContain('Se connecter')
    
    
    expect(wrapper.find('.pfp-stub').exists()).toBe(true)
  })

  it('rend le composant SearchBar', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('.search-stub').exists()).toBe(true)
  })

})