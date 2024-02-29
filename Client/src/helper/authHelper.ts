/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "../axios_instance/instance";

export const logOutHelper = async (accessToken: string) => {
  try {
    const { data, status } = await instance.get("/logout", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (status !== 200) throw new Error("Error was throw..!");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const signInHelper = async (user: any) => {
  try {
    const { data, status } = await instance.post("/sign-in", { ...user });
    if (status !== 200) throw new Error("Error was throw..!");
    return data;
  } catch (error: any) {
    console.log(error?.message);
    return Promise.reject(error);
  }
};

export const signUpHelper = async (user: any) => {
  try {
    const { data, status } = await instance.post("/sign-up", { ...user });
    if (status !== 201) throw new Error("Error was throw..!");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
