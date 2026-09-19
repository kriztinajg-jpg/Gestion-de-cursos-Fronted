import { useState, useEffect, useMemo } from 'react'
import {
  getEnrollments,
  createEnrollment,
  updateEnrollmentStatus,
  deleteEnrollment,
} from '../services/enrollmentsService'
import EnrollmentsTable from '../components/EnrollmentsTable'
import EnrollmentForm from '../components/EnrollmentForm'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'
import PrimaryButton from '../components/PrimaryButton'
import SearchBar from '../components/SearchBar'

function Enrollments() {
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const [formOpen, setFormOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  async function loadEnrollments() {
    setLoading(true)
    try {
      const data = await getEnrollments()
      setEnrollments(data)
      setError('')
    } catch (err) {
      console.error('Error cargando matrículas:', err)
      setError('No se pudieron cargar las matrículas.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEnrollments()
  }, [])

  const filteredEnrollments = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return enrollments
    return enrollments.filter((item) => {
      const studentName = `${item.estudiantes?.nombres ?? ''} ${item.estudiantes?.apellidos ?? ''}`
      const courseName = item.cursos?.nombre ?? ''
      return (
        studentName.toLowerCase().includes(term) ||
        courseName.toLowerCase().includes(term)
      )
    })
  }, [enrollments, search])

  async function handleSubmit(form) {
    await createEnrollment(form)
    setFormOpen(false)
    await loadEnrollments()
  }

  async function handleChangeStatus(item, estado) {
    await updateEnrollmentStatus(item.id, estado)
    await loadEnrollments()
  }

  async function confirmDelete() {
    await deleteEnrollment(deleteTarget.id)
    setDeleteTarget(null)
    await loadEnrollments()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-gray-800">Enrollments</h1>
        <PrimaryButton onClick={() => setFormOpen(true)}>Nueva matrícula</PrimaryButton>
      </div>
      <p className="text-gray-500 mt-1 mb-6">Estudiantes matriculados en cursos</p>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Buscar por estudiante o curso..."
      />

      {loading ? (
        <p className="text-gray-400">Cargando matrículas...</p>
      ) : error ? (
        <p className="text-red-600 text-sm">{error}</p>
      ) : filteredEnrollments.length === 0 ? (
        <EmptyState
          message={
            search
              ? 'No se encontraron matrículas con ese criterio.'
              : 'Aún no hay matrículas registradas.'
          }
        />
      ) : (
        <EnrollmentsTable
          enrollments={filteredEnrollments}
          onChangeStatus={handleChangeStatus}
          onDelete={setDeleteTarget}
        />
      )}

      <EnrollmentForm
        open={formOpen}
        onSubmit={handleSubmit}
        onCancel={() => setFormOpen(false)}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Eliminar matrícula"
        message="¿Seguro que deseas eliminar esta matrícula? Esta acción no se puede deshacer."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}

export default Enrollments