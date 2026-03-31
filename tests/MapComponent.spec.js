import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MapComponent from '@/components/MapComponent.vue'
import L from 'leaflet'

// 1. On améliore le mock pour que divIcon renvoie un objet
vi.mock('leaflet', () => {
  const markerMock = {
    bindPopup: vi.fn().mockReturnThis(),
    addTo: vi.fn().mockReturnThis(),
  }

  const layerMock = {
    addTo: vi.fn().mockReturnThis(),
    clearLayers: vi.fn().mockReturnThis(),
    addLayer: vi.fn().mockReturnThis(),
    getBounds: vi.fn(() => [[0, 0], [1, 1]]),
  }

  const mapMock = {
    setView: vi.fn().mockReturnThis(),
    fitBounds: vi.fn().mockReturnThis(),
    remove: vi.fn().mockReturnThis(),
  }

  return {
    default: {
      map: vi.fn(() => mapMock),
      tileLayer: vi.fn(() => ({ addTo: vi.fn() })),
      marker: vi.fn(() => markerMock),
      circle: vi.fn(() => ({ addTo: vi.fn() })),
      divIcon: vi.fn(() => ({ type: 'divIcon' })), // ✅ Retourne un objet, plus "undefined"
      featureGroup: vi.fn(() => layerMock),
      Icon: { Default: { prototype: {}, mergeOptions: vi.fn() } },
    }
  }
})

vi.mock('leaflet/dist/images/marker-icon.png', () => ({ default: '' }))
vi.mock('leaflet/dist/images/marker-icon-2x.png', () => ({ default: '' }))
vi.mock('leaflet/dist/images/marker-shadow.png', () => ({ default: '' }))

describe('MapComponent.vue', () => {
  
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initialise la carte sur l\'élément container au montage', () => {
    const wrapper = mount(MapComponent, {
      props: { latitude: 45.76, longitude: 4.83 }
    })
    expect(L.map).toHaveBeenCalled()
    expect(L.map().setView).toHaveBeenCalledWith([45.76, 4.83], 6)
  })

  it('dessine le marqueur principal (maison) et le cercle de zone', () => {
    mount(MapComponent, {
      props: { latitude: 48.85, longitude: 2.35 }
    })

    expect(L.circle).toHaveBeenCalled()
    // ✅ Maintenant icon ne sera plus undefined
    expect(L.marker).toHaveBeenCalledWith([48.85, 2.35], expect.objectContaining({
      icon: expect.any(Object)
    }))
  })

  it('ajoute des marqueurs supplémentaires via la prop markers', async () => {
    const extraMarkers = [
      { latitude: 44.0, longitude: 5.0, titre: 'Lieu A' },
      { latitude: 46.0, longitude: 2.0, titre: 'Lieu B' }
    ]

    const wrapper = mount(MapComponent, {
      props: { latitude: 45.0, longitude: 5.0, markers: [] }
    })

    // ✅ On réinitialise le compteur avant de changer les props 
    // pour ne pas compter le marqueur du premier rendu (montage)
    vi.clearAllMocks()

    await wrapper.setProps({ markers: extraMarkers })

    // On attend 1 (principal) + 2 (extra) = 3 appels
    expect(L.marker).toHaveBeenCalledTimes(3)
  })

  it('ajuste la vue (fitBounds) quand il y a plusieurs marqueurs', async () => {
    const extraMarkers = [
      { latitude: 44.0, longitude: 5.0 },
      { latitude: 46.0, longitude: 2.0 }
    ]

    mount(MapComponent, {
      props: { latitude: 45.0, longitude: 5.0, markers: extraMarkers }
    })

    expect(L.map().fitBounds).toHaveBeenCalled()
  })

  it('rend le container avec les bonnes classes CSS', () => {
    const wrapper = mount(MapComponent)
    expect(wrapper.classes()).toContain('map-container')
  })
})