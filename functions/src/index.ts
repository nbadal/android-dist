import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import axios from "axios";

export const distros = onRequest(async (req, response) => {
  // TODO: We could probably store this for speed
  //       and bandwidth, and update it periodically.
  const url = "https://dl.google.com/android/studio/metadata/distributions.json";
  const jsonResponse = await axios.get(url);
  logger.log("Got JSON Distros:", jsonResponse);
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Last-Modified", jsonResponse.headers["last-modified"]);
  response.send(jsonResponse.data);
});
