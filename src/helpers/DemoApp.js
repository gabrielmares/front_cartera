import { TemplateHandler } from 'easy-template-x'

// siguiendo el ejemplo de la libreria easy-template-x 
async function generateDemo(cliente) {
    const {
        CODIGO,
        NOMBRE,
        FINNOSUCURSAL,
        CONTRATO,
        CENTRO,
        GRUPO
    } = cliente[0]
    const data = {
        CODIGO,
        NOMBRE,
        FINNOSUCURSAL,
        CONTRATO,
        CENTRO,
        GRUPO
    }
    const doc = await fetch('../demoApp.docx');
    const template = await doc.blob();
    const handler = new TemplateHandler();
    console.log(data, cliente)
    // se genera el doc, cargando las variables en los campos dentro de corchetes
    const nuevaSolicitudCr = await handler.process(template, data);

    // guardamos el documento en el cliente
    saveFile(`${NOMBRE}.docx`, nuevaSolicitudCr);

    function saveFile(filename, blob) {


        // get downloadable url from the blob
        const blobUrl = URL.createObjectURL(blob);

        // create temp link element
        let link = document.createElement("a");
        link.download = filename;
        link.href = blobUrl;

        // use the link to invoke a download
        document.body.appendChild(link);
        link.click();

        // remove the link
        setTimeout(() => {
            link.remove();
            window.URL.revokeObjectURL(blobUrl);
            link = null;
        }, 0);
    }

}

export default generateDemo;