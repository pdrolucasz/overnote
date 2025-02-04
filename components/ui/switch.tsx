import { ComponentProps, FC } from "react"

// const Switch = () => {
// 	return (
// 		<label className="inline-flex items-center cursor-pointer" data-tooltip-target="tooltip-animation">
// 			<input type="checkbox" value="true" className="sr-only peer" />
// 			<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
// 			{/* <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span> */}
// 		</label>
// 	)
// }

type SwitchElementProps = ComponentProps<"div">

const Element: FC<SwitchElementProps> = (props) => {
	return (
		<div
			className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
			{...props}
		/>
	)
}

type SwitchControlProps = ComponentProps<"input">

const Control: FC<SwitchControlProps> = (props) => {
	return (
		<input type="checkbox" value="true" className="sr-only peer" {...props} />
	)
}

type SwitchRootProps = ComponentProps<"label">

const Root: FC<SwitchRootProps> = (props) => {
	return (
		<label className="inline-flex items-center cursor-pointer" {...props} />
	)
}

type SwitchLabelProps = ComponentProps<"span">

const Label: FC<SwitchLabelProps> = (props) => {
	return (
		<span className="ms-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" {...props} />
	)
}

export { Root, Control, Label, Element }
