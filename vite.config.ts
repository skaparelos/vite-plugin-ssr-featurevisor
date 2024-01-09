import { defineConfig, mergeConfig } from "vite";
// import react from "@vitejs/plugin-react";
import ssr from "vike/plugin";
import { vavite } from "vavite";
import vercel from 'vite-plugin-vercel'
// import type { UserConfig } from 'vite'

export default defineConfig({
	ssr: {
		// Add npm packages containing invalid code here
		noExternal: [
			'@featurevisor/sdk',
			'@featurevisor/react'
		]
	},
	buildSteps: [
		{ name: 'client' },
		{
			name: 'server',
			config: {
				build: { ssr: true },
			},
		},
	],
	vercel: {
		defaultMaxDuration: 30,
		expiration: 86400,
	},
	plugins: [
		vavite({
			serverEntry: "/server/index.ts",
			serveClientAssetsInDev: true,
		}),
		// react(),
		ssr({ disableAutoFullBuild: true, prerender: true }),
		vercel()
	],
});
