import { useEffect, useState } from 'react'
import PrimaryButton from './PrimaryButton'

const emptyForm = { nombre: '', descripcion: '', creditos: '', cupo_maximo: '30' }

function CourseForm({ open, initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) {
      setForm({
        nombre: initialData.nombre ?? '',
        descripcion: initialData.descripcion ?? '',
        creditos: initialData.creditos ?? '',
        cupo_maximo: initialData.cupo_maximo ?? '30',
      })
    } else {
      setForm(emptyForm)
    }
    setError('')
  }, [initialData, open])

  if (!open) return null

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.nombre) {
      setError('El nombre del curso es obligatorio.')
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
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {initialData ? 'Editar curso' : 'Nuevo curso'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-sm font-medium text-gray-600">Nombre</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              rows={3}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-600">Créditos</label>
              <input
                type="number"
                min="0"
                name="creditos"
                value={form.creditos}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Cupo máximo</label>
              <input
                type="number"
                min="1"
                name="cupo_maximo"
                value={form.cupo_maximo}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
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

export default CourseForm