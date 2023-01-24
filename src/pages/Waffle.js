import React, { useState, useEffect } from 'react'
import { useTezosContext } from "../context/tezos-context";
import { request, gql } from 'graphql-request'
import ReactPlayer from 'react-player'
import { useParams, Link } from 'react-router-dom';



export const Waffle = () => {
  const [waffle, setWaffle] = useState([]);
  const [message, setMessage] = useState();
  const app = useTezosContext();
  const params = useParams();
  const queryWaffle = gql`
    query waffle {
      tokens(where: {fa2_address: {_eq: "${params.contract}", _neq: "KT1EpGgjQs73QfFJs9z7m1Mxm5MTnpC2tqse"}, token_id: {_eq: "${params.id}"}}) {
        artist_address
        artifact_uri
        display_uri
        creators
        name
        description
        minter_profile {
          alias
          twitter
        }
        price
        editions
        mime_type
        description
        platform
        eightbid_rgb
        tags {
          tag
        }
        listings (where: {status: {_eq: active}},order_by: {price: asc}){
          price
          swap_id
          contract_address
          ask_id
          status
          type
        }
        holdings(where: {amount: {_gt: "0"}}, order_by: {first_received_at: asc}) {
          holder_address
          holder_profile {
            alias
          }
        }
      }
    }  
    `
    useEffect(() => {
      const getWaffle = async() => {
          if (params) { 
          const result = await request(process.env.REACT_APP_TEZTOK_API, queryWaffle)
          setWaffle(result.tokens[0] || ['nada'] )
          }
          }
          getWaffle();
      }, [params, queryWaffle])

    if (waffle.length === 0) return <div>. . .<p/></div>
    if (waffle[0] === 'nada') return <div>nada. . .<p/></div>

    const handleCollect = () => async() => {
      !app.address && setMessage('please sync. . .') 
      if(app.address) try {
          setMessage('ready wallet. . .');
          const isCollected = await app.collect({swap_id: waffle.listings[0].swap_id || waffle.listings[0].ask_id, price: waffle.price,
             contract: waffle.listings[0].contract_address, platform: waffle.listings[0].type.includes('OBJKT') ? 'OBJKT' : waffle.platform});
          setMessage(isCollected ? 'congratulations - you got it!' : 'transaction denied. . .');
        
      } catch(e) {
          setMessage('errors. . .');
          console.log('Error: ', e);
      }
      setTimeout(() => {
          setMessage(null);
      }, 3200);
    };

return(
  <>
  
   {waffle.mime_type?.includes('image') && waffle.mime_type !== 'image/svg+xml' ?  
    // <a 
    //   href={params.contract ==='KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton' ? 
    //   `https://hicetnunc.miami/waffle/${params.id}` : 
    //   params.contract === 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW' ? 
    //   `https://versum.xyz/token/versum/${params.id}`
    //   : `https://objkt.com/asset/${params.contract}/${params.id}`} target="blank"  rel="noopener noreferrer">  
    <a href = {`https://ipfs.io/ipfs/${waffle.artifact_uri.slice(7)}`} target='blank'  rel='noopener noreferrer'>
    <img alt='' className= 'view' src={`https://ipfs.io/ipfs/${waffle.platform === '8BIDOU' ? waffle.display_uri.slice(7) : waffle.artifact_uri.slice(7)}`}/> 
    </a>
    // </a>
    :
   waffle?.mime_type?.includes('video') ?  
  //  <a key={waffle.artifact_uri+waffle.token_id} 
  //     href={waffle.fa2_address === 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton' ?
  //    `https://hicetnunc.miami/waffle/${waffle.token_id}` : 
  //     waffle.fa2_address === 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW' ? 
  //    `https://versum.xyz/token/versum/${waffle.token_id}` 
  //      : `https://objkt.com/asset/${waffle.fa2_address}/${waffle.token_id}`} target="blank"  rel="noopener noreferrer"> 
      <div className='view'>
        <a href = {`https://ipfs.io/ipfs/${waffle.artifact_uri.slice(7)}`} target='blank'  rel='noopener noreferrer'>
        <ReactPlayer url={'https://ipfs.io/ipfs/' + waffle.artifact_uri.slice(7)} width='100%' height='100%' muted={true} playing={true} loop={true} controls={true}/>
         </a>
      </div>
    // </a> 
    : waffle?.mime_type?.includes('audio') ?  
    <div className='view'>
       <img className='view' alt='' style={{width:'90%', margin: '12px'}} src={'https://ipfs.io/ipfs/' + waffle.display_uri.slice(7)} />
      <audio  style={{ margin: '6px'}}src={'https://ipfs.io/ipfs/' + waffle.artifact_uri.slice(7)} controls />
    </div>
    :  waffle.mime_type.includes('text') ? <a className='view' href = {`https://ipfs.io/ipfs/${waffle.artifact_uri.slice(7)}`} target='blank'  rel='noopener noreferrer'><div className='textWaffle'>{waffle.description}</div></a> : null}
        <p hidden={waffle.mime_type.includes('text')}>{waffle.name} </p>
         {/* <span>•</span> */}
    <span hidden={waffle.mime_type.includes('text')} className='descript'> {waffle.description}</span>
        {/* {!waffle.mime_type.includes('text') && <div style= {{borderBottom: '6px dotted', width: '63%', margin: '33px'}} />} */}
        {/* <a href={params.contract ==='KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton' ? `https://hicetnunc.miami/waffle/${params.id}` : 
              params.contract === 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW' ? `https://versum.xyz/token/versum/${params.id}` 
             : `https://objkt.com/asset/${params.contract}/${params.id}`} target="blank"  rel="noopener noreferrer">   */}
    <div>
        <span>•</span>
        <Link to={`/${waffle.minter_profile?.alias || waffle.artist_address}`}>created by:  {waffle.minter_profile?.alias
               ? waffle.minter_profile?.alias : waffle?.artist_address ? waffle.artist_address?.substr(0, 5) + ". . ." + waffle.artist_address?.substr(-5) :   `${waffle.creators[0]}, ${waffle.creators[1]}`}</Link>
        <span>•</span>
        {`${waffle.editions} editions`}
        <span>•</span>
        <div>{waffle.price > 0 ?
            <div style={{cursor: 'pointer'}}onClick={handleCollect()}>
                   {`collect for ${waffle.price/1000000}ꜩ`}
                  <span className='center'>•</span>
            </div> : ''} 
            <a href={waffle.platform ==='HEN' ? `https://hicetnunc.miami/objkt/${params.id}` 
                    : waffle.platform === 'VERSUM' ? `https://versum.xyz/token/versum/${params.id}` 
                    : waffle.platform === '8BIDOU' && waffle.eightbid_rgb.length < 800 ? `https://ui.8bidou.com/item/?id=${params.id}` 
                    : waffle.platform === '8BIDOU' &&  waffle.eightbid_rgb.length > 800 ? `https://ui.8bidou.com/item_r/?id=${params.id}` 
                    : waffle.platform === 'TYPED' ? `https://typed.art/${params.id}`  
                    : `https://objkt.com/asset/${params.contract}/${params.id}`} target="blank"  rel="noopener noreferrer">
                    
                    {waffle.platform === 'HEN' ? 'H=N' : waffle.platform === "VERSUM" ? waffle.platform 
                    : waffle.platform === '8BIDOU' ? '8BiDOU'
                    : waffle.platform === 'TYPED' ? 'TYPEDART' :'waffle'}</a>
            </div>
            <span>•</span>
        </div>
     
        <Link className='waffle' to ='/waffles'>
            {`🧇`}
            <p/>
        </Link>
        {message}
        <p/>
  </>
)
}