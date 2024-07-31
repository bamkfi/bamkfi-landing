'use client'

import React from 'react'
import Link from 'next/link'

import { GITBOOK_URL } from '@/lib/constants'
import BamkIcon from '@/icons/bamk'
import classNames from 'classnames'
import NusdIcon from '@/icons/nusd'
import Navigation from './navigation/navigation'
import { nunito } from './ui/fonts'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { Wallets } from './wallet/Wallets'
import {MobileNavigation} from './navigation/navigation'
import { useData } from '@/app/context/datacontext'

export default function Header() {
	const data = useData()
	const isHomepage = usePathname() === '/'

	const links = React.useMemo(() => {
		return [
			{
				name: 'OTC',
				href: '/swap'
			},
			{
				name: 'Leaderboard',
				href: '/leaderboard'
			},
			{
				name: 'Calculator',
				href: '/calculator'
			},
			{
				name: 'Docs',
				href: GITBOOK_URL
			}
		]
	}, [])

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

	return (
		<header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex justify-between items-center h-20 max-w-screen-2xl container px-4">
				<div className="flex items-center">
					<Link href="/">
						<div className={classNames(nunito.className, 'flex h-8 mr-2 gap-4 items-center')}>
							<BamkIcon className="h-12 w-12 stroke-primary" />
							<div className="uppercase text-zinc-50 text-xl leading-[31px] tracking-[0.23em]">
								Bamk.fi
							</div>
						</div>
					</Link>
				</div>
				<div className="hidden sm:block px-2">
					<Navigation links={links} />
				</div>
				<div className="flex items-center gap-4">
          			{data.apy && data.apy ? (
          			  <div title="Annual Percentage Yield" className="bg-primary/5 text-base gap-2 px-4 rounded-md h-10 items-center hidden lg:flex">
          			    <div className="bg-[#F7931A] p-[0.4rem] rounded-full">
          			      <NusdIcon height={14} width={14} className="stroke-primary" />
          			    </div>
          			    <p>NUSD APY</p>
          			    <p className="text-primary font-bold">
          			      {`${(data.apy * 100).toLocaleString(undefined, { maximumFractionDigits: 1 })}%`}
          			    </p>
          			  </div>
          			) : null}
        		  	{data.tvl && data.tvl > 0 ? (
        		  	  <div title="Total Value Locked" className="bg-primary/5 text-base gap-2 px-4 rounded-md h-10 items-center hidden lg:flex">
        		  	    <p>TVL</p>
        		  	    <p className="text-primary font-bold">
        		  	      {`$${formatTVL(data.tvl)}`}
        		  	    </p>
        		  	  </div>
        		  	) : null}
        		</div>
        <div className='flex items-center gap-2'>
          {isHomepage ? (
            <div>
              <Link href="/swap">
                <Button>
                  <div className="font-semibold">Launch App</div>
                </Button>
              </Link>
            </div>
          ) : (
            <Wallets />
          )}
          <div className='sm:hidden'>
        	<MobileNavigation links={[{ name: 'Home',	href: '/' }, ...links]} />
          </div>
        </div>
      </div>
    </header>
  )
}
