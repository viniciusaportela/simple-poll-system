import axios from "axios";
import { API_SERVER } from "../constants";
import treatCatch from "../utils/treatCatch";

export default class PollVoteService {
  /**
   * Vote in a certain PollOption of a Poll
   *
   * @param pollOptionId
   */
  static async vote(pollOptionId: number) {
    try {
      await axios.post(`${API_SERVER}/v1/poll-votes/`, {
        option_id: pollOptionId,
      });
    } catch (e) {
      treatCatch(e);
    }
  }
}
