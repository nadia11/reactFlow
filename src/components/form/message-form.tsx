import { useNodeDataChange } from '@/hooks/useUpdateNode';
import { useNodeStore } from '@/store/node-data';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Icons } from '../ui/Icons';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { MessageType } from '@/types';

import React, { useEffect } from 'react';
import ImageUpload from './image-upload';

const MessageForm = () => {
  const { updateNodeData } = useNodeDataChange();
  const messageData = z.object({
    type: z.enum(['text', 'image']),
    message: z.any(),
  });
  const messageSchema = z.object({
    messages: z.array(messageData).optional(),
  });
  const { state,dispatch } = useNodeStore();
  const defaultValues = {
    messages: state.selectedNode?.data.message_data?.messages,
  };
 
  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(messageSchema),
    defaultValues,
  });

  const { control, setValue, watch, formState } = methods;

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'messages',
  
  });

  useEffect(() => {
    setValue('messages', [
      {
        type: MessageType.TEXT,
        message: '',
      }
    ]);

    if (state.selectedNode?.data.message_data?.messages) {
      setValue('messages', state.selectedNode?.data.message_data?.messages);
    }
  }, [setValue, state.selectedNode?.data]);

  const onSubmit = async (data: any) => {
    updateNodeData({
      id: state?.selectedNode?.id as string,
      data: {
        message_data: {
          ...state?.selectedNode?.data.message_data,
          messages: data.messages,
        },
      },
    });
    dispatch({ type: 'SET_DRAWER_OPEN', payload: false });
  };

  return (
    <div className='mt-4 h-[calc(100vh-100px)] overflow-hidden '>
      <h2 className='pl-5 text-xl text-gray-900 font-bold my-3'>
        Write a message
      </h2>
      <Form {...methods}>
        <form
          className=' flex flex-col justify-between px-5 gap-5  relative'
          onSubmit={(...args) => void methods.handleSubmit(onSubmit)(...args)}
        >
          <div className='h-[calc(100vh-280px)] overflow-y-auto py-2 pr-2'>
            <div className='flex flex-col justify-between h-full'>
              <div className='flex flex-col gap-5 '>
                {fields.map((item: any, index) => (
                  <div
                    className='first:pt-0 border px-3 py-3 rounded-lg'
                    key={item.id}
                  >
                    <div className='flex justify-end mb-5'>
                      <button
                        onClick={() => {
                          remove(index);
                        }}
                        type='button'
                        className='text-sm text-black hover:bg-gray-200 p-1 rounded-md transition-all duration-500 focus:outline-none sm:mt-4 sm:col-span-1 self-end'
                      >
                        <Icons.trash size={20} />
                        <span className='sr-only'>remove</span>
                      </button>
                    </div>
                    <div className='grid grid-cols-1 gap-5'>
                      <FormField
                        control={control}
                        name={`messages.${index}.message` as const}
                        render={({ field }) => (
                          <FormItem className='flex flex-col'>
                            <FormControl>
                              {watch(`messages.${index}.type`) ===
                              MessageType.TEXT ? (
                                <Textarea
                                  {...field}
                                  placeholder='Write a message'
                                  className='w-full'
                                />
                              ) : (
                                <React.Fragment>
                                  <ImageUpload
                                    name={`messages.${index}.message`}
                                    value={watch(`messages.${index}.message`)}
                                    setValue={setValue}
                                  />
                                </React.Fragment>
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}

                <div className='flex items-center gap-5'>
                  <Button
                    type='button'
                    onClick={() =>
                      append({
                        message: '',
                        type: MessageType.TEXT,
                      })
                    }
                    className='w-full sm:w-auto bg-transparent text-black font-semibold hover:bg-gray-300 self-start border border-black'
                  >
                    <Icons.plus size={20} className='mr-1' />
                    Add Message
                  </Button>
                  <Button
                    type='button'
                    onClick={() =>
                      append({
                        message: '',
                        type: MessageType.IMAGE,
                      })
                    }
                    className='w-full sm:w-auto bg-transparent text-black font-semibold hover:bg-gray-300 self-start border border-black'
                  >
                    <Icons.plus size={20} className='mr-1' />
                    Add Media
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Button type='submit'>Save</Button>
        </form>
      </Form>
    </div>
  );
};

export default MessageForm;
