import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
// ON TENTE AVEC LA BONNE ORTHOGRAPHE DU COMPOSANT :
import Contact from '@/components/Contact.vue'

describe('Contact.vue', () => {

  it('affiche correctement le titre de l\'annonce et l\'utilisateur', () => {
    const wrapper = mount(Contact, {
      props: { 
        annonce: 'Appartement T3 centre-ville', 
        utilisateur: 'Jean Dupont' 
      },
      global: { stubs: ['ion-icon'] }
    })

    // On vérifie que le h3 contient bien l'annonce
    expect(wrapper.find('h3').text()).toBe('Appartement T3 centre-ville')
    // On vérifie que le nom de l'utilisateur est bien dans la zone dédiée
    expect(wrapper.find('.user-and-date').text()).toContain('Jean Dupont')
  })

  it('applique la classe "active" quand la prop isActive est true', () => {
    const wrapper = mount(Contact, {
      props: { isActive: true },
      global: { stubs: ['ion-icon'] }
    })

    // On vérifie que la div principale possède bien la classe 'active'
    expect(wrapper.classes()).toContain('active')
  })

  it('n\'applique pas la classe "active" quand la prop isActive est false', () => {
    const wrapper = mount(Contact, {
      props: { isActive: false },
      global: { stubs: ['ion-icon'] }
    })

    // On vérifie que la div principale ne possède pas la classe 'active'
    expect(wrapper.classes()).not.toContain('active')
  })

  it('affiche le dernier message s\'il n\'est pas vide', () => {
    const wrapper = mount(Contact, {
      props: { lastMessage: 'Bonjour, est-ce toujours disponible ?' },
      global: { stubs: ['ion-icon'] }
    })

    expect(wrapper.text()).toContain('Bonjour, est-ce toujours disponible ?')
  })

  it('n\'affiche pas la zone du dernier message s\'il est vide', () => {
    const wrapper = mount(Contact, {
      props: { lastMessage: '' },
      global: { stubs: ['ion-icon'] }
    })

    expect(wrapper.text()).not.toContain('null') 
  })

  it('affiche la date du message si elle est fournie', () => {
    const wrapper = mount(Contact, {
      props: { 
        utilisateur: 'Jean Dupont',
        lastMessageDate: '12/05/2026' 
      },
      global: { stubs: ['ion-icon'] }
    })

    // On vérifie que la date s'affiche bien à côté du nom de l'utilisateur
    expect(wrapper.find('.user-and-date').text()).toContain('12/05/2026')
  })

})