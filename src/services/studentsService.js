import { supabase } from '../config/supabase'

export async function getStudents(searchTerm = '') {
  let query = supabase
    .from('estudiantes')
    .select('*')
    .order('nombres')

  if (searchTerm) {
    query = query.or(`nombres.ilike.%${searchTerm}%,apellidos.ilike.%${searchTerm}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error cargando estudiantes:', error)
    return []
  }

  return data
}

export async function createStudent(student) {
  const { data, error } = await supabase
    .from('estudiantes')
    .insert([
      {
        nombres: student.nombres,
        apellidos: student.apellidos,
        email: student.email,
      },
    ])
    .select()

  if (error) throw error
  return data[0]
}

export async function updateStudent(id, student) {
  const { data, error } = await supabase
    .from('estudiantes')
    .update({
      nombres: student.nombres,
      apellidos: student.apellidos,
      email: student.email,
    })
    .eq('id', id)
    .select()

  if (error) throw error
  return data[0]
}

export async function deleteStudent(id) {
  const { error } = await supabase.from('estudiantes').delete().eq('id', id)
  if (error) throw error
}