import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './SelectDropdown.module.css';
import { CiSearch } from 'react-icons/ci';
import { ImCancelCircle } from 'react-icons/im';
import { IoIosArrowDown } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import React from 'react';

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

export type SelectProps = {
  options: SelectOption[];
  withSearch?: boolean;
  id?: string;
  outlined?: boolean;
  disabled?: boolean;
  optionLabel?: string;
} & (SingleSelectProps | MultipleSelectProps);

export function SelectDropdown({
  id,
  multiple,
  value,
  onChange,
  options,
  withSearch = true,
  outlined = false,
  disabled = false,
  optionLabel = "Label",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  function doesMatch(label: string, term: string) {
    const words = term.toLowerCase().split(/\s+/).filter(Boolean);
    const labelText = label.toLowerCase();
    return words.every(word => labelText.includes(word));
  }

  const filteredOptions = options.filter(option =>
    doesMatch(option.label, searchTerm)
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

  function highlightText(text: string, term: string) {
    if (!term.trim()) return text;

    const words = term.split(/\s+/).filter(Boolean).map(word => 
      word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') 
    );
    const regex = new RegExp(`(${words.join('|')})`, 'gi');

    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className={styles.highlight}>{part}</span>
      ) : (
        part
      )
    );
  }

  function clearSearch() {
    setSearchTerm("");
    searchInputRef.current?.focus(); // Focus back on the input field
  }

  const dropdown = (
    <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
      {withSearch && (
        <li className={styles.searchContainer}>
          <CiSearch className={styles.searchIcon} />
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
          {searchTerm && ( // Only show the clear button if there's text in the search bar
            <button onClick={clearSearch} className={styles.clearButton}>
              <MdCancel />
            </button>
          )}
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
            {highlightText(option.label, searchTerm)}
          </li>
        ))
      ) : (
        <li className={styles.option}>No options found</li>
      )}
    </ul>
  );

  // Check if the portal-root element exists
  const portalRoot = document.querySelector('#portal-root');

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
                <div
                  key={v.value}
                  className={styles["option-badge"]}
                >
                  {v.label}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      if (!disabled) selectOption(v);
                    }}
                    className={styles["remove-btn"]}
                  >
                    <ImCancelCircle />
                  </button>
                </div>
              ))
            : value?.label}
        </span>
        <IoIosArrowDown className={styles.arrowIcon} />
        {isOpen && (portalRoot ? createPortal(dropdown, portalRoot) : dropdown)}
      </div>
    </div>
  );
}
