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
import { Icons } from '../../assets/Icons';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import TextEditor from '../ui/textEditor';
import  { useEffect } from 'react';

const ButtonsForm = ({ onClose }: { onClose: () => void }) => {
  const { updateNodeData } = useNodeDataChange();
  
  // Schema
  const messageSchema = z.object({
    mediaHeader: z.boolean().default(false),
    headerText: z.string().max(60).optional(),
    bodyText: z.string().max(1024).nonempty(),
    footerText: z.string().max(60).optional(),
    buttons: z
      .array(
        z.object({
          button: z.string().max(20).nonempty(),
          type: z.string(),
        })
      )
      .optional(),
  });

  const { state, dispatch } = useNodeStore();
  const defaultValues = {
    mediaHeader: state.selectedNode?.data.buttons_data?.mediaHeader || false,
    headerText: state.selectedNode?.data.buttons_data?.headerText || '',
    bodyText: state.selectedNode?.data.buttons_data?.bodyText || '',
    footerText: state.selectedNode?.data.buttons_data?.footerText || '',
    buttons: state.selectedNode?.data.buttons_data?.buttons || [
      { button: 'Answer 1', type: 'button' },
    ],
  };

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(messageSchema),
    defaultValues,
  });

  const { control, setValue, watch } = methods;

  const { fields: buttonFields, append: appendButton, remove: removeButton } =
    useFieldArray({
      control: control,
      name: 'buttons',
    });

  useEffect(() => {
    if (state.selectedNode?.data.buttons_data) {
      setValue('mediaHeader', state.selectedNode?.data.buttons_data.mediaHeader||false);
      setValue('headerText', state.selectedNode?.data.buttons_data.headerText || "");
      setValue('bodyText', state.selectedNode?.data.buttons_data.bodyText || "");
      setValue('footerText', state.selectedNode?.data.buttons_data.footerText || "");
      setValue('buttons', state.selectedNode?.data.buttons_data.buttons || []);
    }
  }, [setValue, state.selectedNode?.data]);

  const onSubmit = async (data: any) => {
    updateNodeData({
      id: state?.selectedNode?.id as string,
      data: {
        buttons_data: {
          ...state?.selectedNode?.data.buttons_data,
          ...data,
        },
      },
    });
    dispatch({ type: 'SET_DRAWER_OPEN', payload: false });
    onClose();
  };

  return (
    <div className="mt-4 h-[calc(100vh-100px)] overflow-hidden">
      <h2 className="pl-5 text-xl text-gray-900 font-bold my-3">
        Set Buttons
      </h2>
      <Form {...methods}>
        <form
          className="flex flex-col px-5 gap-5 relative"
          onSubmit={(...args) => void methods.handleSubmit(onSubmit)(...args)}
        >
          <div className="h-[calc(100vh-280px)] overflow-y-auto py-2 pr-2">
            <div className="flex flex-col gap-7">
              {/* Media Header */}
              <div className="flex items-center gap-2">
                <label className="text-gray-900">Media Header</label>
                <FormField
                  control={control}
                  name="mediaHeader"
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      className="toggle-checkbox"
                      checked={field.value === true || field.value === 'true'} // Handle string 'true'
                      onChange={(e) => field.onChange(e.target.checked)} // Pass boolean value
                    />
                  )}
                />
              </div>

              {/* Header Text */}
              <FormField
                control={control}
                name="headerText"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <label className="text-gray-900">Header Text</label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Input value"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Body Text */}
              <FormField
                control={control}
                name="bodyText"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <label className="text-gray-900">Body Text</label>
                    <FormControl>
                      <TextEditor
                        value={field.value}
                        onChange={(val: string) => field.onChange(val)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Footer Text */}
              <FormField
                control={control}
                name="footerText"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <label className="text-gray-900">Footer Text</label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Input value"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <div className="flex flex-col gap-1 bg-gray-100 px-4 py-4 rounded-md w-full">
                <label className="text-gray-900">Buttons</label>
                {buttonFields.map((item: any, index) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <FormField
                      control={control}
                      name={`buttons.${index}.button` as const}
                      render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Input value"
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => removeButton(index)}
                      className="text-red-500"
                    >
                      <Icons.trash size={20} />
                    </button>
                  </div>
                ))}

                <Button
                  type="button"
                  onClick={() =>
                    appendButton({
                      button: '',
                      type: 'button',
                    })
                  }
                  className="mt-3 bg-transparent text-black font-semibold hover:bg-gray-300 border border-black"
                >
                  <Icons.plus size={20} className="mr-1" />
                  New Button
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-3">
            <Button
              type="button"
              onClick={() => dispatch({ type: 'SET_DRAWER_OPEN', payload: false })}
              className="bg-gray-300 text-black font-semibold"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-green-500 text-white font-semibold">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ButtonsForm;
