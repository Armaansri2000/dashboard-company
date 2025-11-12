import React, { useMemo, useState } from 'react'
import { useCompanies } from '../context/CompaniesContext'
import FilterBar from '../components/FilterBar'

export default function CompaniesPage(){
  const { companies, loading, error } = useCompanies()
  const [filters, setFilters] = useState({ q: '', location: '', industry: '', sort: 'name_asc' })
  const [page, setPage] = useState(1)
  const perPage = 8

  const locations = useMemo(()=> Array.from(new Set(companies.map(c=>c.location))).sort(), [companies])
  const industries = useMemo(()=> Array.from(new Set(companies.map(c=>c.industry))).sort(), [companies])

  const filtered = useMemo(()=>{
    let list = companies.slice()
    if(filters.q) list = list.filter(c => c.name.toLowerCase().includes(filters.q.toLowerCase()))
    if(filters.location) list = list.filter(c => c.location === filters.location)
    if(filters.industry) list = list.filter(c => c.industry === filters.industry)
    if(filters.sort === 'name_asc') list.sort((a,b)=> a.name.localeCompare(b.name))
    if(filters.sort === 'name_desc') list.sort((a,b)=> b.name.localeCompare(a.name))
    return list
  },[companies, filters])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const pageItems = filtered.slice((page-1)*perPage, page*perPage)

  React.useEffect(()=> setPage(1), [filters])

  if(loading) return <div className="p-6 bg-white rounded shadow text-center">Loading companies...</div>
  if(error) return <div className="p-6 bg-red-50 text-red-700 rounded">Error: {error}</div>

  return (
    <div className="space-y-4">
      <FilterBar filters={filters} setFilters={setFilters} locations={locations} industries={industries} />
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full min-w-max">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Industry</th>
              <th className="text-left p-3">Location</th>
              <th className="text-left p-3">Employees</th>
              <th className="text-left p-3">Founded</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map(c => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.industry}</td>
                <td className="p-3">{c.location}</td>
                <td className="p-3">{c.employees}</td>
                <td className="p-3">{c.founded}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between p-3 border-t">
          <div className="text-sm text-gray-600">Showing {filtered.length} result(s)</div>
          <div className="flex items-center gap-2">
            <button onClick={()=> setPage(p=>Math.max(1,p-1))} disabled={page===1} className="px-3 py-1 rounded border disabled:opacity-50">Prev</button>
            <div className="px-3 py-1">{page} / {totalPages}</div>
            <button onClick={()=> setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} className="px-3 py-1 rounded border disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
