import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'

import { Slider } from '../../../components/Slider'
import { RuleSelector } from '../RuleSelector'

/**
 * @param {{
 *  onRuleChange: (optionName: string, value: any) => void
 *  rules: {
 *   specialCharacters: boolean,
 *   characters: number
 *  }
 * }} props
 */
export const PasswordGenerator = ({ onRuleChange, rules }) => {
  const ruleOptions = [
    { name: 'specialCharacters', label: t`Special character` + ' (!&*)' }
  ]

  const handleRuleChange = (newRules) => {
    onRuleChange('password', { ...rules, ...newRules })
  }

  const handleSliderValueChange = (value) => {
    onRuleChange('password', { ...rules, characters: value })
  }

  const selectableRules = { ...rules }
  delete selectableRules.characters

  return (
    <>
      <div className="border-grey300-mode1 mt-[10px] flex items-center justify-between border-t border-b py-[10px]">
        <div className="text-white-mode1 font-inter flex-1 text-sm font-normal">
          {rules.characters} <Trans>characters</Trans>
        </div>
        <div className="w-60">
          <Slider
            value={rules.characters}
            onChange={handleSliderValueChange}
            min={4}
            max={32}
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
