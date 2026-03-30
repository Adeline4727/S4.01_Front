import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
// On importe le BON fichier composant :
import BouttonPlusMinus from '@/components/BouttonPlusMinus.vue' 

describe('BouttonPlusMinus.vue', () => {

  it('initialise à 0 par défaut et bloque le bouton Retirer', () => {
    const wrapper = mount(BouttonPlusMinus) // On utilise BouttonPlusMinus partout
    
    expect(wrapper.find('.stepper-valeur').text()).toBe('0')
    expect(wrapper.find('[aria-label="Retirer"]').element.disabled).toBe(true)
    expect(wrapper.find('.stepper-valeur').classes()).not.toContain('valeur-active')
  })

  it('incrémente la valeur et ajoute la classe bleue au clic sur Ajouter', async () => {
    const wrapper = mount(BouttonPlusMinus)
    const btnAjouter = wrapper.find('[aria-label="Ajouter"]')

    await btnAjouter.trigger('click')

    expect(wrapper.find('.stepper-valeur').text()).toBe('1')
    expect(wrapper.find('[aria-label="Retirer"]').element.disabled).toBe(false)
    expect(wrapper.find('.stepper-valeur').classes()).toContain('valeur-active')
  })

  it('décrémente la valeur au clic sur Retirer', async () => {
    const wrapper = mount(BouttonPlusMinus)
    
    await wrapper.find('[aria-label="Ajouter"]').trigger('click')
    expect(wrapper.find('.stepper-valeur').text()).toBe('1')

    await wrapper.find('[aria-label="Retirer"]').trigger('click')
    
    expect(wrapper.find('.stepper-valeur').text()).toBe('0')
  })

  it('ne dépasse pas la valeur définie par la prop max', async () => {
    const wrapper = mount(BouttonPlusMinus, { props: { max: 2 } })
    const btnAjouter = wrapper.find('[aria-label="Ajouter"]')

    await btnAjouter.trigger('click') 
    await btnAjouter.trigger('click') 
    await btnAjouter.trigger('click') 

    expect(wrapper.find('.stepper-valeur').text()).toBe('2')
    expect(btnAjouter.element.disabled).toBe(true)
  })

  it('démarre à la valeur minimale si la prop min est fournie', () => {
    const wrapper = mount(BouttonPlusMinus, { props: { min: 3 } })

    expect(wrapper.find('.stepper-valeur').text()).toBe('3')
    expect(wrapper.find('[aria-label="Retirer"]').element.disabled).toBe(true)
  })

})