import "./Input.css";
export default function Input({
  type,
  placeholder,
  value,
  label,
  name,
  onChange,
  className,
  ...props
}) {
  return (
    <div className="inpField">
      <label>
        <p>{label} </p>
      </label>
      <input
        className={className}
        {...props}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
