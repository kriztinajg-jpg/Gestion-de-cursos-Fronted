import { useState, useEffect } from 'react'
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../services/studentsService'
import SearchBar from '../components/SearchBar'
import StudentsTable from '../components/StudentsTable'
import StudentForm from '../components/StudentForm'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'
import PrimaryButton from '../components/PrimaryButton'

function Students() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  async function loadStudents() {
    setLoading(true)
    const data = await getStudents(search)
    setStudents(data)
    setLoading(false)
  }

  useEffect(() => {
    loadStudents()
  }, [search])

  function handleCreate() {
    setEditing(null)
    setFormOpen(true)
  }

  function handleEdit(student) {
    setEditing(student)
    setFormOpen(true)
  }

  async function handleSubmit(form) {
    if (editing) {
      await updateStudent(editing.id, form)
    } else {
      await createStudent(form)
    }
    setFormOpen(false)
    setEditing(null)
    await loadStudents()
  }

  async function confirmDelete() {
    await deleteStudent(deleteTarget.id)
    setDeleteTarget(null)
    await loadStudents()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-gray-800">Students</h1>
        <PrimaryButton onClick={handleCreate}>Nuevo estudiante</PrimaryButton>
      </div>
      <p className="text-gray-500 mt-1 mb-6">
        Listado de estudiantes registrados
      </p>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Buscar por nombre o apellido..."
      />

      {loading ? (
        <p className="text-gray-400">Cargando estudiantes...</p>
      ) : students.length === 0 ? (
        <EmptyState
          message={
            search
              ? 'No se encontraron estudiantes con ese criterio.'
              : 'Aún no hay estudiantes registrados.'
          }
        />
      ) : (
        <StudentsTable
          students={students}
          onEdit={handleEdit}
          onDelete={setDeleteTarget}
        />
      )}

      <StudentForm
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
        title="Eliminar estudiante"
        message={`¿Seguro que deseas eliminar a ${deleteTarget?.nombres ?? ''} ${deleteTarget?.apellidos ?? ''}? Esta acción no se puede deshacer.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}

export default Students