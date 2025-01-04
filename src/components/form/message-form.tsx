import  { useEffect } from 'react';
import { useNodeDataChange } from '@/hooks/useUpdateNode';
import { useNodeStore } from '@/store/node-data';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditorState, ContentState } from 'draft-js';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Icons } from '../../assets/Icons';
import { Button } from '../ui/button';
import TextEditor from '../ui/textEditor';
import { MessageType } from '@/types';

const MessageForm = () => {
  const { updateNodeData } = useNodeDataChange();

  // Updated schema to handle consistent types
  const messageData = z.object({
    type: z.nativeEnum(MessageType),
    message: z.union([
      z.string(),
      z.object({
        name: z.string(),
        url: z.string(),
      }),
    ]),
  });

  const messageSchema = z.object({
    messages: z.array(messageData).optional(),
  });

  const { state, dispatch } = useNodeStore();

  const defaultValues = {
    messages: state.selectedNode?.data.message_data?.messages || [
      {
        type: MessageType.TEXT,
        message: '',
      },
    ],
  };

  const methods = useForm<{
    messages: Array<{
      type: MessageType;
      message: string | { name: string; url: string };
    }>;
  }>({
    mode: 'all',
    resolver: zodResolver(messageSchema),
    defaultValues,
  });

  const { control, setValue, watch } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'messages',
  });

  useEffect(() => {
    setValue('messages', [
      {
        type: MessageType.TEXT,
        message: '',
      },
    ]);

    if (state.selectedNode?.data.message_data?.messages) {
      setValue('messages', state.selectedNode?.data.message_data?.messages);
    }
  }, [setValue, state.selectedNode?.data]);

  const handleFileChange = (file: File, index: number) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setValue(`messages.${index}.message`, {
        name: file.name,
        url: fileReader.result as string,
      });
    };

    fileReader.readAsDataURL(file);
  };

  const renderPreview = (
    file: string | { name: string; url: string },
    type: MessageType
  ) => {
    if (!file || typeof file === 'string') return null;

    if (type === MessageType.IMAGE) {
      return (
        <img
          src={file.url}
          alt={file.name}
          className="w-full h-auto rounded-md"
        />
      );
    }

    if (type === MessageType.VIDEO) {
      return (
        <video controls className="w-full h-auto">
          <source src={file.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }

    if (type === MessageType.AUDIO) {
      return (
        <audio controls className="w-full">
          <source src={file.url} type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      );
    }

    if (type === MessageType.DOCUMENT) {
      const isPDF = file.name.endsWith('.pdf');
      return isPDF ? (
        <embed
          src={file.url}
          type="application/pdf"
          width="100%"
          height="500px"
        />
      ) : (
        <a
          href={file.url}
          download={file.name}
          className="text-blue-500 underline"
        >
          Download {file.name}
        </a>
      );
    }

    return null;
  };

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
    <div className="mt-4 h-[calc(100vh-100px)] overflow-hidden">
      <h2 className="pl-5 text-xl text-gray-900 font-bold my-3">
        Write a message
      </h2>
      <Form {...methods}>
        <form
          className="flex flex-col justify-between px-5 gap-5 relative"
          onSubmit={(...args) => void methods.handleSubmit(onSubmit)(...args)}
        >
          <div className="h-[calc(100vh-280px)] overflow-y-auto py-2 pr-2">
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-5">
                {fields.map((item: any, index) => (
                  <div
                    className="first:pt-0 border px-3 py-3 rounded-lg"
                    key={item.id}
                  >
                    <div className="flex justify-end mb-5">
                      <button
                        onClick={() => remove(index)}
                        type="button"
                        className="text-sm text-black hover:bg-gray-200 p-1 rounded-md transition-all duration-500 focus:outline-none"
                      >
                        <Icons.trash size={20} />
                        <span className="sr-only">Remove</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                      <FormField
                        control={control}
                        name={`messages.${index}.message` as const}
                        render={({field}) => (
                          <FormItem className="flex flex-col">
                            <FormControl>
                              {watch(`messages.${index}.type`) ===
                              MessageType.TEXT ? (
                                <TextEditor
                                  value={
                                    field.value
                                      ? EditorState.createWithContent(
                                          ContentState.createFromText(
                                            field.value as string
                                          )
                                        )
                                      : EditorState.createEmpty()
                                  }
                                  onChange={(newEditorState) => {
                                    setValue(
                                      `messages.${index}.message`,
                                      newEditorState
                                        .getCurrentContent()
                                        .getPlainText()
                                    );
                                  }}
                                />
                              ) : (
                                <>
                                  <input
                                    type="file"
                                    accept={
                                      watch(`messages.${index}.type`) ===
                                      MessageType.IMAGE
                                        ? 'image/*'
                                        : watch(`messages.${index}.type`) ===
                                          MessageType.VIDEO
                                        ? 'video/*'
                                        : watch(`messages.${index}.type`) ===
                                          MessageType.AUDIO
                                        ? 'audio/*'
                                        : watch(`messages.${index}.type`) ===
                                          MessageType.DOCUMENT
                                        ? '.pdf,.xlsx,.csv'
                                        : ''
                                    }
                                    onChange={(e) =>
                                      handleFileChange(
                                        e.target.files?.[0] as File,
                                        index
                                      )
                                    }
                                  />
                                  {renderPreview(
                                    watch(`messages.${index}.message`),
                                    watch(`messages.${index}.type`)
                                  )}
                                </>
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}

                <div className="flex items-center gap-5">
                  <Button
                    type="button"
                    onClick={() =>
                      append({
                        message: '',
                        type: MessageType.TEXT,
                      })
                    }
                    className="w-full sm:w-auto bg-transparent text-black font-semibold hover:bg-gray-300 self-start border border-black"
                  >
                    <Icons.plus size={20} className="mr-1" />
                    Message
                  </Button>
                  <Button
                    type="button"
                    onClick={() =>
                      append({
                        message: '',
                        type: MessageType.IMAGE,
                      })
                    }
                    className="w-full sm:w-auto bg-transparent text-black font-semibold hover:bg-gray-300 self-start border border-black"
                  >
                    <Icons.plus size={20} className="mr-1" />
                    Image
                  </Button>
                  <Button
                    type="button"
                    onClick={() =>
                      append({
                        message: '',
                        type: MessageType.VIDEO,
                      })
                    }
                    className="w-full sm:w-auto bg-transparent text-black font-semibold hover:bg-gray-300 self-start border border-black"
                  >
                    <Icons.plus size={20} className="mr-1" />
                    Video
                  </Button>
                  <Button
                    type="button"
                    onClick={() =>
                      append({
                        message: '',
                        type: MessageType.AUDIO,
                      })
                    }
                    className="w-full sm:w-auto bg-transparent text-black font-semibold hover:bg-gray-300 self-start border border-black"
                  >
                    <Icons.plus size={20} className="mr-1" />
                    Audio
                  </Button>
                  <Button
                    type="button"
                    onClick={() =>
                      append({
                        message: '',
                        type: MessageType.DOCUMENT,
                      })
                    }
                    className="w-full sm:w-auto bg-transparent text-black font-semibold hover:bg-gray-300 self-start border border-black"
                  >
                    <Icons.plus size={20} className="mr-1" />
                    Document
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
};

export default MessageForm;
