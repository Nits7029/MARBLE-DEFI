import { useRef, useState } from 'react'
import { styled } from 'components/theme'
import { Text } from 'components/Text'
import { TokenInfo } from 'hooks/useTokenList'
import {
  dollarValueFormatter,
  formatTokenBalance,
  convertMicroDenomToDenom,
} from 'util/conversion'

type BondingSummaryProps = {
  label: string
  tokenA: TokenInfo
  tokenB: TokenInfo
  lpTokenAmount: number
  maxLiquidity: number
  liquidityAmount: number
  onChangeLiquidity: (liquidityAmount: number) => void
}

export const BondingSummary = ({
  label,
  tokenA,
  tokenB,
  lpTokenAmount,
  maxLiquidity,
  liquidityAmount,
  onChangeLiquidity,
}: BondingSummaryProps) => {
  const [isDollarValueInputFocused, setIsDollarValueInputFocused] =
    useState(false)
  const refForInput = useRef<HTMLInputElement>()

  const formattedLiquidityAmount = String(dollarValueFormatter(liquidityAmount))

  const handleChangeDollarValue = ({ target: { value } }) => {
    const validatedValue =
      Number(value) > maxLiquidity ? maxLiquidity : dollarValueFormatter(value)
    onChangeLiquidity(Number(validatedValue))
  }

  return (
    <>
      <Text
        variant="body"
        css={{
          padding: '$8 0 $6',
          fontFamily: 'Trajan',
          textAlign: 'left',
          fontSize: '16px',
        }}
      >
        {label}
      </Text>
      <StyledDivForGrid>
        <StyledDivForColumn kind="content">
          <StyledDivForTokensGrid>
            <StyledNodeForToken
              logoURI={tokenA?.logoURI}
              name={tokenA?.name + '-' + tokenB?.name + ' LP'}
              amount={lpTokenAmount}
            />
          </StyledDivForTokensGrid>
        </StyledDivForColumn>
        <StyledDivForColumn
          kind="value"
          active={isDollarValueInputFocused}
          onClick={() => refForInput.current?.focus()}
          role="button"
        >
          <StyledTextForInputWithSymbol variant="caption">
            $
            <input
              ref={refForInput}
              placeholder="0.0"
              min="0"
              type="number"
              lang="en-US"
              value={formattedLiquidityAmount}
              style={{
                width: `${formattedLiquidityAmount.length}ch`,
              }}
              onChange={handleChangeDollarValue}
              onFocus={() => {
                setIsDollarValueInputFocused(true)
              }}
              onBlur={() => {
                setIsDollarValueInputFocused(false)
              }}
            />
          </StyledTextForInputWithSymbol>
        </StyledDivForColumn>
      </StyledDivForGrid>
    </>
  )
}

const StyledNodeForToken = ({ logoURI, name, amount }) => {
  return (
    <StyledDivForToken>
      <StyledImgForTokenLogo as={logoURI ? 'img' : 'div'} src={logoURI} />
      <Text transform="uppercase" variant="caption" wrap={false}>
        {formatTokenBalance(amount)} {name}
      </Text>
    </StyledDivForToken>
  )
}

const StyledDivForColumn = styled('div', {
  variants: {
    kind: {
      content: {},
      value: {
        borderRadius: '$1',
        transition: 'background-color .1s ease-out',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        background: 'rgb(49, 49, 56)',
        boxShadow:
          '0px 4px 40px rgb(42 47 50 / 9%), inset 0px 7px 24px rgb(109 109 120 / 20%)',
        '&:hover': {
          backgroundColor: '$colors$dark15',
        },
        '&:active': {
          backgroundColor: '$colors$dark5',
        },
      },
    },
    active: {
      false: {},
      true: {
        backgroundColor: '$colors$dark5 !important',
      },
    },
  },
})

const StyledDivForGrid = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: '$8',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  background: 'rgb(49, 49, 56)',
  boxShadow:
    '0px 4px 40px rgb(42 47 50 / 9%), inset 0px 7px 24px rgb(109 109 120 / 20%)',
  borderRadius: '20px',
  padding: '25px 30px',
  '@media (max-width: 1550px)': {
    padding: '25px 20px',
  },
})

const StyledDivForTokensGrid = styled('div', {
  display: 'flex',
  alignItems: 'center',
  rowGap: '$space$4',
  flexWrap: 'wrap',
})

const StyledDivForToken = styled('div', {
  display: 'flex',
  alignItems: 'center',
  columnGap: '$space$4',
  width: '100%',
})

const StyledImgForTokenLogo = styled('img', {
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: '#ccc',
})

const StyledTextForInputWithSymbol: any = styled(Text, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '$4 $7',
  columnGap: '$space$2',
  minWidth: '107px',
})
const BondingSummaryWrapper = styled('div', {
  background: 'rgba(5, 6, 22, 0.2)',
  boxShadow: '0px 4px 40px rgba(42, 47, 50, 0.09), inset 0px 7px 24px #6d6d78',
  borderRadius: '20px',
  padding: '25px 30px 0 30px',
  '@media (max-width: 1550px)': {
    padding: '25px 20px 0 20px',
  },
})
