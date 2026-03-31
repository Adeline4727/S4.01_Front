import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
// ⚠️ MODIFIEZ CETTE LIGNE SI LE NOM DE VOTRE FICHIER EST DIFFÉRENT :
import MessageInput from '@/components/MessageInput.vue'

describe('MessageInput.vue', () => {

  it('affiche l\'input avec le bon placeholder', () => {
    const wrapper = mount(MessageInput)
    
    const input = wrapper.find('input[type="text"]')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Votre message ici...')
  })

  it('met à jour la valeur via defineModel (v-model)', async () => {
    const wrapper = mount(MessageInput, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
      }
    })

    const input = wrapper.find('input')
    
    // On simule la saisie d'un message
    await input.setValue('Salut, tu es dispo ?')

    // On vérifie que l'événement update:modelValue a été émis avec le bon texte
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Salut, tu es dispo ?'])
  })

  it('affiche la valeur initiale passée par le parent', () => {
    const texteInitial = 'Message pré-rempli'
    const wrapper = mount(MessageInput, {
      props: {
        modelValue: texteInitial
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe(texteInitial)
  })

  it('possède les styles de bordure et de rayon attendus via les classes', () => {
    const wrapper = mount(MessageInput)
    const input = wrapper.find('input')
    
    // On vérifie que l'input est bien présent pour que le CSS puisse s'appliquer
    expect(input.exists()).toBe(true)
    // Note : On ne teste généralement pas le CSS pur (scoped) dans Vitest, 
    // mais on vérifie que la structure permet l'application du style.
    expect(wrapper.find('.message-input').exists()).toBe(true)
  })

})