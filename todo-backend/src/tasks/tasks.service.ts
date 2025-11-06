import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(title: string, userId: number) {
    return this.prisma.task.create({
      data: { title, userId },
    });
  }

  async getTasksByUser(userId: number) {
    return this.prisma.task.findMany({
      where: { userId },
      orderBy: { id: 'asc' },
    });
  }
}
