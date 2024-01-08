import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TokenBalance, TokenInfo, TokenType } from '@safe-global/safe-apps-sdk'
import { formatUnits } from 'viem'

const ethToken: TokenInfo = {
  address: '0x0000000000000',
  type: TokenType.NATIVE_TOKEN,
  logoUri: '/eth.svg', // will be taken from public/ folder
  symbol: 'ETH',
  name: 'Ether',
  decimals: 18,
}

const formatTokenValue = (value: number | string, decimals: number): string => {
  return formatUnits(BigInt(value), decimals)
}

const formatCurrencyValue = (value: string, currency: string): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(parseFloat(value))
}

function BalancesTable({ balances }: { balances: TokenBalance[] }): JSX.Element {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="assets table">
        <TableHead>
          <TableRow>
            <TableCell>Asset</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Value, USD</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {balances.map((item: TokenBalance, index: number) => {
            const token = item.tokenInfo.type === TokenType.NATIVE_TOKEN ? ethToken : item.tokenInfo

            return (
              <TableRow key={`row${index}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={token.logoUri || undefined} alt={`${token.symbol} Logo`} width={25} />
                    {token.name}
                  </div>
                </TableCell>
                <TableCell>{formatTokenValue(item.balance, token.decimals)}</TableCell>
                <TableCell>{formatCurrencyValue(item.fiatBalance, 'USD')}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BalancesTable
