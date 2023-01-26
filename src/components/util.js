import * as THREE from 'three'
import { proxy } from 'valtio'

export const damp = THREE.MathUtils.damp
export const state = proxy({
    clicked: null,
    urls: [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map((u) => `/pictures/${u}.png`)
})
