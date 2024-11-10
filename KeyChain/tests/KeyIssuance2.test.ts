
import { describe, expect, it } from "vitest";

import { principalCV, cvToJSON , uintCV, PrincipalCV } from '@stacks/transactions';


const accounts: Map<string, string> = simnet.getAccounts();
const address1: string = accounts.get("wallet_1")!;

describe("Key Issuance 2 test", () => {

  it("contract deployed", () => {
    const contractSource = simnet.getContractSource("KeyIssuance2");
    expect(contractSource).toBeDefined();
  });

  // example recipent
  const recipient: PrincipalCV = principalCV('STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6');
  
  /**
   * Issue Key Tests
   */

  it ("issue-key: check 1st key", () => {
    const {result} = simnet.callPublicFn(
      "KeyIssuance2",    // Contract name
      "issue-key",       // Function name
      [recipient],      // Arguments for the function (recipient)
      address1          // Sender address (contract owner in this case)
    );
    const data = cvToJSON(result);
    const tokenID = data.value.value;

    expect(tokenID).toBe("0");        
  });

  it ("issue-key: check 2nd id", () => {
    const ignore = simnet.callPublicFn(
      "KeyIssuance2",    
      "issue-key",       
      [recipient],      
      address1          
    );
    const {result} = simnet.callPublicFn(
      "KeyIssuance2",
      "issue-key",
      [recipient],
      address1
    )
    const data = cvToJSON(result);
    const tokenID = data.value.value;
    expect(tokenID).toBe("1");        
  });

  /**
   * Get Key Details Tests
   */

  it ("get-key-details: correct address", () => {
    // Get the key
    const keyData = simnet.callPublicFn(
      "KeyIssuance2",    // Contract name
      "issue-key",       // Function name
      [recipient],      // Arguments for the function (recipient)
      address1          // Sender address (contract owner in this case)
    );

    const keyDataJson = cvToJSON(keyData.result);
    const tokenID = keyDataJson.value.value;
    expect(tokenID).toBe("0");

    // Get th key details
    const {result} = simnet.callReadOnlyFn(
      "KeyIssuance2",        // Contract name
      "get-key-details",     // Function name
      [uintCV(tokenID)],    // Arguments for the function (recipient)
      address1              // Sender address (contract owner in this case)
    );

    const data = cvToJSON(result);
    const success = data.success;
    const address = data.value.value.value.business.value;
    expect(success).toBe(true);

    // Check that gets the wallet address is correct
    expect(address).toBe(address1);
  });

  it ("get-key-details: correct time", () => {
    const ignore = simnet.callPublicFn(
      "KeyIssuance2",    // Contract name
      "issue-key",       // Function name
      [recipient],      // Arguments for the function (recipient)
      address1          // Sender address (contract owner in this case)
    );

    const keyData = simnet.callPublicFn(
      "KeyIssuance2",    // Contract name
      "issue-key",       // Function name
      [recipient],      // Arguments for the function (recipient)
      address1          // Sender address (contract owner in this case)
    );

    const keyDataJson = cvToJSON(keyData.result);
    const tokenID = keyDataJson.value.value;
    expect(tokenID).toBe("1");

    // Get th key details
    const {result} = simnet.callReadOnlyFn(
      "KeyIssuance2",       
      "get-key-details",     
      [uintCV(tokenID)],   
      address1              
    );

    const data = cvToJSON(result);
    const success = data.success;
    const address = data.value.value.value.business.value;
    expect(success).toBe(true);

    // Check that gets the wallet address is correct
    expect(address).toBe(address1);
    expect(data).toBe(true);
  });

  




});
