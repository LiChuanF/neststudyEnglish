import { fileURLToPath, URL } from 'node:url'
import { Config } from '@en/config';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
    server: {
        port: Config.port.web,
        // 配置代理
        proxy: {
            '/api': {
                target: `http://localhost:${Config.port.server}`,
                changeOrigin: true, // 改变源地址
            },
            '/ai': {
                target: `http://localhost:${Config.port.ai}`,
                changeOrigin: true
            }
        }
    },
    plugins: [
        vue(),
        vueDevTools(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
})
