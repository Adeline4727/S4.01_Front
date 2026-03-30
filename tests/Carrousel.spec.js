import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
// ⚠️ À remplacer par le vrai nom de votre composant !
import Carrousel from '@/components/Carrousel.vue' 

describe('Carrousel.vue', () => {

  it('affiche correctement le conteneur du carrousel', () => {
    const wrapper = mount(Carrousel)

    // On vérifie que la div avec la classe "carrousel" existe bien
    expect(wrapper.find('.carrousel').exists()).toBe(true)
  })

  it('affiche le contenu passé à l\'intérieur du slot', () => {
    // On simule l'injection de fausses cartes d'annonces dans le slot
    const wrapper = mount(Carrousel, {
      slots: {
        default: '<div class="ma-fausse-carte">Superbe appartement</div>'
      }
    })

    // On vérifie que notre fausse carte est bien apparue dans le carrousel
    expect(wrapper.find('.ma-fausse-carte').exists()).toBe(true)
    expect(wrapper.text()).toContain('Superbe appartement')
  })

})