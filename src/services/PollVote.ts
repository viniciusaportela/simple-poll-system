import axios from "axios";
import { API_SERVER } from "../constants";
import treatCatch from "../utils/treatCatch";

export default class PollVoteService {
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
