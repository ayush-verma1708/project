import React, { useState } from 'react';
import { TextField, Button, Box, Checkbox, FormControlLabel, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  pin: string;
  country: string;
  phone: string;
  email: string;
  customerNote: string;
}

interface ShippingAddressFormProps {
  onSubmit: (address: ShippingAddress) => void;
}

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({ onSubmit }) => {
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pin: '',
    country: 'India',
    phone: '',
    email: '',
    customerNote: ''
  });

  const [agreedToPolicies, setAgreedToPolicies] = useState(false);
  const [errors, setErrors] = useState<Partial<ShippingAddress>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Partial<ShippingAddress> = {};
    if (!shippingAddress.firstName) newErrors.firstName = 'First name is required';
    if (!shippingAddress.lastName) newErrors.lastName = 'Last name is required';
    if (!shippingAddress.address) newErrors.address = 'Address is required';
    if (!shippingAddress.city) newErrors.city = 'City is required';
    if (!shippingAddress.state) newErrors.state = 'State is required';
    if (!shippingAddress.pin) newErrors.pin = 'PIN code is required';
    if (!shippingAddress.phone) newErrors.phone = 'Phone number is required';
    if (!shippingAddress.email) newErrors.email = 'Email is required';
    if (!agreedToPolicies) {
      setErrors({ ...newErrors, agreedToPolicies: 'You must agree to the policies' });
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(shippingAddress);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <TextField
          label="First Name"
          name="firstName"
          value={shippingAddress.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          required
          fullWidth
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={shippingAddress.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
          required
          fullWidth
        />
      </div>

      <TextField
        label="Address"
        name="address"
        value={shippingAddress.address}
        onChange={handleChange}
        error={!!errors.address}
        helperText={errors.address}
        required
        fullWidth
        margin="normal"
      />

      <TextField
        label="Apartment, suite, etc. (optional)"
        name="apartment"
        value={shippingAddress.apartment}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <div className="grid grid-cols-2 gap-4 mb-4">
        <TextField
          label="City"
          name="city"
          value={shippingAddress.city}
          onChange={handleChange}
          error={!!errors.city}
          helperText={errors.city}
          required
          fullWidth
        />
        <TextField
          label="State"
          name="state"
          value={shippingAddress.state}
          onChange={handleChange}
          error={!!errors.state}
          helperText={errors.state}
          required
          fullWidth
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <TextField
          label="PIN Code"
          name="pin"
          value={shippingAddress.pin}
          onChange={handleChange}
          error={!!errors.pin}
          helperText={errors.pin}
          required
          fullWidth
        />
        <TextField
          label="Country"
          name="country"
          value={shippingAddress.country}
          onChange={handleChange}
          required
          fullWidth
          disabled
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <TextField
          label="Phone"
          name="phone"
          value={shippingAddress.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
          required
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={shippingAddress.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          required
          fullWidth
        />
      </div>

      <TextField
        label="Customer Note (Optional)"
        name="customerNote"
        value={shippingAddress.customerNote}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={3}
        placeholder="Add any special instructions or notes for your order..."
      />

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <FormControlLabel
          control={
            <Checkbox
              checked={agreedToPolicies}
              onChange={(e) => setAgreedToPolicies(e.target.checked)}
              color="primary"
            />
          }
          label={
            <Typography variant="body2">
              I agree to the{' '}
              <Link component={RouterLink} to="/policies/privacy" target="_blank" color="primary">
                Privacy Policy
              </Link>
              ,{' '}
              <Link component={RouterLink} to="/policies/returns" target="_blank" color="primary">
                Return & Refund Policy
              </Link>
              ,{' '}
              <Link component={RouterLink} to="/policies/shipping" target="_blank" color="primary">
                Shipping Policy
              </Link>
              , and{' '}
              <Link component={RouterLink} to="/policies/terms" target="_blank" color="primary">
                Terms & Conditions
              </Link>
            </Typography>
          }
        />
        {errors.agreedToPolicies && (
          <Typography color="error" variant="caption" className="mt-1 block">
            {errors.agreedToPolicies}
          </Typography>
        )}
      </div>

      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        fullWidth 
        sx={{ mt: 4, py: 1.5 }}
        disabled={!agreedToPolicies}
      >
        Continue to Payment
      </Button>
    </Box>
  );
};

export default ShippingAddressForm; 