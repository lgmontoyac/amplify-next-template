import { Schema } from '../../data/resource';
import axios, { AxiosError } from 'axios';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();

export const handler: Schema["sendToKumo"]["functionHandler"] = async (event) => {

    const grantType = 'password';

    const userName = 'integration@toyota.com';
    const password = 'ATCT0y0@P1#24*$cZ6EdXgKlCjBxqW4tZa2aGfmF';
    const clientId = '3MVG9X4LnCkfEVVhdhBNpParSm5Nj7jZjvcRurY3Ty5fKYjJzzJ7zevxyQrJwP60mCpp2m3zbgcEZwJT114BI';
    const clientSecret = '47B30C4368E436B2890C0FA90026BCA2C9F10392A5B8454491EEA0FC6DD9515D';
    const salesforceUrl = 'https://login.salesforce.com/services/oauth2/token';
    const kumoUrl = 'https://kumo-toyota.my.salesforce.com/services/data/v56.0/composite/tree/Lead';

    /*
    const userName = 'integration@toyota.com.dev';
    const password = 'Freeway2022!4FCg3sNxUoQYk9stJJUx4b51Q';
    const clientId = '3MVG9oZtFCVWuSwNbU9py_ihvJiNbAieug5rRspqxNhMnymDpOX3QNMbPVhMx34Nh6bejWVd9az3sPjQ8g2Xt';
    const clientSecret = 'D1500A77493F38B10C6742FD550ED997770A8CC6C68D6387BC44CFE6A4874C95';
    const salesforceUrl = 'https://test.salesforce.com/services/oauth2/token';
    const kumoUrl = 'https://kumo-toyota.my.salesforce.com/services/data/v56.0/composite/tree/Lead';
    */

    const getAccessToken = async () => {
        try {
            const response = await axios.post(salesforceUrl, null, {
                params: {
                    grant_type: grantType,
                    username: userName,
                    password: password,
                    client_id: clientId,
                    client_secret: clientSecret
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            const accessToken = response.data.access_token;
            console.log('Access Token:', accessToken);
            return accessToken;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Error al obtener el token de acceso:', error.response.data);
            } else {
                console.error('Error al obtener el token de acceso:', JSON.stringify(error));
            }
            return null;
        }
    }

    const processDocumentType = (documentType: string): string => {
        let response = "";
        switch (documentType) {
            case "CC":
                response = "13";
                break;
            case "NIT":
                response = "31";
                break;
            case "CE":
                response = "21";
                break;
            case "PA":
                response = "41";
                break;
            case "TI":
                response = "12";
                break;
            case "RC":
                response = "11";
                break;
            default:
                response = ""
                break;
        }
        return response;
    }

    const processDealer = (dealerSpotCode: string) => {

        const dealerEquivalents = [
            { dealerSpotCode: "1", dealerCode: "1" },
            { dealerSpotCode: "2", dealerCode: "1" },
            { dealerSpotCode: "3", dealerCode: "1" },
            { dealerSpotCode: "4", dealerCode: "2" },
            { dealerSpotCode: "5", dealerCode: "2" },
            { dealerSpotCode: "6", dealerCode: "2" },
            { dealerSpotCode: "7", dealerCode: "2" },
            { dealerSpotCode: "8", dealerCode: "2" },
            { dealerSpotCode: "9", dealerCode: "2" },
            { dealerSpotCode: "10", dealerCode: "2" },
            { dealerSpotCode: "11", dealerCode: "2" },
            { dealerSpotCode: "12", dealerCode: "2" },
            { dealerSpotCode: "14", dealerCode: "2" },
            { dealerSpotCode: "19", dealerCode: "6" },
            { dealerSpotCode: "20", dealerCode: "6" },
            { dealerSpotCode: "21", dealerCode: "7" },
            { dealerSpotCode: "22", dealerCode: "7" },
            { dealerSpotCode: "23", dealerCode: "8" },
            { dealerSpotCode: "24", dealerCode: "8" },
            { dealerSpotCode: "25", dealerCode: "8" },
            { dealerSpotCode: "26", dealerCode: "9" },
            { dealerSpotCode: "70", dealerCode: "8" },
            { dealerSpotCode: "27", dealerCode: "10" },
            { dealerSpotCode: "28", dealerCode: "10" },
            { dealerSpotCode: "29", dealerCode: "11" },
            { dealerSpotCode: "30", dealerCode: "12" },
            { dealerSpotCode: "31", dealerCode: "12" },
            { dealerSpotCode: "34", dealerCode: "15" },
            { dealerSpotCode: "35", dealerCode: "15" },
            { dealerSpotCode: "36", dealerCode: "15" },
            { dealerSpotCode: "37", dealerCode: "15" },
            { dealerSpotCode: "38", dealerCode: "15" },
            { dealerSpotCode: "39", dealerCode: "16" },
            { dealerSpotCode: "41", dealerCode: "17" },
            { dealerSpotCode: "42", dealerCode: "18" },
            { dealerSpotCode: "45", dealerCode: "20" },
            { dealerSpotCode: "46", dealerCode: "21" },
            { dealerSpotCode: "47", dealerCode: "22" },
            { dealerSpotCode: "48", dealerCode: "23" },
            { dealerSpotCode: "53", dealerCode: "20" },
            { dealerSpotCode: "55", dealerCode: "27" },
            { dealerSpotCode: "56", dealerCode: "28" },
            { dealerSpotCode: "57", dealerCode: "29" },
            { dealerSpotCode: "59", dealerCode: "30" },
            { dealerSpotCode: "60", dealerCode: "30" },
            { dealerSpotCode: "61", dealerCode: "30" },
            { dealerSpotCode: "62", dealerCode: "30" },
            { dealerSpotCode: "63", dealerCode: "30" },
            { dealerSpotCode: "72", dealerCode: "18" }
        ];

        let dealerFound = dealerEquivalents.find(a => a.dealerSpotCode === dealerSpotCode);

        let response = {
            dealerCode: dealerFound?.dealerCode,
            dealerSpotCode: dealerFound?.dealerSpotCode
        }
        return response;
    }

    const args = event.arguments;

    let kumoQuotationData = {
        ...args,
        kumoSuccessfulSync: false,
        kumoResponse: null,
    };

    const { errors, data } = await client.models.KumoQuotation.create(kumoQuotationData);
    if(!errors) {
        console.log(JSON.stringify(errors));
        return {
            success: false,
            message: 'Error saving register in database'
        };
    }

    const token = await getAccessToken();

    if (token) {

        const documentType = processDocumentType(args.identificationType!);

        const { dealerCode } = processDealer(args.dealerCode!);

        const payload = {
            records: [
                {
                    attributes: {
                        type: 'lead',
                        referenceId: Math.floor(Date.now() / 1000).toString()
                    },
                    LastName: args.lastName,
                    FirstName: args.firstName,
                    ATC_Numero_de_documento__c: args.identificationNumber,
                    ATC_TipoDocumentoCandidato__c: documentType,
                    Company: "",
                    Email: args.email,
                    MobilePhone: args.phoneNumber,
                    ATC_Modelo__c: args.vehicleModel,
                    ATC_Version__c: args.vehicleVersion,
                    ATC_CiudadLista__c: args.city,
                    ATC_ConcesionarioLista__c: dealerCode,
                    ATC_VitrinaLista__c: args.dealerCode,
                    ATC_Autorizacion_tratamiento_de_datos__c: args.dataAuthorization ? "Si" : "No",
                    ATC_AceptacionTerminosyCondiciones__c: args.termsAndConditions,
                    LeadSource: "Totem"
                }
            ]
        };

        console.log(payload);

        try {
            const response = await axios.post(kumoUrl, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Respuesta de la API:', response.data);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error en la solicitud:', error.response?.data || error.message);
            } else {
                const errorMessage = (error as Error).message;
                console.error('Error en la solicitud:', errorMessage);
            }
        }
    } 
    return {
        success: true,
        message: 'OK'
    };
};
