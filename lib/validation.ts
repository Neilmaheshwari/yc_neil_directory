import { link } from 'fs'
import { z } from 'zod'
export const formSchema = z.object ({
    title: z.string().min(3).max(50, { message: 'Title must be between 3 and 50 characters long' }),
    description: z.string().min(20).max(500, { message: 'Description must be between 20 and 500 characters long' }),
    // link: z.string().url({ message: 'Image must be a valid URL' }).refine(async (url)=>{
    //     try {
    //         const res = await fetch(url , {method: 'HEAD'})
    //         const contentType = res.headers.get('content-type')
    //         return contentType && contentType.startsWith('image/')
    //     } catch (error) {
    //         return false
    //     }
    // }),
    link: z.string(),
    category: z.string().min(2).max(15, { message: 'Category must be between 2 and 15 characters long' }),
    pitch: z.string().min(20).max(500, { message: 'Pitch must be between 20 and 500 characters long' }),

})