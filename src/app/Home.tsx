import { keccak256, hexToNumberString } from 'web3-utils';
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
	BACKING_ACCOUNT_2
} from '@/lib/constants'
import { MagicEdenBamkData, NusdRuneData } from '@/types'
import { RuneNameHeading } from '@/components/ui/RuneNameHeading';
import UsdeIcon from '@/icons/USDe';
import NusdBackground from '@/icons/NusdBackground';
import NusdIcon from '@/icons/nusd';
import TwitterIcon from '@/icons/twitter';
import TelegramIcon from '@/icons/telegram';
import { TWITTER_URL } from '@/lib/constants';
import { TELEGRAM_URL } from '@/lib/constants';
import ExternalLink from '@/icons/ExternalLink';
import { DescriptionText } from '@/components/ui/DescriptionText';
import Timeline from '@/components/timeline/Timeline';
import Explainer from '@/components/explainer/explainer';
import Rewards from '@/components/rewards/rewards';
import FAQ from '@/components/faq/faq';

async function getData() {
	const magicEdenBamkReq = await fetch('https://api-mainnet.magiceden.dev/v2/ord/btc/runes/market/BAMKOFNAKAMOTODOLLAR/info', {
		headers: {
			Authorization: `Bearer ${process.env.MAGIC_EDEN_API_KEY}`
		},
		next: { revalidate: 600 }
	})
	if (!magicEdenBamkReq.ok) {
		console.error('Error fetching magicEdenBamkReq', magicEdenBamkReq.status, magicEdenBamkReq.statusText)
		return {}
	}
	const magicEdenBamkData: MagicEdenBamkData = (await magicEdenBamkReq.json())
	const INFURA_API_KEY = process.env.INFURA_API_KEY

	const erc20BalanceOfMethodId = keccak256('balanceOf(address)').substring(0, 10).padEnd(34, '0');
	const usdeBackingResponse = await fetch(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			jsonrpc: '2.0',
			method: 'eth_call',
			params: [
				{
					to: USDE_CONTRACT_ADDRESS_MAINNET,
					data: erc20BalanceOfMethodId + ETHENA_BACKING_ACCOUNT.substring(2)
				},
				'latest'
			],
			id: 1
		}),
		next: { revalidate: 600 }
	})
	if (!usdeBackingResponse.ok) {
		console.error('Error fetching usdeBacking', usdeBackingResponse.status, usdeBackingResponse.statusText)
	}
	const usdeBackingResponseAccount2 = await fetch(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			jsonrpc: '2.0',
			method: 'eth_call',
			params: [
				{
					to: USDE_CONTRACT_ADDRESS_MAINNET,
					data: erc20BalanceOfMethodId + BACKING_ACCOUNT_2.substring(2)
				},
				'latest'
			],
			id: 1
		}),
		next: { revalidate: 600 }
	})
	if (!usdeBackingResponseAccount2.ok) {
		console.error('Error fetching usdeBacking', usdeBackingResponseAccount2.status, usdeBackingResponseAccount2.statusText)
	}
	const usdeBalance1 = BigInt((await usdeBackingResponse.json()).result) / BigInt(10 ** 18)
	const usdeBalance2 = BigInt((await usdeBackingResponseAccount2.json()).result) / BigInt(10 ** 18)
	const usdeBalance = usdeBalance1 + usdeBalance2
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
		return {}
	}
	const usdePriceData: {
		'ethena-usde': {
			usd: number
		}
	} = await usdePrice.json()

	const usdtBackingResponse = await fetch(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			jsonrpc: '2.0',
			method: 'eth_call',
			params: [
				{
					to: USDT_CONTRACT_ADDRESS_MAINNET,
					data: erc20BalanceOfMethodId + BACKING_ACCOUNT_2.substring(2)
				},
				'latest'
			],
			id: 1
		}),
		next: { revalidate: 600 }
	})
	if (!usdtBackingResponse.ok) {
		console.error('Error fetching usdeBacking', usdeBackingResponse.status, usdeBackingResponse.statusText)
	}
	const usdtBalance = BigInt((await usdtBackingResponse.json()).result) / BigInt(10 ** 6)
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
		return {}
	}
	const usdtPriceData: {
		'tether': {
			usd: number
		}
	} = await usdtPrice.json()

	const susdeBackingResponse = await fetch(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`, {
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
	if (!susdeBackingResponse.ok) {
		console.error('Error fetching susdeBacking', susdeBackingResponse.status, susdeBackingResponse.statusText)
	}
	const susdeBalance = BigInt((await susdeBackingResponse.json()).result) / BigInt(10 ** 18)
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
		return {}
	}
	const susdePriceData: {
		'ethena-staked-usde': {
			usd: number
		}
	} = await susdePrice.json()

	let usdeUnstakingBalance = 0;
	const methodSignature = 'cooldowns(address)';
	const methodId = keccak256(methodSignature).substring(0, 10);
	const paddedAddress = ETHENA_BACKING_ACCOUNT.toLowerCase().replace('0x', '').padStart(64, '0');
	const susdeUnstakingResponse = await fetch(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			jsonrpc: '2.0',
			method: 'eth_call',
			params: [{
				to: ETHENA_SUSDE_TOKEN_CONTRACT,
				data: `${methodId}${paddedAddress}`
			}, 'latest'],
			id: 1
		}),
		next: { revalidate: 600 }
	});
	
	if (!susdeUnstakingResponse.ok) {
		console.error("Error fetching susdeUnstakingResponse", susdeUnstakingResponse.status, susdeUnstakingResponse.statusText);
		return {}
	}
	const responseJson = await susdeUnstakingResponse.json();
	const result = responseJson.result;
	if (result) {
		const cooldownEndDate = new Date(Number(hexToNumberString(result.slice(0, 66))) * 1000);
		const underlyingAmount = hexToNumberString('0x' + result.slice(66));
		usdeUnstakingBalance = Number(underlyingAmount) / 10 ** 18;
	} else {
		console.error('Error fetching cooldown amount', responseJson);
		return {}
	}

	const susdeValue = susdePriceData['ethena-staked-usde'].usd * Number(susdeBalance);
	const usdeValue = usdePriceData['ethena-usde'].usd * Number(usdeBalance);
	const usdtValue = usdtPriceData['tether'].usd * Number(usdtBalance);
	const usdeUnstakingValue = usdePriceData['ethena-usde'].usd * usdeUnstakingBalance;
	const susdeBackingUSDValue = susdeValue + usdeValue + usdeUnstakingValue + usdtValue;
	const btcPrice = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', {
		method: 'GET',
		headers: {
			'x-cg-demo-api-key': process.env.COINGECKO_API_KEY as string,
		},
		next: { revalidate: 600 }
	});
	if (!btcPrice.ok) {
		console.error("Error fetching BTC price", btcPrice.status, btcPrice.statusText)
		return {}
	}
	
	const btcPriceData: {
		bitcoin: {
		  usd: number;
		}
	 } = (await btcPrice.json());


	const nusdCirculationReq = await fetch('https://calhounjohn.com/balances/getCirculationByBlock', {
		headers: {
		  Authorization: `Bearer big-bamker-password`
		},
		next: {
		  revalidate: 600
		}
	  });
	if (!nusdCirculationReq.ok) {
		console.error("Error fetching NUSD circulation", nusdCirculationReq.status, nusdCirculationReq.statusText)
		return {};
	}
	let tvl = 0
	try {
		const nusdCirculationData = await nusdCirculationReq.json() as { circulation: number };
		if (nusdCirculationData?.circulation) {
			tvl = nusdCirculationData.circulation
		}
	} catch (err) {
		return {}
	}

	let apy = 0
	if (magicEdenBamkData && btcPriceData && nusdCirculationReq) {
		const usdPricePerBamk =
			(Number(magicEdenBamkData.floorUnitPrice.formatted) / 100_000_000) *
			btcPriceData.bitcoin.usd
		apy = (usdPricePerBamk * SEASON_1_BAMK_PER_BLOCK * 144 * 365) / tvl
	}

	return {
		nusdCirculationReq,
		magicEdenBamkData,
		susdeBackingUSDValue,
		btcPriceData,
		tvl,
		apy
	}
}

const formatTVL = (value: number): string => {
	if (value >= 1_000_000_000) {
	  return `${(value / 1_000_000_000).toFixed(1)}b`;
	} else if (value >= 100_000_000) {
	  return `${(value / 1_000_000).toFixed(1)}m`;
	} else if (value >= 1_000_000) {
	  return `${(value / 1_000_000).toFixed(2)}m`;
	}
	return value.toLocaleString();
};

export default async function Home() {
	const data = await getData()
	return (
	  <div className="relative flex flex-col">
		<div className="top-section relative flex items-center justify-center" style={{ height: 'calc(100vh - 80px)' }}>
		  <div className="max-w-screen-2xl container px-0 mx-0">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative">
			  <div className="flex flex-col gap-8">
				<div className="flex flex-col gap-0 md:ml-20 my-0 py-0">
				  <RuneNameHeading>NUSD:</RuneNameHeading>
				  <RuneNameHeading>BITCOIN'S DOLLAR</RuneNameHeading>
				  <div className="mt-8">
					<DescriptionText>The world's leading Bitcoin dollar on the</DescriptionText>
					<DescriptionText>oldest most secure blockchain</DescriptionText>
				  </div>
				   <div className="flex flex-wrap gap-3 max-w-full mx-8 xs:mx-8 sm:mx-8 sm:w-[536px] mt-8 2xl:mx-0 xl:mx-0 lg:mx-0 md:ml-0">
				 	<a href={BAMK_MARKET_URL} target="_blank" rel="noopener noreferrer" className='flex-grow'>
				 	  <Button className="w-full h-14 text-lg font-bold">GET NUSD</Button>
				 	</a>
				 	<a href={"https://example.com"} target="_blank" rel="noopener noreferrer" className='flex-grow'>
				 	  <Button className="w-full h-14 text-lg font-bold px-4" variant="hollow">
				 		LEARN HOW NUSD WORKS &nbsp;
				 		<ExternalLink />
				 	  </Button>
				 	</a>
				   </div>
				</div>
			  </div>
			  <div>
			   <div className="hidden lg:flex items-center justify-center relative top-10">
				<NusdBackground className="absolute right-0 top-0 h-auto w-80 opacity-10" />
			   </div>
			  </div>
			</div>
		  </div>
		<div className="absolute bottom-3 right-3 mx-3">
			<div className="flex gap-4">
			  <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer">
			    <Button variant="ghost" size="icon">
			      <TwitterIcon className="h-6 w-6 fill-foreground/60 hover:fill-foreground/80" />
			    </Button>
			  </a>
			  <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
			    <Button variant="ghost" size="icon">
			      <TelegramIcon className="h-6 w-6 fill-foreground/60 hover:fill-foreground/80" />
			    </Button>
			  </a>
			</div>
		</div>
		</div>
		<div>
		  <Timeline />
		</div>
		<div>
		  <Explainer />
		</div>
		<div>
    	  {data.apy && data.apy > 0.01 && (
    	    <Rewards apy={data.apy * 100} />
    	  )}
    	</div>
		<div>
		  <FAQ />
		</div>
	  </div>
	);
}