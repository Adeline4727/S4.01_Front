import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
// ON IMPORTE LE VRAI COMPOSANT ICI :
import CarteInfoDetailsAnnonce from '@/components/CarteInfoDetailsAnnonce.vue' 

describe('CarteInfoDetailsAnnonce.vue', () => {

  // 1. ON CRÉE UNE FAUSSE ANNONCE PARFAITE POUR LE TEST
  const fausseAnnonce = {
    prix: 120,
    descriptionAnnonce: 'Superbe appartement avec vue sur le lac',
    capacitePersonne: 4,
    nbChambre: 2,
    datePublication: { valeur: '2023-10-15T10:00:00Z' },
    typeHebergementBien: {
      libelleTypeHebergement: 'Appartement',
      annonces: [
        { annonceId: 1, titreAnnonce: 'Autre appart', CapacitePersonne: 2, photos: [] }
      ]
    },
    equipementsInclus: [
      { nomEquipement: 'Wifi ultra rapide' }
    ],
    adresseBien: {
      latitude: 45.9,
      longitude: 6.1,
      villeAdresse: {
        nomVille: 'Annecy',
        codePostalVille: '74000'
      }
    },
    conditionHebergementBien: {
      heureArrivee: '15:00:00',
      heureDepart: '11:00:00',
      animauxAcceptes: true,
      fumeur: false
    },
    proprietaireBien: {
      dateCreation: '2022-01-01T10:00:00Z',
      particulierAssocie: { prenom: 'Jean' }
      // Pas de photoProfil pour tester la lettre par défaut (J)
    }
  }

  // Configuration globale réutilisable pour nos tests
  const globalConfig = {
    stubs: {
      MapComponent: true,
      Carrousel: { template: '<div class="carrousel-stub"><slot /></div>' },
      AnnonceCard: true,
      RouterLink: { template: '<a><slot /></a>' }
    }
  }

  it('affiche les informations principales de l\'annonce', () => {
    // ON UTILISE LE BON NOM ICI AUSSI :
    const wrapper = mount(CarteInfoDetailsAnnonce, {
      props: { annonce: fausseAnnonce },
      global: globalConfig
    })

    // On vérifie la description
    expect(wrapper.text()).toContain('Superbe appartement avec vue sur le lac')
    // On vérifie la ville et le code postal
    expect(wrapper.text()).toContain('Annecy (74000)')
    // On vérifie les équipements
    expect(wrapper.text()).toContain('Wifi ultra rapide')
    // On vérifie l'heure d'arrivée formatée
    expect(wrapper.text()).toContain('Heure d\'arrivée : 15:00')
  })

  it('affiche le prénom du propriétaire et sa lettre d\'avatar s\'il n\'a pas de photo', () => {
    const wrapper = mount(CarteInfoDetailsAnnonce, {
      props: { annonce: fausseAnnonce },
      global: globalConfig
    })

    // Le prénom 'Jean' doit s'afficher
    expect(wrapper.find('.nomProprio').text()).toBe('Jean')
    
    // Comme Jean n'a pas de photo, l'avatarLettre doit afficher "J"
    expect(wrapper.find('.avatarLettre').text()).toBe('J')
  })

  it('affiche la MapComponent avec les bonnes coordonnées', () => {
    const wrapper = mount(CarteInfoDetailsAnnonce, {
      props: { annonce: fausseAnnonce },
      global: globalConfig
    })

    const mapStub = wrapper.find('map-component-stub')
    expect(mapStub.exists()).toBe(true)
    
    // On vérifie que la prop a bien été passée à la carte
    expect(mapStub.attributes('latitude')).toBe('45.9')
    expect(mapStub.attributes('longitude')).toBe('6.1')
  })

  it('génère les cartes recommandées dans le carrousel', () => {
    const wrapper = mount(CarteInfoDetailsAnnonce, {
      props: { annonce: fausseAnnonce },
      global: globalConfig
    })

    // On vérifie que la carte "Autre appart" a bien été créée par le v-for
    const cardStub = wrapper.find('annonce-card-stub')
    expect(cardStub.exists()).toBe(true)
    expect(cardStub.attributes('title')).toBe('Autre appart')
  })

})