import { t } from '@lingui/core/macro'

import { Slider } from '../../../components/Slider'
import { RuleSelector } from '../RuleSelector'

/**
 * @param {{
 *  onRuleChange: (optionName: string, value: any) => void
 *  rules: {
 *   capitalLetters: boolean,
 *   symbols: boolean,
 *   numbers: boolean,
 *   words: number
 *  }
 * }} props
 */
export const PassphraseGenerator = ({ onRuleChange, rules }) => {
  const ruleOptions = [
    { name: 'all', label: t`Select All` },
    { name: 'capitalLetters', label: t`Capital Letters` },
    { name: 'symbols', label: t`Symbols` },
    { name: 'numbers', label: t`Numbers` }
  ]

  const handleRuleChange = (newRules) => {
    onRuleChange('passphrase', { ...rules, ...newRules })
  }

  const handleSliderValueChange = (value) => {
    onRuleChange('passphrase', { ...rules, words: value })
  }

  const selectableRules = { ...rules }
  delete selectableRules.words

  return (
    <>
      <div className="border-grey300-mode1 mt-[10px] flex items-center justify-between border-t border-b py-[10px]">
        <div className="text-white-mode1 font-inter flex-1 text-sm font-normal">
          {rules.words} {t`words`}
        </div>

        <div className="w-60">
          <Slider
            value={rules.words}
            onChange={handleSliderValueChange}
            min={6}
            max={36}
            step={1}
          />
        </div>
      </div>

      <div className="mt-[9px] flex flex-col items-center gap-[9px]">
        <RuleSelector
          rules={ruleOptions}
          selectedRules={selectableRules}
          setRules={handleRuleChange}
        />
      </div>
    </>
  )
}
