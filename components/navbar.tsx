import { auth , signOut ,signIn } from '@/auth';
import { readFileSync } from 'fs';
import { BadgePlus, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarImage } from './ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
const Navbar = async () => {
    const session = await auth()
    return(
        <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
            <nav className='flex justify-between items-center'>
                <Link href={'/'}>
                    <Image src="/logo.png" width={144} height={30} alt='logo' />
                </Link>
                <div className='flex items-center gap-5 text-black'>
                    {session && session?.user ?(
                        <>
                            <Link href={'/startup/create'}>
                                <span className='max-sm:hidden'>Create</span>
                                <BadgePlus className='size-6 sm:hidden ' />
                            </Link>
                            <form action= {async()=>{
                                "use server"
                                await signOut({redirectTo: "/"})
                            }}>
                                <button className='cursor-pointer' type='submit'>
                                    <span className='max-sm:hidden'>Logout</span>
                                    <LogOut className='size-6 sm:hidden text-red-500' />
                                </button>

                            </form>

                            <Link href={`/user/${session?.id?.toString()}`}>
                                <Avatar className='size-10'>
                                    <AvatarImage src={session?.user?.image || ''}  alt = {session?.user?.name || '' }/>
                                    <AvatarFallback >
                                        AV
                                    </AvatarFallback>
                                </Avatar>

                            </Link>
                        </>
                    ) :(
                        <form action ={async()=>{
                            "use server"
                            await signIn('github')
                            }}>
                            <button className='cursor-pointer' type='submit'>Login</button>
                        </form>
                    ) } 
                </div>
            </nav>
        </header>
    )
};


export default Navbar