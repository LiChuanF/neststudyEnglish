import type { UvDto, TrackerConfig } from '@en/common/tracker';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { UAParser } from 'ua-parser-js';
import { reportFetch } from '@/report';

// 获取浏览器信息
export const getBrowserInfo = () => {
    const ua = new UAParser()
    return {
        browser: ua.getBrowser().name, // 浏览器名称
        os: ua.getOS().name, // 操作系统名称
        device: ua.getDevice().type || 'desktop', // 设备类型
    }
}

// 获取浏览器指纹
export const getFingerprint = async (config: TrackerConfig) => {
    const browserInfo = getBrowserInfo() // 获取浏览器信息 
    const fp = await FingerprintJS.load() // 生成浏览器指纹
    const result = await fp.get()
    const body: UvDto = {
        anonymousId: result.visitorId,
        browser: browserInfo.browser,
        os: browserInfo.os,
        device: browserInfo.device,
    }
    //上报给后端
    let url = config.baseUrl + config.uv.api
    const res = await reportFetch(url, body)
    return res.data //访客ID
}