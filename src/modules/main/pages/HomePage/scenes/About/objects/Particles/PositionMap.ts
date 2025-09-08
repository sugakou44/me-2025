import { HalfFloatType, RepeatWrapping } from 'three'
import { GPUComputationRenderer } from 'three/addons/misc/GPUComputationRenderer.js'

import PositionShader from './shaders/position.glsl'

import type { DataTexture, WebGLRenderer } from 'three'
import type { Variable } from 'three/addons/misc/GPUComputationRenderer.js'

interface Options {
  size: number
  resolution: number
  renderer: WebGLRenderer
}

const DEFAULT_UNIFORMS = {
  tick: {
    value: 0,
  },
  dt: {
    value: 0,
  },
  forceAttenuation: {
    value: 10,
  },
  forceFrequency: {
    value: Math.PI,
  },
  expandFactor: {
    value: 1,
  },
  enabled: {
    value: 0,
  },
  origin: {
    value: [0, 0, 0],
  },
  initialMap: {
    value: null,
  },
  targetMap: {
    value: null,
  },
} as const

type UniformKey = keyof typeof DEFAULT_UNIFORMS

const defines = {}

export class PositionMap {
  renderer: GPUComputationRenderer
  texture0: DataTexture
  targetMap: DataTexture
  variable: Variable

  constructor({ resolution, renderer }: Options) {
    this.renderer = new GPUComputationRenderer(resolution, resolution, renderer)
    this.renderer.setDataType(HalfFloatType)
    this.texture0 = this.renderer.createTexture()
    this.texture0.wrapS = RepeatWrapping
    this.texture0.wrapT = RepeatWrapping
    this.texture0.generateMipmaps = false
    this.texture0.anisotropy = renderer.capabilities.getMaxAnisotropy()

    this.targetMap = this.renderer.createTexture()

    for (let i = 0; i < resolution * resolution; i++) {
      const i4 = i * 4

      // Position based on geometry
      // @ts-expect-error
      this.texture0.image.data[i4 + 0] = 0
      // @ts-expect-error
      this.texture0.image.data[i4 + 1] = 0
      // @ts-expect-error
      this.texture0.image.data[i4 + 2] = 0
      // @ts-expect-error
      this.texture0.image.data[i4 + 3] = Math.random() + 1.0

      // Position based on targetForce
      // @ts-expect-error
      this.targetMap.image.data[i4 + 0] = Math.random()
      // @ts-expect-error
      this.targetMap.image.data[i4 + 3] = Math.random()
    }

    this.variable = this.renderer.addVariable(
      'positionTexture',
      PositionShader,
      this.texture0,
    )
    this.renderer.setVariableDependencies(this.variable, [this.variable])

    this.mergeUniforms()
    this.mergeDefines()

    this.setUniform('initialMap', this.texture0)
    this.setUniform('targetMap', this.targetMap)

    const error = this.renderer.init()
    if (error !== null) {
      console.error(error)
    }
  }

  get renderTarget() {
    return this.renderer.getCurrentRenderTarget(this.variable)
  }

  setUniform(name: UniformKey, value: any) {
    if (this.variable.material.uniforms[name] === undefined) {
      const error = new Error(`no uniform name: ${name}`)

      console.error(error.message)
      throw error
    }

    const currentValue = this.variable.material.uniforms[name].value

    if (currentValue != null && Object.hasOwn(currentValue, 'set')) {
      this.variable.material.uniforms[name].value.set(...value)

      return
    }

    this.variable.material.uniforms[name].value = value
  }

  mergeUniforms() {
    Object.entries(DEFAULT_UNIFORMS).forEach(([key, value]) => {
      this.variable.material.uniforms[key] = value
    })
  }

  mergeDefines() {
    Object.entries(defines).forEach(([key, value]) => {
      this.variable.material.defines[key] = value
    })
  }
}
