import React, { useState } from 'react';

interface PhoneSelectorProps {
  brands: { [key: string]: string[] };
  setSelectedPhone: (phone: { brand: string; model: string }) => void;
}



const PhoneSelector: React.FC<PhoneSelectorProps> = ({ brands , setSelectedPhone }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const brand = event.target.value;
    setSelectedBrand(brand);
    setModels(brands[brand] || []);
    setSelectedModel('');
    setSelectedPhone({ brand, model: '' }); // Update parent state
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const model = event.target.value;
    setSelectedModel(model);
    setSelectedPhone({ brand: selectedBrand, model }); // Update parent state
  };

  return (
    <div>
      <label htmlFor="brand-select">Select Brand:</label>
      <select id="brand-select" value={selectedBrand} onChange={handleBrandChange}>
        <option value="">--Choose a brand--</option>
        {Object.keys(brands).map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      {models.length > 0 && (
        <>
          <label htmlFor="model-select">Select Model:</label>
          <select id="model-select" value={selectedModel} onChange={handleModelChange}>
            <option value="">--Choose a model--</option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default PhoneSelector;
