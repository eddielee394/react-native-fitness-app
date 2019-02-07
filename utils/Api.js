import { formatCalendarResults } from "./_calendar";

class Api {
  static fetchCalendarResults(data) {
    const response = new Promise((resolve, reject) => {
      if (!data) {
        const error = "No data available";
        reject(error);
      }
      resolve(formatCalendarResults(data));
    });

    return response;
  }
}
export default Api;
