import { Button } from '../ui/button';
import { useGlobalStore } from '@/store';

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
      <h1 className='text-xl font-semibold text-gray-900'>New Bot</h1>
        {/* <Button
            variant={'outline'}
            className='border-sky-600 hover:bg-sky-200 border focus:outline-none '
            onClick={onDeleteDataClick}
        >
            Delete previous data
        </Button> */}
        <Button
            variant={'outline'}
            className='bg-green-400 text-white hover:bg-sky-200 border focus:outline-none '
            onClick={onTestBotClick}
        >
            Test this bot
        </Button>
    </div>
  );
};
