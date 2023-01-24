import React, { useState } from 'react'
import { request, gql } from 'graphql-request'
import useSWR, { useSWRConfig } from 'swr';
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player'
import Masonry from 'react-masonry-css'



const breakpointColumns = {
  default: 4,
  1500: 4,
  1200: 3,
  900: 2,
  600: 1
};

// export const getCount = gql`
//   query total{
//     tokens_aggregate(where: {editions: {_eq: "1"}, price: {_is_null: false}, mime_type: {_is_null: false}}) {
//     aggregate {
//       count
//     }
//   }
// }
// `
export const getWaffles = gql`
  query objkts ($offset: Int!) {
     waffles: tokens(where: {tags: {tag: {_eq: "wafflesdraw4tezos"}}, editions: {_neq: "0"}, mime_type: {_is_null: false}, fa2_address: {_neq: "KT1EpGgjQs73QfFJs9z7m1Mxm5MTnpC2tqse"}}, offset: $offset, order_by: {minted_at: desc}, limit: 63) {
        mime_type
        artifact_uri
        display_uri
        fa2_address
        description
        token_id
        artist_address
        thumbnail_uri
    }
     morewaffles: tokens(where: {tags: {tag: {_eq: "wafflesdraw"}}, editions: {_neq: "0"}, mime_type: {_is_null: false}, fa2_address: {_neq: "KT1EpGgjQs73QfFJs9z7m1Mxm5MTnpC2tqse"}}, offset: $offset, order_by: {minted_at: desc}, limit: 63) {
        mime_type
        artifact_uri
        display_uri
        fa2_address
        description
        token_id
        artist_address
        thumbnail_uri
    }
  }  
   ` 
const fetcher = (key, query, offset) => request(process.env.REACT_APP_TEZTOK_API, query, {offset})

export const Waffles = () => {
  const { mutate } = useSWRConfig()
  const [pageIndex, setPageIndex] = useState(0);
  const [offset, setOffset] = useState(0)
  let waffles

  const { data, error } = useSWR(['/api/objkts', getWaffles, offset], fetcher, { refreshInterval: 5000 })
   
  if (error) return <div>nada. . .<p/></div>
  if (!data) return <div>. . .<p/></div>
  else waffles = data.waffles.concat(data.morewaffles)

    return (
      <>
      {/* <p style={{marginTop:0}}>recent waffles:</p> */}
      <Masonry
        breakpointCols={breakpointColumns}
        className='grid'
         columnClassName='column'>
        {waffles.length > 0 && [...new Map(waffles.map((w) => [w.artifact_uri, w])).values()].map(p=> (
           <Link className='center' key={p.artifact_uri+p.token_id} to={`/${p.fa2_address}/${p.token_id}`}>
           {p.mime_type.includes('image') && p.mime_type !== 'image/svg+xml' ?
           <img alt='' className= 'pop' key={p.artifact_uri+p.token_id}  src={`https://ipfs.io/ipfs/${p.display_uri ? p.display_uri?.slice(7) : p.artifact_uri.slice(7)}`}/> 
           : p.mime_type.includes('video') ? 
            <div className='pop video '>
              <ReactPlayer url={'https://ipfs.io/ipfs/' + p.artifact_uri.slice(7)} width='100%' height='100%' muted={true} playing={true} loop={true}/>
             </div>
           : p.mime_type.includes('audio') ?  
            <div className= 'pop'>
             <img className= 'pop' alt='' src={'https://ipfs.io/ipfs/' + p.display_uri.slice(7)} />
             <audio style={{width:'93%'}} src={'https://ipfs.io/ipfs/' + p.artifact_uri.slice(7)} controls />
            </div>
           : p.mime_type.includes('text') ? <div className='text'>{p.description}</div> : ''}
            </Link>   
            ))} 
        </Masonry>
          <div style={{justifyContent: 'center', margin: '18px', flexDirection: 'row'}}>
          {pageIndex >= 1 && <button onClick={() => {setPageIndex(pageIndex - 1); setOffset(offset-99); mutate('/api/objkts')}}>Previous  &nbsp;- </button>}
          {(data.waffles.length > 63 || data.morewaffles.length > 63) && <button onClick={() => {setPageIndex(pageIndex + 1); setOffset(offset+99); mutate('/api/objkts')}}>Next</button>}  
          {/* <p/> */}
       </div>
        <Link className='waffle' to ='/'>
                {`🧇`}
                <p/>
        </Link>
     </>
    );
  }
  
