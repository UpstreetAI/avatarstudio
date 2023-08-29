import React, { useContext } from "react"
import { SceneContext } from "../context/SceneContext"
import { CameraMode, ViewContext } from "../context/ViewContext"
import { startAR } from "../library/ar"
import styles from './ARButton.module.css'

export default function ARButton() {
  const {currentCameraMode, setCurrentCameraMode} = useContext(ViewContext)
  const {scene} = useContext(SceneContext)

  return (
      <div className={`${styles['SquareButton']} ${currentCameraMode === CameraMode.AR ? styles['AROff'] : styles['AROn']}`}
        onClick={() => {
          if (currentCameraMode === CameraMode.AR) {
            setCurrentCameraMode(CameraMode.NORMAL);
            // find a div called almostthereContainer and remove it from dom if it exists
            window.XR8?.stop()
            window.XR8?.clearCameraPipelineModules()

            const almostThereContainer = document.getElementById('almostthereContainer')
            if (almostThereContainer) {
              almostThereContainer.remove()
            }
          }
          else {
            startAR(scene)
            setCurrentCameraMode(CameraMode.AR);
          }
        }}
      />
  )
}
