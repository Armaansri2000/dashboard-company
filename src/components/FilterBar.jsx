import React from 'react'

export default function FilterBar({ filters, setFilters, locations, industries }){
  return (
    <div className="bg-white/60 backdrop-blur rounded-lg p-4 shadow-sm flex flex-col md:flex-row gap-3 items-center">
      <input
        value={filters.q}
        onChange={e => setFilters(f=>({...f, q: e.target.value}))}
        placeholder="Search by name..."
        className="w-full md:w-64 px-3 py-2 rounded-md border focus:ring-2 focus:ring-sky-300 outline-none"
      />

      <select value={filters.location} onChange={e=> setFilters(f=>({...f, location: e.target.value}))} className="px-3 py-2 rounded-md border">
        <option value="">All locations</option>
        {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
      </select>

      <select value={filters.industry} onChange={e=> setFilters(f=>({...f, industry: e.target.value}))} className="px-3 py-2 rounded-md border">
        <option value="">All industries</option>
        {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
      </select>

      <select value={filters.sort} onChange={e=> setFilters(f=>({...f, sort: e.target.value}))} className="px-3 py-2 rounded-md border">
        <option value="name_asc">Name ↑</option>
        <option value="name_desc">Name ↓</option>
      </select>
    </div>
  )
}
