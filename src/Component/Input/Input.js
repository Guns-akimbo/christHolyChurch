import "./Input.css";
export default function Input({
  type,
  placeholder,
  value,
  label,
  name,
  onChange,
  className,
  errors,
  register,
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
        {...(register ? register(name) : {})}
      />

      <p
        style={{
          color: "red",
          lineHeight: "0",
          fontSize: "13px",
          marginTop: "1%",
        }}
      >
        {errors[name]?.message}
      </p>
    </div>
  );
}
