import { supabase } from '../config/supabase'

export async function getStudents() {
  const { data, error } = await supabase
    .from('estudiantes')
    .select('*')
    .order('nombres')

  if (error) {
    console.error('Error cargando estudiantes:', error)
    return []
  }

  return data
}