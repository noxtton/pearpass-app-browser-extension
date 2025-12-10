import { CommonFileIcon } from '../../shared/icons/CommonFileIcon'
import { CreditCardIcon } from '../../shared/icons/CreditCardIcon'
import { FullBodyIcon } from '../../shared/icons/FullBodyIcon'
import { KeyIcon } from '../../shared/icons/KeyIcon'
import { LockIcon } from '../../shared/icons/LockIcon'
import { PassPhraseIcon } from '../../shared/icons/PassPhraseIcon'
import { UserIcon } from '../../shared/icons/UserIcon'
import { PasswordIcon } from '../icons/PasswordIcon'
import { WifiIcon } from '../icons/WifiIcon'

export const RECORD_ICON_BY_TYPE = {
  all: KeyIcon,
  login: UserIcon,
  identity: FullBodyIcon,
  creditCard: CreditCardIcon,
  note: CommonFileIcon,
  wifiPassword: WifiIcon,
  passPhrase: PassPhraseIcon,
  custom: LockIcon,
  password: PasswordIcon
}
