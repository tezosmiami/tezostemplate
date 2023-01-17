import { useEffect, useState, createContext, useContext} from "react";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";

const hicdex ='https://api.hicdex.com/v1/graphql'

const querySubjkt = `
query Subjkt($address: String!) {
  hic_et_nunc_holder(where: {address: {_eq: $address}}) {
    name
  }
}
`

async function fetchGraphQL(queryObjkts, name, variables) {
  let result = await fetch(hicdex, {
    method: 'POST',
    body: JSON.stringify({
      query: queryObjkts,
      variables: variables,
      operationName: name,
    }),
  })
  return await result.json()
}

const TezosContext = createContext();
const options = {
  name: 'Tezos Miami',
  network: 'Mainnet'
 };
  
const wallet = new BeaconWallet(options);

export const useTezosContext = () => {

  const app = useContext(TezosContext);
  if (!app) {
    throw new Error(
      `!app`
    );
  }
  return app;
};

export const TezosContextProvider = ({ children }) => {
  
  const [app, setApp] = useState("");
  const [address, setAddress] = useState("");
  const [tezos, setTezos] = useState(new TezosToolkit("https://mainnet.api.tez.ie"));
  const [acc, setAcc] = useState("");
  const [alias, setAlias] = useState("")

  useEffect(() => {
     const getSynced = async () => {
        if (await wallet?.client?.getActiveAccount()) { 
          setAcc(await wallet?.client?.getActiveAccount());
          const address =  await wallet.getPKH();
          setAddress(address);
          tezos.setWalletProvider(wallet);
          setTezos(tezos)
          if(address) {
            const { errors, data } = await fetchGraphQL(querySubjkt, 'Subjkt', { address: address});
           if (errors) {
             console.error(errors);
           }
           data?.hic_et_nunc_holder[0]?.name && 
           setAlias(data.hic_et_nunc_holder[0].name);
          }
      }
    };
      getSynced();
    }, [tezos]);
  
  async function sync() {
    app.currentUser && await app.currentUser?.logOut();
    await wallet.client.clearActiveAccount();
    await wallet.client.requestPermissions({
      network: {
        type: 'mainnet',
      },
    });
    tezos.setWalletProvider(wallet);
    setTezos(tezos)
    let address=await wallet.getPKH()
    setAddress(address);
    setAcc(await wallet?.client?.getActiveAccount());
    if(address) {
        const { errors, data } = await fetchGraphQL(querySubjkt, 'Subjkt', { address: address});
     if (errors) {
       console.error(errors);
     }
     if(data?.hic_et_nunc_holder[0]?.name) {
        setAlias(data.hic_et_nunc_holder[0].name);
      }
    }
   
  }

  async function unsync() {
    await wallet.client.clearActiveAccount();
    setAcc("")
    setAddress("");
    setAlias("")
    //  window.location.reload();
  }

  const wrapped = { ...app, tezos, sync, unsync, acc, address, alias};

  return (
   
    <TezosContext.Provider value={wrapped}>
           {children}
    </TezosContext.Provider>
  
  );
};

export default TezosContextProvider;