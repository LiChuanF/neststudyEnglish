import { fetchEventSource } from '@microsoft/fetch-event-source'

export const CHAT_URL = '/ai/v1/chat'


// 因为原生 EventSource 有几个硬伤，恰好这里全踩了：

//   1. 只支持 GET — 原生 EventSource 无法发 POST 请求，也不能带 request body。而这里聊天接口需要 POST + JSON.stringify(body) 发送消息内容。
//   2. 无法自定义 Headers — 原生不支持设置 Content-Type: application/json，更无法带 Authorization token（后续你可能需要加鉴权）。
//   3. 错误处理粗糙 — 原生 EventSource 遇到错误会自动无限重连，没有 onerror 回调让你决定是否重连或提示用户。
export const sse = <T, V = any>(
    url: string,
    method: string = 'POST',
    body: V,
    callback?: (data: T) => void,
    errorCallback?: (error: Error) => void
) => {
    fetchEventSource(url, {
        method: method.toLowerCase(),
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        onmessage: (event) => {
            callback?.(JSON.parse(event.data) as T)
        },
        onerror: (error) => {
            errorCallback?.(error)
        },
    })
}
