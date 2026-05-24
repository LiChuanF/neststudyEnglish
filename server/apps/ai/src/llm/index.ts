//1.deepseek初始化一下
import { ChatDeepSeek } from "@langchain/deepseek";
import { ConfigService } from "@nestjs/config";
import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

//初始化deepseek模型
export const createDeepSeek = () => {
    const configService = new ConfigService();
    return new ChatDeepSeek({
        apiKey: configService.get<string>('DEEPSEEK_API_KEY'), //从环境变量中获取api key
        model: configService.get<string>('DEEPSEEK_API_MODEL'), //从环境变量中获取模型
        temperature: 1.3, //1.3翻译 + 通用对话
        maxTokens: 4396, //token限制
        streaming: true, //流式输出
    })
}

//带深度思考的模型
export const createDeepSeekReasoner = () => {
    const configService = new ConfigService();
    return new ChatDeepSeek({
        apiKey: configService.get<string>('DEEPSEEK_API_KEY'), //从环境变量中获取api key
        model: configService.get<string>('DEEPSEEK_REASONER_API_MODEL'), //从环境变量中获取模型
        temperature: 1.3, //1.3翻译 + 通用对话
        maxTokens: 18000, //token限制
        streaming: true, //流式输出
    })
}

//2.初始化checkpoint
//  createCheckpoint — 创建 LangGraph 的对话记忆持久化。用 PostgreSQL 保存对话的中间状态（checkpoint），这样 AI 聊天可以：
//   - 记住上下文（多轮对话不丢失）
//   - 服务重启后恢复之前的对话状态

//   没有它，每次请求 AI 都是"失忆"的，不知道之前聊了什么。
export const createCheckpoint = async () => {
    const configService = new ConfigService();
    const checkpointer = PostgresSaver.fromConnString(configService.get<string>('AI_DATABASE_URL')!)
    await checkpointer.setup()
    return checkpointer
}


//3.初始化博查搜索API
// createBochaSearch — 调用博查搜索 API（一个国内的搜索引擎接口），让 AI 具备联网搜索能力。流程是：
// 1. 传入搜索关键词 query
// 2. 调用博查 API 获取搜索结果
// 3. 把结果（标题、链接、摘要等）拼成一段文本 prompt
// 4. 返回给 LLM，让 AI 基于搜索结果来回答
export const createBochaSearch = async (query: string, count: number = 10) => {
    const configService = new ConfigService();
    const result = await fetch(`${configService.get<string>('BOCHA_SEARCH_URL')}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${configService.get<string>('BOCHA_API_KEY')}`
        },
        body: JSON.stringify({
            query, //查询内容
            count, //查询数量
            summary: true, //摘要
        })
    })
    const { data } = await result.json()
    const values = data.webPages.value;
    console.log(values);

    const prompt = values.map(item => `
        标题：${item.name}
        链接：${item.url}
        摘要：${item?.summary?.replace(/\n/g, '') ?? ''}
        网站名称：${item.siteName}
        网站logo：${item.siteIcon}
        发布时间：${item.dateLastCrawled}
        `).join('\n')

    console.log('🪲 prompt', prompt);

    return prompt
}