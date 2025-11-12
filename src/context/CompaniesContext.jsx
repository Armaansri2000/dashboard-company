import React, { createContext, useContext, useEffect, useState } from 'react'

const CompaniesContext = createContext(null)

export function useCompanies(){ return useContext(CompaniesContext) }

export function CompaniesProvider({ children }){
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    let mounted = true
    setLoading(true)
    fetch('/companies.json')
      .then(res => {
        if(!res.ok) throw new Error('Failed to fetch companies.json')
        return res.json()
      })
      .then(data => { if(mounted){ setCompanies(data); setLoading(false) } })
      .catch(err => { if(mounted){ setError(err.message); setLoading(false) } })
    return ()=> mounted = false
  },[])

  return (
    <CompaniesContext.Provider value={{ companies, setCompanies, loading, error }}>
      {children}
    </CompaniesContext.Provider>
  )
}
