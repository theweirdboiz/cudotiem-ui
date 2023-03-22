import * as httpRequest from "~/ultis/httpRequest";

const signUp = async () => {
  try {
    const res = await httpRequest.post("auth/signup");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default { signUp };
