import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  create({ coverImage, description, title, price }: CreateCourseDto) {
    // @ts-ignore
    const course: Course = {
      title,
      description,
      coverImage,
      price,
    };

    return this.courseRepository.save(course);
  }

  findAll() {
    return this.courseRepository.find({});
  }

  findOne(id: string) {
    const inputId = new ObjectId(id);
    return this.courseRepository.findOne({
      where: { _id: inputId },
    });
  }

  async update(id: string, updateCourseDto: Partial<UpdateCourseDto>) {
    const course = await this.courseRepository.findOne({
      where: { _id: new ObjectId(id) },
    });

    if (!course) {
      throw new NotFoundException('Curso no encontrado');
    }

    // Fusionar los valores nuevos con los existentes
    Object.assign(course, updateCourseDto);

    return this.courseRepository.update(
      { _id: new ObjectId(id) },
      updateCourseDto,
    );
    /*
    const course = CourseMapper.toEntity(updateCourseDto);
    console.log(course);
    // @ts-ignore
    return this.courseRepository.update(new ObjectId(id), course);*/
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
