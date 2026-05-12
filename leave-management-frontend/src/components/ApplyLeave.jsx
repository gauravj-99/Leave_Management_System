import { useState } from "react";
import API, { handleApiError } from "../services/api";

function ApplyLeave() {
  const [leave, setLeave] = useState({ fromDate: "", toDate: "", reason: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [generalError, setGeneralError] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!leave.fromDate) newErrors.fromDate = "From date is required";
    if (!leave.toDate) newErrors.toDate = "To date is required";
    if (leave.fromDate && leave.toDate && new Date(leave.toDate) < new Date(leave.fromDate)) {
      newErrors.toDate = "To date must be after from date";
    }
    if (!leave.reason || !leave.reason.trim()) newErrors.reason = "Reason is required";
    return newErrors;
  };

  const apply = async (e) => {
    e.preventDefault();
    setGeneralError("");
    setSuccessMessage("");
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await API.post("/apply_leave", leave);
      setSuccessMessage("Leave applied successfully!");
      setLeave({ fromDate: "", toDate: "", reason: "" });
      setErrors({});
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setGeneralError(handleApiError(err));
      setErrors({});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>Apply for Leave</h3>
      {generalError && <div className="error-message">{generalError}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={apply} className="form">
        <div className="form-row">
          <div className="form-group">
            <label>From Date</label>
            <input
              type="date"
              value={leave.fromDate}
              onChange={(e) => {
                setLeave({ ...leave, fromDate: e.target.value });
                if (errors.fromDate) setErrors({ ...errors, fromDate: "" });
              }}
              className={errors.fromDate ? "input-error" : ""}
            />
            {errors.fromDate && <span className="field-error">{errors.fromDate}</span>}
          </div>

          <div className="form-group">
            <label>To Date</label>
            <input
              type="date"
              value={leave.toDate}
              onChange={(e) => {
                setLeave({ ...leave, toDate: e.target.value });
                if (errors.toDate) setErrors({ ...errors, toDate: "" });
              }}
              className={errors.toDate ? "input-error" : ""}
            />
            {errors.toDate && <span className="field-error">{errors.toDate}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Reason for Leave</label>
          <textarea
            placeholder="Please provide your reason for leave"
            value={leave.reason}
            onChange={(e) => {
              setLeave({ ...leave, reason: e.target.value });
              if (errors.reason) setErrors({ ...errors, reason: "" });
            }}
            className={errors.reason ? "input-error" : ""}
            rows="3"
          ></textarea>
          {errors.reason && <span className="field-error">{errors.reason}</span>}
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Submitting..." : "Submit Leave Request"}
        </button>
      </form>
    </div>
  );
}

export default ApplyLeave;