import React, { useState, useEffect } from 'react';

interface FormData {
  fullName: string;
  contactNumber: string;
  email: string;
  location: string;
}

interface MultiStepFormProps {
  id?: string;
}

// Styles constant defined before component
const formStyles = `
  .form-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffd900;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    padding: 2rem;
    overflow-y: auto;
  }

  .form-overlay:has(.thank-you-step) {
    padding: 0;
  }

  .close-button {
    position: fixed;
    top: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: #000;
    color: #fff;
    border: none;
    border-radius: 50%;
    font-size: 2rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10001;
    transition: all 0.3s ease;
    line-height: 1;
    padding: 0;
  }

  .close-button:hover {
    background: #333;
    transform: rotate(90deg);
    scale: 1.1;
  }

  .form-container {
    width: 100%;
    max-width: 600px;
    position: relative;
    z-index: 1;
  }


  .form-step {
    width: 100%;
  }

  .form-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .form-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900;
    color: #000;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 0;
  }

  .form-card {
    background: #fff;
    border-radius: 12px;
    padding: 2.5rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }

  .step-indicator {
    color: #999;
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 2rem;
    text-transform: uppercase;
  }

  .form-fields {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-field label {
    font-weight: 700;
    font-size: 1rem;
    color: #000;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .required {
    color: #ff0000;
  }

  .form-field input {
    padding: 0.875rem 1rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 400;
    font-family: inherit;
    transition: border-color 0.3s ease;
    background: #fff;
    color: #000;
  }

  .form-field input:focus {
    outline: none;
    border-color: #000;
  }

  .form-field input::placeholder {
    color: #999;
  }

  .form-button {
    width: 100%;
    background: #003d82;
    color: #fff;
    padding: 1rem 2rem;
    font-weight: 700;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
  }

  .form-button:hover {
    background: #0052a3;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 61, 130, 0.3);
  }

  .otp-display {
    background: #f0f0f0;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1rem;
    color: #000;
  }

  .otp-display strong {
    font-weight: 700;
    font-size: 1.2rem;
    color: #003d82;
  }

  .otp-instruction {
    font-size: 1rem;
    color: #000;
    margin-bottom: 1.5rem;
    text-align: center;
    font-weight: 400;
  }

  .otp-inputs {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 2rem;
  }

  .otp-input {
    width: 50px;
    height: 50px;
    border: 2px solid #ddd;
    border-radius: 8px;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
    font-family: inherit;
    transition: border-color 0.3s ease;
    background: #fff;
    color: #000;
  }

  .otp-input:focus {
    outline: none;
    border-color: #000;
  }

  .thank-you-step {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border-radius: 0;
  }

  .thank-you-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .thank-you-background img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .thank-you-content {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .thank-you-text {
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background: rgba(34, 71, 34, 0.85);
    border-radius: 12px;
    max-width: 800px;
    margin: 2rem;
  }

  .thank-you-title {
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: 900;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 1rem;
  }

  .thank-you-message {
    font-size: clamp(1.2rem, 2.5vw, 1.8rem);
    font-weight: 400;
    color: #fff;
    line-height: 1.6;
    margin: 0;
  }

  @media (max-width: 768px) {
    .form-overlay {
      padding: 1rem;
    }

    .form-card {
      padding: 1.5rem;
    }

    .form-title {
      font-size: 1.75rem;
    }

    .otp-inputs {
      gap: 0.5rem;
    }

    .otp-input {
      width: 40px;
      height: 40px;
      font-size: 1.2rem;
    }

    .thank-you-text {
      padding: 2rem 1.5rem;
      margin: 1rem;
    }

    .close-button {
      top: 1rem;
      right: 1rem;
      width: 40px;
      height: 40px;
      font-size: 1.5rem;
    }

    .thank-you-title {
      font-size: 2.5rem;
    }

    .thank-you-message {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 480px) {
    .form-card {
      padding: 1.25rem;
    }

    .form-fields {
      gap: 1.25rem;
    }

    .otp-inputs {
      gap: 0.4rem;
    }

    .otp-input {
      width: 35px;
      height: 35px;
      font-size: 1rem;
    }

    .thank-you-text {
      padding: 1.5rem 1rem;
      margin: 0.75rem;
    }

    .close-button {
      top: 0.75rem;
      right: 0.75rem;
      width: 35px;
      height: 35px;
      font-size: 1.25rem;
    }
  }
`;

const MultiStepForm: React.FC<MultiStepFormProps> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    contactNumber: '',
    email: '',
    location: '',
  });
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '', '']);
  const [enteredOtp, setEnteredOtp] = useState<string>('');

  useEffect(() => {
    const handleOpenForm = () => {
      setIsOpen(true);
    };

    const handleCloseForm = () => {
      setIsOpen(false);
      // Reset form when closing
      setStep(1);
      setFormData({
        fullName: '',
        contactNumber: '',
        email: '',
        location: '',
      });
      setOtp(['', '', '', '', '', '', '']);
      setEnteredOtp('');
    };

    window.addEventListener('openForm', handleOpenForm);
    window.addEventListener('closeForm', handleCloseForm);

    // Inject styles (only once)
    if (!document.getElementById('multi-step-form-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'multi-step-form-styles';
      styleSheet.textContent = formStyles;
      document.head.appendChild(styleSheet);
    }

    return () => {
      window.removeEventListener('openForm', handleOpenForm);
      window.removeEventListener('closeForm', handleCloseForm);
      // Note: We don't remove styles on unmount since they're shared
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent('closeForm'));
  };

  if (!isOpen) return null;

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 6) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    // Update entered OTP string
    setEnteredOtp(newOtp.join(''));
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleNext = () => {
    if (step === 1) {
      // Validate required fields
      if (!formData.fullName || !formData.contactNumber || !formData.location) {
        alert('Please fill in all required fields');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // Check if OTP is complete
      if (otp.join('').length !== 7) {
        alert('Please enter the complete OTP');
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = () => {
    // Form submitted, show thank you page (step 3)
    // This is already handled by the step state
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as 91-XXXXXXXXXX (max 12 digits total: 91 + 10 digits)
    if (digits.length === 0) return '';
    if (digits.length <= 2) {
      // If starts with 91, keep it, otherwise add 91
      if (digits.startsWith('91')) return '91-';
      return `91-${digits}`;
    }
    // If starts with 91, use it, otherwise prepend 91
    const phoneDigits = digits.startsWith('91') ? digits.slice(2) : digits;
    return `91-${phoneDigits.slice(0, 10)}`;
  };

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, '');
    // Allow up to 12 digits (91 + 10 digits)
    if (digits.length <= 12) {
      setFormData((prev) => ({ ...prev, contactNumber: formatPhoneNumber(value) }));
    }
  };

  return (
    <div className="form-overlay">
      <button className="close-button" onClick={handleClose} aria-label="Close form">
        ×
      </button>
      {step === 3 ? (
        <div className="form-step thank-you-step">
          <div className="thank-you-background">
            <img src="/images/15.jpg" alt="Thank you" />
          </div>
          <div className="thank-you-content">
            <div className="thank-you-text">
              <h1 className="thank-you-title">THANKS.</h1>
              <p className="thank-you-message">
                A &quot;SUPER BUDDY&quot; will reach out to you shortly.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="form-container">
          {step === 1 && (
            <div className="form-step">
              <div className="form-header">
                <h1 className="form-title">LET&apos;S GET STARTED.</h1>
              </div>
              <div className="form-card">
                <div className="step-indicator">Step 1 of 2</div>
                <div className="form-fields">
                  <div className="form-field">
                    <label htmlFor="fullName">
                      Full Name<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="contactNumber">
                      Contact Number<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="contactNumber"
                      placeholder="91-**********"
                      value={formData.contactNumber}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="abc@xyz.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="location">
                      Location<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="location"
                      placeholder="Mumbai"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  </div>
                </div>
                <button className="form-button" onClick={handleNext}>
                  NEXT STEP
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <div className="form-header">
                <h1 className="form-title">FINAL STEP.</h1>
              </div>
              <div className="form-card">
                <div className="step-indicator">Step 2 of 2</div>
                {enteredOtp && (
                  <div className="otp-display">
                    OTP Entered: <strong>{enteredOtp}</strong>
                  </div>
                )}
                <div className="otp-instruction">
                  Verify one-time-password (OTP) sent to {formData.contactNumber || '+91-XXXXXXXX00'}
                </div>
                <div className="otp-inputs">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="otp-input"
                    />
                  ))}
                </div>
                <button className="form-button" onClick={handleNext}>
                  SUBMIT
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;


