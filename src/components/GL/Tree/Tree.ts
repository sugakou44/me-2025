import { eases } from 'animejs'
import {
  BufferAttribute,
  BufferGeometry,
  Euler,
  Group,
  Mesh,
  Quaternion,
  ShaderMaterial,
  Vector2,
  Vector3,
} from 'three'

import { RNG } from '@/lib/utils/math'

import { Branch } from './branch'
import { TREE_TYPE } from './constants'
import TreeOptions from './options'
import BlobFragmentShader from './shaders/blob.fragment.glsl'
import BranchFragmentShader from './shaders/branch.fragment.glsl'
import BranchVertexShader from './shaders/branch.vertex.glsl'
import LeafFragmentShader from './shaders/leaf.fragment.glsl'
import LeafVertexShader from './shaders/leaf.vertex.glsl'

import type {
  Blob as BlobData,
  Branch as BranchData,
  Leave as LeaveData,
  Section,
} from './types'

const TMP_EULER = new Euler()
const TMP_VEC3 = new Vector3()
const SMOOTHEN_SECTIONS = 2
const SMOOTHEN_EASING = eases.inOutCirc

export class Tree extends Group {
  branchesMesh = new Mesh()
  leavesMesh = new Mesh()
  rng: RNG

  branches: BranchData
  leaves: LeaveData
  blobs: BlobData

  options: TreeOptions

  branchQueue: Branch[] = []

  constructor(options = new TreeOptions()) {
    super()
    this.name = 'Tree'
    this.branchesMesh = new Mesh()
    this.leavesMesh = new Mesh()
    this.add(this.branchesMesh)
    this.add(this.leavesMesh)
    this.options = options
    this.scale.set(this.options.scale, this.options.scale, this.options.scale)

    this.rng = new RNG(this.options.seed)

    this.branches = {
      verts: [],
      normals: [],
      indices: [],
      uvs: [],
      sectionOrigin: [],
    }

    this.leaves = {
      verts: [],
      normals: [],
      indices: [],
      uvs: [],
      leaveOrigin: [],
    }

    this.blobs = {
      verts: [],
      normals: [],
      indices: [],
      uvs: [],
      sectionOrigin: [],
      sections: [],
    }
  }

  update(tick: number, opacity = 0) {
    const branchMaterial = Array.isArray(this.branchesMesh.material)
      ? (this.branchesMesh.material[0] as ShaderMaterial)
      : (this.branchesMesh.material as ShaderMaterial)

    if (branchMaterial) {
      branchMaterial.uniforms.tick.value = tick
      branchMaterial.uniforms.opacity.value = opacity
    }

    const leaveMaterial = Array.isArray(this.leavesMesh.material)
      ? (this.leavesMesh.material[0] as ShaderMaterial)
      : (this.leavesMesh.material as ShaderMaterial)

    if (leaveMaterial) {
      leaveMaterial.uniforms.tick.value = tick
      leaveMaterial.uniforms.opacity.value = opacity
    }
  }

  reset() {
    this.branches = {
      verts: [],
      normals: [],
      indices: [],
      uvs: [],
      sectionOrigin: [],
    }

    this.leaves = {
      verts: [],
      normals: [],
      indices: [],
      uvs: [],
      leaveOrigin: [],
    }

    this.blobs = {
      verts: [],
      normals: [],
      indices: [],
      uvs: [],
      sectionOrigin: [],
      sections: [],
    }

    this.rng = new RNG(this.options.seed)
  }

  generate() {
    this.reset()

    if (this.options.leaves.type === 'sphere') {
      this.options.branch.children = Object.fromEntries(
        Object.entries(this.options.branch.children).map(([key, value]) => [
          key,
          value - 2,
        ]),
      )

      this.options.branch.length = Object.fromEntries(
        Object.entries(this.options.branch.length).map(([key, value]) => [
          key,
          parseInt(key) > 1 ? value - 1 : value,
        ]),
      )
    }

    // Create the trunk of the tree first
    this.branchQueue.push(
      new Branch(
        new Vector3(),
        new Euler(),
        this.options.branch.length[0],
        this.options.branch.radius[0],
        0,
        this.options.branch.sections[0],
        this.options.branch.segments[0],
        true,
      ),
    )

    while (this.branchQueue.length > 0) {
      const branch = this.branchQueue.shift()

      if (branch) {
        this.generateBranch(branch)
      }
    }

    this.createBranchesGeometry()

    if (this.options.leaves.type === 'quad') {
      this.createLeavesGeometry()
    } else {
      this.smoothenBlob()
      this.generateBlob()
      this.generateBlobIndices()
      this.createBlobsGeometry()
    }
  }

  /**
   * Generates a new branch
   * @param {Branch} branch
   * @returns
   */
  generateBranch(branch: Branch) {
    // Used later for geometry index generation
    const indexOffset = this.branches.verts.length / 3

    const sectionOrientation = branch.orientation.clone()
    const sectionOrigin = branch.origin.clone()
    const sectionLength =
      branch.length /
      branch.sectionCount /
      (this.options.type === 'deciduous' ? this.options.branch.levels - 1 : 1)

    // This information is used for generating child branches after the branch
    // geometry has been constructed
    const sections = []

    for (let i = 0; i <= branch.sectionCount; i++) {
      let sectionRadius = branch.radius

      // If final section of final level, set radius to effecively zero
      if (
        i === branch.sectionCount &&
        branch.level === this.options.branch.levels
      ) {
        sectionRadius = 0.001
      } else if (this.options.type === TREE_TYPE.Deciduous) {
        sectionRadius *=
          1 -
          this.options.branch.taper[branch.level] * (i / branch.sectionCount)
      } else if (this.options.type === TREE_TYPE.Evergreen) {
        // Evergreens do not have a terminal branch so they have a taper of 1
        sectionRadius *= 1 - i / branch.sectionCount
      }

      // Create the segments that make up this section.
      let first
      for (let j = 0; j < branch.segmentCount; j++) {
        const angle = (2.0 * Math.PI * j) / branch.segmentCount

        // Create the segment vertex
        const vertex = new Vector3(Math.sin(angle), Math.cos(angle), 0)
          .multiplyScalar(sectionRadius)
          .applyEuler(sectionOrientation)
          .add(sectionOrigin)

        const normal = new Vector3(Math.sin(angle), Math.cos(angle), 0)
          .applyEuler(sectionOrientation)
          .normalize()

        const uv = new Vector2(i % 2 === 0 ? 0 : 1, j / branch.segmentCount)

        this.branches.verts.push(...vertex.toArray())
        this.branches.normals.push(...normal.toArray())
        this.branches.uvs.push(...uv.toArray())
        this.branches.sectionOrigin.push(...sectionOrigin.toArray())

        if (j === 0) {
          first = { vertex, normal, uv }
        }
      }

      // Duplicate the first vertex so there is continuity in the UV mapping
      this.branches.verts.push(...first!.vertex.toArray())
      this.branches.normals.push(...first!.normal.toArray())
      this.branches.uvs.push(1, first!.uv.y)
      this.branches.sectionOrigin.push(...sectionOrigin.toArray())

      // Use this information later on when generating child branches
      sections.push({
        origin: sectionOrigin.clone(),
        orientation: sectionOrientation.clone(),
        radius: sectionRadius,
      })

      sectionOrigin.add(
        new Vector3(0, 0, sectionLength).applyEuler(sectionOrientation),
      )

      // Perturb the orientation of the next section randomly. The higher the
      // gnarliness, the larger potential perturbation
      const gnarliness =
        Math.max(1, 1 / Math.sqrt(sectionRadius)) *
        this.options.branch.gnarliness[branch.level]

      sectionOrientation.x += this.rng.random(gnarliness, -gnarliness)
      sectionOrientation.y += this.rng.random(gnarliness, -gnarliness)

      // Apply growth force to the branch
      const qSection = new Quaternion().setFromEuler(sectionOrientation)

      const qTwist = new Quaternion().setFromAxisAngle(
        new Vector3(0, 0, 1),
        this.options.branch.twist[branch.level],
      )

      const qForce = new Quaternion().setFromUnitVectors(
        new Vector3(0, 0, 1),
        new Vector3().copy(this.options.branch.force.direction),
      )

      qSection.multiply(qTwist)
      qSection.rotateTowards(
        qForce,
        this.options.branch.force.strength / sectionRadius,
      )

      sectionOrientation.setFromQuaternion(qSection)
    }

    this.generateBranchIndices(indexOffset, branch)

    // Deciduous trees have a terminal branch that grows out of the
    // end of the parent branch
    if (this.options.type === 'deciduous') {
      const lastSection = sections[sections.length - 1]

      if (branch.isTrunk && branch.level < this.options.branch.levels) {
        this.branchQueue.push(
          new Branch(
            lastSection.origin,
            lastSection.orientation,
            this.options.branch.length[branch.level + 1],
            lastSection.radius,
            branch.level + 1,
            // Section count and segment count must be same as parent branch
            // since the child branch is growing from the end of the parent branch
            branch.sectionCount,
            branch.segmentCount,
            true,
          ),
        )
      }
    }

    // If we are on the last branch level, generate leaves
    if (branch.level < this.options.branch.levels) {
      this.generateChildBranches(
        this.options.branch.children[branch.level],
        branch.level + 1,
        sections,
      )
    }

    if (this.options.leaves.type === 'quad') {
      if (branch.level === this.options.branch.levels) {
        this.generateLeavesQuad(sections)
      }
    } else {
      this.calculateBlob(branch, sections)
    }
  }

  generateChildBranches(count: number, level: number, sections: Section[]) {
    const radialOffset = this.rng.random()

    for (let i = 0; i < count; i++) {
      // Determine how far along the length of the parent branch the child
      // branch should originate from (0 to 1)
      const childBranchStart = this.rng.random(
        1.0,
        this.options.branch.start[level],
      )

      // Find which sections are on either side of the child branch origin point
      // so we can determine the origin, orientation and radius of the branch
      const sectionIndex = Math.floor(childBranchStart * (sections.length - 1))
      let sectionB
      const sectionA = sections[sectionIndex]
      if (sectionIndex === sections.length - 1) {
        sectionB = sectionA
      } else {
        sectionB = sections[sectionIndex + 1]
      }

      // Find normalized distance from section A to section B (0 to 1)
      const alpha =
        (childBranchStart - sectionIndex / (sections.length - 1)) /
        (1 / (sections.length - 1))

      // Linearly interpolate origin from section A to section B
      const childBranchOrigin = new Vector3().lerpVectors(
        sectionA.origin,
        sectionB.origin,
        alpha,
      )

      // Linearly interpolate radius
      const childBranchRadius =
        this.options.branch.radius[level] *
        ((1 - alpha) * sectionA.radius + alpha * sectionB.radius)

      // Linearlly interpolate the orientation
      const qA = new Quaternion().setFromEuler(sectionA.orientation)
      const qB = new Quaternion().setFromEuler(sectionB.orientation)
      const parentOrientation = new Euler().setFromQuaternion(
        qB.slerp(qA, alpha),
      )

      // Calculate the angle offset from the parent branch and the radial angle
      const radialAngle = 2.0 * Math.PI * (radialOffset + i / count)
      const q1 = new Quaternion().setFromAxisAngle(
        new Vector3(1, 0, 0),
        this.options.branch.angle[level] / (180 / Math.PI),
      )
      const q2 = new Quaternion().setFromAxisAngle(
        new Vector3(0, 0, 1),
        radialAngle,
      )
      const q3 = new Quaternion().setFromEuler(parentOrientation)

      const childBranchOrientation = new Euler().setFromQuaternion(
        q3.multiply(q2.multiply(q1)),
      )

      const childBranchLength =
        this.options.branch.length[level] *
        (this.options.type === TREE_TYPE.Evergreen
          ? 1.0 - childBranchStart
          : 1.0)

      this.branchQueue.push(
        new Branch(
          childBranchOrigin,
          childBranchOrientation,
          childBranchLength,
          childBranchRadius,
          level,
          this.options.branch.sections[level],
          this.options.branch.segments[level],
          level === 1 && sectionIndex === sections.length - 1,
        ),
      )
    }
  }

  calculateBlob(branch: Branch, sections: Section[]) {
    if (branch.isTrunk) {
      this.blobs.sections.pop()

      const maxZ = Math.max(...sections.map(({ origin }) => origin.z))
      this.blobs.sections.push(
        ...sections.filter(
          ({ origin }) =>
            origin.z >=
            maxZ *
              this.rng.random(
                this.options.branch.start[1] * 0.9,
                this.options.branch.start[1] * 0.6,
              ),
        ),
      )

      return
    }

    if (!this.blobs.sections.length) {
      return
    }

    sections.forEach((section) => {
      let nearestLevelIndex = 0

      for (let i = 0; i < this.blobs.sections.length; i++) {
        const _section = this.blobs.sections[i]
        const currentNearestCentroid = this.blobs.sections[nearestLevelIndex]

        const diffCurrent = Math.abs(_section.origin.z - section.origin.z)
        const diffNearest = Math.abs(
          currentNearestCentroid.origin.z - section.origin.z,
        )

        if (diffNearest > diffCurrent) {
          nearestLevelIndex = i
        }
      }

      const nearestLavel = this.blobs.sections[nearestLevelIndex]

      const distance = nearestLavel.origin.distanceTo(section.origin)

      if (distance > nearestLavel.radius) {
        nearestLavel.radius = distance
      }
    })
  }

  smoothenBlob() {
    this.blobs.sections = this.blobs.sections.filter(
      (_, i) => i === 0 || i === this.blobs.sections.length - 1 || i % 3 === 0,
    )
    const sectionCount = this.blobs.sections.length

    const firstSection = this.blobs.sections[0]
    const secondLastSection = this.blobs.sections[sectionCount - 2]
    const lastSection = this.blobs.sections[sectionCount - 1]

    firstSection.radius = 0.001
    secondLastSection.radius = 0.2

    lastSection.origin.add(
      new Vector3(0, 0, this.rng.random()).applyEuler(lastSection.orientation),
    )

    for (let i = 2; i < sectionCount; i++) {
      const section = this.blobs.sections[i]

      section.radius -= section.radius * i * 0.02
    }

    for (let i = 0; i < sectionCount; i++) {
      const prevSection = this.blobs.sections[i - 1]
      const section = this.blobs.sections[i]
      const nextSection = this.blobs.sections[i + 1]

      if (!prevSection || !nextSection) {
        continue
      }

      if (section.radius === 0) {
        section.radius = nextSection.radius
        continue
      }

      const diffR = prevSection.radius - section.radius

      if (diffR > 0.4) {
        const maxR = Math.max(prevSection.radius, section.radius)

        section.radius = maxR - diffR * this.rng.random(0.5, 0.2)
      }
    }

    const toBeInsertSection: Section[][] = []

    for (let i = 0; i < sectionCount; i++) {
      const prevSection = this.blobs.sections[i - 1]
      const section = this.blobs.sections[i]

      if (!prevSection) {
        continue
      }

      const diffR = section.radius - prevSection.radius

      const _section: Section[] = []

      for (let j = 1; j < SMOOTHEN_SECTIONS; j++) {
        const t = j / SMOOTHEN_SECTIONS
        const alpha = SMOOTHEN_EASING(t)

        const origin = new Vector3().lerpVectors(
          prevSection.origin,
          section.origin,
          alpha,
        )

        const radius = prevSection.radius + diffR * alpha

        _section.push({
          origin,
          orientation: TMP_EULER.clone(),
          radius,
        })
      }

      toBeInsertSection.push(_section)
    }

    toBeInsertSection.reverse().forEach((sections, index) => {
      this.blobs.sections.splice(
        toBeInsertSection.length - index,
        0,
        ...sections,
      )
    })
  }

  generateLeavesQuad(sections: Section[]) {
    const radialOffset = this.rng.random()

    for (let i = 0; i < this.options.leaves.count; i++) {
      // Determine how far along the length of the parent
      // branch the leaf should originate from (0 to 1)
      const leafStart = this.rng.random(1.0, this.options.leaves.start)

      // Find which sections are on either side of the child branch origin point
      // so we can determine the origin, orientation and radius of the branch
      const sectionIndex = Math.floor(leafStart * (sections.length - 1))
      let sectionB
      const sectionA = sections[sectionIndex]
      if (sectionIndex === sections.length - 1) {
        sectionB = sectionA
      } else {
        sectionB = sections[sectionIndex + 1]
      }

      // Find normalized distance from section A to section B (0 to 1)
      const alpha =
        (leafStart - sectionIndex / (sections.length - 1)) /
        (1 / (sections.length - 1))

      // Linearly interpolate origin from section A to section B
      const leafOrigin = new Vector3().lerpVectors(
        sectionA.origin,
        sectionB.origin,
        alpha,
      )

      // Linearlly interpolate the orientation
      const qA = new Quaternion().setFromEuler(sectionA.orientation)
      const qB = new Quaternion().setFromEuler(sectionB.orientation)
      const parentOrientation = new Euler().setFromQuaternion(
        qB.slerp(qA, alpha),
      )

      // Calculate the angle offset from the parent branch and the radial angle
      const radialAngle =
        2.0 * Math.PI * (radialOffset + i / this.options.leaves.count)
      const q1 = new Quaternion().setFromAxisAngle(
        new Vector3(1, 0, 0),
        this.options.leaves.angle / (180 / Math.PI),
      )
      const q2 = new Quaternion().setFromAxisAngle(
        new Vector3(0, 1, 0),
        radialAngle,
      )
      const q3 = new Quaternion().setFromEuler(parentOrientation)

      const leafOrientation = new Euler().setFromQuaternion(
        q3.multiply(q2.multiply(q1)),
      )

      this.generateLeafQuad(leafOrigin, leafOrientation)
    }
  }

  /**
   * Generates a leaves
   * @param {Vector3} origin The starting point of the branch
   * @param {Euler} orientation The starting orientation of the branch
   */
  generateLeafQuad(origin: Vector3, orientation: Euler) {
    let i = this.leaves.verts.length / 3

    // Width and length of the leaf quad
    const leafSize =
      this.options.leaves.size *
      (1 +
        this.rng.random(
          this.options.leaves.sizeVariance,
          -this.options.leaves.sizeVariance,
        ))

    const W = leafSize
    const L = leafSize

    const createLeaf = (rotation: number) => {
      // Create quad vertices
      const v = [
        new Vector3(-W / 2, L, 0),
        new Vector3(-W / 2, 0, 0),
        new Vector3(W / 2, 0, 0),
        new Vector3(W / 2, L, 0),
      ].map((v) =>
        v
          .applyEuler(new Euler(0, rotation, 0))
          .applyEuler(orientation)
          .add(origin),
      )

      this.leaves.verts.push(
        v[0].x,
        v[0].y,
        v[0].z,
        v[1].x,
        v[1].y,
        v[1].z,
        v[2].x,
        v[2].y,
        v[2].z,
        v[3].x,
        v[3].y,
        v[3].z,
      )

      const n = new Vector3(0, 0, 1).applyEuler(orientation)
      this.leaves.normals.push(
        n.x,
        n.y,
        n.z,
        n.x,
        n.y,
        n.z,
        n.x,
        n.y,
        n.z,
        n.x,
        n.y,
        n.z,
      )
      this.leaves.uvs.push(0, 1, 0, 0, 1, 0, 1, 1)
      this.leaves.indices.push(i, i + 1, i + 2, i, i + 2, i + 3)
      i += 4

      this.leaves.leaveOrigin.push(
        ...origin.toArray(),
        ...origin.toArray(),
        ...origin.toArray(),
        ...origin.toArray(),
      )
    }

    createLeaf(0)
  }

  generateBranchIndices(indexOffset: number, branch: Branch) {
    // Build geometry each section of the branch (cylinder without end caps)
    let v1, v2, v3, v4
    const N = branch.segmentCount + 1
    for (let i = 0; i < branch.sectionCount; i++) {
      // Build the quad for each segment of the section
      for (let j = 0; j < branch.segmentCount; j++) {
        v1 = indexOffset + i * N + j
        // The last segment wraps around back to the starting segment, so omit j + 1 term
        v2 = indexOffset + i * N + (j + 1)
        v3 = v1 + N
        v4 = v2 + N
        this.branches.indices.push(v1, v3, v2, v2, v3, v4)
      }
    }
  }

  generateBlob() {
    const sectionCount = this.blobs.sections.length
    const segmentCount = this.options.blob.segmentCount

    for (let i = 0; i <= sectionCount; i++) {
      const prevSection = this.blobs.sections[i - 1]
      const section = this.blobs.sections[i] ?? prevSection
      const sectionRadius =
        i === 0 || i >= sectionCount - 1
          ? section.radius
          : section.radius +
            this.options.blob.sizeOffest +
            this.rng.random(this.options.blob.sizeVariance, 0)

      const sectionOrigin = section?.origin ?? TMP_VEC3

      // Create the segments that make up this section.
      let first
      for (let j = 0; j < segmentCount; j++) {
        const angle = (2.0 * Math.PI * j) / segmentCount

        // Create the segment vertex
        const vertex = new Vector3(Math.sin(angle), Math.cos(angle), 0)
          .multiplyScalar(sectionRadius)
          .add(sectionOrigin)

        const normal = new Vector3(
          Math.sin(angle),
          Math.cos(angle),
          0,
        ).normalize()

        const uv = new Vector2(j / segmentCount, i % 2 === 0 ? 0 : 1)

        this.blobs.verts.push(...vertex.toArray())
        this.blobs.normals.push(...normal.toArray())
        this.blobs.uvs.push(...uv.toArray())
        this.blobs.sectionOrigin.push(...sectionOrigin.toArray())

        if (j === 0) {
          first = { vertex, normal, uv }
        }
      }

      // Duplicate the first vertex so there is continuity in the UV mapping
      this.blobs.verts.push(...first!.vertex.toArray())
      this.blobs.normals.push(...first!.normal.toArray())
      this.blobs.uvs.push(1, first!.uv.y)
      this.blobs.sectionOrigin.push(...sectionOrigin.toArray())
    }

    const sections = [
      this.blobs.sections[0],
      this.blobs.sections[this.blobs.sections.length - 1],
    ]

    sections.forEach((section) => {
      const vertex = section.origin.clone().applyEuler(section.orientation)

      const normal = section.origin.clone().normalize()

      this.blobs.verts.push(...vertex.toArray())
      this.blobs.normals.push(...normal.toArray())
      this.blobs.uvs.push(0.5, 0.5)
      this.blobs.sectionOrigin.push(...section.origin.toArray())
    })
  }

  generateBlobIndices() {
    const sectionCount = this.blobs.sections.length
    const segmentCount = this.options.blob.segmentCount

    const startCenterIndex = this.blobs.verts.length / 3 - 2
    const endCenterIndex = this.blobs.verts.length / 3 - 1

    let v1, v2, v3, v4
    const N = segmentCount + 1

    for (let i = 0; i <= 1; i++) {
      const _i = i === 0 ? 0 : sectionCount - 1
      const v0 = i === 0 ? startCenterIndex : endCenterIndex
      for (let j = 0; j < segmentCount; j++) {
        v1 = _i * N + j
        v2 = _i * N + (j + 1)

        this.blobs.indices.push(v0, v1, v2)
      }
    }

    for (let i = 0; i < sectionCount; i++) {
      // Build the quad for each segment of the section
      for (let j = 0; j < segmentCount; j++) {
        v1 = i * N + j
        v2 = i * N + (j + 1)
        v3 = v1 + N
        v4 = v2 + N

        this.blobs.indices.push(v1, v3, v2, v2, v3, v4)
      }
    }
  }

  createBranchesGeometry() {
    const g = new BufferGeometry()

    g.setAttribute(
      'sectionOrigin',
      new BufferAttribute(new Float32Array(this.branches.sectionOrigin), 3),
    )
    g.setAttribute(
      'position',
      new BufferAttribute(new Float32Array(this.branches.verts), 3),
    )
    g.setAttribute(
      'normal',
      new BufferAttribute(new Float32Array(this.branches.normals), 3),
    )
    g.setAttribute(
      'uv',
      new BufferAttribute(new Float32Array(this.branches.uvs), 2),
    )
    g.setIndex(new BufferAttribute(new Uint16Array(this.branches.indices), 1))
    g.computeBoundingSphere()

    const uniforms = {
      tick: {
        value: 0,
      },
      swayFactor: {
        value: 0.5,
      },
      diffuseColor: {
        value: this.options.bark.tint,
      },
      opacity: {
        value: 1,
      },
      treeOrigin: {
        value: this.position,
      },
      map: {
        value: this.options.bark.texture,
      },
    }

    const mat = new ShaderMaterial({
      name: 'branches',
      vertexShader: BranchVertexShader,
      fragmentShader: BranchFragmentShader,
      transparent: true,
      uniforms,
    })

    this.branchesMesh.geometry.dispose()
    this.branchesMesh.geometry = g

    if (Array.isArray(this.branchesMesh.material)) {
      this.branchesMesh.material.forEach((material) => material.dispose())
    } else {
      this.branchesMesh.material.dispose()
    }
    this.branchesMesh.material = mat
    this.branchesMesh.castShadow = true
    this.branchesMesh.receiveShadow = true
  }

  /**
   * Generates the geometry for the leaves
   */
  createLeavesGeometry() {
    const g = new BufferGeometry()
    g.setAttribute(
      'position',
      new BufferAttribute(new Float32Array(this.leaves.verts), 3),
    )
    g.setAttribute(
      'uv',
      new BufferAttribute(new Float32Array(this.leaves.uvs), 2),
    )
    g.setAttribute(
      'leaveOrigin',
      new BufferAttribute(new Float32Array(this.leaves.leaveOrigin), 3),
    )
    g.setIndex(new BufferAttribute(new Uint16Array(this.leaves.indices), 1))
    g.computeVertexNormals()
    g.computeBoundingSphere()

    const uniforms = {
      tick: {
        value: 0,
      },
      diffuseColor: {
        value: this.options.leaves.tint,
      },
      swayFactor: {
        value: 1,
      },
      opacity: {
        value: 1,
      },
      treeOrigin: {
        value: this.position,
      },
    }

    const mat = new ShaderMaterial({
      name: 'leaves',
      vertexShader: LeafVertexShader,
      fragmentShader: LeafFragmentShader,
      transparent: true,
      uniforms,
    })

    this.leavesMesh.geometry.dispose()
    this.leavesMesh.geometry = g

    if (Array.isArray(this.leavesMesh.material)) {
      this.leavesMesh.material.forEach((material) => material.dispose())
    } else {
      this.leavesMesh.material.dispose()
    }

    this.leavesMesh.material = mat

    this.leavesMesh.castShadow = true
    this.leavesMesh.receiveShadow = true
  }

  createBlobsGeometry() {
    const g = new BufferGeometry()

    g.setAttribute(
      'sectionOrigin',
      new BufferAttribute(new Float32Array(this.blobs.sectionOrigin), 3),
    )
    g.setAttribute(
      'position',
      new BufferAttribute(new Float32Array(this.blobs.verts), 3),
    )
    g.setAttribute(
      'normal',
      new BufferAttribute(new Float32Array(this.blobs.normals), 3),
    )
    g.setAttribute(
      'uv',
      new BufferAttribute(new Float32Array(this.blobs.uvs), 2),
    )
    g.setIndex(new BufferAttribute(new Uint16Array(this.blobs.indices), 1))
    g.computeBoundingSphere()

    const uniforms = {
      tick: {
        value: 0,
      },
      swayFactor: {
        value: 4.4,
      },
      diffuseColor: {
        value: this.options.blob.tint,
      },
      tipColor: {
        value: this.options.blob.tip,
      },
      origin: {
        value: new Vector3(
          this.blobs.verts.at(-6),
          this.blobs.verts.at(-5),
          this.blobs.verts.at(-4),
        ),
      },
      opacity: {
        value: 1,
      },
      treeOrigin: {
        value: this.position,
      },
    }

    const mat = new ShaderMaterial({
      name: 'blobs',
      vertexShader: BranchVertexShader,
      fragmentShader: BlobFragmentShader,
      transparent: true,
      uniforms,
      // side: DoubleSide,
      side: this.options.blob.side,
    })

    this.leavesMesh.geometry.dispose()
    this.leavesMesh.geometry = g

    if (Array.isArray(this.leavesMesh.material)) {
      this.leavesMesh.material.forEach((material) => material.dispose())
    } else {
      this.leavesMesh.material.dispose()
    }
    this.leavesMesh.material = mat
    this.leavesMesh.castShadow = true
    this.leavesMesh.receiveShadow = true
  }
}
