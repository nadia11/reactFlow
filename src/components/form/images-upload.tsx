
import { useDropzone } from 'react-dropzone';
import { Label } from '@/components/ui/label';
import { FileSignature, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';


type ImageProps = {
  name: string;
  value: any[];
  setValue: any;
};

const ImagesUpload = ({ name, value, setValue }: ImageProps) => {
  const onDrop = (acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => {
      const reader = new FileReader();
      return new Promise<string>((resolve) => {
        reader.onload = event => {
          resolve(event.target!.result as string);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImages).then(images => {
      setValue(name, [...(value || []), ...images], {
        shouldDirty: true,
      });
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] }, // Fixed by changing 'image/*' to { 'image/*': [] }
    multiple: true,
  });

  const handleRemoveUploadedImage = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    setValue(name, newValue, {
      shouldDirty: true,
    });
  };

  return (
    <div className='flex flex-col gap-3 w-full'>
      <Label>Upload</Label>
      <div className='flex flex-wrap gap-3'>
        {value && value.map((image, index) => (
          <div key={index} className='flex flex-col items-center'>
            {image ? (
              <>
                <img
                  className='border border-black rounded-md max-w-[150px] w-full hover:border-blue-500 bg-white max-h-[155px] h-full'
                  src={image}
                  height={155}
                  alt=''
                />
                <Button
                  variant='outline'
                  className='text-red-500 text-lg mt-2'
                  onClick={() => handleRemoveUploadedImage(index)}
                >
                  Remove
                  <Trash2 className='size-4 ml-2' />
                </Button>
              </>
            ) : null}
          </div>
        ))}
      </div>
      <div
        {...getRootProps()}
        style={{
          height: '155px',
        }}
        className={`flex flex-col justify-center items-center h-[155px] rounded-md bg-gray-100 dark:bg-slate-800 border border-black dark:border-white hover:border-blue-500 relative w-full mt-3 ${
          isDragActive ? 'bg-blue-100' : ''
        }`}
      >
        <input {...getInputProps()} />
        <FileSignature />
        <Label>{isDragActive ? 'Drop images here...' : 'Drag & drop images here, or click to select files'}</Label>
      </div>
    </div>
  );
};

export default ImagesUpload;