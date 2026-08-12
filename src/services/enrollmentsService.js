import { supabase } from '../config/supabase'

export async function getEnrollments() {
  const { data, error } = await supabase
    .from('matriculas')
    .select(`
      id,
      fecha_matricula,
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