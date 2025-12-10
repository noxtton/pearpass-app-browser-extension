import { Trans } from '@lingui/react/macro'

import { ExtensionIdDisplay } from '../../containers/ExtensionIdDisplay'

/**
 * Reusable component for displaying desktop app setup instructions
 * @param {Object} props
 * @param {boolean} [props.showExtensionId=true] - Whether to show the extension ID display
 * @param {string} [props.className] - Additional CSS classes for the list
 */
export const DesktopSetupInstructions = ({
  showExtensionId = true,
  className = ''
}) => (
  <>
    <ol
      className={`text-white-mode1 w-full list-inside list-decimal space-y-1 text-left text-sm ${className}`}
    >
      <li>
        <Trans>Open PearPass desktop</Trans>
      </li>
      <li>
        <Trans>Go to Settings → Advanced</Trans>
      </li>
      <li>
        <Trans>Enable "Browser Extension"</Trans>
      </li>
      <li>
        <Trans>Enter this Extension ID:</Trans>
      </li>
    </ol>
    {showExtensionId && <ExtensionIdDisplay />}
  </>
)
