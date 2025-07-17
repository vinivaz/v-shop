export const isDev = (email:string) => {
  const devEmails = process.env.DEV_EMAILS?.split(",").map(singleEmail => singleEmail.trim()) ?? [];
  return devEmails.includes(email)
}



