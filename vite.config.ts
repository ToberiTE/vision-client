import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const ReactCompilerConfig = { target: '19' };
export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 8080
    },
    plugins: [
        react({
            babel: {
                plugins: [
                    ["babel-plugin-react-compiler", ReactCompilerConfig],
                ],
            },
        }),
    ],
})

