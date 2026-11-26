/**
 * Types shared by the client and the server, so both sides agree on the shape
 * of API responses. Import with `@shared/api`.
 */

/** Response of the example endpoint GET /api/demo (server/routes/demo.ts). */
export interface DemoResponse {
  message: string;
}
