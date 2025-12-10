import { SwitchWithLabel } from '../../../components/SwitchWithLabel'

/**
 * @param {{
 *  rules: Array<{
 *   label: string,
 *   name: string
 *  }>
 *  setRules: (updatedRules: object) => void,
 *  selectedRules: object
 * }} props
 */
export const RuleSelector = ({ rules, selectedRules, setRules }) => {
  const isAllRuleSelected = Object.values(selectedRules).every(
    (value) => value === true
  )

  const handleSwitchToggle = (ruleName) => {
    const updatedRules = { ...selectedRules }

    if (ruleName === 'all') {
      Object.keys(updatedRules).forEach((rule) => {
        updatedRules[rule] = !isAllRuleSelected
      })
    } else {
      updatedRules[ruleName] = !updatedRules[ruleName]
    }

    setRules(updatedRules)
  }

  return (
    <div className="flex w-full flex-col gap-1.5">
      {rules.map((rule) => (
        <SwitchWithLabel
          key={rule.name}
          label={rule.label}
          isOn={selectedRules[rule.name] || isAllRuleSelected}
          onChange={() => handleSwitchToggle(rule.name)}
          isLabelBold
        />
      ))}
    </div>
  )
}
