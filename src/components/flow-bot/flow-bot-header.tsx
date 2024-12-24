import { Button } from '../ui/button';
import { useGlobalStore } from '@/store';
import { Icons } from '@/assets/Icons';
export const FlowBotHeader = () => {
  const { dispatch } = useGlobalStore();
 const demoChatId="d290f1ee-6c54-4b01-90e6-d701748f0851";
  const onTestBotClick = () => {
    dispatch({ type: 'SET_BUBBLE_OPEN', payload: true });
  };

  const onDeleteDataClick = async () => {
    try {
      const response = await fetch(`http://localhost:5000/nodes/${demoChatId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.text();
      alert(`Success: ${result}`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            alert(`Error: ${error.message}`);
        } else {
            alert(`An unknown error occurred.`);
        }
    }
  };
  return (
    <div className='flex  justify-between items-center bg-white px-40  py-3 shadow-md'>
      <div className='flex items-center'>
      <Icons.arrowLeft/>
      <h1 className='ml-2 text-xl font-semibold text-gray-900'>Demo Bot</h1>
      </div>
        {/* <Button
            variant={'outline'}
            className='border-sky-600 hover:bg-sky-200 border focus:outline-none '
            onClick={onDeleteDataClick}
        >
            Delete previous data
        </Button> */}
              <div className='flex items-center gap-3'>
              <Button
            variant={'link'}
            className='text-green-500 hover:bg-sky-200 focus:outline-none '
            onClick={onTestBotClick}
        >
            Test this bot
        </Button>
              <Button
            variant={'outline'}
            className='bg-green-500 text-white hover:bg-sky-200 border focus:outline-none '
          
        >
            Add new
        </Button>
        <Button
            variant={'outline'}
            className= "text-green-500 hover:bg-sky-200 border-green-500 focus:outline-none"
          
        >
            Save
        </Button>
        <Icons.download stroke='#0e9f6e'/>
        </div>
    </div>
  );
};
