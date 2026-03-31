import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BouttonPlusMinus from '@/components/BouttonPlusMinus.vue'

describe('BouttonPlusMinus.vue', () => {

  it('initialise à 0 par défaut et bloque le bouton Retirer', () => {
    const wrapper = mount(BouttonPlusMinus, {
      props: { modelValue: 0 }
    })
    
    const afficheur = wrapper.find('.stepper-valeur')
    expect(afficheur.text().trim()).toBe('0')

    const btnRetirer = wrapper.find('button[aria-label="Retirer"]')
    expect(btnRetirer.element.disabled).toBe(true)
  })

  it('incrémente la valeur et ajoute la classe bleue au clic sur Ajouter', async () => {
    const wrapper = mount(BouttonPlusMinus, {
      props: { modelValue: 0 }
    })
    
    const btnAjouter = wrapper.find('button[aria-label="Ajouter"]')
    await btnAjouter.trigger('click')

    const afficheur = wrapper.find('.stepper-valeur')
    expect(afficheur.text().trim()).toBe('1')
    expect(afficheur.classes()).toContain('valeur-active')
    
    // Vérifie que l'événement v-model est bien émis
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([1])
  })

  it('décrémente la valeur au clic sur Retirer', async () => {
    const wrapper = mount(BouttonPlusMinus, {
      props: { modelValue: 1 }
    })
    
    const btnRetirer = wrapper.find('button[aria-label="Retirer"]')
    await btnRetirer.trigger('click')

    expect(wrapper.find('.stepper-valeur').text().trim()).toBe('0')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([0])
  })

  it('ne dépasse pas la valeur définie par la prop max', async () => {
    const wrapper = mount(BouttonPlusMinus, {
      props: { 
        modelValue: 2,
        max: 2 
      }
    })
    
    const btnAjouter = wrapper.find('button[aria-label="Ajouter"]')
    expect(btnAjouter.element.disabled).toBe(true)
    
    await btnAjouter.trigger('click')
    expect(wrapper.find('.stepper-valeur').text().trim()).toBe('2')
  })

  it('démarre à la valeur minimale si la prop min est fournie', () => {
    const wrapper = mount(BouttonPlusMinus, {
      props: { 
        modelValue: 0, // Le parent essaie de mettre 0
        min: 3         // Mais le composant impose 3
      }
    })
    
    // Le onMounted va corriger la valeur à 3
    expect(wrapper.find('.stepper-valeur').text().trim()).toBe('3')
  })

})