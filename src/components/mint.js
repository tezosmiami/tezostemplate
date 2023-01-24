import React, { useState, useRef, useEffect} from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useTezosContext } from '../context/tezos-context'
import { setMetadata }  from '../utils/metadata'
import * as yup from 'yup'
import "../styles.css"

const min_mint = 1;
const max_mint = 10000;
const min_royalties = 1
const max_royalties = 25

const validationSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    tags: yup.string().required(),
    editions: yup.number().required()
    .min(min_mint)
    .max(max_mint),
    royalties: yup.number().required()
    .min(min_royalties)
    .max(max_royalties)
});

// const bytesToMb = bytes => bytes / 1_000_000;


export const Mint = ({image, isMint, setIsMint}) => {
    const [mintPayload, setMintPayload] = useState();
    const [isPreview, setIsPreview] = useState(null)
    const [message, setMessage] = useState('')
    const app = useTezosContext()
    const scrollRef = useRef()

    useEffect(() => {
        scrollRef.current && 
        setTimeout(() => {
            scrollRef.current.scrollIntoView(({behavior: 'smooth'}));
        }, 800) 
      }, [scrollRef]);

    const initialValues = {
        title: mintPayload?.title || '',
        description: mintPayload?.description || '',
        tags: mintPayload?.tags || '',
        editions: mintPayload?.editions || '',
        royalties: mintPayload?.royalties || ''

    };
    const handleMint = async () => {
    
        setMessage('Ipfs. . .')
        const metadataUri = await setMetadata({values: mintPayload , image: image})
        setTimeout(async () => {
            setMessage('Minting. . .');
            const isSuccessful = await app.mint(metadataUri, mintPayload.editions, mintPayload.royalties);
            setMessage(isSuccessful ? 'Completed' : 'Error minting - try again. . .');
            setTimeout(() => {
                setMessage(null);
            }, 800)
        setIsMint(false)
        }, 1200)
    };



    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => (image => URL.revokeObjectURL(image));
      }, []);
    
            
    const handleSubmit = (values) => { 
        values.address=app.address
        setMintPayload(values);
        setIsPreview(true)
    };

    return (
        <div>   
            <div >
                    {isMint && <img alt='' className='view' src={image} />}
                </div>         
                {!isPreview && <Formik
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {(formik) =>
                        <Form className='form' >
                            <div className='formField'>
                            <span style={{marginLeft:'36px'}}>&nbsp; </span>
                                <label
                                    className='label'
                                    htmlFor={'title'}
                                    ref={scrollRef}
                                    id='formik'
                                >Title  </label>
                                <Field
                                    className='fields'
                                    id="title"
                                    name="title"
                                    type="text"
                                />
                                <ErrorMessage
                                    component="span"
                                    className='errorMessage'
                                    name="title"
                                />
                            </div>
                            <div className='formField' >
                            <span style={{marginLeft:'36px'}}>&nbsp; </span>
                                <label
                                    className='label'
                                    htmlFor={'description'}
                                >Description  </label>
                                <Field
                                    className='fields'
                                    id="description"
                                    name="description"
                                    component="textarea"
                                />
                                <ErrorMessage
                                    component="span"
                                    className='errorMessage'
                                    name="description"
                                />
                            </div>
                            <div className='formField'>
                            <span style={{marginLeft:'36px'}}>&nbsp; </span>
                                <label
                                    className='label'
                                    htmlFor={'tags'}
                                >Tags    </label>
                                <Field
                                    className='fields'
                                    id="tags"
                                    name="tags"
                                    type="text"
                                    placeholder="tags (comma separated)"
                                />
                                <ErrorMessage
                                    component="span"
                                    className='errorMessage'
                                    name="tags"
                                />
                            </div>
                            <div className='formField'>
                                 <span style={{marginLeft:'36px'}}>&nbsp; </span>
                                <label
                                    className='label'
                                    htmlFor={'editions'}
                                >Editions </label>
                                <Field
                                    className='fields'
                                    id="editions"
                                    name="editions"
                                    type="number"
                                    placeholder="# of editions to mint"
                                />
                                <ErrorMessage
                                    component="span"
                                    className='errorMessage'
                                    name="editions"
                                />
                            </div>
                            <div className='formField'>
                                 <span style={{marginLeft:'36px'}}>&nbsp; </span>
                                <label
                                    className='label'
                                    htmlFor={'editions'}
                                    
                                >Royalties</label>
                                <Field
                                    className='fields'
                                    id="royalties"
                                    name="royalties"
                                    type="number"
                                    placeholder="% of sale for royalties"
                                />
                                <ErrorMessage
                                    component="span"
                                    className='errorMessage'
                                    name="royalties"
                                />
                            </div>
                                <p/>
                            <div>
                            <button
                                // className='formButton'
                                type="submit"
                            >Preview
                            </button>
                            <p/>
                            <button style={{fontSize: '27px'}} onClick={() => setIsMint(false)}>{`<`}<p/></button>
                            </div>
                        </Form>
                        
                    }
                </Formik>
                
            }
            {isPreview &&
                <div>
                    <p/>
                    {/* <div style= {{borderBottom: '3px dotted', width: '45%', marginTop: '1px', marginBottom: '18px'}} /> */}
                    <ul>
                        <li> Title: {mintPayload.title}</li>
                        <li >Decription: {mintPayload.description}</li>
                        <li>Tags: {mintPayload.tags} </li>
                        <li>Editions: {mintPayload.editions} </li>
                        <li>Royalties: {mintPayload.royalties} </li>
                        <li>Created by: {`${app.alias || app.address.substr(0, 4) + ". . ." + app.address.substr(-4)}`}</li>
                        <p/>
                    </ul>
                    {/* <div style= {{borderBottom: '3px dotted', width: '45%', marginTop: '1px', marginBottom: '18px'}} /> */}
                    <p/>
                    <button style={{width: '108px'}} onClick={()=> handleMint()}> Mint (hicetnunc)</button><p/>
                        {message} <p/>
                    </div>
         }
        </div >
    );
};

