
import PageMeta from "../../components/common/PageMeta.js";
import { useEffect, useState } from "react";
import InstancesList from "./InstancesList.js";
import InstancesFrom from "./InstancesForm.js";
import InstancesConnection from "./instancesConnect.js";
import InstancesData from "./instancesData.js";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.js";
import { useSearchParams } from "react-router";
import { useGlobalData } from "../../globalVar/globalVar.js";

export default function Home() {
  const [action,setAction]=useState(0);
  const {instancesFunction}=useGlobalData();
  const [instanceConfig,setInstanceConfig]=useState<string>('');
  const [instanceDataId,setInstanceDataId]=useState<string>('');

  //Para cuando toco en el Sidebar vaya a la pagina 1
  const [searchParams, setSearchParams] = useSearchParams();
  const typeAction = searchParams.get('page');
  useEffect(() => {
    if (typeAction) {
      // Limpiar el parámetro `page` de la URL
      searchParams.delete('page');
      setSearchParams(searchParams); // actualiza la URL
      setAction(parseInt(typeAction) || 1);
    }
  }, [typeAction]);
  //FIN -> Sidebar vaya a la pagina 1

  useEffect(()=>{
    console.log("ACTIONNN",action)
    if(action==100){
      setAction(0)
      instancesFunction.fetchInstances()
    }
    if(action==99){
      setAction(3)
      instancesFunction.fetchInstances()
    }
  },[action])

  useEffect(()=>{
    if(action!=0){
      if(action!=3 && action!=99){setInstanceConfig('');}
      if(action!=4){setInstanceDataId('')}
    }
  },[action])

  return (
    <>
      <PageMeta
        title="ChatterPlus | Alternative Whatsapp API"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-12">
        <div className={`${action!=4?'':'hidden'}`}>
        <PageBreadcrumb pageTitle="Instances" />
        </div>
        <div style={{display:action==0?'block':'none'}} className="text-black dark:text-white">
          <center>
          <div style={{width: "150px",height:"150px",textAlign:'center'}}><div className="lds-hourglass"></div>
          <p style={{marginTop:'-30px'}}>Loading Data</p>
          </div>
          </center>
        </div>
        <InstancesList show={action==1} instanceConfig={instanceConfig} setInstanceDataId={setInstanceDataId} action={action} setInstanceConfig={setInstanceConfig} setAction={setAction}/>
        <InstancesFrom show={action==2} setAction={setAction} setInstanceConfig={setInstanceConfig}/>
        <InstancesConnection show={action==3} instanceConfig={instanceConfig} action={action} setAction={setAction}/>
        <InstancesData show={action==4} instanceDataId={instanceDataId}  action={action} setAction={setAction}/>
        </div>
      </div>
    </>
  );
}
