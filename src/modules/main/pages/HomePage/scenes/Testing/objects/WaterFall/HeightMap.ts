import { HalfFloatType, RepeatWrapping, Vector2 } from 'three'
import { GPUComputationRenderer } from 'three/addons/misc/GPUComputationRenderer.js'

import HeightMapFragmentShader from './shaders/heightmap.glsl'

import type { DataTexture, WebGLRenderer } from 'three'
import type { Variable } from 'three/addons/misc/GPUComputationRenderer.js'

interface Options {
  size: number
  resolution: number
  renderer: WebGLRenderer
}

const DEFAULT_UNIFORMS = {
  objectPos: {
    value: new Vector2(),
  },
  objectSize: {
    value: 0.5,
  },
  viscosity: {
    value: 0.85,
  },
} as const

type UniformKey = keyof typeof DEFAULT_UNIFORMS

const defines = {
  DEPTH: 0.2,
}

export class HeightMap {
  renderer: GPUComputationRenderer
  heightMap0: DataTexture
  heightMapVariable: Variable

  constructor({ size, resolution, renderer }: Options) {
    this.renderer = new GPUComputationRenderer(resolution, resolution, renderer)
    this.renderer.setDataType(HalfFloatType)
    this.heightMap0 = this.renderer.createTexture()
    this.heightMap0.wrapS = RepeatWrapping
    this.heightMap0.wrapT = RepeatWrapping
    this.heightMap0.generateMipmaps = false
    this.heightMap0.anisotropy = renderer.capabilities.getMaxAnisotropy()

    this.heightMapVariable = this.renderer.addVariable(
      'heightmap',
      HeightMapFragmentShader,
      this.heightMap0,
    )
    this.renderer.setVariableDependencies(this.heightMapVariable, [
      this.heightMapVariable,
    ])

    this.mergeUniforms()
    this.mergeDefines()
    this.heightMapVariable.material.defines.BOUNDS = size.toFixed(1)
    // this.fillTexture( this.heightmap0 );
    const error = this.renderer.init()
    if (error !== null) {
      console.error(error)
    }
  }

  get renderTarget() {
    return this.renderer.getCurrentRenderTarget(this.heightMapVariable)
  }

  setUniform(name: UniformKey, value: any) {
    if (!this.heightMapVariable.material.uniforms[name]) {
      const error = new Error(`no uniform name: ${name}`)

      console.error(error.message)
      throw error
    }

    const currentValue = this.heightMapVariable.material.uniforms[name].value
    if (typeof currentValue === 'number') {
      this.heightMapVariable.material.uniforms[name].value = value

      return
    }

    this.heightMapVariable.material.uniforms[name].value.set(...value)
  }

  mergeUniforms() {
    Object.entries(DEFAULT_UNIFORMS).forEach(([key, value]) => {
      this.heightMapVariable.material.uniforms[key] = value
    })
  }

  mergeDefines() {
    Object.entries(defines).forEach(([key, value]) => {
      this.heightMapVariable.material.defines[key] = value
    })
  }
}
