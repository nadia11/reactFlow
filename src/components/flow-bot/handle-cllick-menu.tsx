import { cn } from '@/lib/utils';
import { Icons } from '../ui/Icons';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Input } from '../ui/input';
import { sidebarNavigation } from '@/configs';
import { useFlow } from '@/hooks/useFlow';
import { useNodeId } from 'reactflow';

interface IHandleClickMenuProps {
  className?: string;
  setOpen: (open: boolean) => void;
  open: boolean;
}

export const HandleClickMenu = ({
  className,
  open,
  setOpen
}: IHandleClickMenuProps) => {
  const { addNodeClick } = useFlow();
  const nodeId = useNodeId();

  const handleSidebarClick = (item: any, nodeId: string) => {
    addNodeClick(item, nodeId);
    setOpen(false); // Close the Popover after clicking an item
  };

  return (
    <div className={cn('flex justify-between items-center gap-2 mr-6', className)}>
      <Popover open={open} onOpenChange={(isOpen) => {
        console.log("Popover state changed:", isOpen);
        setOpen(isOpen);
      }}>
        <PopoverTrigger asChild className='!z-0'>
          <button
            className='bg-sky-500 transition flex items-center z-[40] justify-center duration-200 rounded-full text-white w-8 h-8 cursor-pointer'
            onClick={(e) => {
              e.stopPropagation(); // Prevents triggering other click events
            }}
          >
            <Icons.plus className='size-6' />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className='w-64 ml-10 -mt-12 bg-gray-800 border-none'
          align='start'
        >
          <div className='flex flex-col gap-2'>
            <h2 className='text-xl text-white'>Type to Search</h2>
            <div className='relative'>
              <Input
                className='w-full p-2 placeholder:text-gray-600'
                placeholder='Type the name of feature'
              />
              <Icons.search className='absolute top-2 right-2 text-gray-600' />
            </div>
            <div className='flex flex-col gap-4 items-start justify-start mt-3 h-[270px] overflow-y-auto'>
              {sidebarNavigation.map((item, index) => (
                <div key={index} className='w-full'>
                  <h3 className='text-lg text-gray-600 font-bold'>{item.label}</h3>
                  <div className='flex flex-col gap-2 w-full'>
                    {item.children.map((childItem, childIndex) => {
                      const Icon = Icons[childItem.icon ?? 'chevronLeft'];
                      return (
                        <div
                          key={childIndex}
                          className='mt-1 px-2 py-3 flex items-center justify-between hover:bg-gray-700 gap-4 w-full hover:shadow-md transition-all duration-300 cursor-grab'
                          onClick={() => handleSidebarClick(childItem, nodeId as string)}
                        >
                          <div className='flex items-center gap-4 w-full'>
                            <div className={cn('px-1.5 py-1 rounded-md border')}>
                              <Icon className='text-gray-500 size-4' />
                            </div>
                            <h6 className='text-white text-lg'>{childItem.label}</h6>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};