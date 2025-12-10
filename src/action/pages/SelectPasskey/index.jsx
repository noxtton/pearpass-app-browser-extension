import { useEffect, useMemo } from 'react'

import { t } from '@lingui/core/macro'
import { useRecords, useUserData, useVault } from 'pearpass-lib-vault'

import { ButtonCreate } from '../../../shared/components/ButtonCreate'
import { RecordItem } from '../../../shared/components/RecordItem'
import { useRouter } from '../../../shared/context/RouterContext'
import { logger } from '../../../shared/utils/logger'
import { normalizeUrl } from '../../../shared/utils/normalizeUrl'

export const SelectPasskey = () => {
  const { state: routerState, navigate } = useRouter()
  const { serializedPublicKey, requestId, requestOrigin, tabId } = routerState

  const { refetch: refetchVault } = useVault()
  const { data: records, refetch: refetchRecords } = useRecords()
  const { data: userData, refetch: refetchUserData } = useUserData()

  const filteredRecords = useMemo(() => {
    if (!serializedPublicKey) return []
    const publicKey = JSON.parse(serializedPublicKey)
    return records?.filter(
      (record) =>
        record.type === 'login' &&
        record.data.websites.includes(normalizeUrl(publicKey.rpId, true))
    )
  }, [records, serializedPublicKey])

  const handleSelectPasskey = async (record) => {
    chrome.runtime
      .sendMessage({
        type: 'getAssertionCredential',
        serializedPublicKey,
        credential: record.data.credential,
        requestOrigin
      })
      .then((response) => {
        chrome.tabs.sendMessage(parseInt(tabId), {
          type: 'gotPasskey',
          requestId,
          credential: response.assertionCredential
        })
      })
      .catch((error) => {
        logger.error(
          'Failed to get assertion credential:',
          error?.message || error
        )
        chrome.tabs.sendMessage(parseInt(tabId), {
          type: 'gotPasskey',
          requestId,
          credential: null
        })
      })
      .finally(window.close)
  }

  const handleGetHardwarePasskey = () => {
    chrome.tabs
      .sendMessage(parseInt(tabId), {
        type: 'getThirdPartyKey',
        requestId
      })
      .finally(window.close)
  }

  const handleLoginToUsePasskey = () => {
    // Preserve passkey context in router state and navigate to welcome page for authentication
    const passkeyParams = {
      page: 'getPasskey',
      serializedPublicKey,
      requestId,
      requestOrigin,
      tabId,
      inPasskeyFlow: true
    }

    const targetState = !userData?.isLoggedIn ? 'masterPassword' : 'vaults'

    navigate('welcome', {
      params: { state: targetState },
      state: passkeyParams
    })
  }

  // Refetch all data when component mounts to ensure fresh state
  useEffect(() => {
    const refreshData = async () => {
      // First check user data to get current auth state
      const currentUserData = await refetchUserData()

      // If user is logged in, refetch vault and records
      if (currentUserData?.isLoggedIn) {
        await Promise.all([refetchVault(), refetchRecords()])
      }
    }

    refreshData()
  }, [])

  // If no passkey context, redirect back to main app
  useEffect(() => {
    if (!serializedPublicKey || !requestId) {
      navigate('vault', { state: { recordType: 'all' } })
    }
  }, [serializedPublicKey, requestId, navigate])

  return (
    <div className="bg-grey400-mode1 flex h-full w-full justify-center px-6 pt-7">
      <div className="flex w-[300px] flex-col gap-2.5">
        <div className="text-white-mode1 font-inter mb-2.5 flex flex-col gap-1.5 text-center text-xs font-semibold">
          <span className="font-semibold">{t`Website is asking for a passkey.`}</span>
          <p className="font-normal">
            {userData.isLoggedIn &&
            userData.isVaultOpen &&
            filteredRecords?.length
              ? t`Select one of the stored passkeys for this website`
              : userData.isLoggedIn && userData.isVaultOpen
                ? t`No passkeys found for this website`
                : userData.isLoggedIn
                  ? t`Please select a vault to continue`
                  : t`Please log in and select a vault to continue`}
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-2 overflow-auto">
          {userData.isLoggedIn && userData.isVaultOpen ? (
            <>
              {filteredRecords?.map((record) => {
                const websiteDomain =
                  record.type === 'login' ? record?.data?.websites?.[0] : null
                return (
                  <div
                    key={record.id}
                    className="bg-grey500-mode1 cursor-pointer rounded-[10px] p-2 last-of-type:mb-2 hover:bg-[rgba(134,170,172,0.2)]"
                    onClick={() => handleSelectPasskey(record)}
                  >
                    <RecordItem
                      websiteDomain={websiteDomain}
                      title={record.data?.title}
                      isFavorite={record.isFavorite}
                      type={record.type}
                      folder={record.folder}
                    />
                  </div>
                )
              })}
              <ButtonCreate onClick={handleGetHardwarePasskey}>
                {t`Use your device or hardware key`}
              </ButtonCreate>
            </>
          ) : (
            <>
              <ButtonCreate onClick={handleLoginToUsePasskey}>
                {!userData?.isLoggedIn
                  ? t`Log in and select vault`
                  : t`Select vault`}
              </ButtonCreate>
              <ButtonCreate onClick={handleGetHardwarePasskey}>
                {t`Use your device or hardware key`}
              </ButtonCreate>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
