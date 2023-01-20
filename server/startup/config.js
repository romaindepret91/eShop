// ----- SERVER CONFIGURATION -----

export default function () {
  if (!process.env.JWT_PRIVATEKEY)
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined");
}
