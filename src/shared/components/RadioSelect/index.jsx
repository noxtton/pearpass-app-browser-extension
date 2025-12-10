import React from 'react'

/**
 * @param {{
 *  title: string,
 *  options: { label: string, value: string }[],
 *  selectedOption: string,
 *  onChange: (value: string) => void
 *  optionFontWeight: string
 *  titleFontStyle: string
 *  disabled: boolean
 * }} props
 */
export const RadioSelect = ({
  title,
  options,
  selectedOption,
  onChange,
  optionFontWeight,
  titleFontStyle,
  disabled
}) => (
  <div className="flex flex-col">
    <div
      className={`text-white-mode1 mb-2 text-xs ${titleFontStyle ?? 'font-medium'}`}
    >
      {title}
    </div>

    {options.map((option, index) => (
      <div
        key={option.value}
        className={`text-white-mode1 flex cursor-pointer items-center gap-2 text-sm ${optionFontWeight ?? 'font-semibold'} ${
          index > 0 ? 'mt-1' : 'mt-2'
        }`}
        onClick={() => !disabled && onChange(option.value)}
      >
        <button
          className={`inline-flex h-[15px] w-[15px] flex-shrink-0 items-center justify-center rounded-full border-2 p-[2px] transition-opacity ${
            selectedOption === option.value
              ? 'border-primary400-mode1'
              : 'border-primary300-mode1'
          }`}
        >
          <span
            className={`bg-primary400-mode1 h-full w-full rounded-full transition-opacity duration-300 ${
              selectedOption === option.value ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </button>
        {option.label}
      </div>
    ))}
  </div>
)
