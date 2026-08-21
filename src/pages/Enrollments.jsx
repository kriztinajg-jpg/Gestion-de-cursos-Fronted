import { useState, useEffect } from 'react'
import { getEnrollments } from '../services/enrollmentsService'
import EnrollmentsTable from '../components/EnrollmentsTable'

function Enrollments() {
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadEnrollments() {
      const data = await getEnrollments()
      setEnrollments(data)
      setLoading(false)
    }

    loadEnrollments()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Enrollments</h1>
      <p className="text-gray-500 mt-1 mb-6">
        Estudiantes matriculados en cursos
      </p>

      {loading ? (
        <p className="text-gray-400">Cargando matrículas...</p>
      ) : (
        <EnrollmentsTable enrollments={enrollments} />
      )}
    </div>
  )
}

export default Enrollments