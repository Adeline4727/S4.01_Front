import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
// ⚠️ VÉRIFIEZ ET ADAPTEZ LE NOM DU FICHIER :hk,
import Footer from '@/components/Footer.vue'

describe('Footer.vue', () => {

  it('rend bien la balise footer principale', () => {
    const wrapper = mount(Footer)
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  it('affiche correctement les 4 sections (titres h2)', () => {
    const wrapper = mount(Footer)
    
    // On récupère tous les titres h2
    const titres = wrapper.findAll('h2')
    
    // On vérifie qu'il y en a bien 4
    expect(titres.length).toBe(4)
    
    // On vérifie le texte de chaque section
    expect(titres[0].text()).toBe('À propos de Leboncoin')
    expect(titres[1].text()).toBe('Informations légales')
    expect(titres[2].text()).toBe('Des questions ?')
    expect(titres[3].text()).toBe('Accessibilité')
  })

  it('génère les liens avec les bonnes cibles (href) pour les pages importantes', () => {
    const wrapper = mount(Footer)

    // On cible directement les liens grâce à leur attribut href
    const lienCGU = wrapper.find('a[href="cgu"]')
    const lienCGV = wrapper.find('a[href="cgv"]')
    const lienAide = wrapper.find('a[href="aide"]')
    const lienAccessibilite = wrapper.find('a[href="accessibilite"]')

    // On vérifie qu'ils existent bien dans le DOM
    expect(lienCGU.exists()).toBe(true)
    expect(lienCGV.exists()).toBe(true)
    expect(lienAide.exists()).toBe(true)
    expect(lienAccessibilite.exists()).toBe(true)
    
    // On vérifie le texte d'un lien au passage pour être sûr
    expect(lienCGU.text()).toBe("Conditions générales d'utilisation")
  })

})