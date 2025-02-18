import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SlugPipe } from './pipes/slug/slug.pipe';
import { JwtGuardsGuard } from '../guards/jwt-guards/jwt-guards.guard';
import { RolesGuardGuard } from '../guards/roles-guard/roles-guard.guard';
import { Rol } from '../decorator/rol/rol.decorator';

@Controller('courses')
@UseGuards(JwtGuardsGuard, RolesGuardGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Rol(['admin'])
  create(@Req() req, @Body() createCourseDto: CreateCourseDto) {
    console.log('__USER__', req.user);
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.coursesService.findOne(+id);
  }

  @Get(':title')
  findOneTitle(
    @Param('title', new SlugPipe())
    title: string,
  ) {
    console.log('__TILE__', title);
    return this.coursesService.findOne(1);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
