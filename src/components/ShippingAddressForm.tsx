import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface ShippingAddress {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  phoneNo: string;
  customerNote?: string;
}

interface ShippingAddressFormProps {
  onSubmit: (address: ShippingAddress) => void;
}

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({ onSubmit }) => {
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    address: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
    phoneNo: '',
    customerNote: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(shippingAddress);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Address"
        name="address"
        value={shippingAddress.address}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="City"
        name="city"
        value={shippingAddress.city}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="State"
        name="state"
        value={shippingAddress.state}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Country"
        name="country"
        value={shippingAddress.country}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Pin Code"
        name="pinCode"
        value={shippingAddress.pinCode}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Phone Number"
        name="phoneNo"
        value={shippingAddress.phoneNo}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
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
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Save Address
      </Button>
    </Box>
  );
};

export default ShippingAddressForm; 