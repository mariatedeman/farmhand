import React, { useEffect } from 'react'
import { func, shape, string } from 'prop-types'
import Alert from '@mui/material/Alert/index.js'
import ReactMarkdown from 'react-markdown'
import { withSnackbar } from 'notistack'

import { NOTIFICATION_DURATION } from '../../constants.js'
import FarmhandContext from '../Farmhand/Farmhand.context.js'

export const getNotificationKey = ({
  message,
  severity,
}: farmhand.notification): string => `${severity}:${message}`

export const snackbarProviderContentCallback = (
  key: string | number,
  {
    message,
    onClick,
    onClose,
    severity,
  }: farmhand.notification & {
    onClick?: () => void
    onClose?: () => void
  }
) => (
  <Alert
    {...{
      elevation: 3,
      key,
      onClick,
      onClose,
      severity,
      style: {
        cursor: onClick ? 'pointer' : 'default',
      },
    }}
  >
    <ReactMarkdown {...{ source: message }} />
  </Alert>
)

export const NotificationSystem = ({
  closeSnackbar,
  enqueueSnackbar,
  latestNotification,
}: {
  closeSnackbar: (key: string | number) => void
  enqueueSnackbar: (
    notification: farmhand.notification & { onClose?: () => void },
    options: any
  ) => void
  latestNotification: farmhand.notification | null
}) => {
  useEffect(() => {
    if (!latestNotification) {
      return
    }

    const key = getNotificationKey(latestNotification)

    // A stable, content-derived key (rather than a fresh object identity
    // every call) is what lets preventDuplicate below actually do
    // something - it skips enqueueing when a snack with this key is
    // already shown or queued, instead of stacking a duplicate.
    enqueueSnackbar(
      {
        ...latestNotification,
        onClose: () => closeSnackbar(key),
      },
      {
        key,
        autoHideDuration: NOTIFICATION_DURATION,
        preventDuplicate: true,
      }
    )
  }, [closeSnackbar, enqueueSnackbar, latestNotification])

  return null
}

NotificationSystem.propTypes = {
  latestNotification: shape({
    message: string.isRequired,
    onClick: func,
    severity: string.isRequired,
  }),
}

export default withSnackbar(function Consumer(props: any) {
  return (
    <FarmhandContext.Consumer>
      {({ gameState, handlers }) => {
        return (
          <NotificationSystem {...{ ...gameState, ...handlers, ...props }} />
        )
      }}
    </FarmhandContext.Consumer>
  )
})
