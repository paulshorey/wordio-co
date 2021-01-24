import { http_get } from "@twodashes/browser/cjs/requests"

const NEXT_PUBLIC_DEV_ADMIN_API_HOST = "//" + process.env.NEXT_PUBLIC_DEV_ADMIN_API_HOST

/*
 * THIRDPARTY
 */
export function definitions_list_get(key) {
  return async () => {
    // get word
    let row = await http_get(NEXT_PUBLIC_DEV_ADMIN_API_HOST + "/api/oxford/definition/" + key)
    if (row) {
      // success
      return row
    }
    // fail
    return false
  }
}
