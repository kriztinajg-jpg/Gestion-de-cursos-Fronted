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