import { useEffect, useRef, useState } from 'react';

import { Label } from '@/components/ui/label';

// Icons
import { FileSignature, Trash2 } from 'lucide-react';

import { Button } from '../ui/button';
import { isDataUrl } from '@/helpers';

type ImageProps = {
  name: string;
  value: any;
  setValue: any;
};

const ImageUpload = ({ name, value, setValue }: ImageProps) => {
  const uploadImageRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<any | null>(null);

  const handleUploadImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        const base64String = event.target!.result as string;
        setValue(name, base64String, {
          shouldDirty: true,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveUploadedImage = () => {
    setValue(name, '', {
      shouldDirty: true,
    });
  };

  // Modal state
  const [open, setOpen] = useState(false);

  /**
   * Function that handles uploading signature
   */
  // const handleSaveImage = () => {

  //   setOpen(false);
  // };

  useEffect(() => {
    if (open) {
      // Access the canvas element
      setTimeout(() => {
        const canvas = imageRef?.current;
        if (canvas) {
          canvas.fromDataURL();
        }
      }, 50);
    }
  }, [open]);

  return (
    <>
      <div className='flex justify-start w-full'>
        <div className='w-full'>
          <Label>Upload</Label>

          {value && isDataUrl(value) ? (
            <div className='flex flex-col gap-3 mt-3'>
              <img
                className='border border-black rounded-md hover:border-green-500 bg-white max-h-[155px] w-full bg-cover  object-cover'
                src={value}
                
                height={155}
                alt=''
              />
              {value && (
                <Button
                  variant='outline'
                  className='text-red-500 text-lg'
                  onClick={handleRemoveUploadedImage}
                >
                  Remove
                  <Trash2 className='size-4 ml-2' />
                </Button>
              )}
            </div>
          ) : (
            <div
              style={{
                height: '155px',
              }}
              className='flex flex-col justify-center items-center h-[155px] rounded-md bg-gray-100 dark:bg-slate-800 border border-black dark:border-white hover:border-green-500 relative w-full'
            >
              <input
                ref={uploadImageRef}
                type='file'
                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                onChange={handleUploadImageChange}
                accept='image/*'
              />
              <FileSignature />
              <Label>Upload image</Label>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
