import api from '../config/api'

export async function getEnrollments() {
  try {
    const { data } = await api.get('/enrollments')
    return data
  } catch (error) {
    console.error('Error cargando matrículas:', error)
    return []
  }
}

export async function createEnrollment({ studentId, courseId }) {
  const { data } = await api.post('/enrollments', null, {
    params: { studentId, courseId },
  })
  return data
}

export async function cancelEnrollment(id) {
  await api.patch(`/enrollments/${id}/cancel`)
}