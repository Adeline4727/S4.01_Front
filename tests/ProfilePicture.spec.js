import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfilePicture from '@/components/ProfilePicture.vue'

describe('ProfilePicture.vue', () => {
  
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
    })
  })

  it('affiche l\'initiale du nom si aucune photo n\'est présente', () => {
    // On s'assure que pfp est null pour tomber dans le v-else-if
    localStorage.getItem.mockImplementation((key) => {
      if (key === 'pfp') return null
      if (key === 'name') return 'Bob'
      return null
    })

    const wrapper = mount(ProfilePicture, {
      global: { stubs: { RouterLink: { template: '<a><slot /></a>' } } }
    })

    const avatar = wrapper.find('.avatarLettre')
    expect(avatar.exists()).toBe(true)
    expect(avatar.text()).toBe('B')
  })

  it('affiche le nom complet seulement si doesNameAppear n\'est pas "no"', async () => {
    localStorage.getItem.mockImplementation((key) => {
      if (key === 'name') return 'Charlie'
      return null
    })

    const wrapper = mount(ProfilePicture, {
      props: { doesNameAppear: 'yes' },
      global: { stubs: { RouterLink: { template: '<a><slot /></a>' } } }
    })

    const p = wrapper.find('p')
    expect(p.exists()).toBe(true)
    expect(p.text()).toBe('Charlie')
  })

  it('affiche l\'image de profil si elle existe', () => {
    localStorage.getItem.mockImplementation((key) => {
      if (key === 'pfp') return 'avatar.png'
      return null
    })

    const wrapper = mount(ProfilePicture, {
      global: { stubs: { RouterLink: { template: '<a><slot /></a>' } } }
    })

    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBe('/avatar.png')
  })
})