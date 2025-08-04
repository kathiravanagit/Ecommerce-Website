import { useState } from 'react';

export default function AddressForm({ onAddressSubmit, onCancel }) {
    const [address, setAddress] = useState({
        fullName: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        phoneNumber: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!address.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!address.address.trim()) newErrors.address = 'Address is required';
        if (!address.city.trim()) newErrors.city = 'City is required';
        if (!address.state.trim()) newErrors.state = 'State is required';
        if (!address.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
        if (!address.country.trim()) newErrors.country = 'Country is required';
        if (!address.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
        
        // Phone number validation (basic)
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        if (address.phoneNumber && !phoneRegex.test(address.phoneNumber)) {
            newErrors.phoneNumber = 'Please enter a valid phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onAddressSubmit(address);
        }
    };

    return (
        <div className="address-form-overlay">
            <div className="address-form-container">
                <div className="card">
                    <div className="card-header">
                        <h4>Shipping Address</h4>
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={onCancel}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label htmlFor="fullName" className="form-label">Full Name *</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                                        id="fullName"
                                        name="fullName"
                                        value={address.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                    />
                                    {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                                </div>

                                <div className="col-12 mb-3">
                                    <label htmlFor="address" className="form-label">Address *</label>
                                    <textarea
                                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                        id="address"
                                        name="address"
                                        rows="3"
                                        value={address.address}
                                        onChange={handleChange}
                                        placeholder="Enter your complete address"
                                    />
                                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="city" className="form-label">City *</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                        id="city"
                                        name="city"
                                        value={address.city}
                                        onChange={handleChange}
                                        placeholder="Enter city"
                                    />
                                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="state" className="form-label">State *</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                                        id="state"
                                        name="state"
                                        value={address.state}
                                        onChange={handleChange}
                                        placeholder="Enter state"
                                    />
                                    {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="postalCode" className="form-label">Postal Code *</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.postalCode ? 'is-invalid' : ''}`}
                                        id="postalCode"
                                        name="postalCode"
                                        value={address.postalCode}
                                        onChange={handleChange}
                                        placeholder="Enter postal code"
                                    />
                                    {errors.postalCode && <div className="invalid-feedback">{errors.postalCode}</div>}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="country" className="form-label">Country *</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                                        id="country"
                                        name="country"
                                        value={address.country}
                                        onChange={handleChange}
                                        placeholder="Enter country"
                                    />
                                    {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                                </div>

                                <div className="col-12 mb-3">
                                    <label htmlFor="phoneNumber" className="form-label">Phone Number *</label>
                                    <input
                                        type="tel"
                                        className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={address.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                    />
                                    {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                                </div>
                            </div>

                            <div className="d-flex justify-content-end gap-2">
                                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Confirm Address & Place Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
