import { Injectable } from '@nestjs/common';
import type { WordQuery } from '@en/common/word';
import { ResponseService, PrismaService } from '@libs/shared';
import type { Prisma } from '@libs/shared/generated/prisma/client';
@Injectable()
export class WordBookService {
    constructor(
        private readonly responseService: ResponseService,
        private readonly prismaService: PrismaService,
    ) { }
    private toBoolean(value: string | boolean): boolean | undefined {
        return value === 'true' ? true : undefined;
    }
    async findAll(query: WordQuery) {
        console.log(query);

        const { page = 1, pageSize = 12, word, ...rest } = query;
        const tags = Object.fromEntries(
            Object.entries(rest).map(([key, value]) => [
                key,
                this.toBoolean(value),
            ]),
        );
        const where: Prisma.WordBookWhereInput = {
            word: word ? { contains: word } : undefined,
            ...tags,
        };
        const [total = 0, list = []] = await Promise.all([
            this.prismaService.wordBook.count({ where }),
            this.prismaService.wordBook.findMany({
                where,// 查询条件
                skip: (Number(page) - 1) * Number(pageSize), // 跳过前 page - 1 页数据
                take: Number(pageSize), // 取 pageSize 条数据
                // 排序字段
                orderBy: {
                    // 按 frq 字段降序排序
                    frq: 'desc',
                },
            }),
        ]);
        return this.responseService.success({ total, list });
    }
}
