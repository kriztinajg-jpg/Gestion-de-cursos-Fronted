import { supabase } from '../config/supabase'

export async function getCourses() {
  const { data, error } = await supabase
    .from('cursos')
    .select('*')
    .order('nombre')

  if (error) {
    console.error('Error cargando cursos:', error)
    return []
  }

  return data
}

export async function createCourse(course) {
  const { data, error } = await supabase
    .from('cursos')
    .insert([
      {
        nombre: course.nombre,
        descripcion: course.descripcion,
        creditos: Number(course.creditos) || 0,
        cupo_maximo: Number(course.cupo_maximo) || 30,
      },
    ])
    .select()

  if (error) throw error
  return data[0]
}

export async function updateCourse(id, course) {
  const { data, error } = await supabase
    .from('cursos')
    .update({
      nombre: course.nombre,
      descripcion: course.descripcion,
      creditos: Number(course.creditos) || 0,
      cupo_maximo: Number(course.cupo_maximo) || 30,
    })
    .eq('id', id)
    .select()

  if (error) throw error
  return data[0]
}

export async function deleteCourse(id) {
  const { error } = await supabase.from('cursos').delete().eq('id', id)
  if (error) throw error
}