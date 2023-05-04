import React, { useState } from "react";
import styles from "@/styles/Components/dropdown.module.css";

export default function DropdownButton({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  function handleOptionClick(option) {
    setSelected(true);
    onSelect(option);
    setSelectedOption(option);
    setIsOpen(false);
  }

  return (
    <div className={styles.dropdown}>
      <button
        className={styles.dropdown__toggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected ? selectedOption : "Select an option"}
      </button>
      {isOpen && (
        <ul className={styles.dropdown__menu}>
          {options.map((option, index) => (
            <button
              key={index}
              className={styles.option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </ul>
      )}
    </div>
  );
}
