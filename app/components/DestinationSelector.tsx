'use client'

import { useState, useEffect } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'

interface DestinationSelectorProps {
  selectedDestinationId?: Id<"destinations">
  onDestinationChange: (destinationId: Id<"destinations"> | undefined) => void
  className?: string
}

const DestinationSelector: React.FC<DestinationSelectorProps> = ({
  selectedDestinationId,
  onDestinationChange,
  className = ''
}) => {
  const [selectedContinent, setSelectedContinent] = useState<Id<"destinations"> | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<Id<"destinations"> | null>(null)
  const [selectedCity, setSelectedCity] = useState<Id<"destinations"> | null>(null)

  const continents = useQuery(api.destinations.getContinents) || []
  const countries = useQuery(
    api.destinations.getCountriesByContinent,
    selectedContinent ? { continentId: selectedContinent } : "skip"
  ) || []
  const cities = useQuery(
    api.destinations.getCitiesByCountry,
    selectedCountry ? { countryId: selectedCountry } : "skip"
  ) || []

  // Load destination path nếu có selectedDestinationId
  const destinationPath = useQuery(
    api.destinations.getDestinationPath,
    selectedDestinationId ? { id: selectedDestinationId } : "skip"
  )

  useEffect(() => {
    if (destinationPath && destinationPath.length > 0) {
      const continent = destinationPath.find(d => d.type === 'continent')
      const country = destinationPath.find(d => d.type === 'country')
      const city = destinationPath.find(d => d.type === 'city')

      if (continent) setSelectedContinent(continent.id as Id<"destinations">)
      if (country) setSelectedCountry(country.id as Id<"destinations">)
      if (city) setSelectedCity(city.id as Id<"destinations">)
    }
  }, [destinationPath])

  const handleContinentChange = (continentId: Id<"destinations">) => {
    setSelectedContinent(continentId)
    setSelectedCountry(null)
    setSelectedCity(null)
    onDestinationChange(undefined)
  }

  const handleCountryChange = (countryId: Id<"destinations">) => {
    setSelectedCountry(countryId)
    setSelectedCity(null)
    onDestinationChange(undefined)
  }

  const handleCityChange = (cityId: Id<"destinations">) => {
    setSelectedCity(cityId)
    onDestinationChange(cityId)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Điểm đến (Châu lục → Quốc gia → Thành phố)
        </label>
        
        {/* Châu lục */}
        <div className="mb-3">
          <label className="block text-xs text-gray-600 mb-1">Châu lục</label>
          <select
            value={selectedContinent || ''}
            onChange={(e) => {
              if (e.target.value) {
                handleContinentChange(e.target.value as Id<"destinations">)
              } else {
                setSelectedContinent(null)
                setSelectedCountry(null)
                setSelectedCity(null)
                onDestinationChange(undefined)
              }
            }}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">-- Chọn châu lục --</option>
            {continents.map((continent) => (
              <option key={continent._id} value={continent._id}>
                {continent.name}
              </option>
            ))}
          </select>
        </div>

        {/* Quốc gia */}
        {selectedContinent && countries.length > 0 && (
          <div className="mb-3">
            <label className="block text-xs text-gray-600 mb-1">Quốc gia</label>
            <select
              value={selectedCountry || ''}
              onChange={(e) => {
                if (e.target.value) {
                  handleCountryChange(e.target.value as Id<"destinations">)
                } else {
                  setSelectedCountry(null)
                  setSelectedCity(null)
                  onDestinationChange(undefined)
                }
              }}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">-- Chọn quốc gia --</option>
              {countries.map((country) => (
                <option key={country._id} value={country._id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Thành phố */}
        {selectedCountry && cities.length > 0 && (
          <div>
            <label className="block text-xs text-gray-600 mb-1">Thành phố</label>
            <select
              value={selectedCity || ''}
              onChange={(e) => {
                if (e.target.value) {
                  handleCityChange(e.target.value as Id<"destinations">)
                } else {
                  setSelectedCity(null)
                  onDestinationChange(undefined)
                }
              }}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">-- Chọn thành phố --</option>
              {cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedCity && (
          <p className="mt-2 text-sm text-green-600">
            ✓ Đã chọn: {destinationPath?.map(d => d.name).join(' > ')}
          </p>
        )}
      </div>
    </div>
  )
}

export default DestinationSelector

