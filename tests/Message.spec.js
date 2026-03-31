import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
// ✅ IMPORT CORRIGÉ : On pointe vers Message.vue
import Message from '@/components/Message.vue'

describe('Message.vue', () => {

  it('affiche la première lettre du nom de l\'expéditeur (initiale)', () => {
    const wrapper = mount(Message, {
      props: { fromWho: 'Alice' }
    })

    const profilePic = wrapper.find('.profile-pic')
    expect(profilePic.text()).toBe('A')
  })

  it('affiche correctement le contenu du message via le slot', () => {
    const messageTexte = 'Salut ! Tu vas bien ?'
    const wrapper = mount(Message, {
      props: { fromWho: 'Bob' },
      slots: {
        default: messageTexte
      }
    })

    const content = wrapper.find('.message-content')
    expect(content.text()).toContain(messageTexte)
  })

  it('n\'applique pas la classe "me" par défaut', () => {
    const wrapper = mount(Message, {
      props: { fromWho: 'Charlie' }
    })

    // On vérifie que la classe n'est pas présente sur l'élément racine
    expect(wrapper.classes()).not.toContain('me')
  })

  it('possède la structure HTML attendue', () => {
    const wrapper = mount(Message, {
      props: { fromWho: 'Alice' }
    })

    expect(wrapper.find('.profile-pic').exists()).toBe(true)
    expect(wrapper.find('.message-content').exists()).toBe(true)
  })

})