import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
// ⚠️ VÉRIFIEZ ET ADAPTEZ LE NOM DU FICHIER :
import DatePickerButton from '@/components/DatePickerButton.vue'

describe('DatePickerButton.vue', () => {

  it('affiche le format par défaut quand aucune date n\'est fournie', () => {
    const wrapper = mount(DatePickerButton)

    // On vérifie que la valeur par défaut est bien celle attendue
    expect(wrapper.find('.date-text').text()).toBe('-- / -- / ----')
  })

  it('formate et affiche correctement une date fournie en prop', () => {
    const wrapper = mount(DatePickerButton, {
      props: { 
        date: '2026-04-15' // Format YYYY-MM-DD attendu
      }
    })

    // On s'attend à ce que le composant la transforme en DD/MM/YYYY
    expect(wrapper.find('.date-text').text()).toBe('15/04/2026')
  })

  it('affiche bien un bouton cliquable', () => {
    const wrapper = mount(DatePickerButton)

    // On vérifie que la balise principale est bien un bouton
    expect(wrapper.find('button.date-picker-btn').exists()).toBe(true)
  })

})