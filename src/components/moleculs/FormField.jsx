import React from "react";
import Select from "../atoms/Select";
import Input from "../atoms/Input";
import { IoEye, IoEyeOff } from "react-icons/io5";
import useStore from "@/stores/showStore";
import SelectOption from "../atoms/SelectOption";

const FormField = ({
  label,
  type,
  name,
  value,
  onChange,
  options,
  id,
  classNameSelect,
  classNameInput,
  classNameLabel,
}) => {
  const { show, setShow, showConfirm, setShowConfirm } = useStore();
  return (
    <div>
      <label htmlFor={id} className={`${classNameLabel}`}>
        {label}
      </label>

      {type === "select" ? (
        <SelectOption
          name={name}
          value={value}
          onChange={onChange}
          options={options} // Pastikan ini benar
          id={id}
          className={classNameSelect} // Tambahkan kelas jika perlu
        />
      ) : type === "password" ? (
        <div className="relative w-full rounded-lg border border-gray-300">
          <Input
            type={show ? "text" : "password"}
            name={name}
            value={value}
            onChange={onChange}
            id={id}
            className={classNameInput}
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setShow(!show)}
            onMouseDown={(e) => {
              e.preventDefault(); // Mencegah seleksi teks
              e.stopPropagation(); // Mencegah event bubbling
            }}
          >
            {show ? <IoEyeOff /> : <IoEye />}
          </span>
        </div>
      ) : type === "confirmPassword" ? (
        <div className="relative w-full rounded-lg border border-gray-300">
          <Input
            type={showConfirm ? "text" : "password"}
            name={name}
            value={value}
            onChange={onChange}
            id={id}
            className={classNameInput}
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer select-none"
            onClick={() => setShowConfirm(!showConfirm)}
            onMouseDown={(e) => {
              e.preventDefault(); // Mencegah seleksi teks
              e.stopPropagation(); // Mencegah event bubbling
            }}
          >
            {showConfirm ? <IoEyeOff /> : <IoEye />}
          </span>
        </div>
      ) : (
        <Input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          id={id}
          className={classNameInput}
        />
      )}
    </div>
  );
};

export default FormField;
