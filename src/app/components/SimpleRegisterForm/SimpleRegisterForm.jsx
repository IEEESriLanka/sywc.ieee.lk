"use client";

import React, { useState, useEffect } from "react";
import "./SimpleRegisterForm.css";

  const registrationModes = [
    {
      id: "both",
      label: "Event Registration",
      description: "Register for the event and pre-order merch",
      accent: "Event + Merch",
    },
    {
      id: "merch",
      label: "Merch Purchase Only",
      description: "Order merch without event registration",
      accent: "Merch only",
    },
  ];

  const merchCatalog = [
    {
      id: "merchPackOversized",
      name: "Merch pack",
      priceLKR: 3500,
      priceUSD: 15,
      image: "/merch/merch_pack_oversized.png",
      description:
        "Includes: T-shirt x 1, Wristband x 1, Bucket Hat x 1",
      featured: true,
    },
    {
      id: "tshirt",
      name: "T-shirt",
      priceLKR: 2000,
      priceUSD: 10,
      image: "/merch/t-shirt.png",
      description: "Branded congress T-shirt.",
    },
    {
      id: "wristband",
      name: "Wristband",
      priceLKR: 250,
      priceUSD: 2,
      image: "/merch/white_wristband.png",
      description: "Clean wristband with branded artwork.",
    },
    {
      id: "bucketHat",
      name: "Bucket Hat",
      priceLKR: 1200,
      priceUSD: 5,
      image: "/merch/bucket_hat.png",
      description: "Double sided bucket hat with event branding.",
    },
  ];

  const tShirtSizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  const createEmptyMerchItems = () =>
    merchCatalog.reduce((items, product) => {
      items[product.id] = 0;
      return items;
    }, {});

  const createInitialFormData = () => ({
    registrationType: "both",
    currency: "LKR",
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
    selectedEntity: "",
    membershipNo: "",
    membershipCategory: "",
    excoEntities: [],
    tshirtSize: "",
    merchPackSize: "",
    merchItems: createEmptyMerchItems(),
    privacy: "",
    consent: "",
    paymentSlipUrl: "",
  });

  const SimpleRegisterForm = ({ formMode = "register" }) => {
    const [formData, setFormData] = useState(() => ({
      ...createInitialFormData(),
      registrationType: formMode === "merch" ? "merch" : "event",
      currency: "LKR",
    }));
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [submittedMode, setSubmittedMode] = useState("event");
    const [internationalStepComplete, setInternationalStepComplete] =
      useState(false);
    const [showSizeChart, setShowSizeChart] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [lightboxImage, setLightboxImage] = useState(null);

    useEffect(() => {
      if (lightboxImage) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [lightboxImage]);

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

    const isEventFlow = formData.registrationType !== "merch";
    const isMerchFlow = formData.registrationType !== "event";

    const getMerchTotalQuantity = () =>
      Object.values(formData.merchItems).reduce(
        (sum, quantity) => sum + Number(quantity || 0),
        0
      );

    const getMerchTotalAmount = () =>
      merchCatalog.reduce(
        (sum, product) =>
          sum + Number(formData.merchItems[product.id] || 0) * (formData.currency === "USD" ? product.priceUSD : product.priceLKR),
        0
      );

    const clearErrorFor = (fieldName) => {
      if (errors[fieldName]) {
        setErrors((prev) => ({ ...prev, [fieldName]: "" }));
      }
    };

    const handleRegistrationTypeChange = (registrationType) => {
      setErrors({});
      setInternationalStepComplete(false);
      setFormData((prev) => {
        if (registrationType === "event") {
          return {
            ...prev,
            registrationType,
            isSriLankanCitizen: "",
            region: "",
            organizationalUnit: "",
            nic: "",
            gender: "",
            branch: "",
            otherAffiliation: "",
            partOfExCo: "",
            selectedEntity: "",
            membershipNo: "",
            membershipCategory: "",
            excoEntities: [],
            tshirtSize: "",
            merchPackSize: "",
            merchItems: createEmptyMerchItems(),
            paymentSlipUrl: "",
          };
        }

        if (registrationType === "merch") {
          return {
            ...prev,
            registrationType,
            isSriLankanCitizen: "",
            region: "",
            organizationalUnit: "",
            nic: "",
            gender: "",
            branch: "",
            otherAffiliation: "",
            partOfExCo: "",
            selectedEntity: "",
            membershipNo: "",
            membershipCategory: "",
            excoEntities: [],
            tshirtSize: "",
            paymentSlipUrl: "",
          };
        }

        return { ...prev, registrationType };
      });
    };


    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        setUploadError("File size exceeds 5MB limit");
        return;
      }

      setIsUploading(true);
      setUploadError("");

      try {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "djp3p2ypt";
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "slsywc_bank_slips";
        
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", uploadPreset);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          const errMsg = errData.error?.message || "Failed to upload image. Please check your network or try again.";
          throw new Error(errMsg);
        }

        const resData = await response.json();
        setFormData((prev) => ({
          ...prev,
          paymentSlipUrl: resData.secure_url,
        }));
        setErrors((prev) => ({ ...prev, paymentSlipUrl: "" }));
      } catch (err) {
        console.error("Cloudinary upload error:", err);
        setUploadError(err.message || "Failed to upload file to Cloudinary");
      } finally {
        setIsUploading(false);
      }
    };

    const handleCurrencyChange = (newCurrency) => {
      setFormData((prev) => ({
        ...prev,
        currency: newCurrency,
      }));
    };

    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;

      if (name === "registrationType") {
        handleRegistrationTypeChange(value);
        return;
      }

      setFormData((prev) => {
        const nextValue = type === "checkbox" ? (checked ? "I Agree" : "") : value;
        const next = { ...prev, [name]: nextValue };

        if (name === "isSriLankanCitizen") {
          setInternationalStepComplete(false);
          if (value === "Yes") {
            next.region = "";
            next.organizationalUnit = "";
          }
          if (value === "No") {
            next.branch = "";
            next.otherAffiliation = "";
            next.partOfExCo = "";
            next.selectedEntity = "";
            next.excoEntities = [];
          }
        }

        if (name === "selectedEntity") {
          if (value !== "IEEE Sri Lanka Section Executive Committee") {
            next.excoEntities = [];
          }
          if (value !== "Student Branch Representatives") {
            next.branch = "";
            next.otherAffiliation = "";
          }
        }

        return next;
      });

      clearErrorFor(name);
    };

    const handleCheckboxArrayChange = (name, value, checked) => {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    };

    const updateMerchQuantity = (productId, delta) => {
      setFormData((prev) => ({
        ...prev,
        merchItems: {
          ...prev.merchItems,
          [productId]: Math.max(0, Number(prev.merchItems[productId] || 0) + delta),
        },
      }));
      clearErrorFor("merchItems");
    };

    const validateForm = () => {
      const newErrors = {};
      const hasMerchSelection = getMerchTotalQuantity() > 0;

      if (!formData.nameWithInitials.trim()) {
        newErrors.nameWithInitials = "Name with initials is required";
      }
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!formData.contactNumber.trim()) {
        newErrors.contactNumber = "Contact number is required";
      }

      if (isEventFlow) {
        if (!formData.isSriLankanCitizen) {
          newErrors.isSriLankanCitizen = "Please select a citizenship option";
        }

        if (formData.isSriLankanCitizen === "Yes") {
          if (!formData.nic.trim()) {
            newErrors.nic = "NIC number is required";
          }
          if (!formData.gender) {
            newErrors.gender = "Gender is required";
          }
          if (formData.selectedEntity === "Student Branch Representatives") {
            if (!formData.branch) {
              newErrors.branch = "Branch is required";
            }
            if (formData.branch === "23. Other" && !formData.otherAffiliation.trim()) {
              newErrors.otherAffiliation = "Please specify your affiliation";
            }
          }
          if (!formData.selectedEntity) {
            newErrors.selectedEntity = "Please select the entity you represent";
          }
          if (formData.selectedEntity === "IEEE Sri Lanka Section Executive Committee" && (!formData.excoEntities || formData.excoEntities.length === 0)) {
            newErrors.excoEntities = "Please select at least one ExCo entity";
          }
        }

        if (formData.isSriLankanCitizen === "No") {
          if (!formData.region.trim()) {
            newErrors.region = "Region is required";
          }
          if (!formData.organizationalUnit.trim()) {
            newErrors.organizationalUnit = "Organizational unit is required";
          }
        }

        if (!formData.tshirtSize) {
          newErrors.tshirtSize = "T-shirt size is required";
        }
      }

      if (formData.registrationType === "merch" && !hasMerchSelection) {
        newErrors.merchItems = "Select at least one merch item";
      }

      if (
        (formData.merchItems.tshirt > 0 || formData.merchItems.merchPackOversized > 0) &&
        !formData.merchPackSize
      ) {
        newErrors.merchPackSize = "Choose a size";
      }
      if (!formData.paymentSlipUrl) {
        newErrors.paymentSlipUrl = "Please upload your bank payment slip to complete your submission";
      }

      if (!formData.privacy) {
        newErrors.privacy = "Please agree to the privacy policy";
      }
      if (!formData.consent) {
        newErrors.consent = "Please give consent for information sharing";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      setIsSubmitting(true);

      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            const text = await response.text();
            throw new Error(`Server returned ${response.status}: ${text}`);
          }

          const result = await response.json();
          throw new Error(result.message || `Server returned ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          const finalMode = formData.registrationType === "both" && getMerchTotalQuantity() === 0
            ? "event"
            : formData.registrationType;
          setSubmittedMode(finalMode);
          setShowSuccess(true);
          setFormData({
            ...createInitialFormData(),
            registrationType: formMode === "merch" ? "merch" : "event",
            currency: "LKR",
          });
          setInternationalStepComplete(false);
        } else {
          setErrors(result.errors || {});
          throw new Error(result.message || "Submission failed");
        }
      } catch (error) {
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

    const renderModeSelector = () => (
      <div className="form-section">
        <h3>Registration Type</h3>
        <div className="form-group radio-group-modern">
          <label className="radio-group-label no-required-star">
            Choose how you want to submit this form
          </label>
          <div className="registration-mode-group">
            {registrationModes.map((mode) => (
              <label
                key={mode.id}
                className={`radio-label modern registration-mode-card ${
                  formData.registrationType === mode.id ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="registrationType"
                  value={mode.id}
                  checked={formData.registrationType === mode.id}
                  onChange={handleInputChange}
                  className="hidden-radio"
                />
                <div className="registration-mode-header">
                  <div className="custom-radio-indicator">
                    <span className="custom-radio-inner"></span>
                  </div>
                  <span className="registration-mode-badge">{mode.accent}</span>
                </div>
                <span className="registration-mode-copy">
                  <span className="registration-mode-title">{mode.label}</span>
                  <span className="registration-mode-description">
                    {mode.description}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>
        <p className="form-hint">
          Event registration and merch orders can be submitted together, or merch can be purchased on its own.
        </p>
      </div>
    );

    const renderRegistrationEntry = () => {
      if (!isEventFlow) {
        return null;
      }

      if (!formData.isSriLankanCitizen) {
        return (
          <div className="form-section">
            <h3>Registration Information</h3>
            <div className="form-group radio-group-modern">
              <label className="radio-group-label">
                Are you a Sri Lankan Citizen?
              </label>
              <div className="radio-group radio-group-row">
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
                <span className="error-message">{errors.isSriLankanCitizen}</span>
              )}
            </div>
          </div>
        );
      }

      if (formData.isSriLankanCitizen === "No" && !internationalStepComplete) {
        return (
          <div className="form-section">
            <h3>International Delegate Information</h3>
            <div className="form-group">
              <label htmlFor="region">
                What is your region?
              </label>
              <input
                type="text"
                id="region"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                className={errors.region ? "error" : ""}
              />
              {errors.region && <span className="error-message">{errors.region}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="organizationalUnit">
                What organizational unit are you representing?
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
                <span className="error-message">{errors.organizationalUnit}</span>
              )}
            </div>
            <div className="form-buttons">
              <button
                type="button"
                className="submit-button"
                onClick={() => {
                  const newErrors = {};
                  if (!formData.region.trim()) {
                    newErrors.region = "Region is required";
                  }
                  if (!formData.organizationalUnit.trim()) {
                    newErrors.organizationalUnit = "Organizational unit is required";
                  }
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
                  setFormData((current) => ({
                    ...current,
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
        );
      }

      return null;
    };

    const renderPersonalInformation = () => {
      if (isEventFlow && !formData.isSriLankanCitizen) {
        return null;
      }

      if (isEventFlow && formData.isSriLankanCitizen === "No" && !internationalStepComplete) {
        return null;
      }

      return (
        <>
          <div className="form-section">
          <h3>{isMerchFlow && !isEventFlow ? "Buyer Information" : "Personal Information"}</h3>

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
            {errors.email && <span className="error-message">{errors.email}</span>}
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

          {isEventFlow && (
            <>
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
                <div className="radio-group radio-group-row">
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

              {/* 8. IEEE Membership Number */}
              <div className="form-group">
                <label htmlFor="membershipNo" className="no-required-star">
                  8. Please provide your IEEE Membership Number.
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

              {/* 9. Membership Category */}
              <div className="form-group">
                <label htmlFor="membershipCategory" className="no-required-star">
                  9. Membership Category
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
                  <span className="error-message">
                    {errors.membershipCategory}
                  </span>
                )}
              </div>

              {formData.isSriLankanCitizen === "Yes" && (
                <>
                  <div className="form-group">
                    <label htmlFor="selectedEntity">
                      10. Select the Entity
                    </label>
                    <select
                      id="selectedEntity"
                      name="selectedEntity"
                      value={formData.selectedEntity}
                      onChange={handleInputChange}
                      className={errors.selectedEntity ? "error" : ""}
                    >
                      <option value="">Choose</option>
                      <option value="IEEE Sri Lanka Section Executive Committee">IEEE Sri Lanka Section Executive Committee</option>
                      <option value="IEEE Young Professionals Sri Lanka">IEEE Young Professionals Sri Lanka</option>
                      <option value="IEEE Women in Engineering Sri Lanka">IEEE Women in Engineering Sri Lanka</option>
                      <option value="IEEE Sri Lanka Section SIGHT">IEEE Sri Lanka Section SIGHT</option>
                      <option value="IEEE Sri Lanka Section Technical Society Chapter">IEEE Sri Lanka Section Technical Society Chapter</option>
                      <option value="SLSAC Leadership">SLSAC Leadership</option>
                      <option value="Congress OC">Congress OC</option>
                      <option value="SLSAC Coordinators">SLSAC Coordinators</option>
                      <option value="Student Branch Representatives">Student Branch Representatives</option>
                    </select>
                    {errors.selectedEntity && (
                      <span className="error-message">{errors.selectedEntity}</span>
                    )}
                  </div>

                  {formData.selectedEntity === "IEEE Sri Lanka Section Executive Committee" && (
                    <div className="form-section" style={{ marginTop: 0, paddingLeft: 0, paddingRight: 0, border: "none" }}>
                      <h3 style={{ fontSize: "1.1rem", marginBottom: 12 }}>Executive Committee Details</h3>
                      <div className="form-group checkbox-group-modern">
                        <label className="checkbox-group-label no-required-star">
                          Select the entity/entities you are currently an Executive Committee Member in
                        </label>
                        <div className="checkbox-group">
                          {excoEntities.map((entity) => (
                            <label key={entity.id} className="checkbox-label modern">
                              <input
                                type="checkbox"
                                checked={formData.excoEntities.includes(entity.id)}
                                onChange={(event) =>
                                  handleCheckboxArrayChange(
                                    "excoEntities",
                                    entity.id,
                                    event.target.checked
                                  )
                                }
                              />
                              {entity.label}
                            </label>
                          ))}
                        </div>
                        {errors.excoEntities && (
                          <span className="error-message">
                            {errors.excoEntities}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {formData.selectedEntity === "Student Branch Representatives" && (
                    <>
                      <div className="form-group">
                        <label htmlFor="branch">
                          11. IEEE Student Branch Affiliation{" "}
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
                          Please mention the student branch affiliation you are volunteering, or you have volunteered.
                        </small>
                        {errors.branch && (
                          <span className="error-message">{errors.branch}</span>
                        )}
                      </div>

                      {formData.branch === "23. Other" && (
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
                    </>
                  )}
                </>
              )}


            </>
          )}

          </div>

          {isMerchFlow && (
            <div className="form-section merch-section">
              <h3>Merchandise</h3>
              <p className="form-hint">
                Pre-order merch with or without event registration.
              </p>

              <div className="foreigner-notice-box">
                <strong>Important:</strong> If you are an international delegate/buyer, please select and complete your purchase in <strong>USD ($)</strong> currency.
              </div>

              <div className="currency-selector-container">
                <span className="currency-label">Pricing Currency:</span>
                <div className="currency-toggle">
                  <button
                    type="button"
                    className={`currency-btn ${formData.currency === "LKR" ? "active" : ""}`}
                    onClick={() => handleCurrencyChange("LKR")}
                  >
                    LKR (Rs.)
                  </button>
                  <button
                    type="button"
                    className={`currency-btn ${formData.currency === "USD" ? "active" : ""}`}
                    onClick={() => handleCurrencyChange("USD")}
                  >
                    USD ($)
                  </button>
                </div>
              </div>

              <div className="merch-featured-card">
                <div className="merch-featured-image" onClick={() => setLightboxImage({ src: "/merch/merch_pack_oversized.png", alt: "Merch pack" })}>
                  <img
                    src="/merch/merch_pack_oversized.png"
                    alt="Merch pack oversized"
                  />
                </div>
                <div className="merch-featured-content">
                  <div className="merch-badge">Pre-order</div>
                  <h4>Merch pack</h4>
                  <p>
                    Includes: T-shirt x 1, Wristband x 1, Bucket Hat x 1
                  </p>
                  <div className="merch-price">
                    {formData.currency === "USD" ? "$15" : "3500 LKR"}
                  </div>

                  <div className="form-group no-margin-bottom">
                    <label htmlFor="merchPackSize" className="no-required-star">
                      Pack Size
                    </label>
                    <div className="merch-size-options">
                      {tShirtSizes.map((size) => (
                        <label
                          key={size}
                          className={`merch-size-option ${
                            formData.merchPackSize === size ? "selected" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="merchPackSize"
                            value={size}
                            checked={formData.merchPackSize === size}
                            onChange={handleInputChange}
                          />
                          <span>{size}</span>
                        </label>
                      ))}
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <button
                        type="button"
                        onClick={() => setShowSizeChart(!showSizeChart)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#ffcb40",
                          cursor: "pointer",
                          fontSize: "0.9em",
                          textDecoration: "underline",
                          padding: 0
                        }}
                      >
                        {showSizeChart ? "Hide Size Guide" : "View T-Shirt Size Guide"}
                      </button>
                      {showSizeChart && (
                        <div style={{ marginTop: 12, textAlign: "center" }}>
                          <img
                            src="/merch/tshirt_size.jpeg"
                            alt="T-shirt Size Chart"
                            onClick={() => setLightboxImage({ src: "/merch/tshirt_size.jpeg", alt: "T-shirt Size Chart" })}
                            style={{
                              width: "100%",
                              maxWidth: 320,
                              borderRadius: 12,
                              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                              border: "1px solid rgba(255,203,64,0.3)",
                              cursor: "zoom-in"
                            }}
                          />
                        </div>
                      )}
                    </div>
                    {errors.merchPackSize && (
                      <span className="error-message">{errors.merchPackSize}</span>
                    )}
                  </div>

                  <div className="quantity-stepper">
                    <button
                      type="button"
                      className="quantity-button"
                      onClick={() => updateMerchQuantity("merchPackOversized", -1)}
                    >
                      -
                    </button>
                    <span className="quantity-value">
                      {formData.merchItems.merchPackOversized}
                    </span>
                    <button
                      type="button"
                      className="quantity-button"
                      onClick={() => updateMerchQuantity("merchPackOversized", 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="merch-grid">
                {merchCatalog
                  .filter((product) => !product.featured)
                  .map((product) => (
                    <div key={product.id} className="merch-card">
                      <div className="merch-card-image" onClick={() => setLightboxImage({ src: product.image, alt: product.name })}>
                        <img src={product.image} alt={product.name} />
                        <span className="merch-badge merch-badge-small">
                          Pre-order
                        </span>
                      </div>
                      <div className="merch-card-content">
                        <h4>{product.name}</h4>
                          <div className="merch-price">
                            {formData.currency === "USD" ? `$${product.priceUSD}` : `${product.priceLKR} LKR`}
                          </div>
                        <p>{product.description}</p>
                        <div className="quantity-stepper">
                          <button
                            type="button"
                            className="quantity-button"
                            onClick={() => updateMerchQuantity(product.id, -1)}
                          >
                            -
                          </button>
                          <span className="quantity-value">
                            {formData.merchItems[product.id]}
                          </span>
                          <button
                            type="button"
                            className="quantity-button"
                            onClick={() => updateMerchQuantity(product.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {formData.merchItems.tshirt > 0 && (
                <div className="form-group" style={{ marginTop: 24 }}>
                  <label htmlFor="merchPackSize">
                    T-Shirt Size
                  </label>
                  <div className="merch-size-options">
                    {tShirtSizes.map((size) => (
                      <label
                        key={size}
                        className={`merch-size-option ${
                          formData.merchPackSize === size ? "selected" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="merchPackSize"
                          value={size}
                          checked={formData.merchPackSize === size}
                          onChange={handleInputChange}
                        />
                        <span>{size}</span>
                      </label>
                    ))}
                  </div>
                  <small style={{ display: "block", marginBottom: 4 }}>
                    Required when ordering a T-shirt.
                  </small>
                  <div style={{ marginTop: 8, marginBottom: 12 }}>
                    <button
                      type="button"
                      onClick={() => setShowSizeChart(!showSizeChart)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ffcb40",
                        cursor: "pointer",
                        fontSize: "0.9em",
                        textDecoration: "underline",
                        padding: 0
                      }}
                    >
                      {showSizeChart ? "Hide Size Guide" : "View T-Shirt Size Guide"}
                    </button>
                    {showSizeChart && (
                      <div style={{ marginTop: 12, textAlign: "center" }}>
                        <img
                          src="/merch/tshirt_size.jpeg"
                          alt="T-shirt Size Chart"
                          style={{
                            width: "100%",
                            maxWidth: 320,
                            borderRadius: 12,
                            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                            border: "1px solid rgba(255,203,64,0.3)"
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {errors.merchPackSize && (
                    <span className="error-message">
                      {errors.merchPackSize}
                    </span>
                  )}
                </div>
              )}

              <div className="merch-summary">
                <div>
                  <span className="merch-summary-label">Selected items</span>
                  <strong>{getMerchTotalQuantity()}</strong>
                </div>
                <div>
                  <span className="merch-summary-label">Estimated total</span>
                  <strong>
                    {formData.currency === "USD" ? `$${getMerchTotalAmount()}` : `${getMerchTotalAmount()} LKR`}
                  </strong>
                </div>
              </div>
              {errors.merchItems && (
                <span className="error-message">{errors.merchItems}</span>
              )}
            </div>
          )}

          {isEventFlow && (
            <div className="form-section">
              <h3>Delegate Pack</h3>
              <div className="form-group delegate-pack-container">
                <div className="delegate-pack-select">
                  <label htmlFor="tshirtSize">
                    T-Shirt Size
                  </label>
                  <select
                    id="tshirtSize"
                    name="tshirtSize"
                    value={formData.tshirtSize}
                    onChange={handleInputChange}
                    className={errors.tshirtSize ? "error" : ""}
                  >
                    <option value="">Select T-shirt Size</option>
                    {tShirtSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  {errors.tshirtSize && (
                    <span className="error-message">{errors.tshirtSize}</span>
                  )}
                </div>
                <div className="delegate-pack-chart">
                  <img
                    src="/tshirt.jpeg"
                    alt="T-shirt Size Chart"
                    className="delegate-pack-chart-img"
                  />
                  <div className="delegate-pack-chart-caption">
                    T-shirt size chart for reference
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="form-section">
            <h3>Payment Verification</h3>
            <div className="payment-instructions" style={{
              background: "rgba(255, 203, 64, 0.05)",
              border: "1px solid rgba(255, 203, 64, 0.2)",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "24px"
            }}>
              <h4 style={{ color: "#ffcb40", marginTop: 0, marginBottom: "12px", fontSize: "1.1rem" }}>
                Bank Transfer Instructions
              </h4>
              <p style={{ margin: "0 0 16px 0", fontSize: "0.95rem", opacity: 0.9, lineHeight: 1.5 }}>
                Please make your payment to the bank account below and upload the receipt/slip to complete your registration or merchandise order.
              </p>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", fontSize: "0.9rem" }}>
                <div>
                  <strong>Account Name:</strong> A I MUNASINGHE
                </div>
                <div>
                  <strong>Bank:</strong> SAMPATH BANK PLC
                </div>
                <div>
                  <strong>Account Number:</strong> 1010 5297 6654
                </div>
                <div>
                  <strong>Branch:</strong> MATARA SUPER BRANCH
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="paymentSlip" className="required">
                Upload Bank Slip
              </label>
              
              <div style={{
                border: "2px dashed rgba(255, 255, 255, 0.15)",
                borderRadius: "12px",
                padding: "30px",
                textAlign: "center",
                background: "rgba(255, 255, 255, 0.02)",
                position: "relative",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              className="upload-dropzone"
              onClick={() => document.getElementById("paymentSlip").click()}
              >
                <input
                  type="file"
                  id="paymentSlip"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                
                {isUploading ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                    <div className="upload-spinner" style={{
                      width: "36px",
                      height: "36px",
                      border: "4px solid rgba(255, 255, 255, 0.1)",
                      borderTop: "4px solid #ffcb40",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite"
                    }}></div>
                    <span style={{ fontSize: "0.95rem", color: "#fbf5b7" }}>Uploading your receipt...</span>
                  </div>
                ) : formData.paymentSlipUrl ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={{ fontSize: "0.95rem", color: "#22c55e", fontWeight: "bold" }}>Receipt Uploaded Successfully!</span>
                    <a
                      href={formData.paymentSlipUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "0.85rem", color: "#ffcb40", textDecoration: "underline" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Uploaded Receipt
                    </a>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span style={{ fontSize: "0.95rem" }}>Drag & drop or Click to upload receipt</span>
                    <span style={{ fontSize: "0.8rem", opacity: 0.5 }}>Accepts JPEG, PNG, or PDF (Max 5MB)</span>
                  </div>
                )}
              </div>
              
              {uploadError && (
                <span className="error-message" style={{ display: "block", marginTop: "8px" }}>
                  {uploadError}
                </span>
              )}
              {errors.paymentSlipUrl && (
                <span className="error-message" style={{ display: "block", marginTop: "8px" }}>
                  {errors.paymentSlipUrl}
                </span>
              )}
            </div>
          </div>

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
                  Acceptance of IEEE policies is required to submit this form. By
                  submitting your details, you acknowledge that you have read and
                  are in agreement with the{" "}
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
                  of the congress and merch order.
                </span>
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
                I give my consent for IEEE SLSYWC Congress 2026 to share my
                information with partners.
              </label>
              {errors.consent && (
                <span className="error-message">{errors.consent}</span>
              )}
            </div>
          </div>

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
                {formMode === "merch" ? (
                  <p>
                    If you place a merch order, you will receive a confirmation email.
                  </p>
                ) : (
                  <p>
                    If you are selected after registering or placing a merch order, you will receive a confirmation email.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="form-buttons">
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting
                ? "Submitting..."
                : formData.registrationType === "merch"
                ? "Submit Order"
                : formData.registrationType === "both"
                ? (getMerchTotalQuantity() > 0 ? "Register & Order" : "Register Now")
                : "Register Now"}
            </button>
            {isEventFlow ? (
              <button
                type="button"
                className="back-button"
                onClick={() => {
                  setInternationalStepComplete(false);
                  setFormData((current) => ({
                    ...current,
                    isSriLankanCitizen: "",
                    region: "",
                    organizationalUnit: "",
                  }));
                }}
              >
                Back
              </button>
            ) : (
              <button
                type="button"
                className="back-button"
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                Back
              </button>
            )}
          </div>
        </>
      );
    };

    if (showSuccess) {
      return (
        <div className="success-message">
          <h2>
            {submittedMode === "merch"
              ? "Order Submitted Successfully!"
              : submittedMode === "both"
              ? "Registration & Order Successful!"
              : "Registration Successful!"}
          </h2>
          <p>
            {submittedMode === "merch"
              ? "Thank you for your merch order. We will contact you soon with the next steps."
              : submittedMode === "both"
              ? "Thank you for registering and pre-ordering merch for IEEE SLSYWC 2026. We will contact you soon with further details."
              : "Thank you for registering for IEEE SLSYWC 2026. We will contact you soon with further details."}
          </p>
          {submittedMode === "event" && (
            <div className="merch-motivation-box">
              <h3>Complete Your Congress Experience!</h3>
              <p>
                Pre-order the official SLSYWC 2026 merchandise pack, custom T-shirts, wristbands, and bucket hats now to commemorate your journey.
              </p>
              <a href="/merch" className="merch-preorder-button">
                <span>Pre-order Merchandise</span>
              </a>
            </div>
          )}
          <button onClick={() => window.location.reload()}>
            Submit Another Request
          </button>
        </div>
      );
    }

    return (
      <div className="simple-register-form">
        <form onSubmit={handleSubmit} className="form-container">
          <h2>
            {formMode === "merch"
              ? "IEEE SLSYWC 2026 Merchandise Order Form"
              : "IEEE SLSYWC 2026 Registration Form"}
          </h2>
          {/* Hide mode selector since it's determined by the page */}
          {/* {renderModeSelector()} */}
          {renderRegistrationEntry()}
          {renderPersonalInformation()}
        </form>

        {lightboxImage && (
          <div className="lightbox-overlay" onClick={() => setLightboxImage(null)}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button className="lightbox-close" onClick={() => setLightboxImage(null)}>
                &times;
              </button>
              <img src={lightboxImage.src} alt={lightboxImage.alt} className="lightbox-image" />
              {lightboxImage.alt && <div className="lightbox-caption">{lightboxImage.alt}</div>}
            </div>
          </div>
        )}
      </div>
    );
  };

  export default SimpleRegisterForm;
