import serverless from "serverless-http";
import { createServer } from "../../server";

/**
 * Netlify Function that serves /api/* (see netlify.toml) with the same Express
 * app as development. Only used if the site is deployed to Netlify; the
 * production site runs on Vercel.
 */
export const handler = serverless(createServer());
