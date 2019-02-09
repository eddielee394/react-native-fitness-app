import { formatCalendarResults } from "./_calendar";

class Api {
  static fetchCalendarResults(data) {
    console.log("API.fetchCalendarResults", data);
    const response = new Promise(resolve => {
      resolve(formatCalendarResults(data));
    });

    return response;
  }
}
export default Api;
