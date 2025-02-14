import { Text } from '../../../components/Text'
import { IconWrapper } from '../../../components/IconWrapper'
import { Chevron } from '../../../icons/Chevron'
import React from 'react'
import { formatTokenBalance } from '../../../util/conversion'
import { styled } from 'components/theme'
import { useTokenInfo } from '../../../hooks/useTokenInfo'

type SelectorToggleProps = {
  isSelecting: boolean
  onToggle: () => void
  tokenSymbol: string
  availableAmount: number
}

export const SelectorToggle = ({
  isSelecting,
  onToggle,
  availableAmount,
  tokenSymbol,
}: SelectorToggleProps) => {
  const formattedAvailableAmount = formatTokenBalance(availableAmount, {
    includeCommaSeparation: true,
  })

  const { logoURI } = useTokenInfo(tokenSymbol) || {}

  const hasTokenSelected = Boolean(tokenSymbol)

  return (
    <StyledDivForSelector
      state={isSelecting || !tokenSymbol ? 'selecting' : 'selected'}
      onClick={onToggle}
      role="button"
    >
      {(isSelecting || !hasTokenSelected) && (
        <>
          <TokenTitle>Select a token</TokenTitle>
          <IconWrapper
            size="16px"
            rotation={tokenSymbol ? '90deg' : '-90deg'}
            icon={<Chevron />}
          />
        </>
      )}
      {!isSelecting && hasTokenSelected && (
        <>
          <StyledImgForTokenLogo
            as={logoURI ? 'img' : 'div'}
            src={logoURI}
            alt={tokenSymbol}
          />
          <div>
            <TokenTitle>{tokenSymbol}</TokenTitle>
            <TokenValue>{formattedAvailableAmount} available</TokenValue>
          </div>
          <IconWrapper size="16px" rotation="-90deg" icon={<Chevron />} />
        </>
      )}
    </StyledDivForSelector>
  )
}

const StyledDivForSelector = styled('div', {
  cursor: 'pointer',
  color: '#FFFFFF',
  display: 'grid',
  alignItems: 'center',
  backgroundColor: '$colors$dark0',
  borderRadius: '$1',
  transition: 'background-color .1s ease-out',
  userSelect: 'none',
  whiteSpace: 'pre',
  '&:hover': {
    backgroundColor: '$colors$dark10',
  },
  '&:active': {
    backgroundColor: '$colors$dark5',
  },
  variants: {
    state: {
      selected: {
        padding: '$4 $6',
        columnGap: '$space$6',
        gridTemplateColumns: '$space$15 1fr $space$8',
        minWidth: 231,
      },
      selecting: {
        padding: '$6 $8',
        columnGap: '$space$4',
        gridTemplateColumns: '1fr $space$8',
      },
    },
  },
})

const StyledImgForTokenLogo = styled('img', {
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  backgroundColor: '#ccc',
})
const TokenTitle = styled('div', {
  fontSize: '24px',
  fontFamily: 'Trajan',
  '@media (max-width: 1550px)': {
    fontSize: '20px',
  },
})
const TokenValue = styled('div', {
  fontFamily: 'Trajan',
  fontSize: '12px',
  opacity: '0.5',
})
