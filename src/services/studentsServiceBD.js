import api from '../config/api'

export async function getStudents(searchTerm = '') {
  try {
    const { data } = await api.get('/students')

    if (!searchTerm) return data

    const term = searchTerm.toLowerCase()
    return data.filter(
      (s) =>
        s.firstName?.toLowerCase().includes(term) ||
        s.lastName?.toLowerCase().includes(term)
    )
  } catch (error) {
    console.error('Error cargando estudiantes:', error)
    return []
  }
}

export async function createStudent(student) {
  const { data } = await api.post('/students', {
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    birthDate: student.birthDate,
  })
  return data
}

export async function updateStudent(id, student) {
  const { data } = await api.put(`/students/${id}`, {
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    birthDate: student.birthDate,
  })
  return data
}

export async function deleteStudent(id) {
  await api.delete(`/students/${id}`)
}