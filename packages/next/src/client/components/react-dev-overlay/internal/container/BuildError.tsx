import * as React from 'react'
import type { VersionInfo } from '../../../../../server/dev/parse-version-info'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
} from '../components/Dialog'
import { Overlay } from '../components/Overlay'
import { Terminal } from '../components/Terminal'
import { VersionStalenessInfo } from '../components/VersionStalenessInfo'
import { noop as css } from '../helpers/noop-template'

export type BuildErrorProps = { message: string; versionInfo?: VersionInfo }

export const BuildError: React.FC<BuildErrorProps> = function BuildError({
  message,
  versionInfo,
}) {
  const noop = React.useCallback(() => {}, [])
  return (
    <Overlay fixed>
      <Dialog
        type="error"
        aria-labelledby="nextjs__container_build_error_label"
        aria-describedby="nextjs__container_build_error_desc"
        onClose={noop}
      >
        <DialogContent>
          <DialogHeader title="Failed to compile">
            {true ? (
              <VersionStalenessInfo
                {...{
                  installed: '9.5.3',
                  staleness: 'stale-minor',
                  expected: '9.5.3',
                }}
              />
            ) : null}
          </DialogHeader>
          <DialogBody className="nextjs-container-build-error-body">
            <Terminal content={message} />
            <footer>
              <p id="nextjs__container_build_error_desc">
                <small>
                  This error occurred during the build process and can only be
                  dismissed by fixing the error.
                </small>
              </p>
            </footer>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </Overlay>
  )
}

export const styles = css`
  #nextjs__container_build_error_label {
    line-height: 1.5;
    margin: 0;
    padding: 0;
  }

  .nextjs-container-build-error-body footer {
    margin-top: var(--size-gap);
  }
  .nextjs-container-build-error-body footer p {
    margin: 0;
  }

  .nextjs-container-build-error-body small {
    color: var(--color-font);
  }
`
