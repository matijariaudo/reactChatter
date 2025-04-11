
import { RedocStandalone } from 'redoc';

export default function Documentation() {

  return (
    <div className=' bg-gray-50 h-[100vh] overflow-y-auto'>
      <div className="col-span-12 p-2 bg-gray-900 text-white flex">
        <a href="/app/instances"><button className='float-right border-1 p-1 rounded-sm text-xs'>Back to app</button></a>
        <img src='images/logo/logo-dark.png'></img>
        </div>
      <RedocStandalone
        specUrl="documentation/swagger.json"
        options={{
          nativeScrollbars: true,
        }}
      />
    </div>
  );
}
