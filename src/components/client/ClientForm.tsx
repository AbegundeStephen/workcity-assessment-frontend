import React, { useState, useEffect } from 'react';
import { Client, ClientFormData } from '../../types/client.types';
import { validateEmail, validateRequired } from '../../utils/validation';
import { CLIENT_STATUS_OPTIONS } from '../../utils/constants';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface ClientFormProps {
  client?: Client;
  onSubmit: (data: ClientFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ClientForm: React.FC<ClientFormProps> = ({
  client,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    status: 'active',
  });

  const [errors, setErrors] = useState<Partial<ClientFormData>>({});

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name,
        email: client.email,
        phone: client.phone,
        company: client.company,
        address: client.address || '',
        status: client.status,
      });
    }
  }, [client]);

  const handleInputChange = (field: keyof ClientFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ClientFormData> = {};

    newErrors.name = validateRequired(formData.name, 'Name');
    newErrors.email = validateEmail(formData.email);
    newErrors.phone = validateRequired(formData.phone, 'Phone');
    newErrors.company = validateRequired(formData.company, 'Company');

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter client's full name"
          value={formData.name}
          onChange={handleInputChange('name')}
          error={errors.name}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter email address"
          value={formData.email}
          onChange={handleInputChange('email')}
          error={errors.email}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={handleInputChange('phone')}
          error={errors.phone}
          required
        />

        <Input
          label="Company"
          type="text"
          placeholder="Enter company name"
          value={formData.company}
          onChange={handleInputChange('company')}
          error={errors.company}
          required
        />

        <div className="sm:col-span-2">
          <Input
            label="Address"
            type="text"
            placeholder="Enter address (optional)"
            value={formData.address}
            onChange={handleInputChange('address')}
            error={errors.address}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.status}
            onChange={handleInputChange('status')}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          >
            {CLIENT_STATUS_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={isLoading}
          disabled={isLoading}
        >
          {client ? 'Update Client' : 'Create Client'}
        </Button>
      </div>
    </form>
  );
};

export default ClientForm;