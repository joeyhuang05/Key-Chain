
import { describe, expect, it } from "vitest";

import { generateMockPrincipals } from "./mocks";

import { principalCV, cvToJSON , uintCV, PrincipalCV } from '@stacks/transactions';

const accounts: Map<string, string> = simnet.getAccounts();
const address1: string = accounts.get("wallet_1")!;


describe("Key Reader Test", () => {

  it("contract deployed", () => {
    const contractSource = simnet.getContractSource("KeyReader");
    expect(contractSource).toBeDefined();
  });

  const mockPrincipal: PrincipalCV[] = generateMockPrincipals(10).map(str => principalCV(str));






  

 
});
