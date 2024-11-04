import { keccak256, hexToNumberString } from 'web3-utils'
import { Button } from '@/components/ui/button'
import {
	BAMK_MARKET_URL,
	BAMK_PREMINED_SUPPLY,
	BAMK_TOTAL_SUPPLY,
	ETHENA_BACKING_ACCOUNT,
	ETHENA_SUSDE_TOKEN_CONTRACT,
	SEASON_1_BAMK_PER_BLOCK,
	USDT_CONTRACT_ADDRESS_MAINNET,
	USDE_CONTRACT_ADDRESS_MAINNET,
	ETHENA_BACKING_ACCOUNT_2,
	ETHENA_BACKING_ACCOUNT_3,
	ETHENA_BACKING_ACCOUNT_4,
	ETHENA_BACKING_ACCOUNT_5,
} from '@/lib/constants'
import { MagicEdenBamkData, NusdRuneData } from '@/types'
import { RuneNameHeading } from '@/components/ui/RuneNameHeading'
import UsdeIcon from '@/icons/USDe'
import NusdIcon from '@/icons/nusd'
import Header from '@/components/header'

const INFURA_API_KEY = process.env.INFURA_API_KEY
const MAGIC_EDEN_API_KEY = process.env.MAGIC_EDEN_API_KEY

type FetchedData = {
	nusdRuneData: NusdRuneData | null,
	magicEdenBamkData: MagicEdenBamkData | null,
	backingUSDValue: number | null,
	btcPriceData: {
		bitcoin: {
			usd: number
		}
	} | null,
	tvl: number | null,
	apy: number | null,
}

async function getData() {
	const data: FetchedData = {
		nusdRuneData: null,
		magicEdenBamkData: null,
		backingUSDValue: null,
		btcPriceData: null,
		tvl: null,
		apy: null,
	}

	try {
		const magicEdenBamkReq = await fetch(
			'https://api-mainnet.magiceden.dev/v2/ord/btc/runes/market/BAMKOFNAKAMOTODOLLAR/info',
			{
				headers: {
					Authorization: `Bearer ${MAGIC_EDEN_API_KEY}`
				},
				next: { revalidate: 600 }
			}
		)
		if (!magicEdenBamkReq.ok) {
			console.error(
				'Error fetching magicEdenBamkReq',
				magicEdenBamkReq.status,
				magicEdenBamkReq.statusText
			)
			return data;
		}
		data.magicEdenBamkData = await magicEdenBamkReq.json()
	} catch (err) {
		console.error('Error fetching magicEdenBamkReq', err)
		return data;
	}

	try {
		const nusdRune = await fetch(
			'https://open-api.unisat.io/v1/indexer/address/bc1pg9afu20tdkmzm40zhqugeqjzl5znfdh8ndns48t0hnmn5gu7uz5saznpu9/runes/845005%3A178/balance',
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${process.env.UNISAT_API_KEY}`
				},
				next: { revalidate: 600 }
			}
		)
		if (!nusdRune.ok) {
			console.error('Error fetching nusdRune:', nusdRune.status, nusdRune.statusText)
			return data;
		}
		data.nusdRuneData = (await nusdRune.json()).data
	} catch (err) {
		console.error('Error fetching nusdRune:', err)
		return data;
	}

	const erc20BalanceOfMethodId = keccak256('balanceOf(address)')
		.substring(0, 10)
		.padEnd(34, '0')
	function getErc20Balance(address: string, contract: string) {
		return fetch(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				jsonrpc: '2.0',
				method: 'eth_call',
				params: [
					{
						to: contract,
						data: erc20BalanceOfMethodId + address.substring(2)
					},
					'latest'
				],
				id: address,
			}),
			next: { revalidate: 600 }
		})
	}
	const usdeBackingResponse = await getErc20Balance(ETHENA_BACKING_ACCOUNT, USDE_CONTRACT_ADDRESS_MAINNET)
	if (!usdeBackingResponse.ok) {
		console.error(
			'Error fetching usdeBacking',
			usdeBackingResponse.status,
			usdeBackingResponse.statusText
		)
		return data;
	}
	const usdeBackingAmount = BigInt((await usdeBackingResponse.json()).result) / BigInt(10 ** 18)
	const usdeBacking2Response = await getErc20Balance(ETHENA_BACKING_ACCOUNT_2, USDE_CONTRACT_ADDRESS_MAINNET)
	if (!usdeBacking2Response.ok) {
		console.error(
			'Error fetching usdeBacking2',
			usdeBacking2Response.status,
			usdeBacking2Response.statusText
		)
		return data;
	}
	const usdeBacking2Amount = BigInt((await usdeBacking2Response.json()).result) / BigInt(10 ** 18)
	const usdeBacking3Response = await getErc20Balance(ETHENA_BACKING_ACCOUNT_3, USDE_CONTRACT_ADDRESS_MAINNET)
	if (!usdeBacking3Response.ok) {
		console.error(
			'Error fetching usdeBacking3',
			usdeBacking3Response.status,
			usdeBacking3Response.statusText
		)
		return data;
	}
	const usdeBacking3Amount = BigInt((await usdeBacking3Response.json()).result) / BigInt(10 ** 18)
	const usdeBacking4Response = await getErc20Balance(ETHENA_BACKING_ACCOUNT_4, USDE_CONTRACT_ADDRESS_MAINNET)
	if (!usdeBacking4Response.ok) {
		console.error(
			'Error fetching usdeBacking4',
			usdeBacking4Response.status,
			usdeBacking4Response.statusText
		)
		return data;
	}
	const usdeBacking4Amount = BigInt((await usdeBacking4Response.json()).result) / BigInt(10 ** 18)
	const usdeBacking5Response = await getErc20Balance(ETHENA_BACKING_ACCOUNT_5, USDE_CONTRACT_ADDRESS_MAINNET)
	if (!usdeBacking5Response.ok) {
		console.error(
			'Error fetching usdeBacking5',
			usdeBacking5Response.status,
			usdeBacking5Response.statusText
		)
		return data;
	}
	const usdeBacking5Amount = BigInt((await usdeBacking5Response.json()).result) / BigInt(10 ** 18)
	const usdeBalance = usdeBackingAmount + usdeBacking2Amount + usdeBacking3Amount + usdeBacking4Amount + usdeBacking5Amount
	const usdePrice = await fetch(
		'https://api.coingecko.com/api/v3/simple/price?ids=ethena-usde&vs_currencies=usd',
		{
			method: 'GET',
			headers: {
				'x-cg-demo-api-key': process.env.COINGECKO_API_KEY as string
			},
			next: { revalidate: 600 }
		}
	)
	if (!usdePrice.ok) {
		console.error('Error fetching usdePrice', usdePrice)
		return data;
	}
	const usdePriceData: {
		'ethena-usde': {
			usd: number
		}
	} = await usdePrice.json()

	const usdtBackingResponse = await getErc20Balance(ETHENA_BACKING_ACCOUNT, USDT_CONTRACT_ADDRESS_MAINNET)
	if (!usdtBackingResponse.ok) {
		console.error(
			'Error fetching usdtBacking',
			usdtBackingResponse.status,
			usdtBackingResponse.statusText
		)
		return data;
	}
	const usdtBackingAmount = BigInt((await usdtBackingResponse.json()).result) / BigInt(10 ** 6)
	const usdtBacking2Response = await getErc20Balance(ETHENA_BACKING_ACCOUNT_2, USDT_CONTRACT_ADDRESS_MAINNET)
	if (!usdtBacking2Response.ok) {
		console.error(
			'Error fetching usdtBacking2',
			usdtBacking2Response.status,
			usdtBacking2Response.statusText
		)
		return data;
	}
	const usdtBacking2Amount = BigInt((await usdtBacking2Response.json()).result) / BigInt(10 ** 6)
	const usdtBalance = usdtBackingAmount + usdtBacking2Amount 
	const usdtPrice = await fetch(
		'https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd',
		{
			method: 'GET',
			headers: {
				'x-cg-demo-api-key': process.env.COINGECKO_API_KEY as string
			},
			next: { revalidate: 3600 }
		}
	)
	if (!usdtPrice.ok) {
		console.error('Error fetching usdePrice', usdtPrice)
		return data;
	}
	const usdtPriceData: {
		tether: {
			usd: number
		}
	} = await usdtPrice.json()

	const susdeBacking1Response = await fetch(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			jsonrpc: '2.0',
			method: 'eth_call',
			params: [
				{
					to: ETHENA_SUSDE_TOKEN_CONTRACT,
					data: erc20BalanceOfMethodId + ETHENA_BACKING_ACCOUNT.substring(2)
				},
				'latest'
			],
			id: 1
		}),
		next: { revalidate: 600 }
	})
	if (!susdeBacking1Response.ok) {
		console.error(
			'Error fetching susdeBacking',
			susdeBacking1Response.status,
			susdeBacking1Response.statusText
		)
		return data;
	}
	const susde1Balance = BigInt((await susdeBacking1Response.json()).result) / BigInt(10 ** 18)
	const susdeBacking3Response = await fetch(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			jsonrpc: '2.0',
			method: 'eth_call',
			params: [
				{
					to: ETHENA_SUSDE_TOKEN_CONTRACT,
					data: erc20BalanceOfMethodId + ETHENA_BACKING_ACCOUNT_3.substring(2)
				},
				'latest'
			],
			id: 1
		}),
		next: { revalidate: 600 }
	})
	if (!susdeBacking3Response.ok) {
		console.error(
			'Error fetching susdeBacking3',
			susdeBacking3Response.status,
			susdeBacking3Response.statusText
		)
		return data;
	}
	const susde3Balance = BigInt((await susdeBacking3Response.json()).result) / BigInt(10 ** 18)

	const susdeBacking4Response = await fetch(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			jsonrpc: '2.0',
			method: 'eth_call',
			params: [
				{
					to: ETHENA_SUSDE_TOKEN_CONTRACT,
					data: erc20BalanceOfMethodId + ETHENA_BACKING_ACCOUNT_4.substring(2)
				},
				'latest'
			],
			id: 1
		}),
		next: { revalidate: 600 }
	})
	if (!susdeBacking4Response.ok) {
		console.error(
			'Error fetching susdeBacking4',
			susdeBacking4Response.status,
			susdeBacking4Response.statusText
		)
		return data;
	}
	const susde4Balance = BigInt((await susdeBacking4Response.json()).result) / BigInt(10 ** 18)

	const susdeBacking5Response = await fetch(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			jsonrpc: '2.0',
			method: 'eth_call',
			params: [
				{
					to: ETHENA_SUSDE_TOKEN_CONTRACT,
					data: erc20BalanceOfMethodId + ETHENA_BACKING_ACCOUNT_5.substring(2)
				},
				'latest'
			],
			id: 5
		}),
		next: { revalidate: 600 }
	})
	if (!susdeBacking5Response.ok) {
		console.error(
			'Error fetching susdeBacking5',
			susdeBacking5Response.status,
			susdeBacking5Response.statusText
		)
		return data;
	}
	const susde5Balance = BigInt((await susdeBacking5Response.json()).result) / BigInt(10 ** 18)

	const susdeBalance = susde1Balance + susde3Balance + susde4Balance + susde5Balance;
	const susdePrice = await fetch(
		'https://api.coingecko.com/api/v3/simple/price?ids=ethena-staked-usde&vs_currencies=usd',
		{
			method: 'GET',
			headers: {
				'x-cg-demo-api-key': process.env.COINGECKO_API_KEY as string
			},
			next: { revalidate: 600 }
		}
	)
	if (!susdePrice.ok) {
		console.error('Error fetching susdePrice', susdePrice)
		return data;
	}
	const susdePriceData: {
		'ethena-staked-usde': {
			usd: number
		}
	} = await susdePrice.json()

	let usdeUnstaking1Balance = 0
	const methodSignature = 'cooldowns(address)'
	const methodId = keccak256(methodSignature).substring(0, 10)
	const paddedAddress = ETHENA_BACKING_ACCOUNT.toLowerCase()
		.replace('0x', '')
		.padStart(64, '0')
	const susdeUnstaking1Response = await fetch(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			jsonrpc: '2.0',
			method: 'eth_call',
			params: [
				{
					to: ETHENA_SUSDE_TOKEN_CONTRACT,
					data: `${methodId}${paddedAddress}`
				},
				'latest'
			],
			id: 1
		}),
		next: { revalidate: 600 }
	})
	if (!susdeUnstaking1Response.ok) {
		console.error(
			'Error fetching susdeUnstakingResponse',
			susdeUnstaking1Response.status,
			susdeUnstaking1Response.statusText
		)
		return data;
	}
	const responseJson = await susdeUnstaking1Response.json()
	const result = responseJson.result
	if (result) {
		const cooldownEndDate = new Date(Number(hexToNumberString(result.slice(0, 66))) * 1000)
		const underlyingAmount = hexToNumberString('0x' + result.slice(66))
		usdeUnstaking1Balance = Number(underlyingAmount) / 10 ** 18
	} else {
		console.error('Error fetching cooldown amount', responseJson)
		return data;
	}

	let usdeUnstaking3Balance = 0
	const paddedAddress3 = ETHENA_BACKING_ACCOUNT_3.toLowerCase()
		.replace('0x', '')
		.padStart(64, '0')
	const susdeUnstaking3Response = await fetch(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			jsonrpc: '2.0',
			method: 'eth_call',
			params: [
				{
					to: ETHENA_SUSDE_TOKEN_CONTRACT,
					data: `${methodId}${paddedAddress3}`
				},
				'latest'
			],
			id: 3
		}),
		next: { revalidate: 600 }
	})
	if (!susdeUnstaking3Response.ok) {
		console.error(
			'Error fetching susdeUnstaking3Response',
			susdeUnstaking3Response.status,
			susdeUnstaking3Response.statusText
		)
		return data;
	}
	const response3Json = await susdeUnstaking3Response.json()
	const result3 = response3Json.result
	if (result3) {
		const cooldownEndDate = new Date(Number(hexToNumberString(result3.slice(0, 66))) * 1000)
		const underlyingAmount = hexToNumberString('0x' + result3.slice(66))
		usdeUnstaking3Balance = Number(underlyingAmount) / 10 ** 18
	} else {
		console.error('Error fetching cooldown3 amount', response3Json)
		return data;
	}

	let usdeUnstaking4Balance = 0
	const paddedAddress4 = ETHENA_BACKING_ACCOUNT_4.toLowerCase()
		.replace('0x', '')
		.padStart(64, '0')
	const susdeUnstaking4Response = await fetch(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			jsonrpc: '2.0',
			method: 'eth_call',
			params: [
				{
					to: ETHENA_SUSDE_TOKEN_CONTRACT,
					data: `${methodId}${paddedAddress4}`
				},
				'latest'
			],
			id: 4
		}),
		next: { revalidate: 600 }
	})
	if (!susdeUnstaking4Response.ok) {
		console.error(
			'Error fetching susdeUnstaking4Response',
			susdeUnstaking4Response.status,
			susdeUnstaking4Response.statusText
		)
		return data;
	}
	const response4Json = await susdeUnstaking4Response.json()
	const result4 = response4Json.result
	if (result4) {
		const cooldownEndDate = new Date(Number(hexToNumberString(result4.slice(0, 66))) * 1000)
		const underlyingAmount = hexToNumberString('0x' + result4.slice(66))
		usdeUnstaking4Balance = Number(underlyingAmount) / 10 ** 18
	} else {
		console.error('Error fetching cooldown4 amount', response4Json)
		return data;
	}

	let usdeUnstaking5Balance = 0
	const paddedAddress5 = ETHENA_BACKING_ACCOUNT_5.toLowerCase()
		.replace('0x', '')
		.padStart(64, '0')
	const susdeUnstaking5Response = await fetch(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			jsonrpc: '2.0',
			method: 'eth_call',
			params: [
				{
					to: ETHENA_SUSDE_TOKEN_CONTRACT,
					data: `${methodId}${paddedAddress5}`
				},
				'latest'
			],
			id: 5
		}),
		next: { revalidate: 600 }
	})
	if (!susdeUnstaking5Response.ok) {
		console.error(
			'Error fetching susdeUnstaking5Response',
			susdeUnstaking5Response.status,
			susdeUnstaking5Response.statusText
		)
		return data;
	}
	const response5Json = await susdeUnstaking5Response.json()
	const result5 = response5Json.result
	if (result5) {
		const cooldownEndDate = new Date(Number(hexToNumberString(result5.slice(0, 66))) * 1000)
		const underlyingAmount = hexToNumberString('0x' + result5.slice(66))
		usdeUnstaking5Balance = Number(underlyingAmount) / 10 ** 18
	} else {
		console.error('Error fetching cooldown5 amount', response5Json)
		return data;
	}

	const susdeValue = susdePriceData['ethena-staked-usde'].usd * Number(susdeBalance)
	const usdeValue = usdePriceData['ethena-usde'].usd * Number(usdeBalance)
	const usdtValue = usdtPriceData['tether'].usd * Number(usdtBalance)
	const usdeUnstakingValue = usdePriceData['ethena-usde'].usd * (usdeUnstaking1Balance + usdeUnstaking3Balance + usdeUnstaking4Balance + usdeUnstaking5Balance)
	data.backingUSDValue = susdeValue + usdeValue + usdeUnstakingValue + usdtValue
	console.group('Backing USD Value Details:');
	console.log('> susdeValue:', susdeValue.toLocaleString('en-US', { maximumFractionDigits: 0 }));
	console.log('> usdeValue:', usdeValue.toLocaleString('en-US', { maximumFractionDigits: 0 }));
	console.log('> usdeUnstakingValue:', usdeUnstakingValue.toLocaleString('en-US', { maximumFractionDigits: 0 }));
	console.log('> usdtValue:', usdtValue.toLocaleString('en-US', { maximumFractionDigits: 0 }));
	console.log('> backingUSDValue:', data.backingUSDValue.toLocaleString('en-US', { maximumFractionDigits: 0 }));
	console.groupEnd();
	const btcPrice = await fetch(
		'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
		{
			method: 'GET',
			headers: {
				'x-cg-demo-api-key': process.env.COINGECKO_API_KEY as string
			},
			next: { revalidate: 600 }
		}
	)
	if (!btcPrice.ok) {
		console.error('Error fetching BTC price', btcPrice.status, btcPrice.statusText)
		return data;
	}
	data.btcPriceData = await btcPrice.json()

	const nusdCirculationReq = await fetch('https://calhounjohn.com/balances/getCirculationByBlock', {
		headers: {
			Authorization: `Bearer big-bamker-password`
		},
		next: {
			revalidate: 600
		}
	})
	if (!nusdCirculationReq.ok) {
		console.error(
			'Error fetching NUSD circulation',
			nusdCirculationReq.status,
			nusdCirculationReq.statusText
		)
		return data;
	}
	try {
		const nusdCirculationData = (await nusdCirculationReq.json()) as { circulation: number }
		if (nusdCirculationData?.circulation) {
			data.tvl = nusdCirculationData.circulation
		}
	} catch (err) {
		return data;
	}

	if (data.magicEdenBamkData && data.btcPriceData && (data.tvl ?? data.backingUSDValue)) {
		const usdPricePerBamk =
			(Number(data.magicEdenBamkData.floorUnitPrice.formatted) / 100_000_000) * data.btcPriceData.bitcoin.usd
		data.apy = (usdPricePerBamk * SEASON_1_BAMK_PER_BLOCK * 144 * 365) / (data.tvl ?? data.backingUSDValue)
	}

	return data;
}

export default async function Home() {
	const data = await getData()
	return (
		<>
		<Header apy={data.apy} />
		<div className="flex flex-col h-full">
			<div className="flex-grow">
				<div className="max-w-screen-xl container flex flex-col gap-8 mt-8">
					<div className="flex flex-col gap-4 md:ml-12">
						<RuneNameHeading>BAMK•OF•NAKAMOTO•DOLLAR</RuneNameHeading>
						{data?.magicEdenBamkData ? (
							<div className="flex gap-2 flex-wrap -mt-2">
								<div
									title="BAMK Price"
									className="bg-primary/5 flex text-sm gap-2 px-4 rounded-md h-10 items-center w-max mt-1"
									>
									<p>
										<span className="text-primary">
											{Number(
												data.magicEdenBamkData.floorUnitPrice.formatted
											).toLocaleString(undefined, { maximumFractionDigits: 2 })}{' '}
											sats
										</span>
										{' / 🏦'}
									</p>
								</div>
								{data.btcPriceData ? (
									<>
										<div
											title="Market Cap (Circulating Supply)"
											className="bg-primary/5 flex text-sm gap-2 px-4 rounded-md h-10 items-center w-max mt-1"
											>
											<p>🏦 MCAP</p>
											<p className="text-primary font-bold">
												{`$${(
													Number(data.magicEdenBamkData.marketCap) *
													data.btcPriceData.bitcoin.usd *
													(1 - BAMK_PREMINED_SUPPLY / BAMK_TOTAL_SUPPLY)
												).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
											</p>
										</div>
										<div
											title="Fully Diluted Valuation"
											className="bg-primary/5 flex text-sm gap-2 px-4 rounded-md h-10 items-center w-max mt-1"
											>
											<p>🏦 FDV</p>
											<p className="text-primary font-bold">
												{`$${(
													Number(data.magicEdenBamkData.marketCap) * data.btcPriceData.bitcoin.usd
												).toLocaleString(undefined, {
													maximumFractionDigits: 0
												})}`}
											</p>
										</div>
									</>
								): null}
								{data.tvl && data.tvl > 0 && data.tvl < 1_000_000_000_000_000 ? (
									<div
									title="Total Value Locked"
									className="bg-primary/5 flex text-sm gap-2 px-4 rounded-md h-10 items-center w-max mt-1"
									>
										<div className="bg-[#F7931A] p-[0.4rem] rounded-full">
											<NusdIcon height={14} width={14} className="stroke-primary" />
										</div>
										<p>TVL</p>
										<p className="text-primary font-bold">${data.tvl.toLocaleString()}</p>
									</div>
								) : null}
								{data.backingUSDValue && data.backingUSDValue > 0 ? (
									<a
										href={`https://docs.bamk.fi/bamkfi/resources/reserves`}
										className="cursor-pointer"
										target="_blank"
										rel="noopener noreferrer"
										>
										<div
											title="Backed by Ethena USDe/sUSDe"
											className="bg-primary/5 flex text-sm gap-2 px-4 rounded-md h-10 items-center w-max mt-1"
											>
											<UsdeIcon height={27} width={27} className="stroke-primary" />
											<p>USDe Reserves</p>
											<p className="text-primary font-bold">
												$
												{data.backingUSDValue.toLocaleString(undefined, {
													maximumFractionDigits: 0
												})}
											</p>
										</div>
									</a>
								) : null}
								{data.apy && data.apy > 0.01 ? (
									<div
									title="Annual Percentage Yield"
									className="bg-primary/5 text-sm gap-2 px-4 rounded-md h-10 items-center flex mt-1 lg:hidden"
									>
										<div className="bg-[#F7931A] p-[0.4rem] rounded-full">
											<NusdIcon height={14} width={14} className="stroke-primary" />
										</div>
										<p>APY</p>
										<p className="text-primary font-bold">
											{`${(data.apy * 100).toLocaleString(undefined, {
												maximumFractionDigits: 1
											})}%`}
										</p>
									</div>
								) : null}
							</div>
						) : null}
						<h2 className="max-w-full w-[612px] leading-7">
							Bamk.fi is a synthetic dollar protocol built on Bitcoin L1 providing a crypto-native
							solution for money not reliant on the traditional banking system, alongside a globally
							accessible dollar-denominated savings instrument — the Bitcoin&nbsp;Bond.
						</h2>
						<div className="flex flex-wrap gap-3 max-w-full sm:w-[612px]">
							<a
								href={BAMK_MARKET_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="flex-grow"
								>
								<Button className="w-full h-14 text-lg">Buy BAMK</Button>
							</a>
							<a
								href={
									'https://app.bamk.fi/swap'
								}
								className="flex-grow"
								>
								<Button className="w-full h-14 text-lg" variant="secondary">
									Buy NUSD
								</Button>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		</>
	)
}
