import { useEffect, useState } from 'react'
import { getStudents } from '../services/studentsService'
import { getCourses } from '../services/coursesService'
import PrimaryButton from './PrimaryButton'

const emptyForm = { estudiante_id: '', curso_id: '', fecha_matricula: '' }

function EnrollmentForm({ open, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    if (open) {
      setForm(emptyForm)
      setError('')
      getStudents().then(setStudents)
      getCourses().then(setCourses)
    }
  }, [open])

  if (!open) return null

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.estudiante_id || !form.curso_id) {
      setError('Debes seleccionar un estudiante y un curso.')
      return
    }
    try {
      await onSubmit(form)
    } catch (err) {
      setError(err.message ?? 'Ocurrió un error al guardar.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Nueva matrícula</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-sm font-medium text-gray-600">Estudiante</label>
            <select
              name="estudiante_id"
              value={form.estudiante_id}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Selecciona un estudiante</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nombres} {s.apellidos}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Curso</label>
            <select
              name="curso_id"
              value={form.curso_id}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Selecciona un curso</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Fecha (opcional)</label>
            <input
              type="date"
              name="fecha_matricula"
              value={form.fecha_matricula}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-2 mt-4">
            <PrimaryButton type="button" variant="secondary" onClick={onCancel}>
              Cancelar
            </PrimaryButton>
            <PrimaryButton type="submit">Guardar</PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EnrollmentForm