import api from '../config/api'

export async function getCourses() {
  try {
    const { data } = await api.get('/courses')
    return data
  } catch (error) {
    console.error('Error cargando cursos:', error)
    return []
  }
}

export async function createCourse(course) {
  const { data } = await api.post('/courses', {
    code: course.code,
    name: course.name,
    description: course.description,
    maxCapacity: Number(course.maxCapacity) || 0,
  })
  return data
}

export async function updateCourse(id, course) {
  const { data } = await api.put(`/courses/${id}`, {
    code: course.code,
    name: course.name,
    description: course.description,
    maxCapacity: Number(course.maxCapacity) || 0,
  })
  return data
}

export async function deleteCourse(id) {
  await api.delete(`/courses/${id}`)
}