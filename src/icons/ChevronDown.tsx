import React, { FC, ReactElement, MouseEvent } from 'react'

const ChevronDown: FC<{
	className?: string
	width?: number
	height?: number
}> = (props): ReactElement => {
	return (
		<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M27.1549 15.4883L19.9999 22.6433L12.8449 15.4883L10.4883 17.8449L19.9999 27.3566L29.5116 17.8449L27.1549 15.4883Z" fill="#F3E9DD"/>
		</svg>
	)
}

export default ChevronDown
