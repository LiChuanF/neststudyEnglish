<template>
    <div class="w-[1200px] mx-auto flex mt-10">
        <Conversations @onGetRole="getRole" />
        <Bubble :list="list" @onSendMessage="sendMessage" />
    </div>
</template>
<script setup lang="ts">
import Conversations from './components/Conversations.vue';
import Bubble from './components/Bubble.vue';
import { useUserStore } from '@/stores/user'
import { computed, ref, watch } from 'vue';
import { getChatHistory } from '@/apis/chat';
import type { ChatRoleType, ChatMessageList, ChatDto, ChatMessage } from '@en/common/chat';
import { sse, CHAT_URL } from '@/apis/sse';

const userStore = useUserStore()
const list = ref<ChatMessageList>([])
// 必须用 computed：换账号登录时组件可能未销毁，快照 userId 会一直是上一个用户
const userId = computed(() => userStore.user?.id)
const role = ref<ChatRoleType>('normal')

const getRole = async (params: ChatRoleType) => {
    role.value = params
    if (!userId.value) {
        list.value = []
        return
    }
    list.value = []
    const res = await getChatHistory(userId.value, params)
    list.value = res.data
}

// 登录用户变化时（含弹窗登录未刷新页面）重新拉取当前角色历史
watch(userId, async (id, prevId) => {
    if (id === prevId) return
    list.value = []
    if (!id) return
    const res = await getChatHistory(id, role.value)
    list.value = res.data
})

const sendMessage = (message: string, deepThink: boolean, webSearch: boolean) => {
    if (!userId.value) return
    list.value.push({ role: 'human', content: message, type: 'chat' })
    list.value.push({ role: 'ai', content: '', reasoning: '', type: 'chat' })

    sse<ChatMessage, ChatDto>(CHAT_URL, "POST", {
        deepThink,
        webSearch,
        role: role.value,
        content: message,
        userId: userId.value,
    }, (data) => {
        const lastItem = list.value[list.value.length - 1]
        if (lastItem) {
            if (data.type === 'reasoning') {
                lastItem.reasoning += data.content
            }
            if (data.type === 'chat') {
                lastItem.content += data.content
            }
        }
    })
}
</script>
