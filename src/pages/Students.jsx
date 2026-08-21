import { useState, useEffect } from 'react'
import { getStudents } from '../services/studentsService'
import SearchBar from '../components/SearchBar'
import StudentsTable from '../components/StudentsTable'

function Students() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function loadStudents() {
      setLoading(true)
      const data = await getStudents(search)
      setStudents(data)
      setLoading(false)
    }

    loadStudents()
  }, [search])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Students</h1>
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
      ) : (
        <StudentsTable students={students} />
      )}
    </div>
  )
}

export default Students