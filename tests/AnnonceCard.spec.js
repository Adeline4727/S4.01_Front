import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AnnonceCard from '@/components/AnnonceCard.vue' // Ajustez le chemin si nécessaire

describe('AnnonceCard.vue', () => {

  // Les données de base propres (le prix est redevenu un simple nombre)
  const baseProps = {
    title: 'Vélo de course',
    price: 150,
    owner: 'Alice',
    city: 'Annecy'
  }

  it('affiche le titre, la ville, le propriétaire et le prix', () => {
    const wrapper = mount(AnnonceCard, {
      props: baseProps,
      global: { stubs: ['LikeButton', 'ion-icon'] }
    })

    expect(wrapper.text()).toContain('Vélo de course')
    expect(wrapper.text()).toContain('150 €')
    expect(wrapper.text()).toContain('Alice')
    expect(wrapper.text()).toContain('Annecy')
  })

  it('affiche la première lettre du propriétaire', () => {
    const wrapper = mount(AnnonceCard, {
      props: baseProps,
      global: { stubs: ['LikeButton', 'ion-icon'] }
    })

    const initiale = wrapper.find('.profile-pic-proprio span').text()
    expect(initiale).toBe('A') 
  })

  it('affiche l\'image si la prop "image" est fournie', () => {
    const wrapper = mount(AnnonceCard, {
      props: {
        ...baseProps,
        image: 'https://mon-image.com/velo.jpg'
      },
      global: { stubs: ['LikeButton', 'ion-icon'] }
    })

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://mon-image.com/velo.jpg')
  })

  it('affiche l\'icône par défaut si aucune image n\'est fournie', () => {
    const wrapper = mount(AnnonceCard, {
      props: baseProps, 
      global: { stubs: ['LikeButton', 'ion-icon'] }
    })

    // CORRECTION ICI : On cherche l'icône via sa classe CSS .camera-icon
    expect(wrapper.find('.camera-icon').exists()).toBe(true)
  })

  it('affiche le badge "Pro" si isPro est true', () => {
    const wrapper = mount(AnnonceCard, {
      props: {
        ...baseProps,
        isPro: true
      },
      global: { stubs: ['LikeButton', 'ion-icon'] }
    })

    expect(wrapper.find('.annonce-pro').exists()).toBe(true)
    expect(wrapper.find('.annonce-pro').text()).toBe('Pro')
  })

  it('n\'affiche pas le badge "Pro" si isPro est false', () => {
    const wrapper = mount(AnnonceCard, {
      props: {
        ...baseProps,
        isPro: false
      },
      global: { stubs: ['LikeButton', 'ion-icon'] }
    })

    expect(wrapper.find('.annonce-pro').exists()).toBe(false)
  })
})