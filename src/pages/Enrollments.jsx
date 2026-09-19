import { useState, useEffect, useMemo } from 'react'
import { getEnrollments, createEnrollment, cancelEnrollment } from '../services/enrollmentsServiceBD'
import { getStudents } from '../services/studentsServiceBD'
import { getCourses } from '../services/coursesServiceBD'
import EnrollmentsTable from '../components/EnrollmentsTable'
import EnrollmentForm from '../components/EnrollmentForm'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'
import PrimaryButton from '../components/PrimaryButton'
import SearchBar from '../components/SearchBar'

function Enrollments() {
  const [enrollments, setEnrollments] = useState([])
  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const [formOpen, setFormOpen] = useState(false)
  const [cancelTarget, setCancelTarget] = useState(null)

  async function loadAll() {
    setLoading(true)
    try {
      const [enrollmentsData, studentsData, coursesData] = await Promise.all([
        getEnrollments(),
        getStudents(),
        getCourses(),
      ])
      setEnrollments(enrollmentsData)
      setStudents(studentsData)
      setCourses(coursesData)
      setError('')
    } catch (err) {
      console.error('Error cargando matrículas:', err)
      setError('No se pudieron cargar las matrículas.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAll()
  }, [])

  const filteredEnrollments = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return enrollments
    return enrollments.filter((item) => {
      const student = students.find((s) => s.id === item.studentId)
      const course = courses.find((c) => c.id === item.courseId)
      const studentName = `${student?.firstName ?? ''} ${student?.lastName ?? ''}`
      const courseName = course?.name ?? ''
      return (
        studentName.toLowerCase().includes(term) ||
        courseName.toLowerCase().includes(term)
      )
    })
  }, [enrollments, students, courses, search])

  async function handleSubmit(form) {
    await createEnrollment(form)
    setFormOpen(false)
    await loadAll()
  }

  async function confirmCancel() {
    await cancelEnrollment(cancelTarget.id)
    setCancelTarget(null)
    await loadAll()
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
          students={students}
          courses={courses}
          onCancel={setCancelTarget}
        />
      )}

      <EnrollmentForm
        open={formOpen}
        onSubmit={handleSubmit}
        onCancel={() => setFormOpen(false)}
      />

      <ConfirmDialog
        open={!!cancelTarget}
        title="Cancelar matrícula"
        message="¿Seguro que deseas cancelar esta matrícula?"
        onConfirm={confirmCancel}
        onCancel={() => setCancelTarget(null)}
      />
    </div>
  )
}

export default Enrollments