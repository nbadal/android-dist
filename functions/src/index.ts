import * as functions from "firebase-functions";
import axios from "axios";

export const distros = functions.https.onRequest(async (req, response) => {
  // TODO: We could probably store this for speed
  //       and bandwidth, and update it periodically.
  const url = "https://dl.google.com/android/studio/metadata/distributions.json";
  const jsonResponse = await axios.get(url);
  response.send(jsonResponse.data);
});
