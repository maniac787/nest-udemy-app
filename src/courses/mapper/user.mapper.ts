import { plainToInstance } from 'class-transformer';
import { Course } from '../../models/course.model';
import { UpdateCourseDto } from '../dto/update-course.dto';

export class CourseMapper {
  static toDto(user: Course): UpdateCourseDto {
    return plainToInstance(UpdateCourseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  static toEntity(courseDto: UpdateCourseDto): Course {
    return plainToInstance(Course, courseDto, {
      // excludeExtraneousValues: true,
    });
  }
}
