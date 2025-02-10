import { motion } from 'framer-motion';

interface ShippingFormProps {
  formData: {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    apartment: string;
    city: string;
    zip: string;
    country: string;
    phone: string;
  };
  errors: {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    apartment: string;
    city: string;
    zip: string;
    country: string;
    phone: string;
  };
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export function ShippingForm({ formData, errors, handleSubmit, handleChange }: ShippingFormProps) {
  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email or Mobile Number</label>
        <input
          type="email"
          name="email"
          placeholder="Email or mobile number"
          className={`w-full p-2 border rounded-md ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      {/* First Name & Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className={`w-full p-2 border rounded-md ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className={`w-full p-2 border rounded-md ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium mb-1">Address</label>
        <input
          type="text"
          name="address"
          placeholder="Address"
          className={`w-full p-2 border rounded-md ${
            errors.address ? 'border-red-500' : 'border-gray-300'
          }`}
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>

      {/* Apartment */}
      <div>
        <label className="block text-sm font-medium mb-1">Apartment, Suite, etc. (Optional)</label>
        <input
          type="text"
          name="apartment"
          placeholder="Apartment, suite, etc."
          className="w-full p-2 border border-gray-300 rounded-md"
          value={formData.apartment}
          onChange={handleChange}
        />
      </div>

      {/* City, ZIP, and Country */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            name="city"
            placeholder="City"
            className={`w-full p-2 border rounded-md ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">ZIP Code</label>
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            className={`w-full p-2 border rounded-md ${
              errors.zip ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.zip}
            onChange={handleChange}
          />
          {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <select
            name="country"
            className={`w-full p-2 border rounded-md ${
              errors.country ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.country}
            onChange={handleChange}
          >
            <option value="IN">India</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
          </select>
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className={`w-full p-2 border rounded-md ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          }`}
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 mt-4"
      >
        Save Shipping Info
      </button>
    </motion.form>
  );
}