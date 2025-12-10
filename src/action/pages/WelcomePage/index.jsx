import { CreateNewVault } from './CreateNewVault'
import { EnterMasterPassword } from './EnterMasterPassword'
import { LoadVault } from './LoadVault'
import { LockedScreen } from './LockedScreen'
import { SelectOrLoadVault } from './SelectOrLoadVault'
import { UnlockVault } from './UnlockVault'
import { WelcomePageWrapper } from '../../../shared/components/WelcomePageWrapper'
import { NAVIGATION_ROUTES } from '../../../shared/constants/navigation'
import { useRouter } from '../../../shared/context/RouterContext'

export const WelcomePage = () => {
  const { params } = useRouter()

  return <WelcomePageWrapper>{renderPage(params.state)}</WelcomePageWrapper>
}

const renderPage = (state) => {
  switch (state) {
    case NAVIGATION_ROUTES.MASTER_PASSWORD:
      return <EnterMasterPassword />
    case NAVIGATION_ROUTES.VAULTS:
      return <SelectOrLoadVault />
    case NAVIGATION_ROUTES.VAULT_PASSWORD:
      return <UnlockVault />
    case NAVIGATION_ROUTES.NEW_VAULT_CREDENTIALS:
      return <CreateNewVault />
    case NAVIGATION_ROUTES.LOAD_VAULT:
      return <LoadVault />
    case NAVIGATION_ROUTES.SCREEN_LOCKED:
      return <LockedScreen />
    default:
      return null
  }
}
