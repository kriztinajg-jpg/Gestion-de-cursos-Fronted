import { useState, useEffect } from 'react'
import { getEnrollments } from '../services/enrollmentsService'

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
        <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Estudiante</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Curso</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3 text-gray-800">
                    {item.estudiantes?.nombres} {item.estudiantes?.apellidos}
                  </td>
                  <td className="px-4 py-3 text-gray-800">
                    {item.cursos?.nombre}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {item.fecha_matricula}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Enrollments