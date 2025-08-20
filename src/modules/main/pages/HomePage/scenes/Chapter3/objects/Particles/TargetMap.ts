import { HalfFloatType, RepeatWrapping } from 'three'
import { GPUComputationRenderer } from 'three/addons/misc/GPUComputationRenderer.js'

import TargetShader from './shaders/target.glsl'

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
  positionMap: {
    value: null,
  },
} as const

type UniformKey = keyof typeof DEFAULT_UNIFORMS

const defines = {}

export class TargetMap {
  renderer: GPUComputationRenderer
  texture0: DataTexture
  variable: Variable

  constructor({ resolution, renderer }: Options) {
    this.renderer = new GPUComputationRenderer(resolution, resolution, renderer)
    this.renderer.setDataType(HalfFloatType)
    this.texture0 = this.renderer.createTexture()
    this.texture0.wrapS = RepeatWrapping
    this.texture0.wrapT = RepeatWrapping
    this.texture0.generateMipmaps = false
    this.texture0.anisotropy = renderer.capabilities.getMaxAnisotropy()

    for (let i = 0; i < resolution * resolution; i++) {
      const i4 = i * 4

      // Position based on geometry
      // @ts-expect-error
      this.texture0.image.data[i4 + 0] = (Math.random() * 2.0 - 1.0) * 2.0
      // @ts-expect-error
      this.texture0.image.data[i4 + 1] = Math.random() * Math.random()
      // @ts-expect-error
      this.texture0.image.data[i4 + 2] = (Math.random() * 2.0 - 1.0) * 2.0
      // @ts-expect-error
      this.texture0.image.data[i4 + 3] = Math.random()
    }

    this.variable = this.renderer.addVariable(
      'targetTexture',
      TargetShader,
      this.texture0,
    )
    this.renderer.setVariableDependencies(this.variable, [this.variable])

    this.mergeUniforms()
    this.mergeDefines()

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
