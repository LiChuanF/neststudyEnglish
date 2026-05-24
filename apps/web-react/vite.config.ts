import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Config } from '@en/config';
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
    plugins: [
        react(),
        tailwindcss()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        port: Config.port.react,
        // 配置代理
        proxy: {
            '/api': {
                target: `http://localhost:${Config.port.server}`,
                changeOrigin: true,
            },
            '/ai': {
                target: `http://localhost:${Config.port.ai}`,
                changeOrigin: true
            }
        }
    },
})
