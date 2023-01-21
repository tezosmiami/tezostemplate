const axios = require('axios')


export const setMetadata = async({values, image}) => {
    const { create } = await import('ipfs-http-client')
    const auth =
    'Basic ' + Buffer.from(process.env.REACT_APP_INFURA_ID + ':' + process.env.REACT_APP_INFURA_KEY).toString('base64');

    const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
    });
    
    const addToIpfs = async(image) => {
        const hash = await ipfs.add(image);
        return `ipfs://${hash.path}`;
        };
        
    const artifactUri = await addToIpfs(Buffer.from(image.replace(/^data:image\/(png|jpg);base64,/, ""), "base64"));
    const displayUri = await addToIpfs(Buffer.from(image.replace(/^data:image\/(png|jpg);base64,/, ""), "base64"));
    
    const metadata = Buffer.from(
        JSON.stringify({
            name: values.title, 
            description: values.description,
            tags: values.tags.replace(/\s/g, '').split(','),
            symbol: 'OBJKT',
            artifactUri,
            displayUri,
            creators: [values.address],
            formats: [
                {
                    uri: artifactUri,
                    mimeType: 'image/png',
                }],
            decimals: 0,
            isBooleanAmount: false,
            shouldPreferSymbol: false
        },null,2)
    );

    const md = await addToIpfs(metadata);

    return md
    
}



