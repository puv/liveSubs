import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
	base: '/',
	plugins: [react()],

	clearScreen: false,
	
	server: {
		port: 1420,
		strictPort: true,
	},
	
	envPrefix: ['VITE_'],
	build: {
		outDir: './dist',
	},
}));
