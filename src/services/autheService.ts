import httpRequest from "~/ultis/httpRequest";

const signUp = async (data: any) => {
  try {
    const res = await httpRequest.post("auth/signup", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export default { signUp };
