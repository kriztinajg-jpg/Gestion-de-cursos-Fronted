import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Footer from '../components/Footer'


function AdminLayout({ children, title }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header title="Panel Administrativo" />
        <main className="flex-1 bg-gray-50 p-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default AdminLayout