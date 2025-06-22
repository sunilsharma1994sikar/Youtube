import { LightningElement } from 'lwc';
import getJwtToken from '@salesforce/apex/UserSetupVerificationPOC.getJwtToken';

export default class CcareMiawUserVerificationPOC extends LightningElement {
    connectedCallback(){

        window.addEventListener("onEmbeddedMessagingReady", () => {
           

            getJwtToken().then(
                (response) =>{
                    this.dispatchEvent(new CustomEvent("accessTokenRecieved", {detail: { data:response }, bubbles: true, composed: true
                    }));
                    console.log('Access Token in LWC>>>>'+response);
                })
            .catch((error) =>{
                console.log('Error while fetching Token in LWC>>>>'+JSON.stringify(error));
            });            
        });

        window.addEventListener("onEmbeddedMessagingIdentityTokenExpired", () => {
            console.log("Received the onEmbeddedMessagingIdentityTokenExpired event.");
          
            getJwtToken().then(
                (response) =>{
                    this.dispatchEvent(new CustomEvent("accessTokenRecieved", {detail: { data:response }, bubbles: true, composed: true
                    }));
                    console.log('Access Token in LWC token expired>>>>'+response);
                })
            .catch((error) =>{
                console.log('Error while fetching Token in LWC identity token expired>>>>'+JSON.stringify(error));
            });  
          });
    }
}