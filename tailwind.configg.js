// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');
const {nextui} = require("@nextui-org/theme");


/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				inter: ['"Inter"', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				primary: "#005BDA"
			}
		},
	},
	plugins: [],
	darkMode: "class",
	plugins: [nextui()]
}
