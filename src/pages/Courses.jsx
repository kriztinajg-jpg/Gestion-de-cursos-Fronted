import { useState, useEffect } from 'react'
import { getCourses } from '../services/coursesService'

function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCourses() {
      const data = await getCourses()
      setCourses(data)
      setLoading(false)
    }

    loadCourses()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Courses</h1>
      <p className="text-gray-500 mt-1 mb-6">
        Listado de cursos disponibles
      </p>

      {loading ? (
        <p className="text-gray-400">Cargando cursos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow p-5 border border-gray-100"
            >
              <h3 className="font-semibold text-gray-800">{course.nombre}</h3>
              <p className="text-sm text-gray-500 mt-1">{course.descripcion}</p>
              <p className="text-xs text-gray-400 mt-3">
                {course.creditos} créditos
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Courses