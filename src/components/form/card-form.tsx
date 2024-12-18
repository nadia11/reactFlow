import { useNodeDataChange } from '@/hooks/useUpdateNode';
import { useNodeStore } from '@/store/node-data';
import { useFieldArray, useForm } from 'react-hook-form';
import { Select } from 'flowbite-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import React, { useEffect } from 'react';
import { Textarea } from '../ui/textarea';
import ImageUpload from './image-upload';
import { Icons } from '../ui/Icons';

const CardForm = () => {
  const { updateNodeData } = useNodeDataChange();
  enum buttonType {
    ACTION = 'action',
    URL = 'url',
  }
  const cardInformation = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    buttons: z
      .array(
        z.object({
          name: z.string(),
          type: z.enum([buttonType.ACTION, buttonType.URL]),
          link: z.string(),
        })
      )
      .optional(),
  });

  const cardsSchema = z.object({
    cards: z.array(cardInformation),
  });
  const { state, dispatch } = useNodeStore();
  const defaultValues = {
    cards: state.selectedNode?.data.card_data?.cards,
  };

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(cardsSchema),
    defaultValues,
  });

  const { control, setValue, watch } = methods;

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'cards',
  });

  useEffect(() => {
    setValue('cards', []);
    if (state.selectedNode?.data?.card_data) {
      setValue('cards', state.selectedNode?.data?.card_data.cards);
    }
  }, [setValue, state.selectedNode?.data]);

  const onSubmit = async (data: any) => {
    console.log({ data });
    updateNodeData({
      id: state?.selectedNode?.id as string,
      data: {
        card_data: {
          cards: data.cards,
        },
      },
    });
    dispatch({ type: 'SET_DRAWER_OPEN', payload: false });
  };

  return (
    <div className='mt-4 h-[calc(100vh-100px)] overflow-hidden '>
      <h2 className='pl-5 text-xl text-gray-900 font-bold my-3'>
        Write a card information
      </h2>
      <Form {...methods}>
        <form
          className=' flex flex-col justify-between px-5 gap-5  relative'
          onSubmit={(...args) => void methods.handleSubmit(onSubmit)(...args)}
        >
          <div className=' h-[calc(100vh-280px)] overflow-y-auto py-2 pr-2'>
            <div className='flex flex-col gap-5 '>
              {fields.map((item: any, index) => (
                <React.Fragment key={item.id}>
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
                        name={`cards.${index}.image` as const}
                        render={() => (
                          <FormItem className='flex flex-col'>
                            <FormControl>
                              <ImageUpload
                                name={`cards.${index}.image`}
                                value={watch(`cards.${index}.image`)}
                                setValue={setValue}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className=' grid grid-cols-1 gap-5'>
                        <FormField
                          control={control}
                          name={`cards.${index}.title`}
                          render={({ field }) => (
                            <FormItem className='flex flex-col'>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder='type card title'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name={`cards.${index}.description`}
                          render={({ field }) => (
                            <FormItem className='flex flex-col'>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder='type card description'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className='flex flex-col gap-5'>
                          <h3 className='font-bold'>Buttons</h3>
                          <FormField
                            control={control}
                            name={`cards.${index}.buttons`}
                            render={() => {
                              const {
                                fields: buttonFields,
                                append: appendButton,
                                remove: removeButton,
                              } = useFieldArray({
                                control,
                                name: `cards.${index}.buttons`,
                              });

                              return (
                                <>
                                  {buttonFields.map((button, buttonIndex) => (
                                    <div
                                      className=' flex flex-col gap-2 border py-4 px-4'
                                      key={button.id}
                                    >
                                      <button
                                        type='button'
                                        onClick={() =>
                                          removeButton(buttonIndex)
                                        }
                                        className='text-red-500 hover:text-red-700 self-end'
                                      >
                                        Remove
                                      </button>

                                      <div className='flex items-center gap-2'>
                                        <FormField
                                          control={control}
                                          name={`cards.${index}.buttons.${buttonIndex}.name`}
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormControl>
                                                <Input
                                                  {...field}
                                                  placeholder='Button name'
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={control}
                                          name={`cards.${index}.buttons.${buttonIndex}.type`}
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormControl>
                                                <Select
                                                  id='type'
                                                  required
                                                  {...field}
                                                >
                                                  <option
                                                    value={buttonType.ACTION}
                                                  >
                                                    Action
                                                  </option>
                                                  <option
                                                    value={buttonType.URL}
                                                  >
                                                    URL
                                                  </option>
                                                </Select>
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />

                                        {watch(
                                          `cards.${index}.buttons.${buttonIndex}.type`
                                        ) === buttonType.URL && (
                                          <FormField
                                            control={control}
                                            name={`cards.${index}.buttons.${buttonIndex}.link`}
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormControl>
                                                  <Input
                                                    {...field}
                                                    placeholder='Button link'
                                                  />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                        )}
                                      </div>
                                    </div>
                                  ))}

                                  {buttonFields.length < 3 && (
                                    <Button
                                      type='button'
                                      onClick={() =>
                                        appendButton({
                                          name: '',
                                          type: buttonType.ACTION,
                                          link: '',
                                        })
                                      }
                                    >
                                      Add Button
                                    </Button>
                                  )}
                                </>
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}

              <div className='flex items-center gap-5'>
                <Button
                  type='button'
                  onClick={() =>
                    append({
                      image: '',
                      title: '',
                      description: '',
                      buttons: [],
                    })
                  }
                  className='w-full sm:w-auto bg-transparent text-black font-semibold hover:bg-gray-300 self-start border border-black'
                >
                  <Icons.plus size={20} className='mr-1' />
                  Add New Card
                </Button>
              </div>
            </div>
          </div>

          <Button type='submit'>Save</Button>
        </form>
      </Form>
    </div>
  );
};

export default CardForm;
