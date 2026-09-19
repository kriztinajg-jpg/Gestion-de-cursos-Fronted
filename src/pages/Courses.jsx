import { useState, useEffect } from 'react'
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../services/coursesService'
import CoursesTable from '../components/CoursesTable'
import CourseForm from '../components/CourseForm'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'
import PrimaryButton from '../components/PrimaryButton'

function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  async function loadCourses() {
    setLoading(true)
    try {
      const data = await getCourses()
      setCourses(data)
    } catch (err) {
      console.error('Error cargando cursos:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCourses()
  }, [])

  function handleCreate() {
    setEditing(null)
    setFormOpen(true)
  }

  function handleEdit(course) {
    setEditing(course)
    setFormOpen(true)
  }

  async function handleSubmit(form) {
    if (editing) {
      await updateCourse(editing.id, form)
    } else {
      await createCourse(form)
    }
    setFormOpen(false)
    setEditing(null)
    await loadCourses()
  }

  async function confirmDelete() {
    await deleteCourse(deleteTarget.id)
    setDeleteTarget(null)
    await loadCourses()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-gray-800">Courses</h1>
        <PrimaryButton onClick={handleCreate}>Nuevo curso</PrimaryButton>
      </div>
      <p className="text-gray-500 mt-1 mb-6">Listado de cursos disponibles</p>

      {loading ? (
        <p className="text-gray-400">Cargando cursos...</p>
      ) : courses.length === 0 ? (
        <EmptyState message="Aún no hay cursos registrados." />
      ) : (
        <CoursesTable
          courses={courses}
          onEdit={handleEdit}
          onDelete={setDeleteTarget}
        />
      )}

      <CourseForm
        open={formOpen}
        initialData={editing}
        onSubmit={handleSubmit}
        onCancel={() => {
          setFormOpen(false)
          setEditing(null)
        }}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Eliminar curso"
        message={`¿Seguro que deseas eliminar "${deleteTarget?.nombre ?? ''}"? Esta acción no se puede deshacer.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}

export default Courses