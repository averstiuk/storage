export interface Certificate {
  commonName: string,
  issuer: string,
  validFrom: string,
  validTill: string,
  id: string
}
