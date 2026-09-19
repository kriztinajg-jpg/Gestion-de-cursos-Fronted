import { getCourses } from './coursesServiceBD'
import { getStudents } from './studentsServiceBD'
import { getEnrollments } from './enrollmentsServiceBD'

export async function getStats() {
  try {
    const [courses, students, enrollments] = await Promise.all([
      getCourses(),
      getStudents(),
      getEnrollments(),
    ])
    return {
      students: students.length,
      courses: courses.length,
      enrollments: enrollments.length,
    }
  } catch (error) {
    console.error('Error cargando estadísticas:', error)
    return { students: 0, courses: 0, enrollments: 0 }
  }
}