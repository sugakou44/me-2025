<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { Gizmo } from '@threlte/extras'
  import CameraControls from 'camera-controls'
  import * as THREE from 'three'

  let isInitialized = false

  CameraControls.install({ THREE: THREE })
  const { renderer, camera } = useThrelte()

  const cameraControls = new CameraControls(
    camera.current as THREE.PerspectiveCamera,
    renderer.domElement,
  )

  useTask((delta) => {
    if (!isInitialized) {
      // cameraControls.setPosition(0, 2, 0)
      cameraControls.setLookAt(0, -2, 1, 0, 0, 0)

      isInitialized = true
    }

    cameraControls.update(delta)
  })
</script>

<T is={cameraControls}>
  <Gizmo />
</T>
