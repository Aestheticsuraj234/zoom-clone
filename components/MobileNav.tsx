import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from './ui/button'
import { Label } from './ui/label'
import Image from 'next/image'
import Link from 'next/link'

const MobileNav = () => {
  return (
    <section className='w-full max-w-[264px]'>
         <Sheet>
      <SheetTrigger asChild>
        <Image
        src={"/icons/hamburger.svg"}
        width={36}
        height={36}
        alt="Hamburger icon"
        className="cursor-pointer sm:hidden"
        
        />
      </SheetTrigger>
      <SheetContent side={"left"} className='boder-none bg-dark-1' >
      <Link href="/" className="flex items-center gap-1">
        <Image
          src={"/icons/logo.svg"}
          width={32}
          height={32}
          alt="Zoom Logo"
          className="max-sm:size-10"
        />

        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Zoom
        </p>
      </Link>
      </SheetContent>
    </Sheet>
    </section>
  )
}

export default MobileNav