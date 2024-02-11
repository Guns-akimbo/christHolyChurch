import "./Input.css"
export default function Input({ type, placeholder, value, label, ...props }) {
  return (
    <div className="inpField">
      <label>
        <p>{label} </p>
      </label>
      <input {...props} type={type} placeholder={placeholder} value={value} />
    </div>
  );
}
