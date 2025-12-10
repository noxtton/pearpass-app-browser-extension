import React from 'react'

import { getIconProps } from '../../utils/getIconProps'

/**
 * @param {{
 *  size?: string;
 *  width?: string;
 *  height?: string;
 *  color?: string;
 * }} props
 */
export const LogoutIcon = (props) => {
  const { width, height, color } = getIconProps(props)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        d="M4.01758 20.0254V4.02539H12.0368V5.02539H5.01758V19.0254H12.0368V20.0254H4.01758ZM16.4791 15.5639L15.7771 14.8446L18.0963 12.5254H9.20983V11.5254H18.0963L15.7771 9.20614L16.4791 8.48689L20.0176 12.0254L16.4791 15.5639Z"
        fill={color}
      />
    </svg>
  )
}
