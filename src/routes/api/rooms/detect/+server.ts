import { json, text } from '@sveltejs/kit'
import cvReadyPromise from '@techstark/opencv-js'

import {
  DEFAULT_DESCRIPTION,
  DEFAULT_NAME,
  DEFAULT_TITLE,
  THEME_COLOR,
} from '@/lib/constants/seo'

export const GET = async ({ request }) => {
  // const data = req.body
  // if (!dataIsValid) return response400(res, req.userAccount.language)
  // try {
  //   const edgeBase64 = await getOrCreateEdge(data.floorId, 'floors')
  //   if (edgeBase64 === null) return response404(res, req.userAccount.language)
  //   const edge = ImageProcessing.convertBase64toImageMatrix(edgeBase64)
  //   data.coords[0] = ImageProcessing.getBoundingBox(data.coords[0], { x: 0, y: 0 }, { x: edge.cols, y: edge.rows })
  //   data.coords[1] = ImageProcessing.getBoundingBox(data.coords[1], { x: 0, y: 0 }, { x: edge.cols, y: edge.rows })
  //   const rect = ImageProcessing.getROIPoint(data.coords[0], data.coords[1])
  //   const roi = ImageProcessing.getROI(edge, rect)
  //   const contours = ImageProcessing.findContours(roi)
  //   const returnData = {
  //     floorId: data.floorId,
  //     centerPoint: null,
  //     coords: '',
  //     shape: null
  //   }
  //   if (contours.length <= 0) return response200(res, req.userAccount.language, null, null, returnData)
  //   const biggestContour = ImageProcessing.getBiggestContour(contours)
  //   if (biggestContour == null) return response200(res, req.userAccount.language, null, null, returnData)
  //   const stringPoints = ImageProcessing.getStringPoints(biggestContour, rect)
  //   returnData.coords = stringPoints
  //   let centerPoint = ImageProcessing.getCenterPoint(biggestContour)
  //   centerPoint = ImageProcessing.transformPointWithOffset(centerPoint, rect)
  //   returnData.centerPoint = centerPoint
  //   returnData.shape = ImageProcessing.getShape(biggestContour)
  //   return response200(res, req.userAccount.language, null, null, returnData)
  // } catch (error) {
  //   console.log(new Date(), ' Error of findContours Controller: ', error)
  //   return response500(res, req.userAccount.language)
  // }

  const cv = await cvReadyPromise
  console.log(cv)
  return json({
    name: DEFAULT_TITLE,
    short_name: DEFAULT_NAME,
    description: DEFAULT_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: THEME_COLOR,
    theme_color: THEME_COLOR,
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  })
}

export const fallback = async ({ request }) => {
  return text(`I caught your ${request.method} request!`)
}
