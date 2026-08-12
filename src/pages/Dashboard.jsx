import { useState, useEffect } from 'react'
import StatCard from '../components/StatCard'
import { getStats } from '../services/statsService'

function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    enrollments: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      const data = await getStats()
      setStats(data)
      setLoading(false)
    }

    loadStats()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-500 mt-1 mb-6">
        Bienvenido al Sistema de Gestión de Cursos
      </p>

      {loading ? (
        <p className="text-gray-400">Cargando estadísticas...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard title="Students" total={stats.students} />
          <StatCard title="Courses" total={stats.courses} />
          <StatCard title="Enrollments" total={stats.enrollments} />
        </div>
      )}
    </div>
  )
}

export default Dashboard