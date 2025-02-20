import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { CourseMapper } from './mapper/user.mapper';

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

  update(id: string, updateCourseDto: Partial<UpdateCourseDto>) {
    const course = CourseMapper.toEntity(updateCourseDto);
    console.log(course);
    return this.courseRepository.update(new ObjectId(id), {});
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
