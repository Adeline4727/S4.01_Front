import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
// ⚠️ VÉRIFIEZ ET ADAPTEZ LE NOM DU FICHIER :
import FieldInput from '@/components/FieldInput.vue'

describe('FieldInput.vue', () => {

  it('affiche correctement le label et lie l\'attribut "for"', () => {
    const wrapper = mount(FieldInput, {
      props: { 
        label: 'Prénom', 
        name: 'prenomInput' 
      }
    })

    const label = wrapper.find('label')
    expect(label.text()).toContain('Prénom')
    // On vérifie que le for="" correspond bien au name=""
    expect(label.attributes('for')).toBe('prenomInput')
  })

  it('affiche l\'astérisque rouge si le champ est requis (required: true)', () => {
    const wrapper = mount(FieldInput, {
      props: { 
        label: 'Nom', 
        name: 'nomInput', 
        required: true 
      }
    })

    // On s'assure que la balise <sup> avec l'astérisque est bien là
    expect(wrapper.find('sup').exists()).toBe(true)
    expect(wrapper.find('sup').text()).toBe('*')
  })

  it('n\'affiche pas l\'astérisque si le champ n\'est pas requis', () => {
    const wrapper = mount(FieldInput, {
      props: { 
        label: 'Nom', 
        name: 'nomInput',
        required: false
      }
    })

    expect(wrapper.find('sup').exists()).toBe(false)
  })

  it('met à jour la valeur et émet un événement quand on tape dans l\'input (defineModel)', async () => {
    const wrapper = mount(FieldInput, {
      props: {
        // En test, defineModel() se traduit par la prop "modelValue"
        modelValue: 'Valeur initiale' 
      }
    })

    const input = wrapper.find('input')
    
    // 1. On vérifie que la valeur de départ est bien affichée
    expect(input.element.value).toBe('Valeur initiale')

    // 2. On simule un utilisateur qui tape un nouveau texte
    await input.setValue('Nouvelle valeur tapée')

    // 3. On vérifie que le composant a bien "crié" (émis) le changement vers son parent
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    
    // 4. On s'assure que c'est bien le nouveau texte qui a été envoyé
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Nouvelle valeur tapée'])
  })

})