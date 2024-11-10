


const baseMockPrincipal = 'ST1234567890abcdef1234567890abcdef12345678'; 

function generateMockPrincipals(count: number): string[] {
  const mockPrincipals = [];
  for (let i = 0; i < count; i++) {
    const modifiedPrincipal = baseMockPrincipal + i.toString(16).padStart(2, '0'); 
    mockPrincipals.push(modifiedPrincipal);
  }
  return mockPrincipals;
}



export {generateMockPrincipals}