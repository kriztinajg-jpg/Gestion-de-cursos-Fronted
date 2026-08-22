import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Footer from '../components/footer'


function AdminLayout({ children, title }) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <Header title={title || 'Sistema Gestion de Cursos'} />
        <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default AdminLayout