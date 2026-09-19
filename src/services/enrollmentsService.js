import { supabase } from '../config/supabase'

export async function getEnrollments() {
  const { data, error } = await supabase
    .from('matriculas')
    .select(`
      id,
      fecha_matricula,
      estado,
      estudiantes ( nombres, apellidos ),
      cursos ( nombre )
    `)
    .order('fecha_matricula', { ascending: false })

  if (error) {
    console.error('Error cargando matrículas:', error)
    return []
  }

  return data
}

export async function createEnrollment(enrollment) {
  const { data, error } = await supabase
    .from('matriculas')
    .insert([
      {
        estudiante_id: enrollment.estudiante_id,
        curso_id: enrollment.curso_id,
        fecha_matricula: enrollment.fecha_matricula || undefined,
      },
    ])
    .select()

  if (error) throw error
  return data[0]
}

export async function updateEnrollmentStatus(id, estado) {
  const { data, error } = await supabase
    .from('matriculas')
    .update({ estado })
    .eq('id', id)
    .select()

  if (error) throw error
  return data[0]
}

export async function deleteEnrollment(id) {
  const { error } = await supabase.from('matriculas').delete().eq('id', id)
  if (error) throw error
}