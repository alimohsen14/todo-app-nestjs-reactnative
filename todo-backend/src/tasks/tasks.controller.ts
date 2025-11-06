import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createTask(@Body() body: { title: string }, @Req() req: any) {
    const userId = req.user.userId;
    return this.tasksService.createTask(body.title, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getTasks(@Req() req: any) {
    const userId = req.user.userId;
    return this.tasksService.getTasksByUser(userId);
  }
}
