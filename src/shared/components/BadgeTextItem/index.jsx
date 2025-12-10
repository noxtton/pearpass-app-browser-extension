import React from 'react'

/**
 * @param {{
 *  count: number,
 *  word: string,
 *  isNumberVisible?: boolean
 * }} props
 */

export const BadgeTextItem = ({ count, word, isNumberVisible = true }) => (
  <div
    data-testid="badge-container"
    className="bg-grey500-mode1 flex w-[105px] flex-row items-center justify-center gap-[5px] rounded-[10px] px-2.5 py-3 text-[12px]"
  >
    {isNumberVisible ? (
      <span
        data-testid="badge-count"
        className="text-grey100-mode1 font-normal"
      >
        #{count}
      </span>
    ) : null}
    <span
      data-testid="badge-text"
      className="text-grey100-mode1 max-w-[70%] overflow-hidden font-medium text-ellipsis whitespace-nowrap"
    >
      {word}
    </span>
  </div>
)
