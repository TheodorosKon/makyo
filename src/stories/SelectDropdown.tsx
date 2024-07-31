import { useEffect, useRef, useState } from "react";
import styles from "./SelectDropdown.module.css";

export type SelectOption = {
  label: string;
  value: string | number;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  options: SelectOption[];
  showSearch?: boolean;
  id?: string;
  outlined?: boolean;
  disabled?: boolean;
  optionLabel?: string;
} & (SingleSelectProps | MultipleSelectProps);

export function SelectDropdown({
  multiple,
  value,
  onChange,
  options,
  showSearch = true,
  id,
  outlined = false,
  disabled = false,
  optionLabel = "Label",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (multiple) {
      if (!Array.isArray(value)) {
        onChange([]);
      }
    } else {
      if (Array.isArray(value)) {
        onChange(undefined);
      }
    }
  }, [multiple, value, onChange]);

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined);
  }

  function selectOption(option: SelectOption) {
    if (multiple) {
      if (Array.isArray(value) && value.includes(option)) {
        onChange(value.filter(o => o !== option));
      } else {
        onChange([...(value as SelectOption[]), option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  }

  function isOptionSelected(option: SelectOption) {
    return multiple ? Array.isArray(value) && value.includes(option) : option === value;
  }

  function handleClickOutside(event: MouseEvent) {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return;
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen(prev => !prev);
          if (isOpen && filteredOptions[highlightedIndex]) {
            selectOption(filteredOptions[highlightedIndex]);
          }
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < filteredOptions.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };
    containerRef.current?.addEventListener("keydown", handler);

    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, filteredOptions]);

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>{optionLabel}</label>
      <div
        ref={containerRef}
        id={id}
        tabIndex={0}
        className={`${styles.container} ${outlined ? styles.outlined : ''} ${disabled ? styles.disabled : ''}`}
        onClick={() => !disabled && setIsOpen(prev => !prev)}
      >
        <span className={styles.value}>
          {multiple
            ? (Array.isArray(value) ? value : []).map(v => (
                <button
                  key={v.value}
                  onClick={e => {
                    e.stopPropagation();
                    if (!disabled) selectOption(v);
                  }}
                  className={styles["option-badge"]}
                  disabled={disabled}
                >
                  {v.label}
                  <span className={styles["remove-btn"]}>&times;</span>
                </button>
              ))
            : value?.label}
        </span>
        <button
          onClick={e => {
            e.stopPropagation();
            if (!disabled) clearOptions();
          }}
          className={styles["clear-btn"]}
          disabled={disabled}
        >
          &times;
        </button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
          {showSearch && (
            <li className={styles.searchContainer}>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onClick={e => e.stopPropagation()}
                onFocus={() => setIsOpen(true)}
                className={styles.searchInput}
                disabled={disabled}
              />
            </li>
          )}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                onClick={e => {
                  e.stopPropagation();
                  if (!disabled) selectOption(option);
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
                key={option.value}
                className={`${styles.option} ${
                  isOptionSelected(option) ? styles.selected : ""
                } ${index === highlightedIndex ? styles.highlighted : ""}`}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className={styles.option}>No options found</li>
          )}
        </ul>
      </div>
    </div>
  );
}
