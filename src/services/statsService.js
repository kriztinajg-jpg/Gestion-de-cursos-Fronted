import { supabase } from '../config/supabase'

export async function getStats() {
  const { count: totalEstudiantes } = await supabase
    .from('estudiantes')
    .select('*', { count: 'exact', head: true })

  const { count: totalCursos } = await supabase
    .from('cursos')
    .select('*', { count: 'exact', head: true })

  const { count: totalMatriculas } = await supabase
    .from('matriculas')
    .select('*', { count: 'exact', head: true })

  return {
    students: totalEstudiantes ?? 0,
    courses: totalCursos ?? 0,
    enrollments: totalMatriculas ?? 0,
  }
}