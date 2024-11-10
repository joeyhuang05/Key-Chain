
import { describe, expect, it } from "vitest";

import { generateMockPrincipals } from "./mocks";

import { principalCV, cvToJSON , uintCV, PrincipalCV } from '@stacks/transactions';

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

  const mockPrincipal = generateMockPrincipals(10);

  const recipient: PrincipalCV = principalCV('STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6');

  it("add key", () => {
    const data = simnet.callPublicFn(
      "KeyReader",
      "addKey",
      [recipient],
      address1
    )
    expect(data).toBe(0);

    const check = simnet.getDataVar(
      "KeyReader",
      "connections"
    )

  });






 
});
