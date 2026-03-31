import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
// ✅ IMPORT CORRIGÉ : On pointe vers PhotosAnnonce.vue
import PhotosAnnonce from '@/components/PhotosAnnonce.vue'

describe('PhotosAnnonce.vue', () => {

  it('affiche un message quand il n\'y a aucune photo', () => {
    const wrapper = mount(PhotosAnnonce, {
      props: {
        annonce: { photos: [] }
      }
    })
    expect(wrapper.text()).toContain('Cette annonce ne contient pas de photos')
  })

  it('affiche une seule photo avec la classe "unePhoto"', () => {
    const wrapper = mount(PhotosAnnonce, {
      props: {
        annonce: {
          photos: [{ lienurl: 'image1.jpg' }]
        }
      }
    })
    const img = wrapper.find('img.unePhoto')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('image1.jpg')
  })

  it('affiche deux photos avec les classes correspondantes', () => {
    const wrapper = mount(PhotosAnnonce, {
      props: {
        annonce: {
          photos: [
            { lienurl: 'img1.jpg' },
            { lienurl: 'img2.jpg' }
          ]
        }
      }
    })
    expect(wrapper.find('img.deuxPhotosUn').exists()).toBe(true)
    expect(wrapper.find('img.deuxPhotosDeux').exists()).toBe(true)
  })

  it('affiche trois photos pour le cas par défaut (3 ou plus)', () => {
    const wrapper = mount(PhotosAnnonce, {
      props: {
        annonce: {
          photos: [
            { lienurl: 'img1.jpg' },
            { lienurl: 'img2.jpg' },
            { lienurl: 'img3.jpg' }
          ]
        }
      }
    })
    // On vérifie que les 3 images sont bien rendues avec leurs classes
    expect(wrapper.find('img.troisPhotosUn').exists()).toBe(true)
    expect(wrapper.find('img.troisPhotosDeux').exists()).toBe(true)
    expect(wrapper.find('img.troisPhotosTrois').exists()).toBe(true)
  })

})