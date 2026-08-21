import { useState, useEffect } from 'react'
import { getCourses } from '../services/coursesService'
import CoursesTable from '../components/CoursesTable'

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
        <CoursesTable courses={courses} />
      )}
    </div>
  )
}

export default Courses