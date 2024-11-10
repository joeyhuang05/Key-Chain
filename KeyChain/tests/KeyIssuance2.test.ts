
import { describe, expect, it } from "vitest";

import { principalCV, cvToJSON , uintCV, PrincipalCV, intCV, cvToString } from '@stacks/transactions';

import { mocks} from "./mocks";

const accounts: Map<string, string> = simnet.getAccounts();
const address1: string = accounts.get("wallet_1")!;
const address2: string = accounts.get("wallet_2")!;

// Test for simple user and 4 businesss
const businessA = mocks[0];
const businessB = mocks[1];
const businessC = mocks[2];
const businessD = mocks[3];



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

  it ("test list content", () => {
    const data1 = simnet.getDataVar(
      "KeyIssuance2",
      "live-keys"
    );
    const ignore = simnet.callPublicFn(
      "KeyIssuance2",    
      "issue-key",       
      [recipient],      
      address1          
    );
    const data2 = simnet.getDataVar(
      "KeyIssuance2",
      "live-keys"
    );
    const ignore2 = simnet.callPublicFn(
      "KeyIssuance2",    
      "issue-key",       
      [recipient],      
      address2         
    );
    const data3 = simnet.getDataVar(
      "KeyIssuance2",
      "live-keys"
    );

    expect(cvToJSON(data1).value.length).toBe(0);
    expect(cvToJSON(data2).value.length).toBe(1);
    expect(cvToJSON(data3).value.length).toBe(2);
  })
  
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

  /**
   * Is Key Dead Tests
   */

  it ("is-dead: false", () => {
    // issue a key
    const keyData = simnet.callPublicFn(
      "KeyIssuance2",    
      "issue-key",      
      [recipient],      
      address1          
    );

    const keyDataJson = cvToJSON(keyData.result);
    const tokenID = Number(keyDataJson.value.value);

    expect(tokenID).toBe(0);
    
    const data = simnet.callPrivateFn(
      "KeyIssuance2",
      "is-dead",
      [uintCV(tokenID)],
      address1
    )

    expect(data.result.type).toBe(3);
  });

  /**
   * Test validate key
   */
  it ("Validate Key", () => {

    // 4 wallets give key to user
    const senders = [businessA, businessB, businessC, businessD];

    // user visits all 4 business and gets key
    senders.forEach(business => {
      const response1 = simnet.callReadOnlyFn (
        "KeyIssuance2",
        "get-user-map",
        [recipient],
        cvToString(businessA)
      )
      const a = response1.result;
 
      const json1 = cvToJSON(a);
  
      //console.log(json1.value);

      const resuelto = simnet.callPublicFn(
        "KeyIssuance2",
        "issue-key",
        [recipient],
        cvToString(business)
      )
      //console.log("hello", cvToJSON(resuelto.result))

      const map = simnet.getMapEntry(
        "KeyIssuance2",
        "user-map",
        recipient
      )
      console.log(cvToJSON(map).value)

      const response = simnet.callReadOnlyFn (
        "KeyIssuance2",
        "get-user-map",
        [recipient],
        cvToString(businessA)
      )
      const {result} = response;
 
      const json = cvToJSON(result);
  
      //console.log(json.value);
    });
    
    // Business A add all the other businesses
    //for (let i = 0; i <= 3; i++) {
    //  simnet.callPublicFn(
    //    "KeyReader",
    //    "addKey",
    //    [senders[i]],
    //    cvToString(businessA)
    //  )
    //}

    // call function to check on user wallet (recipent) -> 2 matches
    const response = simnet.callReadOnlyFn (
      "KeyIssuance2",
      "get-user-map",
      [recipient],
      cvToString(businessA)
    )

  

    // console.log("Map check");
    // console.log(mapCheck);
    // expect(response).toBe(0);

  })

  
});
