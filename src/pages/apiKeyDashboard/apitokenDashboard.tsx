
import PageMeta from "../../components/common/PageMeta.js";
import { useEffect, useState } from "react";
import ApikeyList from "./apiTokenList.js";
import ApiTokenForm from "./apiTokenForm.js";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.js";
import { useSearchParams } from "react-router";

export default function ApiTokenDashBoard() {
  const [actionToken,setActionToken]=useState(0)
  const [instanceConfig,setInstanceConfig]=useState<string>('');

  //Para cuando toco en el Sidebar vaya a la pagina 1
  const [searchParams, setSearchParams] = useSearchParams();
  const typeAction = searchParams.get('page');
  useEffect(() => {
    if (typeAction) {
      // Limpiar el parámetro `page` de la URL
      searchParams.delete('page');
      setSearchParams(searchParams); // actualiza la URL
      setActionToken(parseInt(typeAction) || 1);
    }
  }, [typeAction]);
  //FIN -> Sidebar vaya a la pagina 1

  useEffect(()=>{
    if(actionToken!=3){
        setInstanceConfig('');
    }
  },[actionToken])

  return (
    <>
      <PageMeta
        title="ChatterPlus | Alternative Whatsapp API"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-12">
        <PageBreadcrumb pageTitle="Instances" />
        <div style={{display:actionToken==0?'block':'none'}} className="text-black dark:text-white">
          <center>
          <div style={{width: "150px",height:"150px",textAlign:'center'}}><div className="lds-hourglass"></div>
          <p style={{marginTop:'-30px'}}>Loading Data</p>
          </div>
          </center>
        </div>
        <ApikeyList show={actionToken==1} actionToken={actionToken} setActionToken={setActionToken}/>
        <ApiTokenForm show={actionToken==2} setAction={setActionToken} />
        </div>
      </div>
    </>
  );
}
