import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface PhoneSelectorProps {
  brands: { [key: string]: string[] };
  setSelectedPhone: (phone: { brand: string; model: string }) => void;
}

const PhoneSelector: React.FC<PhoneSelectorProps> = ({ brands, setSelectedPhone }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');

  const brandOptions = Object.keys(brands).map(brand => ({
    label: brand,
    value: brand,
    icon: 'fluent:phone-24-regular'
  }));

  const modelOptions = models.map(model => ({
    label: model,
    value: model,
    icon: 'fluent:device-phone-24-regular'
  }));

  const handleBrandChange = (e: { value: string }) => {
    const brand = e.value;
    setSelectedBrand(brand);
    setModels(brands[brand] || []);
    setSelectedModel('');
    setSelectedPhone({ brand, model: '' });
  };

  const handleModelChange = (e: { value: string }) => {
    const model = e.value;
    setSelectedModel(model);
    setSelectedPhone({ brand: selectedBrand, model });
  };

  return (
    <div className="grid gap-6 p-4">
      {/* Brand Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Icon icon="carbon:category" className="w-5 h-5" />
          Select Brand
        </label>
        <Dropdown
          value={selectedBrand}
          onChange={handleBrandChange}
          options={brandOptions}
          optionLabel="label"
          placeholder="Select a brand"
          className="w-full min-w-[250px] h-[40px]"
          itemTemplate={(option) => (
            <div className="flex items-center gap-3">
              <Icon icon={option.icon} className="w-5 h-5 text-primary" />
              <span>{option.label}</span>
            </div>
          )}
        />
      </div>

      {/* Model Selector */}
      {selectedBrand && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Icon icon="carbon:mobile-device" className="w-5 h-5" />
            Select Model
          </label>
          {models.length > 0 ? (
            <Dropdown
              value={selectedModel}
              onChange={handleModelChange}
              options={modelOptions}
              optionLabel="label"
              placeholder="Select a model"
              className="w-full min-w-[250px] h-[40px]"
              itemTemplate={(option) => (
                <div className="flex items-center gap-3">
                  <Icon icon={option.icon} className="w-5 h-5 text-primary" />
                  <span>{option.label}</span>
                </div>
              )}
            />
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg text-gray-500 flex items-center gap-2">
              <Icon icon="carbon:warning" className="w-5 h-5" />
              No models available for this brand
            </div>
          )}
        </motion.div>
      )}
      
    </div>
  );
};

export default PhoneSelector;

// import React, { useState } from 'react';
// import { Dropdown } from 'primereact/dropdown';
// import { motion } from 'framer-motion';
// import { Icon } from '@iconify/react';

// interface PhoneSelectorProps {
//   brands: { [key: string]: string[] };
//   setSelectedPhone: (phone: { brand: string; model: string }) => void;
// }

// const PhoneSelector: React.FC<PhoneSelectorProps> = ({ brands, setSelectedPhone }) => {
//   const [selectedBrand, setSelectedBrand] = useState<string>('');
//   const [models, setModels] = useState<string[]>([]);
//   const [selectedModel, setSelectedModel] = useState<string>('');

//   const brandOptions = Object.keys(brands).map(brand => ({
//     label: brand,
//     value: brand,
//     icon: 'fluent:phone-24-regular'
//   }));

//   const modelOptions = models.map(model => ({
//     label: model,
//     value: model,
//     icon: 'fluent:device-phone-24-regular'
//   }));

//   const handleBrandChange = (e: { value: string }) => {
//     const brand = e.value;
//     setSelectedBrand(brand);
//     setModels(brands[brand] || []);
//     setSelectedModel('');
//     setSelectedPhone({ brand, model: '' });
//   };

//   const handleModelChange = (e: { value: string }) => {
//     const model = e.value;
//     setSelectedModel(model);
//     setSelectedPhone({ brand: selectedBrand, model });
//   };

//   return (
//     <div className="grid gap-6 p-4">
//       {/* Brand Selector */}
//       <div className="space-y-2">
//         <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
//           <Icon icon="carbon:category" className="w-5 h-5" />
//           Select Brand
//         </label>
//         <Dropdown
//           value={selectedBrand}
//           onChange={handleBrandChange}
//           options={brandOptions}
//           optionLabel="label"
//           placeholder="Select a brand"
//           className="w-full"
//           itemTemplate={(option) => (
//             <div className="flex items-center gap-3">
//               <Icon icon={option.icon} className="w-5 h-5 text-primary" />
//               <span>{option.label}</span>
//             </div>
//           )}
//         />
//       </div>

//       {/* Model Selector */}
//       {selectedBrand && (
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//           className="space-y-2"
//         >
//           <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
//             <Icon icon="carbon:mobile-device" className="w-5 h-5" />
//             Select Model
//           </label>
//           {models.length > 0 ? (
//             <Dropdown
//               value={selectedModel}
//               onChange={handleModelChange}
//               options={modelOptions}
//               optionLabel="label"
//               placeholder="Select a model"
//               className="w-full"
//               itemTemplate={(option) => (
//                 <div className="flex items-center gap-3">
//                   <Icon icon={option.icon} className="w-5 h-5 text-primary" />
//                   <span>{option.label}</span>
//                 </div>
//               )}
//             />
//           ) : (
//             <div className="p-4 bg-gray-50 rounded-lg text-gray-500 flex items-center gap-2">
//               <Icon icon="carbon:warning" className="w-5 h-5" />
//               No models available for this brand
//             </div>
//           )}
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default PhoneSelector;
