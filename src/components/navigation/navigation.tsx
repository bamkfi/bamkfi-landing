'use client'

import { Button } from "@/components/ui/button"
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HamburgerMenuIcon, Cross2Icon } from "@radix-ui/react-icons"

export default function Navigation({ links } : { links: { name: string; href: string;}[] }) {
	return (
        <div className="inline-flex items-center gap-4 text-sm lg:gap-9 px-0">
            {links.map(l => (
                <a
				key={l.name}
				href={l.href}
				className="pb-1 transition-colors text-foreground/60 hover:text-foreground/80 "
				target={l.href.includes('bamk.fi') ? '_self' : "_blank"}
				rel="noopener noreferrer"
			>
				{l.name}
			</a>
            ))}
        </div>
	)
}

export function MobileNavigation({ links } : { links: { name: string; href: string;}[] }) {
	const [menuOpen, setMenuOpen] = useState(false);
	return (
	  <DropdownMenu onOpenChange={setMenuOpen}>
		<DropdownMenuTrigger asChild>
		  <Button variant="ghost" className="focus-visible:outline-none focus-visible:ring-transparent">
		  	{menuOpen ? <Cross2Icon height={18} width={18} /> : <HamburgerMenuIcon height={18} width={18} />}
		  </Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent className="mt-1 sm:hidden">
			<div className="w-screen h-screen p-3 mr-4">
				{links.map(l => (
					<a
						href={l.href}
						key={l.href}
						target={l.href.includes('bamk.fi') ? '_self' : "_blank"} 
						rel="noopener noreferrer"
					>
						<DropdownMenuItem className="text-md p-3 cursor-pointer">
								{l.name}
						</DropdownMenuItem>
					</a>
				))}
			</div>
		</DropdownMenuContent>
	  </DropdownMenu>
	)
}
