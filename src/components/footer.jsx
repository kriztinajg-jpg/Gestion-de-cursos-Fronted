function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t text-center border-gray-200 bg-white px-8 py-4 text-sm text-gray-400">
      © {year} <span className="font-medium text-gray-500">Course Manager</span> · Sistema de Gestión de Cursos
    </footer>
  )
}

export default Footer