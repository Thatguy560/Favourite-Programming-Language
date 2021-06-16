import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const mockAxios = new MockAdapter(axios);

export default mockAxios;

// Put in own file for re-usability.
