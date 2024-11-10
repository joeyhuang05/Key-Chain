
import { describe, expect, it } from "vitest";

import { mocks} from "./mocks";

import { principalCV, cvToJSON , uintCV, PrincipalCV , cvToString} from '@stacks/transactions';



const accounts: Map<string, string> = simnet.getAccounts();
const address1: string = accounts.get("wallet_1")!;


describe("Key Reader Test", () => {
  it ('pass', () => {
    expect(0).toBe(0);
  });


  
  it("contract deployed", () => {
    const contractSource = simnet.getContractSource("KeyReader");
    expect(contractSource).toBeDefined();
  });

  it("Add Keys: add 5 check", () => {
    
    const initial = simnet.getDataVar(
      "KeyReader",
      "connections"
    )
    const initialJSON = cvToJSON(initial);
    expect(initialJSON.value).toStrictEqual([]);
    
    for (let i = 0; i < 5; i++) {
      simnet.callPublicFn(
        "KeyReader",
        "addKey",
        [mocks[i]],
        address1
      )
    }

    const after = simnet.getDataVar(
      "KeyReader",
      "connections"
    )

    const afterJSON = cvToJSON(after);
    const results = afterJSON.value; 
    
    for (let i = 0; i < 5; i++) {
      expect(results[i].value).toBe(cvToString(mocks[i]));
    }
  });






 
});
