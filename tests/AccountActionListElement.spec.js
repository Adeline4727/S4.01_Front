import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AccountActionListElement from '@/components/AccountActionListElement.vue'

describe('AccountActionListElement.vue', () => {

    it('affiche correctement le label et la description passés en props', () => {
      
      const wrapper = mount(AccountActionListElement, {
        props: {
          label: 'Mon Profil',
          target: '/profil',
          description: 'Modifier mon compte'
        }, 
        global: { 
          // CORRECTION ICI : On utilise un objet pour personnaliser le comportement du stub
          stubs: {
            // On remplace le RouterLink par une simple balise <a> qui conserve son contenu (<slot />)
            RouterLink: { template: '<a><slot /></a>' },
            // Pour l'icône, on s'en fiche, on peut la laisser vide (true veut dire "crée une coquille vide")
            'ion-icon': true 
          }
        }
      })
  
      // 3. ASSERT
      expect(wrapper.text()).toContain('Mon Profil')
      expect(wrapper.text()).toContain('Modifier mon compte')
    })

    it('affiche la description si la prop description est fournie', () => {
      
        const wrapper = mount(AccountActionListElement, {
          props: {
            label: 'Mon Profil',
            target: '/profil',
            description: 'Modifier mon compte'
          }, 
          global: { 
            // CORRECTION ICI : On utilise un objet pour personnaliser le comportement du stub
            stubs: {
              // On remplace le RouterLink par une simple balise <a> qui conserve son contenu (<slot />)
              RouterLink: { template: '<a><slot /></a>' },
              // Pour l'icône, on s'en fiche, on peut la laisser vide (true veut dire "crée une coquille vide")
              'ion-icon': true 
            }
          }
        })
    
        // 3. ASSERT
        
        expect(wrapper.text()).toContain('Modifier mon compte')
      })


      it('n\'affiche pas de zone de description si la description est vide', () => {
        const wrapper = mount(AccountActionListElement, {
          props: {
            label: 'Déconnexion',
            target: '/logout',
            description: '' // Description vide !
          },
          global: { stubs: ['RouterLink', 'ion-icon'] }
        })
    
        // On vérifie que la balise <span class="label-desc"> n'existe pas
        expect(wrapper.find('.label-desc').exists()).toBe(false)
      })

      it('e lien (RouterLink) pointe bien vers URL fournie par la prop target', () => {
      
        const wrapper = mount(AccountActionListElement, {
          props: {
            label: 'Mon Profil',
            target: '/profil',
            description: 'Modifier mon compte'
          }, 
          global: { 
            // CORRECTION ICI : On utilise un objet pour personnaliser le comportement du stub
            stubs: {
              // On remplace le RouterLink par une simple balise <a> qui conserve son contenu (<slot />)
              RouterLink: { 
                template: '<a :href="to"><slot /></a>',
                props: ['to']
              },
              // Pour l'icône, on s'en fiche, on peut la laisser vide (true veut dire "crée une coquille vide")
              'ion-icon': true 
            }
          }
        })
    
        const lien = wrapper.find('a')
        // 3. ASSERT
        expect(lien.attributes('href')).toBe('/profil')
        
      })

})