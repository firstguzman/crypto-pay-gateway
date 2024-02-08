import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
const TickCircle = (props: SvgProps) => (
  <Svg
    //@ts-ignore
    xmlns="http://www.w3.org/2000/svg"
    width={80}
    height={81}
    fill="none"
    {...props}
  >
    <Path
      fill="#16A34A"
      d="M40 73.833c18.41 0 33.333-14.923 33.333-33.333C73.333 22.09 58.41 7.167 40 7.167 21.59 7.167 6.667 22.09 6.667 40.5 6.667 58.91 21.59 73.833 40 73.833Z"
      opacity={0.4}
    />
    <Path
      fill="#16A34A"
      d="M35.267 52.433c-.667 0-1.3-.266-1.767-.733l-9.433-9.433a2.515 2.515 0 0 1 0-3.534 2.515 2.515 0 0 1 3.533 0l7.667 7.667L52.4 29.267a2.515 2.515 0 0 1 3.533 0 2.515 2.515 0 0 1 0 3.533l-18.9 18.9c-.466.467-1.1.733-1.766.733Z"
    />
  </Svg>
)
export default TickCircle
