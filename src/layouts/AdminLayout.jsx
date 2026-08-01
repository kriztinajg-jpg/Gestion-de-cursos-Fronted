import Sidebar from '../components/Sidebar'

function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-50 min-h-screen p-8">
        {children}
      </main>
    </div>
  )
}

export default AdminLayout
