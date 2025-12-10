import { useEffect } from 'react'

import { t } from '@lingui/core/macro'
import {
  RECORD_TYPES,
  useCreateRecord,
  useRecords,
  useUserData,
  useVault
} from 'pearpass-lib-vault'

import { ButtonCreate } from '../../../shared/components/ButtonCreate'
import { RECORD_ICON_BY_TYPE } from '../../../shared/constants/recordIconByType'
import { useGlobalLoading } from '../../../shared/context/LoadingContext'
import { useRouter } from '../../../shared/context/RouterContext'
import { logger } from '../../../shared/utils/logger'
import { normalizeUrl } from '../../../shared/utils/normalizeUrl'

export const CreatePasskey = () => {
  const { state: routerState, navigate } = useRouter()
  const { requestId, tabId, serializedPublicKey, requestOrigin } = routerState

  const { refetch: refetchVault } = useVault()
  const { updateRecords, data: records, refetch: refetchRecords } = useRecords()
  const { data: userData, refetch: refetchUserData } = useUserData()
  const { createRecord, isLoading: isCreateLoading } = useCreateRecord({
    onCompleted: (createdRecord) => {
      onSavePasskeyRecordCompleted(
        createdRecord.id,
        createdRecord.data.credential
      )
    }
  })

  useGlobalLoading({ isCreateLoading })

  // Refetch all data when component mounts to ensure fresh state
  useEffect(() => {
    const refreshData = async () => {
      // First check user data to get current auth state
      const currentUserData = await refetchUserData()

      // If user is logged in and vault is open, refetch vault and records
      if (currentUserData?.isLoggedIn && currentUserData?.isVaultOpen) {
        await Promise.all([refetchVault(), refetchRecords()])
      }
    }

    refreshData()
  }, []) // Run once on mount

  // If no passkey context, redirect back to main app
  useEffect(() => {
    if (!serializedPublicKey || !requestId) {
      navigate('vault', { state: { recordType: 'all' } })
    }
  }, [serializedPublicKey, requestId, navigate])

  const getNewRecordData = (credential, publicKey) => {
    if (!credential || !publicKey) return null

    return {
      type: RECORD_TYPES.LOGIN,
      folder: undefined,
      isFavorite: false,
      data: {
        title: publicKey.rp.name,
        username: publicKey.user.name,
        note: '',
        websites: [normalizeUrl(publicKey.rp.id, true)],
        customFields: [],
        credential
      }
    }
  }

  const getExistingRecord = (website, username) => {
    for (const existingRecord of records) {
      const { username: existingUsername, websites: existingWebsites } =
        existingRecord.data
      if (
        existingWebsites &&
        existingWebsites.includes(website) &&
        username === existingUsername
      ) {
        return existingRecord
      }
    }

    return null
  }

  const onSavePasskeyRecordCompleted = (recordId, credential) => {
    chrome.tabs.sendMessage(parseInt(tabId), {
      type: 'savedPasskey',
      requestId,
      recordId,
      credential
    })
    navigate('createOrEditCategory', {
      params: { recordId: recordId },
      state: {
        inPasskeyFlow: true
      }
    })
  }

  const saveRecord = async (newRecord) => {
    if (!newRecord) return

    const {
      username,
      websites,
      title: newTitle,
      credential: newCredential
    } = newRecord.data
    const website = websites[0]
    const existingRecordToUpdate = getExistingRecord(website, username)

    if (existingRecordToUpdate) {
      const updatedRecords = [
        {
          ...existingRecordToUpdate,
          data: {
            ...existingRecordToUpdate.data,
            title: newTitle,
            credential: newCredential
          }
        }
      ]
      await updateRecords(updatedRecords)
      onSavePasskeyRecordCompleted(existingRecordToUpdate.id, newCredential)
    } else {
      void createRecord(newRecord)
    }
  }

  const handleCreateHardwarePasskey = () => {
    chrome.tabs
      .sendMessage(parseInt(tabId), {
        type: 'createThirdPartyKey',
        requestId: requestId
      })
      .finally(window.close)
  }

  const handleCreateOwnPasskey = () => {
    chrome.runtime
      .sendMessage({
        type: 'readyForPasskeyPayload',
        requestOrigin,
        serializedPublicKey
      })
      .then((response) => {
        const { credential, publicKey } = response
        void saveRecord(getNewRecordData(credential, publicKey))
      })
      .catch((error) => {
        logger.error('Failed to create passkey:', error?.message || error)
        chrome.tabs.sendMessage(parseInt(tabId), {
          type: 'savedPasskey',
          requestId: requestId,
          recordId: null
        })
      })
  }

  const handleLoginToCreatePasskey = () => {
    const passkeyParams = {
      page: 'createPasskey',
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

  if (!userData?.isLoggedIn || !userData?.isVaultOpen) {
    return (
      <div className="bg-grey400-mode1 flex h-full w-full justify-center px-6 pt-7">
        <div className="flex w-[300px] flex-col gap-2.5">
          <div className="text-white-mode1 font-inter mb-2.5 flex flex-col gap-1.5 text-center text-xs font-semibold">
            <span className="font-semibold">{t`Website created a new passkey.`}</span>
            <p className="font-normal">
              {!userData?.isLoggedIn
                ? t`Please log in and select a vault to save the passkey`
                : t`Please select or unlock your vault to save the passkey`}
            </p>
          </div>
          <ButtonCreate onClick={handleLoginToCreatePasskey}>
            {!userData?.isLoggedIn
              ? t`Log in and select vault`
              : t`Select vault`}
          </ButtonCreate>
          <ButtonCreate onClick={handleCreateHardwarePasskey}>
            {t`Use your device or hardware key`}
          </ButtonCreate>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-grey400-mode1 flex h-full w-full justify-center px-6 pt-7">
      <div className="flex w-[300px] flex-col gap-2.5">
        <div className="text-white-mode1 font-inter mb-2.5 flex flex-col gap-1.5 text-center text-xs font-semibold">
          <span className="font-semibold">{t`Website created a new passkey.`}</span>
          <p className="font-normal">
            {t`Choose an option for handling the passkey`}
          </p>
        </div>
        <ButtonCreate
          key="login"
          startIcon={RECORD_ICON_BY_TYPE.login}
          onClick={handleCreateOwnPasskey}
        >
          {t`Save passkey as a new login`}
        </ButtonCreate>
        <ButtonCreate onClick={handleCreateHardwarePasskey}>
          {t`Use your device or hardware key`}
        </ButtonCreate>
      </div>
    </div>
  )
}
