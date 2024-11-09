
import { describe, expect, it } from "vitest";

import { principalCV, cvToJSON , uintCV} from '@stacks/transactions';


const accounts = simnet.getAccounts();
const address1 = accounts.get("wallet_1")!;

describe("Key Issuance 2 test", () => {
  const recipient = principalCV('STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6');

  it("check contract deployed test", () => {
    const contractSource = simnet.getContractSource("KeyIssuance2");
    expect(contractSource).toBeDefined();
  });

  it ("issue-key test", () => {
    const {result} = simnet.callPublicFn(
      "KeyIssuance2",    // Contract name
      "issue-key",       // Function name
      [recipient],      // Arguments for the function (recipient)
      address1          // Sender address (contract owner in this case)
    );
    const data = cvToJSON(result);
    const tokenID = data.value.value;
    expect(tokenID).toBe("1");           
  })

  it ("get-key-details test", () => {
    const {result} = simnet.callReadOnlyFn(
      "KeyIssuance2",     // Contract name
      "get-key-details",  // Function name
      [uintCV("2")],      // Arguments for the function (recipient)
      address1            // Sender address (contract owner in this case)
    );
    const data = cvToJSON(result);
    const sucess = data.success;
    expect(sucess).toBe(true);
    //expect(cvToJSON(result)).toBe(true);
  })

});
