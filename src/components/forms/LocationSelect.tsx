import { useState, useEffect } from 'react';
import { nigerianStates } from '../../data/nigeriaLocations';
import { SearchableSelect } from './SearchableSelect';

interface LocationSelectProps {
  onStateChange: (state: string) => void;
  onCityChange: (city: string) => void;
  state: string;
  city: string;
}

export function LocationSelect({ onStateChange, onCityChange, state, city }: LocationSelectProps) {
  const [availableLgas, setAvailableLgas] = useState<string[]>([]);

  useEffect(() => {
    if (state) {
      const selectedState = nigerianStates.find(s => s.name === state);
      if (selectedState) {
        setAvailableLgas(selectedState.lgas);
        if (!selectedState.lgas.includes(city)) {
          onCityChange('');
        }
      }
    } else {
      setAvailableLgas([]);
      onCityChange('');
    }
  }, [state]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          State
        </label>
        <SearchableSelect
          options={nigerianStates.map(state => state.name)}
          value={state}
          onChange={onStateChange}
          placeholder="Select State"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Local Government Area
        </label>
        <SearchableSelect
          options={availableLgas}
          value={city}
          onChange={onCityChange}
          placeholder="Select LGA"
          disabled={!state}
          required
        />
      </div>
    </div>
  );
}