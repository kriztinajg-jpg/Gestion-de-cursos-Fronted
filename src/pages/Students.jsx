import { useState, useEffect } from 'react'
import { getStudents } from '../services/studentsService'

function Students() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStudents() {
      const data = await getStudents()
      setStudents(data)
      setLoading(false)
    }

    loadStudents()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Students</h1>
      <p className="text-gray-500 mt-1 mb-6">
        Listado de estudiantes registrados
      </p>

      {loading ? (
        <p className="text-gray-400">Cargando estudiantes...</p>
      ) : (
        <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Nombres</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Apellidos</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3 text-gray-800">{student.nombres}</td>
                  <td className="px-4 py-3 text-gray-800">{student.apellidos}</td>
                  <td className="px-4 py-3 text-gray-500">{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Students