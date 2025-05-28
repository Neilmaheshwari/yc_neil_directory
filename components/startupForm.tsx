'use client';
import React, { useState , useActionState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';

import z from 'zod';
import { stat } from 'fs';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { createPitch } from '@/lib/actions';
const StartupForm = () => {
    const [errors , SetErrors] = useState<Record<string,string>>({});

    const {toast} = useToast();

    const [pitch, setPitch] = React.useState('');

    const router = useRouter();

    const handleFormSubmit = async (prevState:any,formData:FormData)=>{
        try {
            const formValues = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                link: formData.get('link') as string,
                category: formData.get('category') as string,
                pitch
            }

            await formSchema.parseAsync(formValues)

            
            const res = await createPitch(prevState , formData,pitch);
            
            if(res.status == 'SUCCESS'){
                toast({
                    title:'SUCCESS',
                    description:'Your startup pitch has been submitted successfully',
                    variant:'default',
                })
                router.push(`/startup/${res._id}`);
            }
            return res;
        } catch (error) {
            if(error instanceof z.ZodError){
                const fieldErros = error.flatten().fieldErrors;
                SetErrors(fieldErros as unknown as Record<string,string>);
                toast({
                    title:'ERROR',
                    description:'Please check the form inputs and try again',
                    variant:'destructive',
                })
                return {...prevState , 
                    error: 'Validation Failed',
                    status: 'ERROR'
            }

            }

            toast({
                    title:'ERROR',
                    description:'An unexpected Error occured',
                    variant:'destructive',
                })

        return {...prevState ,
                error: 'An unexpected Error occured ',
                status: 'ERROR'
            }
        }

    }
    const [state,formAction,isPending] = useActionState(handleFormSubmit , {
        error:"",
        status:"INITIAL"
    });

    return (
        <form action = {formAction}  className='startup-form'>
            <div>
                <label htmlFor="title" className='startup-form_label'>Title</label>
                    <Input 
                        id='title' 
                        name="title" 
                        className='startup-form_input' 
                        placeholder='Startup title' 
                        required
                    />
                    {errors.title && (
                        <p className='startup-form_error'>{errors.title}</p>)}   

            </div>
            <div>
                <label htmlFor="description" className='startup-form_label'>Description</label>
                    <Textarea 
                        id='description' 
                        name="description" 
                        className='startup-form_textarea' 
                        placeholder='Startup description' 
                        required
                    />

                    {errors.description && (
                        <p className='startup-form_error'>{errors.description}</p>)}   

            </div>
            <div>
                <label htmlFor="category" className='startup-form_label'>Category</label>
                    <Input 
                        id='category' 
                        name="category" 
                        className='startup-form_input' 
                        placeholder='Startup category (eg. AI,Food,Health...)'    
                        required
                    />

                    {errors.category && (
                        <p className='startup-form_error'>{errors.category}</p>)}   

            </div>
            <div>
                <label htmlFor="link" className='startup-form_label'>Image URL</label>
                    <Input 
                        id='link' 
                        name="link" 
                        className='startup-form_input' 
                        placeholder='Startup image URL'    
                        required
                    />

                    {errors.link && (
                        <p className='startup-form_error'>{errors.link}</p>)}   

            </div>
            
            <div data-color-mode = 'light'>
                <label htmlFor="pitch" className='startup-form_label'>Pitch</label>
                    <MDEditor
                        value={pitch}
                        onChange={(value)=> setPitch(value as string)}
                        height={300}
                        preview='edit'
                        id='pitch'
                        style = {{borderRadius:'0.5rem' , overflow:'hidden'}}
                        textareaProps={{
                            placeholder: 'Breifly describe your startup idea and what makes it unique and what problem it solves',
                        }}
                        previewOptions={
                            {
                                disallowedElements:['style'],
                            }
                        }
                    />

                    {errors.pitch && (
                        <p className='startup-form_error'>{errors.pitch}</p>)}   

            </div>

            <Button 
                type='submit' 
                className='startup-form_btn text-white'
                disabled={isPending}
            >
                {isPending ? 'Submitting...' : 'Submit your startup'}
                <Send className='size-6 ml-2'/>
            </Button>
        </form>
    );
};

export default StartupForm;