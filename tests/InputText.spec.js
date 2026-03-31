import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
// ✅ IMPORT CORRIGÉ : On utilise le nom probable du fichier .vue
import InputText from '@/components/InputText.vue'

describe('InputText.vue', () => {

  it('affiche le label via le slot et lie correctement l\'input', () => {
    const wrapper = mount(InputText, {
      props: { nomInput: 'email-field' },
      slots: { default: 'Votre Email' }
    })

    const label = wrapper.find('label')
    expect(label.text()).toContain('Votre Email')
    // Vérifie que le label pointe vers l'ID de l'input
    expect(label.attributes('for')).toBe('email-field')
    
    const input = wrapper.find('input')
    expect(input.attributes('id')).toBe('email-field')
    expect(input.attributes('name')).toBe('email-field')
  })

  it('affiche l\'astérisque si isRequired est à "true"', () => {
    const wrapper = mount(InputText, {
      props: { 
        nomInput: 'test',
        isRequired: 'true' 
      }
    })

    expect(wrapper.find('label').text()).toContain('*')
  })

  it('change le type de l\'input selon la prop inputType', () => {
    const wrapper = mount(InputText, {
      props: { 
        nomInput: 'pass',
        inputType: 'password' 
      }
    })

    expect(wrapper.find('input').attributes('type')).toBe('password')
  })

  it('affiche un message d\'erreur et applique la classe CSS quand isError n\'est pas vide', () => {
    const wrapper = mount(InputText, {
      props: { 
        nomInput: 'test',
        isError: 'true',
        errorText: 'Format invalide'
      }
    })

    // Vérifie le message d'erreur
    const errorMsg = wrapper.find('p')
    expect(errorMsg.exists()).toBe(true)
    expect(errorMsg.text()).toBe('Format invalide')

    // Vérifie que la classe .error est bien présente sur l'input
    // Note: On utilise .classes() pour vérifier la présence d'une classe CSS
    expect(wrapper.find('input').classes()).toContain('error')
  })

  it('met à jour la valeur via defineModel (v-model)', async () => {
    const wrapper = mount(InputText, {
      props: { 
        nomInput: 'test',
        modelValue: ''
      }
    })

    const input = wrapper.find('input')
    await input.setValue('Bonjour')

    // Vérifie que l'événement de mise à jour a été émis
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Bonjour'])
  })

})