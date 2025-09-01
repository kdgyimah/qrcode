"use client";

import React, { useCallback, useMemo } from "react";
import { User, Phone, Mail, Building, Briefcase, MapPin } from "lucide-react";
import type { FormProps, ContactFormData } from "@/types/qr-generator";
import { Label } from "@/components/ui/label";
import { ErrorText } from "@/components/ui/error-text";
import { inputBase } from "@/constants/styles";
import { cn } from "@/lib/utils";

export const ContactForm: React.FC<FormProps<ContactFormData>> = ({
  formData,
  onChange,
  errors,
  onPhoneChange,
}) => {
  // Required fields based on the type definition
  const requiredFields = useMemo(() => new Set([
    'firstName', 'lastName', 'phone', 'email'
  ]), []);

  // Memoized validation state
  const isValid = useMemo(() => {
    return (formData.firstName?.trim() || '') && 
           (formData.lastName?.trim() || '') && 
           (formData.phone?.trim() || '') && 
           (formData.email?.trim() || '');
  }, [formData.firstName, formData.lastName, formData.phone, formData.email]);

  // Optimized change handlers
  const handleChange = useCallback((field: keyof ContactFormData) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(field, e.target.value);
    }, [onChange]);

  const handlePhoneChangeWrapper = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (onPhoneChange) {
      onPhoneChange('phone', value);
    } else {
      onChange('phone', value);
    }
  }, [onChange, onPhoneChange]);

  const handleMobileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (onPhoneChange) {
      onPhoneChange('mobile', value);
    } else {
      onChange('mobile', value);
    }
  }, [onChange, onPhoneChange]);

  return (
    <div className="space-y-6">
      
      <div className="space-y-4">
        <PersonalInfoSection
          formData={formData}
          errors={errors}
          requiredFields={requiredFields}
          onFirstNameChange={handleChange('firstName')}
          onLastNameChange={handleChange('lastName')}
        />

        <ContactInfoSection
          formData={formData}
          errors={errors}
          requiredFields={requiredFields}
          onPhoneChange={handlePhoneChangeWrapper}
          onMobileChange={handleMobileChange}
          onEmailChange={handleChange('email')}
          onWebsiteChange={handleChange('website')}
        />

        <ProfessionalInfoSection
          formData={formData}
          errors={errors}
          onOrganizationChange={handleChange('organization')}
          onJobTitleChange={handleChange('jobTitle')}
        />

        <AddressSection
          formData={formData}
          errors={errors}
          onAddressChange={handleChange('address')}
          onCityChange={handleChange('city')}
          onStateChange={handleChange('state')}
          onZipChange={handleChange('zip')}
          onCountryChange={handleChange('country')}
        />
      </div>

      {isValid && <ContactPreview formData={formData} />}
      
      {/* <ContactTips /> */}
    </div>
  );
};

// Extracted components for better organization


interface PersonalInfoSectionProps {
  formData: ContactFormData;
  errors: Partial<Record<keyof ContactFormData, string>>;
  requiredFields: Set<string>;
  onFirstNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLastNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PersonalInfoSection({ 
  formData, 
  errors, 
  requiredFields, 
  onFirstNameChange, 
  onLastNameChange 
}: PersonalInfoSectionProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-900 border-b pb-2">Personal Information</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">
            First Name {requiredFields.has('firstName') && '*'}
          </Label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName || ''}
            onChange={onFirstNameChange }
            placeholder="John"
            className={cn(
              inputBase,
              errors.firstName && "border-gray-300 bg-white"
            )}
            aria-invalid={!!errors.firstName}
            required={requiredFields.has('firstName')}
          />
          {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
        </div>

        <div>
          <Label htmlFor="lastName">
            Last Name {requiredFields.has('lastName') && '*'}
          </Label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName || ''}
            onChange={onLastNameChange}
            placeholder="Doe"
            className={cn(
              inputBase,
              errors.lastName && "border-red-500 bg-red-50"
            )}
            aria-invalid={!!errors.lastName}
            required={requiredFields.has('lastName')}
          />
          {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
        </div>
      </div>
    </div>
  );
}

interface ContactInfoSectionProps {
  formData: ContactFormData;
  errors: Partial<Record<keyof ContactFormData, string>>;
  requiredFields: Set<string>;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMobileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onWebsiteChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ContactInfoSection({ 
  formData, 
  errors, 
  requiredFields, 
  onPhoneChange, 
  onMobileChange, 
  onEmailChange, 
  onWebsiteChange 
}: ContactInfoSectionProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-900 border-b pb-2">Contact Information</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone {requiredFields.has('phone') && '*'}
          </Label>
          <input
            type="tel"
            id="phone"
            value={formData.phone || ''}
            onChange={onPhoneChange}
            placeholder="+233 (555) 123-4567"
            className={cn(
              inputBase,
              errors.phone && "border-gray-300 bg-white"
            )}
            aria-invalid={!!errors.phone}
            required={requiredFields.has('phone')}
          />
          {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
        </div>

        <div>
          <Label htmlFor="mobile" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Mobile
          </Label>
          <input
            type="tel"
            id="mobile"
            value={formData.mobile || ''}
            onChange={onMobileChange}
            placeholder="+233 (555) 987-6543"
            className={cn(
              inputBase,
              errors.mobile && "border-gray-300 bg-white"
            )}
            aria-invalid={!!errors.mobile}
          />
          {errors.mobile && <ErrorText>{errors.mobile}</ErrorText>}
        </div>

        <div>
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email {requiredFields.has('email') && '*'}
          </Label>
          <input
            type="email"
            id="email"
            value={formData.email || ''}
            onChange={onEmailChange}
            placeholder="john.doe@example.com"
            className={cn(
              inputBase,
              errors.email && "border-gray-300 bg-white"
            )}
            aria-invalid={!!errors.email}
            required={requiredFields.has('email')}
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </div>

        <div>
          <Label htmlFor="website">Website</Label>
          <input
            type="url"
            id="website"
            value={formData.website || ''}
            onChange={onWebsiteChange}
            placeholder="https://example.com"
            className={cn(
              inputBase,
              errors.website && "border-gray-300 bg-white"
            )}
            aria-invalid={!!errors.website}
          />
          {errors.website && <ErrorText>{errors.website}</ErrorText>}
        </div>
      </div>
    </div>
  );
}

interface ProfessionalInfoSectionProps {
  formData: ContactFormData;
  errors: Partial<Record<keyof ContactFormData, string>>;
  onOrganizationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onJobTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ProfessionalInfoSection({ 
  formData, 
  errors, 
  onOrganizationChange, 
  onJobTitleChange 
}: ProfessionalInfoSectionProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-900 border-b pb-2">Professional Information</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="organization" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Organization
          </Label>
          <input
            type="text"
            id="organization"
            value={formData.organization || ''}
            onChange={onOrganizationChange}
            placeholder="Despite Group of Companies"
            className={cn(
              inputBase,
              errors.organization && "border-gray-300 bg-white"
            )}
            aria-invalid={!!errors.organization}
          />
          {errors.organization && <ErrorText>{errors.organization}</ErrorText>}
        </div>

        <div>
          <Label htmlFor="jobTitle" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Job Title
          </Label>
          <input
            type="text"
            id="jobTitle"
            value={formData.jobTitle || ''}
            onChange={onJobTitleChange}
            placeholder="General Manager"
            className={cn(
              inputBase,
              errors.jobTitle && "border-gray-300 bg-white"
            )}
            aria-invalid={!!errors.jobTitle}
          />
          {errors.jobTitle && <ErrorText>{errors.jobTitle}</ErrorText>}
        </div>
      </div>
    </div>
  );
}

interface AddressSectionProps {
  formData: ContactFormData;
  errors: Partial<Record<keyof ContactFormData, string>>;
  onAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onZipChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCountryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function AddressSection({ 
  formData, 
  errors, 
  onAddressChange, 
  onCityChange, 
  onStateChange, 
  onZipChange, 
  onCountryChange 
}: AddressSectionProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-900 border-b pb-2 flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        Address Information
      </h4>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="address">Street Address</Label>
          <input
            type="text"
            id="address"
            value={formData.address || ''}
            onChange={onAddressChange}
            placeholder="123 Main Street"
            className={cn(
              inputBase,
              errors.address && "border-red-500 bg-red-50"
            )}
            aria-invalid={!!errors.address}
          />
          {errors.address && <ErrorText>{errors.address}</ErrorText>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <input
              type="text"
              id="city"
              value={formData.city || ''}
              onChange={onCityChange}
              placeholder="Accra"
              className={cn(
                inputBase,
                errors.city && "border-red-500 bg-red-50"
              )}
              aria-invalid={!!errors.city}
            />
            {errors.city && <ErrorText>{errors.city}</ErrorText>}
          </div>

          <div>
            <Label htmlFor="state">State/Province</Label>
            <input
              type="text"
              id="state"
              value={formData.state || ''}
              onChange={onStateChange}
              placeholder="Greater Accra "
              className={cn(
                inputBase,
                errors.state && "border-red-500 bg-red-50"
              )}
              aria-invalid={!!errors.state}
            />
            {errors.state && <ErrorText>{errors.state}</ErrorText>}
          </div>

          <div>
            <Label htmlFor="zip">ZIP/Postal Code</Label>
            <input
              type="text"
              id="zip"
              value={formData.zip || ''}
              onChange={onZipChange}
              placeholder="00233"
              className={cn(
                inputBase,
                errors.zip && "border-red-500 bg-red-50"
              )}
              aria-invalid={!!errors.zip}
            />
            {errors.zip && <ErrorText>{errors.zip}</ErrorText>}
          </div>
        </div>

        <div>
          <Label htmlFor="country">Country</Label>
          <input
            type="text"
            id="country"
            value={formData.country || ''}
            onChange={onCountryChange}
            placeholder="Ghana"
            className={cn(
              inputBase,
              errors.country && "border-red-500 bg-red-50"
            )}
            aria-invalid={!!errors.country}
          />
          {errors.country && <ErrorText>{errors.country}</ErrorText>}
        </div>
      </div>
    </div>
  );
}

function ContactPreview({ formData }: { formData: ContactFormData }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <Label className="mb-3">Contact Preview</Label>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-500" />
          <span className="font-medium text-gray-900">
            {formData.firstName} {formData.lastName}
          </span>
        </div>
        
        {formData.jobTitle && formData.organization && (
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {formData.jobTitle} at {formData.organization}
            </span>
          </div>
        )}
        
        {formData.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{formData.phone}</span>
          </div>
        )}
        
        {formData.email && (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{formData.email}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// function ContactTips() {
//   return (
//     <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//       <h4 className="text-sm font-medium text-blue-900 mb-2">
//         vCard Contact Tips
//       </h4>
//       <ul className="text-sm text-blue-700 space-y-1">
//         <li>• QR code creates a vCard (.vcf) file</li>
//         <li>• Compatible with all major contact apps</li>
//         <li>• Required: First name, last name, phone, email</li>
//         <li>• Optional fields enhance contact completeness</li>
//         <li>• Perfect for business cards and networking</li>
//       </ul>
//     </div>
//   );
// }