import React from 'react'
import { CompaniesProvider } from './context/CompaniesContext'
import CompaniesPage from './pages/CompaniesPage'

export default function App(){
  return (
    <CompaniesProvider>
      <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white py-8">
        <header className="container px-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-sky-700">Companies Directory</h1>
              <p className="text-sm text-gray-600">Browse companies — filter, sort and paginate</p>
            </div>
          </div>
        </header>

        <main className="container px-4">
          <CompaniesPage />
        </main>
      </div>
    </CompaniesProvider>
  )
}
