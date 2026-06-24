"use client";

import React, { useState } from "react";
import "./SimpleRegisterForm.css";

const SimpleRegisterForm = () => {
  const [formData, setFormData] = useState({
    isSriLankanCitizen: "",
    region: "",
    organizationalUnit: "",
    email: "",
    nameWithInitials: "",
    firstName: "",
    lastName: "",
    contactNumber: "",
    nic: "",
    gender: "",
    branch: "",
    otherAffiliation: "",
    partOfExCo: "",
    membershipNo: "",
    membershipCategory: "",
    excoEntities: [],
    tshirtSize: "",
    privacy: "",
    consent: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [internationalStepComplete, setInternationalStepComplete] =
    useState(false);

  // Form options
  const branches = [
    "1. University of Moratuwa (UOM)",
    "2. University of Peradeniya (UOP)",
    "3. University of Ruhuna (UOR)",
    "4. University of Colombo School of Computing (UCSC)",
    "5. Sri Lanka Institute of Information Technology (SLIIT)",
    "6. General Sri John Kotelawala Defence University (KDU)",
    "7. Wayamba University of Sri Lanka (WUSL)",
    "8. Informatics Institute of Technology (IIT)",
    "9. Uva Wellassa University (UWU)",
    "10. Sabaragamuwa University of Sri Lanka (SUSL)",
    "11. Open University of Sri Lanka (OUSL)",
    "12. University of Kelaniya (UOK)",
    "13. National School of Business Management (NSBM)",
    "14. University of Sri Jayawardenepura (USJP)",
    "15. Sri Lanka Technological Campus (SLTC)",
    "16. Rajarata University of Sri Lanka (RUSL)",
    "17. University of Vavuniya (UOV)",
    "18. University of Jaffna (UOJ)",
    "19. University of Vocational Technology (UOVT)",
    "20. South Eastern University of Sri Lanka (SEUSL)",
    "21. National Institute of Business Management (NIBM)",
    "22. Colombo International Nautical and Engineering College (CINEC)",
    "23. Other",
  ];

  const membershipCategories = [
    "Student Member",
    "Graduate Student Member",
    "Member",
    "Senior Member",
    "Fellow",
  ];

  const excoEntities = [
    { id: "IEEE Sri Lanka Section", label: "IEEE Sri Lanka Section" },
    {
      id: "IEEE Young Professionals Sri Lanka (YP)",
      label: "IEEE Young Professionals Sri Lanka (YP)",
    },
    {
      id: "IEEE Women in Engineering Sri Lanka (WIE)",
      label: "IEEE Women in Engineering Sri Lanka (WIE)",
    },
    {
      id: "IEEE Sri Lanka Section SIGHT",
      label: "IEEE Sri Lanka Section SIGHT",
    },
    {
      id: "IEEE Sri Lanka Section Technical Society Chapter",
      label: "IEEE Sri Lanka Section Technical Society Chapter",
    },
  ];

  const tShirtSizes = ["2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL"];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "I Agree" : "") : value,
    }));

    // If citizenship toggles, reset international step completion and fields
    if (name === "isSriLankanCitizen") {
      setInternationalStepComplete(false);
      if (value === "Yes") {
        setFormData((prev) => ({
          ...prev,
          region: "",
          organizationalUnit: "",
        }));
      } else if (value === "No") {
        setFormData((prev) => ({
          ...prev,
          // Clear SL-only fields when switching to international
          branch: "",
          otherAffiliation: "",
          partOfExCo: "",
          excoEntities: [],
        }));
      }
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle checkbox array changes
  const handleCheckboxArrayChange = (name, value, checked) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked
        ? [...prev[name], value]
        : prev[name].filter((item) => item !== value),
    }));
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Personal Information validation
    if (!formData.nameWithInitials.trim())
      newErrors.nameWithInitials = "Name with initials is required";
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.contactNumber.trim())
      newErrors.contactNumber = "Contact number is required";
    if (!formData.nic.trim()) newErrors.nic = "NIC number is required";
    if (!formData.gender) newErrors.gender = "Gender is required";

    // Only for Sri Lankan citizens
    if (formData.isSriLankanCitizen === "Yes") {
      if (!formData.branch) newErrors.branch = "Branch is required";
      if (
        formData.branch === "23. Other" &&
        !formData.otherAffiliation.trim()
      ) {
        newErrors.otherAffiliation = "Please specify your affiliation";
      }
      if (!formData.partOfExCo) {
        newErrors.partOfExCo = "Please select an option";
      }
    }

    // T-shirt size validation
    if (!formData.tshirtSize)
      newErrors.tshirtSize = "T-shirt size is required";

    // Terms validation
    if (!formData.privacy)
      newErrors.privacy = "Please agree to the privacy policy";
    if (!formData.consent)
      newErrors.consent = "Please give consent for information sharing";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Update your handleSubmit function in SimpleRegisterForm.js

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Client-side validation failed:", errors);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Submitting form with data:", formData);

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          console.error("Expected JSON but got:", text);
          throw new Error(
            `Server returned ${response.status}: Non-JSON response`
          );
        }

        const result = await response.json();
        throw new Error(result.message || `Server returned ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);

      if (result.success) {
        setShowSuccess(true);
        setFormData({
          email: "",
          nameWithInitials: "",
          firstName: "",
          lastName: "",
          contactNumber: "",
          nic: "",
          gender: "",
          branch: "",
          otherAffiliation: "",
          partOfExCo: "",
          membershipNo: "",
          membershipCategory: "",
          excoEntities: [],
          tshirtSize: "",
          privacy: "",
          consent: "",
        });
      } else {
        setErrors(result.errors || {});
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert(
        `Error: ${
          error.message ||
          "There was an error submitting the form. Please try again."
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="success-message">
        <h2>Registration Successful!</h2>
        <p>
          Thank you for registering for IEEE SLSYWC 2026. We will contact you
          soon with further details.
        </p>
        <button onClick={() => window.location.reload()}>
          Register Another Person
        </button>
      </div>
    );
  }

  if (!formData.isSriLankanCitizen) {
    return (
      <div className="simple-register-form">
        <form className="form-container">
          <h2>IEEE SLSYWC 2026 Registration Form</h2>
          <div className="form-section">
            <h3>Registration Information</h3>
            <div className="form-group radio-group-modern">
              <label className="radio-group-label">
                Are you a Sri Lankan Citizen?
                <span style={{ color: "#ef4444", marginLeft: 4 }}>*</span>
              </label>
              <div className="radio-group">
                <label className="radio-label modern">
                  <input
                    type="radio"
                    name="isSriLankanCitizen"
                    value="Yes"
                    checked={formData.isSriLankanCitizen === "Yes"}
                    onChange={handleInputChange}
                  />
                  Yes
                </label>
                <label className="radio-label modern">
                  <input
                    type="radio"
                    name="isSriLankanCitizen"
                    value="No"
                    checked={formData.isSriLankanCitizen === "No"}
                    onChange={handleInputChange}
                  />
                  No
                </label>
              </div>
              {errors.isSriLankanCitizen && (
                <span className="error-message">
                  {errors.isSriLankanCitizen}
                </span>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }

  if (formData.isSriLankanCitizen === "No" && !internationalStepComplete) {
    return (
      <div className="simple-register-form">
        <form className="form-container">
          <h2>IEEE SLSYWC 2026 Registration Form</h2>
          <div className="form-section">
            <h3>International Delegate Information</h3>
            <div className="form-group">
              <label htmlFor="region">
                What is your region?{" "}
                <span style={{ color: "#ef4444", marginLeft: 4 }}>*</span>
              </label>
              <input
                type="text"
                id="region"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                className={errors.region ? "error" : ""}
              />
              {errors.region && (
                <span className="error-message">{errors.region}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="organizationalUnit">
                What organizational unit are you representing?{" "}
                <span style={{ color: "#ef4444", marginLeft: 4 }}>*</span>
              </label>
              <input
                type="text"
                id="organizationalUnit"
                name="organizationalUnit"
                value={formData.organizationalUnit}
                onChange={handleInputChange}
                className={errors.organizationalUnit ? "error" : ""}
              />
              {errors.organizationalUnit && (
                <span className="error-message">
                  {errors.organizationalUnit}
                </span>
              )}
            </div>
            <div className="form-buttons">
              <button
                type="button"
                className="submit-button"
                onClick={() => {
                  const newErrors = {};
                  if (!formData.region.trim())
                    newErrors.region = "Region is required";
                  if (!formData.organizationalUnit.trim())
                    newErrors.organizationalUnit =
                      "Organizational unit is required";
                  setErrors(newErrors);
                  if (Object.keys(newErrors).length === 0) {
                    setInternationalStepComplete(true);
                  }
                }}
              >
                Continue
              </button>
              <button
                type="button"
                className="back-button"
                onClick={() =>
                  setFormData((f) => ({
                    ...f,
                    isSriLankanCitizen: "",
                    region: "",
                    organizationalUnit: "",
                  }))
                }
              >
                Back
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="simple-register-form">
      <form onSubmit={handleSubmit} className="form-container">
        <h2>IEEE SLSYWC 2026 Registration Form</h2>
        {/* Personal Information Section */}
        <div className="form-section">
          <h3>Personal Information</h3>

          <div className="form-group">
            <label htmlFor="nameWithInitials">1. Name with Initials </label>
            <input
              type="text"
              id="nameWithInitials"
              name="nameWithInitials"
              value={formData.nameWithInitials}
              onChange={handleInputChange}
              className={errors.nameWithInitials ? "error" : ""}
            />
            {errors.nameWithInitials && (
              <span className="error-message">{errors.nameWithInitials}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="firstName">2. First Name </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={errors.firstName ? "error" : ""}
            />
            {errors.firstName && (
              <span className="error-message">{errors.firstName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">3. Last Name </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={errors.lastName ? "error" : ""}
            />
            {errors.lastName && (
              <span className="error-message">{errors.lastName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">4. Email </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber">5. Contact Number (WhatsApp)</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              className={errors.contactNumber ? "error" : ""}
            />
            {errors.contactNumber && (
              <span className="error-message">{errors.contactNumber}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="nic">6. NIC Number/Passport Number </label>
            <input
              type="text"
              id="nic"
              name="nic"
              value={formData.nic}
              onChange={handleInputChange}
              className={errors.nic ? "error" : ""}
            />
            {errors.nic && <span className="error-message">{errors.nic}</span>}
          </div>

          <div className="form-group radio-group-modern">
            <label className="radio-group-label">7. Gender </label>
            <div className="radio-group">
              {["Male", "Female"].map((gender) => (
                <label key={gender} className="radio-label modern">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleInputChange}
                  />
                  {gender}
                </label>
              ))}
            </div>
            {errors.gender && (
              <span className="error-message">{errors.gender}</span>
            )}
          </div>

          {/* Only show Student Branch for Sri Lankan citizens */}
          {formData.isSriLankanCitizen === "Yes" && (
            <div className="form-group">
              <label htmlFor="branch">
                8. IEEE Student Branch Affiliation{" "}
              </label>
              <select
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className={errors.branch ? "error" : ""}
              >
                <option value="">Choose</option>
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
              <small>
                Please mention the student branch affiliation you are
                volunteering, or you have volunteered.
              </small>
              {errors.branch && (
                <span className="error-message">{errors.branch}</span>
              )}
            </div>
          )}

          {formData.isSriLankanCitizen === "Yes" &&
            formData.branch === "23. Other" && (
              <div className="form-group">
                <label htmlFor="otherAffiliation">
                  Please specify your affiliation
                </label>
                <textarea
                  id="otherAffiliation"
                  name="otherAffiliation"
                  value={formData.otherAffiliation}
                  onChange={handleInputChange}
                  className={errors.otherAffiliation ? "error" : ""}
                  placeholder="If you're not affiliated to any IEEE Student Branch, please provide the details."
                />
                {errors.otherAffiliation && (
                  <span className="error-message">
                    {errors.otherAffiliation}
                  </span>
                )}
              </div>
            )}

          {/* Executive Committee Yes/No - show only for Sri Lankan citizens */}
          {formData.isSriLankanCitizen === "Yes" && (
            <div className="form-group radio-group-modern">
              <label className="radio-group-label">
                If you are part of an Executive Committee of,
              </label>
              <ul className="block text-sm pl-5 text-white italic">
                <li className="text-[#b8eaff]"> 1. IEEE Sri Lanka Section</li>
                <li className="text-[#b8eaff]">
                  2. IEEE Young Professionals Sri Lanka
                </li>
                <li className="text-[#b8eaff]">
                  3. IEEE Women in Engineering Sri Lanka
                </li>
                <li className="text-[#b8eaff]">
                  4. IEEE Sri Lanka Section SIGHT
                </li>
                <li className="text-[#b8eaff]">
                  5. IEEE Technical Society Sri Lanka Chapter
                </li>
              </ul>
              <div className="radio-group">
                <label className="radio-label modern">
                  <input
                    type="radio"
                    name="partOfExCo"
                    value="Yes"
                    checked={formData.partOfExCo === "Yes"}
                    onChange={handleInputChange}
                  />
                  Yes
                </label>
                <label className="radio-label modern">
                  <input
                    type="radio"
                    name="partOfExCo"
                    value="No"
                    checked={formData.partOfExCo === "No"}
                    onChange={handleInputChange}
                  />
                  No
                </label>
              </div>
              {errors.partOfExCo && (
                <span className="error-message">{errors.partOfExCo}</span>
              )}
            </div>
          )}

          {/* IEEE Membership Number */}
          <div className="form-group">
            <label htmlFor="membershipNo" className="no-required-star">
              Please provide your IEEE Membership Number.
            </label>
            <input
              type="text"
              id="membershipNo"
              name="membershipNo"
              value={formData.membershipNo}
              onChange={handleInputChange}
              className={errors.membershipNo ? "error" : ""}
            />
            {errors.membershipNo && (
              <span className="error-message">{errors.membershipNo}</span>
            )}
          </div>

          {/* Membership Category */}
          <div className="form-group">
            <label htmlFor="membershipCategory" className="no-required-star">
              Membership Category
            </label>
            <select
              id="membershipCategory"
              name="membershipCategory"
              value={formData.membershipCategory}
              onChange={handleInputChange}
              className={errors.membershipCategory ? "error" : ""}
            >
              <option value="">Select a Membership Category</option>
              <option value="Student Member">Student Member</option>
              <option value="Graduate Student Member">
                Graduate Student Member
              </option>
              <option value="Member">Member</option>
              <option value="Senior Member">Senior Member</option>
              <option value="Fellow">Fellow</option>
            </select>
            {errors.membershipCategory && (
              <span className="error-message">{errors.membershipCategory}</span>
            )}
          </div>

          {/* Executive Committee Entities (checkboxes) */}
          {/* {formData.partOfExCo === "Yes" && (
            <div className="form-group">
              <label>
                Select the entity/entities you are currently an Executive
                Committee Member in *
              </label>
              <div className="checkbox-group">
                {excoEntities.map((entity) => (
                  <label key={entity.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.excoEntities.includes(entity.id)}
                      onChange={(e) =>
                        handleCheckboxArrayChange(
                          "excoEntities",
                          entity.id,
                          e.target.checked
                        )
                      }
                    />
                    {entity.label}
                  </label>
                ))}
              </div>
              {errors.excoEntities && (
                <span className="error-message">{errors.excoEntities}</span>
              )}
            </div>
          )} */}
        </div>

        {/* Conditional Sections based on foreign status */}
        {formData.isSriLankanCitizen === "Yes" &&
          formData.partOfExCo === "Yes" && (
            <div className="form-section">
              <h3>Executive Committee Details</h3>

              <div className="form-group checkbox-group-modern">
                <label className="checkbox-group-label no-required-star">
                  Select the entity/entities you are currently an Executive
                  Committee Member in
                </label>
                <div className="checkbox-group">
                  {excoEntities.map((entity) => (
                    <label key={entity.id} className="checkbox-label modern">
                      <input
                        type="checkbox"
                        checked={formData.excoEntities.includes(entity.id)}
                        onChange={(e) =>
                          handleCheckboxArrayChange(
                            "excoEntities",
                            entity.id,
                            e.target.checked
                          )
                        }
                      />
                      {entity.label}
                    </label>
                  ))}
                </div>
                {errors.excoEntities && (
                  <span className="error-message">{errors.excoEntities}</span>
                )}
              </div>
            </div>
          )}

        {/* Delegate Pack Section */}
        <div className="form-section">
          <h3>Delegate Pack</h3>
          <div
            className="form-group"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: 200 }}>
              <label htmlFor="tshirtSize">
                T-Shirt Size <span style={{ color: "#ef4444", marginLeft: 4 }}>*</span>
              </label>
              <select
                id="tshirtSize"
                name="tshirtSize"
                value={formData.tshirtSize}
                onChange={handleInputChange}
                className={errors.tshirtSize ? "error" : ""}
              >
                <option value="">Select T-shirt Size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="XXXL">XXXL</option>
              </select>
              {errors.tshirtSize && (
                <span className="error-message">{errors.tshirtSize}</span>
              )}
            </div>
            <div
              style={{
                flex: 1,
                minWidth: 220,
                maxWidth: 400,
                textAlign: "center",
              }}
            >
              <img
                src="/tshirt.jpeg"
                alt="T-shirt Size Chart"
                style={{
                  width: "100%",
                  maxWidth: 380,
                  borderRadius: 12,
                  boxShadow: "0 2px 12px #0038b822",
                }}
              />
              <div
                style={{ fontSize: "0.95em", color: "#b8eaff", marginTop: 8 }}
              >
                T-shirt size chart for reference
              </div>
            </div>
          </div>
        </div>

        {/* Terms & Conditions Section */}
        <div className="form-section">
          <h3>Terms & Conditions</h3>

          <div className="form-group checkbox-group-modern">
            <label className="checkbox-label modern">
              <input
                type="checkbox"
                name="privacy"
                checked={formData.privacy === "I Agree"}
                onChange={handleInputChange}
              />
              <span>
                Acceptance of IEEE policies is required to register for this
                event. By submitting your registration details, you acknowledge
                that you have read and are in agreement with the{" "}
                <a
                  href="https://www.ieee.org/security-privacy.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IEEE privacy policy
                </a>{" "}
                and the{" "}
                <a
                  href="https://drive.google.com/drive/folders/1GODeLPMFKG9E5JIhS5HPySmMg-D4FrnD?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  terms and conditions
                </a>{" "}
                of the event .
              </span>
              {/* <span style={{ color: "#ef4444", marginLeft: 4 }}>*</span> */}
            </label>
            {errors.privacy && (
              <span className="error-message">{errors.privacy}</span>
            )}
          </div>

          <div className="form-group checkbox-group-modern">
            <label className="checkbox-label modern">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent === "I Agree"}
                onChange={handleInputChange}
              />
              I give my consent for IEEE SLSYW Congress 2026 to share my
              information with partners.
            </label>
            {errors.consent && (
              <span className="error-message">{errors.consent}</span>
            )}
          </div>
        </div>

        {/* Registration Notice */}
        <div className="form-section">
          <div className="notice-box">
            <div className="notice-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <div className="notice-content">
              <h4>Important Notice</h4>
              <p>
                After registration, if you have been selected, you will receive
                a <span className="highlight-text">confirmation email</span>.
                <br />
                The foreign delegate fee is{" "}
                <span className="highlight-text">USD 150</span>, which will be
                collected on <span className="highlight-text">Day 01</span>,
                before the event starts.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-buttons">
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? "Submitting..." : "Register Now"}
          </button>
          <button
            type="button"
            className="back-button"
            onClick={() => {
              setInternationalStepComplete(false);
              setFormData((f) => ({
                ...f,
                isSriLankanCitizen: "",
                region: "",
                organizationalUnit: "",
              }));
            }}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default SimpleRegisterForm;
