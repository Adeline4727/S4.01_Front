import {ref, computed} from 'vue';
import {defineStore} from 'pinia';

const url = "";

export const useAnnoncesStore = defineStore('annonces', () => {

    const annoncePlaceholder = ref(
        {
    "annonceId": 1,
    "titreAnnonce": "Villa vue sur mer",
    "descriptionAnnonce": "Magnifique villa de 4 chambres, vue sur la mer, proximité avec la plage. 2 salles de bain. Paiement en ligne avant l'arrivée.",
    "nbChambre": 4,
    "capacitePersonne": 6,
    "statutAnnonce": "active",//à changer
    "estGarantie": true,
    "adresseBien": {
      "adresseId": 1,
      "nomRue": "rue de l'Industrie",
      "voie": 7,
      "longitude": 45.901196,
      "latitude": 6.119859,
      "annonces": [],
      "villeAdresse": {
        "villeId": 1,
        "codeInsee": "74010",
        "nomVille": "Annecy",
        "codePostalVille": "74000",
        "adresses": [
        ],
        "rechercheEnregistrees": [],
        "departementAssocie": {
          "departementId": 1,
          "numeroDepartement": "74",
          "nomDepartement": "Haute-Savoie",
          "regionConcernee": {
            "regionId": 1,
            "nomRegion": "Auvergne Rhône Alpes",
            "departements": [
            ]
          },
          "rechercheenregistrees": [
          ],
          "villes": [
          ]
        }
      }
    },
    "avis": [],
    "conditionHebergementBien": {
      "conditionHerbergementId": 0,
      "heureDepart": {
        "hour": 0,
        "minute": 0,
        "second": 0,
        "millisecond": 0,
        "microsecond": 0,
        "nanosecond": 0,
        "ticks": 0
      },
      "heureArrivee": {
        "hour": 0,
        "minute": 0,
        "second": 0,
        "millisecond": 0,
        "microsecond": 0,
        "nanosecond": 0,
        "ticks": 0
      },
      "animauxAcceptes": true,
      "fumeur": true,
      "annonces": [
        "string"
      ]
    },
    "datePublication": {
      "dateId": 0,
      "valeur": {
        "year": 0,
        "month": 0,
        "day": 0,
        "dayOfWeek": 0,
        "dayOfYear": 0,
        "dayNumber": 0
      },
      "annonces": [
        "string"
      ],
      "reservationsDebutants": [],
      "reservationsFinissants": []
    },
    "typeHebergementBien": {
      "typeHebergementId": 0,
      "libelleTypeHebergement": "string",
      "annonces": [
        "string"
      ],
      "rechercheEnregistrees": []
    },
    "proprietaireBien": {
      "compteUtilisateurId": 0,
      "numeroTelephoneUtilisateur": "string",
      "solde": 0,
      "motDePasse": "string",
      "statutRgpd": true,
      "mail": "string",
      "telephoneVerifie": true,
      "role": "string",
      "dateCreation": {
        "year": 0,
        "month": 0,
        "day": 0,
        "dayOfWeek": 0,
        "dayOfYear": 0,
        "dayNumber": 0
      },
      "dateDerniereConnexion": {
        "year": 0,
        "month": 0,
        "day": 0,
        "dayOfWeek": 0,
        "dayOfYear": 0,
        "dayNumber": 0
      },
      "annoncesPubliees": [
        "string"
      ],
      "avis": [
        "string"
      ],
      "demandesSuppressions": [],
      "documentsIdentites": [],
      "photoProfil": {
        "photoId": 0,
        "utilisateurId": 0,
        "lienurl": "string",
        "legende": "string",
        "utilisateurConcerne": "string",
        "annoncePhotographiee": "string"
      },
      "messagesEnvoyes": [],
      "messagesRecus": [],
      "particulierAssocie": {
        "particulierId": 0,
        "utilisateurId": 0,
        "civilite": "strin",
        "nom": "string",
        "prenom": "string",
        "dateNaissance": {
          "year": 0,
          "month": 0,
          "day": 0,
          "dayOfWeek": 0,
          "dayOfYear": 0,
          "dayNumber": 0
        },
        "utilisateurAssocie": "string",
        "locataireAssocie": "string",
        "proprietaireAssocie": {
          "proprietaireId": 0,
          "particulierId": 0,
          "nom": "string",
          "prenom": "string",
          "dateNaissance": {
            "year": 0,
            "month": 0,
            "day": 0,
            "dayOfWeek": 0,
            "dayOfYear": 0,
            "dayNumber": 0
          },
          "particulierAssocie": "string"
        }
      },
      "professionnelAssocie": {
        "professionnelId": 0,
        "utilisateurId": 0,
        "numeroSiret": "string",
        "secteurActivite": "string",
        "nomProfessionnel": "string",
        "utilisateurAssocie": "string"
      },
      "recherchesEnregistrees": [
        {
          "rechercheEnregistreeId": 0,
          "nbchambreMin": 0,
          "prixMin": 0,
          "prixMax": 0,
          "animauxAcceptes": true,
          "fumeursAutorises": true,
          "createdAt": "2026-03-16T08:19:41.720Z",
          "updatedAt": "2026-03-16T08:19:41.720Z",
          "typeHebergementRecherche": "string",
          "utilisateurRecherchant": "string",
          "villeRecherchee": "string",
          "recherchesHistorisees": [
            "string"
          ],
          "departementSouhaite": {
            "departementId": 0,
            "numeroDepartement": "str",
            "nomDepartement": "string",
            "regionConcernee": {
              "regionId": 0,
              "nomRegion": "string",
              "departements": [
                "string"
              ]
            },
            "rechercheenregistrees": [
              "string"
            ],
            "villes": [
              "string"
            ]
          }
        }
      ],
      "historiqueRecherches": [],
      "reglements": [],
      "annoncesFavorisees": []
    },
    "jourNonDisponibles": [
      {
        "jourNonDisponibleId": 0,
        "dates": {
          "year": 0,
          "month": 0,
          "day": 0,
          "dayOfWeek": 0,
          "dayOfYear": 0,
          "dayNumber": 0
        },
        "annonceNonDisponible": "string"
      }
    ],
    "messages": [],
    "photos": [
      {
        "photoId": 0,
        "utilisateurId": 0,
        "lienurl": "string",
        "legende": "string",
        "utilisateurConcerne": "string",
        "annoncePhotographiee": "string"
      }
    ],
    "prixPeriodes": [
      {
        "periodeId": 0,
        "prix": 0,
        "nomPeriode": "string",
        "annonceConcernee": "string"
      }
    ],
    "recherchesEffectuees": [],
    "reservations": [],
    "equipementsInclus": [
      {
        "equipementId": 0,
        "nomEquipement": "string",
        "typeEquipementNavigation": {
          "typeEquipementId": 0,
          "libelleTypeEquipement": "string",
          "equipements": [
            "string"
          ]
        },
        "annoncesConcernees": [
          "string"
        ]
      }
    ],
    "servicesProposes": [
      {
        "serviceId": 0,
        "nomService": "string",
        "annoncesConcernees": [
          "string"
        ]
      }
    ],
    "utilisateursInteresses": [],
    "exterieurs": [
      {
        "exterieurId": 0,
        "nomExterieur": "string",
        "annonces": [
          "string"
        ]
      }
    ]
  }
    )



})